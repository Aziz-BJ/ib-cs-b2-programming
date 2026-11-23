// Python runtime that runs inside Pyodide (and under local python3 for validation).
// Must stay Python 3.9-compatible so tools/validate.mjs can run it with the system python3.
window.PY_RUNTIME = String.raw`
import sys, io, json, math, traceback

_HINTS = {
    'NameError': "A name is used before it exists. Check spelling and capital letters, and that the variable is assigned before this line runs.",
    'UnboundLocalError': "You assign to this variable inside the function, so Python treats it as local everywhere in that function. Pass it in as a parameter, or write 'global name' if you really mean the global.",
    'SyntaxError': "Python can't read this line. Look for a missing colon (:), bracket or quote, or '=' where you meant '=='.",
    'IndentationError': "Indentation is wrong. Code inside if / for / while / def must be indented by the same amount (4 spaces).",
    'TabError': "Tabs and spaces are mixed. Use 4 spaces for each level.",
    'TypeError': "An operation was used on the wrong type, e.g. \"5\" + 3, or a function was called with the wrong number of arguments. Convert with int(), float() or str().",
    'IndexError': "An index is outside the list or string. Valid indices run from 0 to len - 1.",
    'ZeroDivisionError': "Division or modulus by zero.",
    'ValueError': "The type is right but the value can't be used, e.g. int(\"two\").",
    'KeyError': "That key is not in the dictionary.",
    'AttributeError': "This type doesn't have that method, e.g. .append() on a string, or .upper() on a number.",
    'EOFError': "input() was called but there was no more input. Add one line per input() call in the Input box.",
    'RecursionError': "A function kept calling itself without stopping.",
}

class _Out(io.StringIO):
    LIMIT = 20000
    def write(self, s):
        if self.tell() > self.LIMIT:
            raise RuntimeError("Too much output (over 20,000 characters). Is a print inside a loop that never ends?")
        return io.StringIO.write(self, s)

def _make_input(stdin_text, out, echo=True):
    lines = stdin_text.split('\n') if stdin_text else []
    if lines and lines[-1] == '':
        lines.pop()
    state = {'i': 0}
    def fake_input(prompt=''):
        if echo:
            out.write(str(prompt))
        if state['i'] >= len(lines):
            raise EOFError("input() was called but no more input was provided")
        v = lines[state['i']]
        state['i'] += 1
        if echo:
            out.write(v + '\n')
        return v
    return fake_input

def _fmt_err(e):
    name = type(e).__name__
    line = None
    where = 'code'
    if isinstance(e, SyntaxError):
        line = e.lineno
        if e.filename == '<test>':
            where = 'test'
        msg = e.msg
    else:
        for fr in traceback.extract_tb(e.__traceback__):
            if fr.filename == '<your code>':
                line = fr.lineno
        msg = str(e)
    hint = _HINTS.get(name)
    if hint is None:
        for base in type(e).__mro__:
            if base.__name__ in _HINTS:
                hint = _HINTS[base.__name__]
                break
    return {'type': name, 'msg': msg, 'line': line, 'hint': hint, 'where': where}

def _norm_text(s):
    lines = [l.rstrip() for l in s.replace('\r', '').split('\n')]
    while lines and lines[-1] == '':
        lines.pop()
    while lines and lines[0] == '':
        lines.pop(0)
    return '\n'.join(lines)

def _eq(a, b):
    if isinstance(a, bool) or isinstance(b, bool):
        return type(a) == type(b) and a == b
    if isinstance(a, float) or isinstance(b, float):
        try:
            return math.isclose(a, b, rel_tol=1e-6, abs_tol=1e-9)
        except TypeError:
            return False
    if type(a) != type(b):
        return False
    if isinstance(a, (list, tuple)):
        return len(a) == len(b) and all(_eq(x, y) for x, y in zip(a, b))
    if isinstance(a, dict):
        return set(a.keys()) == set(b.keys()) and all(_eq(a[k], b[k]) for k in a)
    try:
        return a == b
    except Exception:
        return False

def run_code(code, stdin_text=''):
    out = _Out()
    ns = {'__name__': '__main__'}
    ns['input'] = _make_input(stdin_text, out)
    old = sys.stdout
    sys.stdout = out
    err = None
    try:
        exec(compile(code, '<your code>', 'exec'), ns)
    except SystemExit:
        pass
    except BaseException as e:
        err = _fmt_err(e)
    finally:
        sys.stdout = old
    return json.dumps({'out': out.getvalue(), 'err': err})

def _exec_test(code, t):
    out = _Out()
    ns = {'__name__': '__main__'}
    ns['input'] = _make_input(t.get('stdin', ''), out, echo=False)
    res = {'ret': None, 'after': None, 'err': None, 'out': '', 'call_out': ''}
    old = sys.stdout
    sys.stdout = out
    try:
        exec(compile(code, '<your code>', 'exec'), ns)
        if t.get('setup'):
            exec(compile(t['setup'], '<test>', 'exec'), ns)
        if t.get('call'):
            pre = len(out.getvalue())
            res['ret'] = eval(compile(t['call'], '<test>', 'eval'), ns)
            res['call_out'] = out.getvalue()[pre:]
        if t.get('after'):
            res['after'] = eval(compile(t['after'], '<test>', 'eval'), ns)
    except SystemExit:
        pass
    except BaseException as e:
        res['err'] = _fmt_err(e)
    finally:
        sys.stdout = old
    res['out'] = out.getvalue()
    return res

def _label(t):
    if t.get('label'):
        return t['label']
    parts = []
    if t.get('setup'):
        parts.append(t['setup'].strip().replace('\n', '; '))
    if t.get('call'):
        parts.append(t['call'])
    if t.get('after'):
        parts.append('then check ' + t['after'])
    if not parts:
        s = t.get('stdin', '')
        if s:
            return 'Run with input: ' + ', '.join(s.strip('\n').split('\n'))
        return 'Run the program'
    return '; '.join(parts)

def _grade_one(user, sol, t):
    exp = _exec_test(sol, t)
    if exp['err']:
        return {'label': _label(t), 'ok': False, 'broken': True,
                'expected': 'reference solution failed: ' + exp['err']['type'] + ': ' + exp['err']['msg'], 'got': ''}
    got = _exec_test(user, t)
    item = {'label': _label(t), 'ok': True}
    if got['err']:
        item['ok'] = False
        item['err'] = got['err']
        item['got'] = got['err']['type'] + ': ' + got['err']['msg']
        item['expected'] = repr(exp['ret']) if t.get('call') else _norm_text(exp['out'])
        return item
    checks = []
    if t.get('call'):
        checks.append(('returned', repr(exp['ret']), repr(got['ret']), _eq(exp['ret'], got['ret'])))
        if t.get('out') or (exp['ret'] is None and exp['call_out'] != ''):
            e, g = _norm_text(exp['call_out']), _norm_text(got['call_out'])
            checks.append(('printed', e, g, e == g))
    else:
        e, g = _norm_text(exp['out']), _norm_text(got['out'])
        checks.append(('printed', e, g, e == g))
    if t.get('after'):
        checks.append((t['after'] + ' =', repr(exp['after']), repr(got['after']), _eq(exp['after'], got['after'])))
    for kind, e, g, ok in checks:
        if not ok:
            item['ok'] = False
            item['kind'] = kind
            item['expected'] = e
            item['got'] = g
            break
    return item

def grade(user, sol, tests_json, forbid_json='[]'):
    tests = json.loads(tests_json)
    forbid = json.loads(forbid_json)
    stripped = '\n'.join(l.split('#')[0] for l in user.split('\n'))
    found = [f for f in forbid if f in stripped]
    results = [_grade_one(user, sol, t) for t in tests]
    return json.dumps({'results': results, 'forbidden': found})
`;
