// Shared UI pieces: storage, element helper, code editor, runner, and the five exercise renderers.

// ---------- storage ----------
window.Store = (() => {
  const KEY = 'b2-study-v1';
  let d;
  try { d = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { d = {}; }
  d.results = d.results || {};
  d.drafts = d.drafts || {};
  d.read = d.read || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch {} };
  return {
    get data() { return d; },
    result: k => d.results[k],
    setResult(k, score, max) {
      const prev = d.results[k];
      d.results[k] = { score: Math.max(score, prev ? prev.score : 0), last: score, max, at: Date.now() };
      save();
      document.dispatchEvent(new CustomEvent('progress'));
    },
    draft: k => d.drafts[k],
    setDraft(k, v) { d.drafts[k] = v; save(); },
    clearDraft(k) { delete d.drafts[k]; save(); },
    markRead(id) { d.read[id] = true; save(); document.dispatchEvent(new CustomEvent('progress')); },
    isRead: id => !!d.read[id],
    set(k, v) { d[k] = v; save(); },
    get(k) { return d[k]; },
    reset() { d = { results: {}, drafts: {}, read: {} }; save(); document.dispatchEvent(new CustomEvent('progress')); },
  };
})();

// ---------- element helper ----------
window.h = function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
  }
  for (const kid of kids.flat()) {
    if (kid == null || kid === false) continue;
    el.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
  }
  return el;
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
window.esc = esc;
const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const MOD = isMac ? '⌘' : 'Ctrl';

// ---------- editor ----------
function makeEditor(parent, code, { readOnly = false, onRun } = {}) {
  if (window.CodeMirror) {
    const cm = CodeMirror(parent, {
      value: code,
      mode: 'python',
      lineNumbers: true,
      indentUnit: 4,
      tabSize: 4,
      readOnly: readOnly ? 'nocursor' : false,
      matchBrackets: true,
      viewportMargin: Infinity,
      extraKeys: {
        Tab: c => c.somethingSelected() ? c.indentSelection('add') : c.replaceSelection('    ', 'end'),
        'Shift-Tab': c => c.indentSelection('subtract'),
        'Cmd-Enter': () => onRun && onRun(),
        'Ctrl-Enter': () => onRun && onRun(),
      },
    });
    if (readOnly) cm.getWrapperElement().classList.add('CodeMirror-readonly');
    // Editors are built before they're attached to the page; re-measure once they become visible.
    let lastW = 0;
    const ro = new ResizeObserver(entries => {
      const w = entries[entries.length - 1].contentRect.width;
      if (w > 0 && w !== lastW) { lastW = w; setTimeout(() => cm.refresh(), 0); }
    });
    ro.observe(cm.getWrapperElement());
    setTimeout(() => cm.refresh(), 0);
    setTimeout(() => cm.refresh(), 250);
    let errLine = null;
    return {
      get: () => cm.getValue(),
      set: v => cm.setValue(v),
      onChange: f => cm.on('change', () => f(cm.getValue())),
      markError(line) {
        if (errLine != null) cm.removeLineClass(errLine, 'background', 'err-line');
        errLine = null;
        if (line && line <= cm.lineCount()) { errLine = line - 1; cm.addLineClass(errLine, 'background', 'err-line'); }
      },
      refresh: () => cm.refresh(),
    };
  }
  const ta = h('textarea', { class: 'plain-editor', spellcheck: 'false' });
  ta.value = code;
  ta.readOnly = readOnly;
  ta.rows = Math.max(3, code.split('\n').length + 1);
  ta.addEventListener('keydown', e => {
    if (e.key === 'Tab') { e.preventDefault(); ta.setRangeText('    ', ta.selectionStart, ta.selectionEnd, 'end'); }
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); onRun && onRun(); }
  });
  parent.append(ta);
  return { get: () => ta.value, set: v => { ta.value = v; }, onChange: f => ta.addEventListener('input', () => f(ta.value)), markError() {}, refresh() {} };
}

// ---------- console rendering ----------
function errorBox(err) {
  const where = err.line ? (err.where === 'test' ? 'In the test call' : `Line ${err.line}`) : '';
  return h('div', { class: 'err-box' },
    h('div', { class: 'e-title' }, `${where ? where + ' · ' : ''}${err.type}: ${err.msg}`),
    err.hint ? h('div', { class: 'e-hint' }, err.hint) : null);
}

function showRun(consoleEl, editor, res) {
  consoleEl.replaceChildren();
  editor && editor.markError(null);
  if (res.timeout) {
    consoleEl.append(errorBox({ type: 'Stopped', msg: 'your code ran for more than 5 seconds.', hint: 'This is almost always an infinite loop: check the loop condition can become False, and that the loop variable is updated inside the loop.' }));
    return;
  }
  if (res.loadError) {
    consoleEl.append(errorBox({ type: 'Python unavailable', msg: 'Python could not load.', hint: 'The Python engine downloads from the internet the first time. Check your connection and reload the page.' }));
    return;
  }
  const out = res.out || '';
  if (out) consoleEl.append(document.createTextNode(out.length > 20000 ? out.slice(0, 20000) + '\n…' : out));
  if (res.err) {
    consoleEl.append(errorBox(res.err));
    editor && editor.markError(res.err.line);
  }
  if (!out && !res.err) consoleEl.append(h('span', { class: 'c-muted' }, 'Ran with no output. Use print() to see values.'));
}

async function pyRun(code, stdin) {
  try { return await Py.run(code, stdin); }
  catch (e) { return e.timeout ? { timeout: true } : { loadError: true }; }
}

// ---------- runner: editable, runnable code block ----------
function makeRunner(code, { stdin = '', storeKey = null, label = 'Python', showStdin = null } = {}) {
  const box = h('div', { class: 'runner' });
  const edHost = h('div');
  box.append(edHost);
  const initial = (storeKey && Store.draft(storeKey)) || code;
  let editor;
  const consoleEl = h('div', { class: 'console', 'aria-live': 'polite' });
  const needsStdin = showStdin ?? /input\s*\(/.test(code);
  let stdinTa = null;
  const run = async () => {
    runBtn.disabled = true;
    consoleEl.replaceChildren(h('span', { class: 'c-muted' }, Py.status === 'ready' ? 'Running…' : 'Starting Python…'));
    const res = await pyRun(editor.get(), stdinTa ? stdinTa.value : '');
    runBtn.disabled = false;
    showRun(consoleEl, editor, res);
  };
  editor = makeEditor(edHost, initial, { onRun: run });
  if (storeKey) editor.onChange(v => Store.setDraft(storeKey, v));
  if (needsStdin) {
    stdinTa = h('textarea', { spellcheck: 'false', 'aria-label': 'Program input, one line per input() call' });
    stdinTa.value = stdin;
    stdinTa.rows = Math.max(1, stdin.split('\n').length);
    box.append(h('div', { class: 'stdin-wrap' }, h('label', null, 'Input'), stdinTa));
  }
  const runBtn = h('button', { class: 'btn primary', onclick: run, title: `Run (${MOD}↵)` }, '▶ Run');
  const resetBtn = h('button', { class: 'btn ghost', onclick: () => { editor.set(code); storeKey && Store.clearDraft(storeKey); consoleEl.replaceChildren(); editor.markError(null); } }, 'Reset');
  box.append(h('div', { class: 'runner-bar' }, h('span', { class: 'label' }, label), resetBtn, runBtn), consoleEl);
  return { el: box, editor, run, consoleEl, get stdin() { return stdinTa ? stdinTa.value : ''; } };
}

function codeView(code) {
  const box = h('div', { class: 'runner' });
  const host = h('div');
  box.append(host);
  makeEditor(host, code, { readOnly: true });
  return box;
}

// ---------- normalisers ----------
const normText = s => s.replace(/\r/g, '').split('\n').map(l => l.replace(/\s+$/, '')).join('\n').replace(/^\n+|\n+$/g, '');
const normCell = s => {
  let v = String(s).trim().toLowerCase().replace(/\s+/g, '').replace(/["']/g, '');
  if (v === '-' || v === '—') v = '';
  return v;
};

// ---------- exercise shell ----------
const TYPE_LABEL = { mcq: 'Multiple choice', output: 'State the output', trace: 'Trace table', code: 'Construct', written: 'Written answer' };

function scoreClass(score, max) { return score >= max ? 'full' : score > 0 ? 'part' : 'zero'; }

window.renderExercise = function renderExercise(ex, topic, { number, onResult, fromTopic } = {}) {
  const key = `${topic.id}/${ex.id}`;
  const card = h('article', { class: 'ex', 'data-key': key });
  const scoreEl = h('span', { class: 'score', hidden: true });
  const head = h('div', { class: 'ex-head' },
    h('span', { class: 'ex-num' }, number != null ? `Question ${number}` : ''),
    h('span', { class: 'ex-type' }, TYPE_LABEL[ex.type] || ''),
    fromTopic ? h('span', { class: 'from-topic' }, `${topic.code}`) : null,
    h('span', { class: 'marks' }, `[${ex.marks} mark${ex.marks === 1 ? '' : 's'}]`),
    scoreEl);
  card.append(head);
  if (ex.context) card.append(h('div', { class: 'ex-context', html: ex.context }));
  card.append(h('div', { class: 'ex-q', html: ex.q }));
  const body = h('div', { class: 'ex-body' });
  const feedback = h('div', { class: 'ex-fb' });
  card.append(body, feedback);

  const prev = Store.result(key);
  const showScore = (score) => {
    scoreEl.hidden = false;
    scoreEl.className = `score ${scoreClass(score, ex.marks)}`;
    scoreEl.textContent = `${score}/${ex.marks}`;
  };
  if (prev) showScore(prev.last ?? prev.score);
  const record = (score) => {
    score = Math.max(0, Math.min(ex.marks, Math.round(score)));
    Store.setResult(key, score, ex.marks);
    showScore(score);
    onResult && onResult(score, ex.marks);
  };
  const ctx = { ex, topic, key, body, feedback, record };
  (RENDER[ex.type] || (() => body.append('Unknown exercise type')))(ctx);
  if (window.Tutor) Tutor.attach(card, ex, topic);
  return card;
};

function banner(score, max, text) {
  const cls = score >= max ? 'good' : score > 0 ? 'part' : 'bad';
  const icon = score >= max ? '✓' : score > 0 ? '◐' : '✕';
  return h('div', { class: `fb-banner ${cls}` }, h('span', null, icon), h('span', null, text || `${score} / ${max} marks`));
}

function markschemeList(points, title = 'Markscheme') {
  return h('div', { class: 'ms' }, h('h4', null, title), h('ul', null, points.map(p => h('li', { html: p }))));
}

const RENDER = {
  mcq({ ex, body, feedback, record }) {
    const opts = h('div', { class: 'options', role: 'group' });
    const buttons = ex.options.map((o, i) => h('button', {
      class: 'opt',
      onclick: () => choose(i),
    }, h('span', { class: 'letter' }, 'ABCDEFG'[i]), h('span', { html: o })));
    opts.append(...buttons);
    if (ex.code) body.append(codeView(ex.code));
    body.append(opts);
    function choose(i) {
      buttons.forEach((b, j) => {
        b.disabled = true;
        if (j === ex.answer) b.classList.add('right');
        else if (j === i) b.classList.add('wrong');
      });
      const ok = i === ex.answer;
      record(ok ? ex.marks : 0);
      feedback.replaceChildren(h('div', { class: 'feedback' },
        banner(ok ? ex.marks : 0, ex.marks, ok ? 'Correct' : `Not quite. The answer is ${'ABCDEFG'[ex.answer]}.`),
        h('div', { class: 'fb-body', html: ex.explain || '' }),
        h('div', { class: 'btn-row' }, h('button', { class: 'btn ghost', onclick: reset }, 'Try again'))));
    }
    function reset() {
      buttons.forEach(b => { b.disabled = false; b.classList.remove('right', 'wrong'); });
      feedback.replaceChildren();
    }
  },

  output({ ex, body, feedback, record, key }) {
    body.append(codeView(ex.code));
    if (ex.stdin) body.append(h('p', { class: 'muted small' }, 'Input given: ', h('code', null, ex.stdin.split('\n').join(' ⏎ '))));
    const ta = h('textarea', { class: 'answer-box mono', placeholder: 'Type exactly what the program prints…', spellcheck: 'false', rows: 3 });
    ta.value = Store.draft(key) || '';
    ta.addEventListener('input', () => Store.setDraft(key, ta.value));
    const check = async () => {
      btn.disabled = true;
      const res = await pyRun(ex.code, ex.stdin || '');
      btn.disabled = false;
      if (res.loadError || res.timeout || res.err) { showRun(feedback, null, res); return; }
      const ok = normText(ta.value) === normText(res.out);
      record(ok ? ex.marks : 0);
      feedback.replaceChildren(h('div', { class: 'feedback' },
        banner(ok ? ex.marks : 0, ex.marks, ok ? 'Correct' : 'Not quite'),
        ok ? null : h('div', { class: 'diff' },
          h('div', null, h('div', { class: 'd-label' }, 'Actual output'), h('pre', null, normText(res.out))),
          h('div', null, h('div', { class: 'd-label' }, 'You wrote'), h('pre', null, normText(ta.value) || '(nothing)'))),
        ex.explain ? h('div', { class: 'fb-body', html: ex.explain }) : null));
    };
    ta.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); check(); } });
    const btn = h('button', { class: 'btn primary', onclick: check }, 'Check', h('span', { class: 'kbd' }, `${MOD}↵`));
    body.append(ta, h('div', { class: 'btn-row ex-actions' }, btn));
  },

  trace({ ex, body, feedback, record }) {
    body.append(codeView(ex.code));
    if (ex.stdin) body.append(h('p', { class: 'muted small' }, 'Input given: ', h('code', null, ex.stdin.split('\n').join(' ⏎ '))));
    const prefill = ex.prefill ?? 1;
    const labelCol = ex.labelCol ?? true;
    const inputs = [];
    const table = h('table', null,
      h('thead', null, h('tr', null, ex.columns.map(c => h('th', null, c)))),
      h('tbody', null, ex.rows.map((row, r) => h('tr', null, row.map((cell, c) => {
        if (r < prefill || (labelCol && c === 0)) return h('td', { class: 'given' }, cell === '' ? '' : cell);
        const inp = h('input', { type: 'text', spellcheck: 'false', autocomplete: 'off', 'aria-label': `${ex.columns[c]}, row ${r + 1}` });
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); const i = inputs.findIndex(x => x.inp === inp); (inputs[i + 1] || inputs[i]).inp.focus(); } });
        inputs.push({ inp, r, c, want: cell });
        return h('td', null, inp);
      })))));
    body.append(h('p', { class: 'muted small' }, 'Write each variable\'s value after that step. If a value hasn\'t changed since the row above, you can repeat it or leave the cell blank. Use True/False for booleans; quotes around strings are optional.'),
      h('div', { class: 'trace' }, table));
    // Accept both trace conventions: repeat the current value on every row, or leave
    // a cell blank when the value hasn't changed. "Current value" = last non-blank cell above.
    const outputCol = c => /output|print|decision|result|found\?|==|<|>/i.test(ex.columns[c]);
    const lastAbove = (r, c) => { for (let k = r - 1; k >= 0; k--) if (normCell(ex.rows[k][c]) !== '') return normCell(ex.rows[k][c]); return ''; };
    const cellOk = (given, r, c) => {
      const g = normCell(given), w = normCell(ex.rows[r][c]);
      if (g === w) return true;
      if (outputCol(c)) return false;
      const prev = lastAbove(r, c);
      if (g === '' && w === prev) return true;       // left blank, value unchanged
      if (w === '' && prev !== '' && g === prev) return true; // repeated the unchanged value
      return false;
    };
    const check = () => {
      const rowsOk = new Map();
      for (const { inp, r, c } of inputs) {
        inp.parentElement.querySelector('.fix')?.remove();
        const ok = cellOk(inp.value, r, c);
        inp.classList.toggle('ok', ok);
        inp.classList.toggle('no', !ok);
        if (!rowsOk.has(r)) rowsOk.set(r, true);
        if (!ok) rowsOk.set(r, false);
      }
      const total = rowsOk.size;
      const good = [...rowsOk.values()].filter(Boolean).length;
      const score = Math.floor(ex.marks * good / total + 1e-9);
      record(score);
      feedback.replaceChildren(h('div', { class: 'feedback' },
        banner(score, ex.marks, `${good} of ${total} rows fully correct · ${score}/${ex.marks} marks`),
        ex.explain ? h('div', { class: 'fb-body', html: ex.explain }) : null,
        good < total ? h('div', { class: 'btn-row' }, h('button', { class: 'btn ghost', onclick: reveal }, 'Show correct values')) : null));
    };
    const reveal = () => {
      for (const { inp, want } of inputs) {
        if (inp.classList.contains('no')) {
          inp.parentElement.querySelector('.fix')?.remove();
          inp.parentElement.append(h('span', { class: 'fix' }, want === '' ? '(blank)' : want));
        }
      }
    };
    body.append(h('div', { class: 'btn-row ex-actions' }, h('button', { class: 'btn primary', onclick: check }, 'Check table')));
  },

  code({ ex, key, body, feedback, record }) {
    const usesStdin = ex.tests.some(t => t.stdin != null && !t.call);
    const runner = makeRunner(ex.starter, { storeKey: `code:${key}`, label: 'Your code', showStdin: usesStdin || /input\s*\(/.test(ex.starter), stdin: (ex.tests.find(t => t.stdin) || {}).stdin || '' });
    body.append(runner.el);
    const hintBox = h('div');
    const structBox = h('div');
    const structBtn = h('button', { class: 'btn', title: 'Show the shape of a full-mark answer without the answer itself', onclick: () => {
      const open = !!structBox.firstChild;
      structBox.replaceChildren(...(open ? [] : [Structure.render(ex.solution)]));
      structBtn.classList.toggle('on', !open);
    } }, 'Structure');
    let hintsShown = 0;
    const extra = h('div');
    const check = async () => {
      checkBtn.disabled = true;
      feedback.replaceChildren(h('div', { class: 'feedback' }, h('span', { class: 'muted' }, Py.status === 'ready' ? 'Checking…' : 'Starting Python…')));
      let res;
      try { res = await Py.grade(runner.editor.get(), ex.solution, ex.tests, ex.forbid || []); }
      catch (e) { checkBtn.disabled = false; showRun(feedback, null, e.timeout ? { timeout: true } : { loadError: true }); return; }
      checkBtn.disabled = false;
      const passed = res.results.filter(r => r.ok).length;
      const total = res.results.length;
      let score = Math.floor(ex.marks * passed / total + 1e-9);
      if (res.forbidden.length && score >= ex.marks) score = ex.marks - 1;
      record(score);
      const firstErr = res.results.find(r => r.err && r.err.where === 'code');
      runner.editor.markError(firstErr ? firstErr.err.line : null);
      const list = h('ul', { class: 'tests' }, res.results.map(r => h('li', { class: r.ok ? 'pass' : 'fail' },
        h('div', { class: 't-line' }, h('span', { class: 't-icon' }, r.ok ? '✓' : '✕'), h('span', { class: 't-label' }, r.label)),
        r.ok ? null : r.err ? errorBox(r.err) : h('div', { class: 't-detail', html: `${r.kind === 'printed' ? 'Should print' : r.kind && r.kind !== 'returned' ? 'Expected ' + esc(r.kind) : 'Should return'}:\n<b>${esc(r.expected)}</b>\nYours:\n<b>${esc(r.got || '(nothing)')}</b>${r.kind === 'returned' && r.got === 'None' ? '\n→ Your function returned None. Did you forget return (or print instead of return)?' : ''}` }))));
      feedback.replaceChildren(h('div', { class: 'feedback' },
        banner(score, ex.marks, passed === total ? (res.forbidden.length ? `All tests pass, but you used ${res.forbidden.join(', ')} which the question rules out` : 'All tests pass') : `${passed} of ${total} tests pass · ${score}/${ex.marks} marks`),
        res.forbidden.length && passed !== total ? h('p', { class: 'fb-body' }, `Note: the question says not to use ${res.forbidden.join(', ')}.`) : null,
        list,
        passed === total ? markschemeList(ex.markscheme, 'Markscheme: check your answer would earn each point') : null,
        passed === total && ex.explain ? h('div', { class: 'explain', html: ex.explain }) : null));
    };
    const checkBtn = h('button', { class: 'btn primary', onclick: check }, 'Check', h('span', { class: 'kbd' }, `${MOD}↵`));
    // ⌘↵ inside the editor checks the answer (Run stays on its button)
    runner.el.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); e.stopPropagation(); check(); } }, true);
    const hintBtn = (ex.hints && ex.hints.length) ? h('button', { class: 'btn', onclick: () => {
      if (hintsShown >= ex.hints.length) return;
      hintBox.append(h('div', { class: 'hint-box' }, h('span', { class: 'c-label' }, `Hint ${hintsShown + 1}`), h('span', { html: ex.hints[hintsShown] })));
      hintsShown++;
      if (hintsShown >= ex.hints.length) hintBtn.disabled = true;
    } }, 'Hint') : null;
    const solBtn = h('button', { class: 'btn ghost', onclick: () => {
      solBtn.remove();
      extra.append(h('div', { class: 'solution-wrap' },
        h('div', { class: 'muted small' }, 'Model solution (editable: run it to see how it works)'),
        makeRunner(ex.solution, { label: 'Model solution', showStdin: usesStdin, stdin: (ex.tests.find(t => t.stdin) || {}).stdin || '' }).el,
        markschemeList(ex.markscheme)));
    } }, 'Show solution');
    body.append(h('div', { class: 'btn-row ex-actions' }, checkBtn, structBtn, hintBtn, h('span', { class: 'spacer' }), solBtn), structBox, hintBox, extra);
  },

  written({ ex, key, body, feedback, record }) {
    if (ex.code) body.append(codeView(ex.code));
    const ta = h('textarea', { class: 'answer-box', placeholder: 'Write your answer as you would in the exam…', rows: 5 });
    ta.value = Store.draft(key) || '';
    ta.addEventListener('input', () => Store.setDraft(key, ta.value));
    const reveal = () => {
      btn.remove();
      let ticked = new Set();
      const save = h('button', { class: 'btn primary', onclick: () => { record(Math.min(ex.marks, ticked.size)); save.textContent = `Saved ${Math.min(ex.marks, ticked.size)}/${ex.marks}`; } }, 'Save my marks');
      const list = h('ul', { class: 'ms-check' }, ex.markscheme.map((p, i) => {
        const cb = h('input', { type: 'checkbox', onchange: () => { cb.checked ? ticked.add(i) : ticked.delete(i); save.textContent = `Save ${Math.min(ex.marks, ticked.size)}/${ex.marks}`; } });
        return h('li', null, h('label', null, cb, h('span', { html: p })));
      }));
      feedback.replaceChildren(h('div', { class: 'feedback' },
        h('div', { class: 'ms' }, h('h4', null, ex.markscheme.length > ex.marks ? `Markscheme: tick each point you made (any ${ex.marks})` : 'Markscheme: tick each point you made'), list),
        h('div', { class: 'btn-row', style: 'margin-top:12px' }, save),
        h('div', { class: 'model' }, h('div', { class: 'd-label muted small', style: 'font-weight:600;margin-bottom:4px' }, 'Model answer'), h('div', { html: ex.model })),
        ex.explain ? h('div', { class: 'explain', html: ex.explain }) : null));
    };
    const btn = h('button', { class: 'btn primary', onclick: reveal }, 'Mark my answer');
    body.append(ta, h('div', { class: 'btn-row ex-actions' }, btn));
  },
};

window.makeRunner = makeRunner;
window.MOD = MOD;
