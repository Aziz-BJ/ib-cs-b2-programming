// Validates every content file: schema, reference solutions vs tests, runnable lesson code,
// output-prediction questions, trace-table shapes. Uses the exact Python runtime the site uses.
// Usage: node tools/validate.mjs [content/b21.js ...]   (defaults to all content/*.js)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = { window: {} };
sandbox.window.B2 = { topics: [] };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(root, 'js/runtime.js'), 'utf8'), sandbox);
vm.runInContext('var B2 = window.B2;', sandbox);

let files = process.argv.slice(2);
if (!files.length) {
  files = fs.readdirSync(path.join(root, 'content')).filter(f => f.endsWith('.js')).sort().map(f => path.join('content', f));
}
const errors = [];
const warnings = [];
for (const f of files) {
  const before = sandbox.window.B2.topics.length;
  try {
    vm.runInContext(fs.readFileSync(path.resolve(root, f), 'utf8'), sandbox, { filename: f });
  } catch (e) {
    errors.push(`${f}: failed to load: ${e.message}`);
    continue;
  }
  for (const t of sandbox.window.B2.topics.slice(before)) t.__file = f;
}
const topics = sandbox.window.B2.topics;

const req = (cond, msg) => { if (!cond) errors.push(msg); };
const jobs = [];
const topicIds = new Set();
for (const t of topics) {
  const where = `${t.__file} ${t.id}`;
  req(t.id && /^[a-z0-9-]+$/.test(t.id), `${where}: bad topic id`);
  req(!topicIds.has(t.id), `${where}: duplicate topic id`);
  topicIds.add(t.id);
  for (const k of ['code', 'section', 'title', 'summary']) req(typeof t[k] === 'string' && t[k], `${where}: missing ${k}`);
  req(Array.isArray(t.lesson) && t.lesson.length, `${where}: missing lesson`);
  req(Array.isArray(t.mustKnow) && t.mustKnow.length, `${where}: missing mustKnow`);
  req(Array.isArray(t.terms), `${where}: terms must be an array`);
  for (const term of t.terms || []) req(term.term && term.def, `${where}: term missing term/def`);
  (t.lesson || []).forEach((b, i) => {
    const kinds = ['h', 'p', 'code', 'tip', 'trap', 'table', 'list'].filter(k => k in b);
    req(kinds.length === 1, `${where}: lesson block ${i} must have exactly one of h/p/code/tip/trap/table/list (has ${kinds.join(',') || 'none'})`);
    if ('code' in b) jobs.push({ kind: 'lesson', where: `${where} lesson[${i}]`, code: b.code, stdin: b.stdin || '', expectError: !!b.error });
    if ('table' in b) {
      req(Array.isArray(b.table.head) && Array.isArray(b.table.rows), `${where}: lesson[${i}] table needs head + rows`);
      for (const r of b.table.rows || []) req(r.length === b.table.head.length, `${where}: lesson[${i}] table row length != head length`);
    }
  });
  const exIds = new Set();
  req(Array.isArray(t.exercises) && t.exercises.length, `${where}: no exercises`);
  for (const ex of t.exercises || []) {
    const w = `${where} ex ${ex.id}`;
    req(ex.id && !exIds.has(ex.id), `${w}: missing or duplicate exercise id`);
    exIds.add(ex.id);
    req(typeof ex.marks === 'number' && ex.marks > 0, `${w}: marks must be a positive number`);
    req(typeof ex.q === 'string' && ex.q, `${w}: missing q`);
    switch (ex.type) {
      case 'mcq':
        req(Array.isArray(ex.options) && ex.options.length >= 2, `${w}: mcq needs options`);
        req(Number.isInteger(ex.answer) && ex.answer >= 0 && ex.answer < (ex.options || []).length, `${w}: mcq answer index out of range`);
        req(ex.explain, `${w}: mcq needs explain`);
        break;
      case 'output':
        req(ex.code, `${w}: output needs code`);
        jobs.push({ kind: 'output', where: w, code: ex.code, stdin: ex.stdin || '' });
        break;
      case 'trace':
        req(ex.code, `${w}: trace needs code`);
        req(Array.isArray(ex.columns) && ex.columns.length, `${w}: trace needs columns`);
        req(Array.isArray(ex.rows) && ex.rows.length, `${w}: trace needs rows`);
        for (const r of ex.rows || []) req(Array.isArray(r) && r.length === ex.columns.length, `${w}: trace row length != columns length`);
        jobs.push({ kind: 'lesson', where: `${w} (trace code)`, code: ex.code, stdin: ex.stdin || '', expectError: false });
        break;
      case 'code':
        req(typeof ex.starter === 'string', `${w}: code needs starter`);
        req(ex.solution, `${w}: code needs solution`);
        req(Array.isArray(ex.tests) && ex.tests.length >= 2, `${w}: code needs at least 2 tests`);
        req(Array.isArray(ex.markscheme) && ex.markscheme.length, `${w}: code needs markscheme`);
        for (const f of ex.forbid || []) req(!(ex.solution || '').includes(f), `${w}: solution uses forbidden "${f}"`);
        jobs.push({ kind: 'code', where: w, solution: ex.solution, starter: ex.starter, tests: ex.tests || [] });
        break;
      case 'written':
        req(Array.isArray(ex.markscheme) && ex.markscheme.length, `${w}: written needs markscheme`);
        req(ex.model, `${w}: written needs model answer`);
        break;
      default:
        errors.push(`${w}: unknown type ${ex.type}`);
    }
  }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'b2val-'));
fs.writeFileSync(path.join(tmp, 'b2runtime.py'), sandbox.window.PY_RUNTIME);
fs.writeFileSync(path.join(tmp, 'jobs.json'), JSON.stringify(jobs));
fs.writeFileSync(path.join(tmp, 'harness.py'), `
import json, sys, signal
sys.path.insert(0, ${JSON.stringify(tmp)})
import b2runtime as R
class TO(Exception): pass
def alarm(*a): raise TO()
signal.signal(signal.SIGALRM, alarm)
jobs = json.load(open(${JSON.stringify(path.join(tmp, 'jobs.json'))}))
out = []
for j in jobs:
    signal.alarm(5)
    try:
        if j['kind'] in ('lesson', 'output'):
            r = json.loads(R.run_code(j['code'], j['stdin']))
            out.append({'where': j['where'], 'kind': j['kind'], 'err': r['err'], 'out': r['out'], 'expectError': j.get('expectError', False)})
        else:
            g = json.loads(R.grade(j['solution'], j['solution'], json.dumps(j['tests'])))
            s = json.loads(R.grade(j['starter'], j['solution'], json.dumps(j['tests'])))
            out.append({'where': j['where'], 'kind': 'code', 'sol': g, 'starter': s})
    except TO:
        out.append({'where': j['where'], 'kind': 'timeout'})
    finally:
        signal.alarm(0)
print(json.dumps(out))
`);
const r = spawnSync('python3', ['-I', path.join(tmp, 'harness.py')], { encoding: 'utf8', maxBuffer: 1 << 28 });
if (r.status !== 0) {
  console.error(r.stderr);
  process.exit(2);
}
for (const res of JSON.parse(r.stdout)) {
  if (res.kind === 'timeout') { errors.push(`${res.where}: timed out (infinite loop?)`); continue; }
  if (res.kind === 'lesson' || res.kind === 'output') {
    if (res.expectError && !res.err) errors.push(`${res.where}: marked error:true but ran without error`);
    if (!res.expectError && res.err) errors.push(`${res.where}: raised ${res.err.type}: ${res.err.msg} (line ${res.err.line})`);
    if (res.kind === 'output' && !res.out.trim()) errors.push(`${res.where}: output question prints nothing`);
    continue;
  }
  const bad = res.sol.results.filter(x => !x.ok);
  for (const b of bad) errors.push(`${res.where}: reference solution fails test "${b.label}": expected ${b.expected} got ${b.got}`);
  if (res.starter.results.every(x => x.ok)) warnings.push(`${res.where}: starter code already passes every test`);
}

const exCount = topics.reduce((n, t) => n + (t.exercises || []).length, 0);
console.log(`${topics.length} topics, ${exCount} exercises, ${jobs.length} runnable checks`);
for (const w of warnings) console.log('WARN  ' + w);
for (const e of errors) console.log('ERROR ' + e);
console.log(errors.length ? `FAILED with ${errors.length} error(s)` : 'OK');
process.exit(errors.length ? 1 : 0);
