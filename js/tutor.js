// Per-question AI tutor via OpenRouter. The API key is pasted by the student into the
// settings dialog and kept only in this browser's localStorage; it is sent only to openrouter.ai.
window.Tutor = (() => {
  const KEY = 'b2-tutor';
  const DEFAULT_MODEL = 'deepseek/deepseek-v4.1-flash';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  let cfg = load();
  const save = () => localStorage.setItem(KEY, JSON.stringify(cfg));
  const model = () => cfg.model || DEFAULT_MODEL;

  const SYSTEM = `You are a concise IB Computer Science tutor inside a Python exam-practice website for a student with an exam in a few days.
Rules:
- Answer in at most 3 short sentences. A tiny code snippet (max 4 lines) only if it is clearly the fastest way to explain.
- Plain, direct language. Use IB terminology where it helps (e.g. initialise, iterate, index, LIFO).
- Default to a hint or to pointing at the exact mistake (line, variable, condition). Do NOT give the full solution or the full answer unless the student explicitly asks for it.
- When the student's answer is wrong, name the single most important problem first.
- Python only. Formatting: \`inline code\` and short \`\`\` blocks only; no headings, no bullet lists longer than 3 items.
- The REFERENCE section is private: use it to judge correctness, never quote it unless the student asks for the answer.`;

  // ---------- context ----------
  const text = el => (el ? el.innerText.trim() : '');
  const clip = (s, n = 2500) => (s.length > n ? s.slice(0, n) + '\n…' : s);
  function snapshot(card, ex, topic) {
    const parts = [`TOPIC: ${topic.code} ${topic.title}`, `QUESTION TYPE: ${ex.type} [${ex.marks} marks]`];
    const ctx = text(card.querySelector('.ex-context'));
    if (ctx) parts.push(`SCENARIO:\n${ctx}`);
    parts.push(`QUESTION:\n${text(card.querySelector('.ex-q'))}`);
    const editors = [...card.querySelectorAll('.ex-body .CodeMirror')].map(c => c.CodeMirror.getValue());
    if (ex.type === 'code') {
      parts.push(`STUDENT'S CURRENT CODE:\n\`\`\`python\n${clip(editors[0] || '')}\n\`\`\``);
    } else {
      if (ex.code) parts.push(`CODE IN THE QUESTION:\n\`\`\`python\n${ex.code}\n\`\`\``);
      if (ex.stdin) parts.push(`INPUT GIVEN: ${JSON.stringify(ex.stdin)}`);
    }
    if (ex.type === 'mcq') parts.push('OPTIONS:\n' + ex.options.map((o, i) => `${'ABCDEFG'[i]}. ${o.replace(/<[^>]+>/g, '')}`).join('\n'));
    const ans = card.querySelector('.ex-body .answer-box');
    if (ans) parts.push(`STUDENT'S ANSWER:\n${ans.value.trim() || '(empty)'}`);
    const trace = card.querySelector('.ex-body .trace table');
    if (trace) {
      const rows = [...trace.rows].map(tr => [...tr.cells].map(td => {
        const inp = td.querySelector('input');
        return inp ? (inp.value.trim() || '_') : td.innerText.trim();
      }).join(' | '));
      parts.push(`STUDENT'S TRACE TABLE (_ = blank):\n${rows.join('\n')}`);
    }
    const picked = card.querySelector('.opt.wrong, .opt.right');
    if (ex.type === 'mcq' && picked) {
      const wrong = card.querySelector('.opt.wrong');
      parts.push(`STUDENT PICKED: ${wrong ? wrong.querySelector('.letter').textContent : 'the correct option'}`);
    }
    const fb = text(card.querySelector('.ex-fb .feedback'));
    if (fb) parts.push(`LAST FEEDBACK SHOWN TO STUDENT:\n${clip(fb, 1500)}`);
    const ref = [];
    if (ex.type === 'mcq') ref.push(`Correct option: ${'ABCDEFG'[ex.answer]}`);
    if (ex.type === 'trace') ref.push('Correct table:\n' + [ex.columns, ...ex.rows].map(r => r.join(' | ')).join('\n'));
    if (ex.solution) ref.push(`Model solution:\n\`\`\`python\n${ex.solution}\n\`\`\``);
    if (ex.markscheme) ref.push('Markscheme:\n- ' + ex.markscheme.map(m => m.replace(/<[^>]+>/g, '')).join('\n- '));
    if (ex.model) ref.push('Model answer: ' + ex.model.replace(/<[^>]+>/g, ''));
    if (ex.explain) ref.push('Explanation: ' + ex.explain.replace(/<[^>]+>/g, ''));
    if (ref.length) parts.push(`REFERENCE (private):\n${ref.join('\n')}`);
    return parts.join('\n\n');
  }

  // ---------- markdown-lite ----------
  function render(md) {
    const blocks = md.split(/```(?:python|py)?\n?/);
    return blocks.map((b, i) => {
      const e = esc(b);
      if (i % 2) return `<pre><code>${e.replace(/\n$/, '')}</code></pre>`;
      return e.replace(/`([^`\n]+)`/g, '<code>$1</code>').replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
    }).join('');
  }

  // ---------- API ----------
  async function stream(messages, onDelta, signal) {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      signal,
      headers: {
        Authorization: `Bearer ${cfg.key}`,
        'Content-Type': 'application/json',
        'X-Title': 'B2 Programming study',
      },
      body: JSON.stringify({ model: model(), messages, stream: true, max_tokens: 350, temperature: 0.3 }),
    });
    if (!res.ok) {
      let msg = '';
      try { msg = (await res.json()).error?.message || ''; } catch {}
      const friendly = {
        401: 'OpenRouter rejected the API key. Check it in Tutor settings.',
        402: 'Your OpenRouter account is out of credit.',
        429: 'Too many requests. Wait a few seconds and try again.',
      }[res.status];
      throw new Error(friendly || `OpenRouter error ${res.status}${msg ? ': ' + msg : ''}`);
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let nl;
      while ((nl = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, nl).trim();
        buf = buf.slice(nl + 1);
        if (!line.startsWith('data:')) continue;
        const data = line.slice(5).trim();
        if (data === '[DONE]') return;
        try {
          const j = JSON.parse(data);
          if (j.error) throw new Error(j.error.message || 'OpenRouter error');
          const d = j.choices?.[0]?.delta?.content;
          if (d) onDelta(d);
        } catch (e) { if (e.message && !e.message.startsWith('Unexpected')) throw e; }
      }
    }
  }

  // ---------- settings dialog ----------
  let dialog;
  function openSettings(onSaved) {
    dialog?.remove();
    const keyIn = h('input', { type: 'password', class: 'tt-input', placeholder: 'sk-or-v1-…', autocomplete: 'off', spellcheck: 'false' });
    keyIn.value = cfg.key || '';
    const modelIn = h('input', { type: 'text', class: 'tt-input', spellcheck: 'false' });
    modelIn.value = model();
    const status = h('div', { class: 'muted small', style: 'min-height:18px' });
    dialog = h('dialog', { class: 'tt-dialog' },
      h('h3', { style: 'margin:0 0 4px' }, 'AI tutor'),
      h('p', { class: 'muted small', style: 'margin:0 0 16px' }, 'Paste your OpenRouter API key. It\'s stored only in this browser and sent only to openrouter.ai. ',
        h('a', { href: 'https://openrouter.ai/keys', target: '_blank', rel: 'noopener' }, 'Get a key')),
      h('label', { class: 'tt-label' }, 'API key', keyIn),
      h('label', { class: 'tt-label' }, 'Model', modelIn),
      status,
      h('div', { class: 'btn-row', style: 'margin-top:14px' },
        cfg.key ? h('button', { class: 'btn ghost', style: 'color:var(--bad)', onclick: () => { delete cfg.key; save(); dialog.close(); refreshAll(); } }, 'Remove key') : null,
        h('span', { class: 'spacer' }),
        h('button', { class: 'btn', onclick: () => dialog.close() }, 'Cancel'),
        h('button', { class: 'btn primary', onclick: () => {
          const k = keyIn.value.trim();
          if (!k) { status.textContent = 'Paste a key first.'; return; }
          cfg.key = k;
          cfg.model = modelIn.value.trim() || DEFAULT_MODEL;
          save();
          dialog.close();
          refreshAll();
          onSaved && onSaved();
        } }, 'Save')));
    document.body.append(dialog);
    dialog.addEventListener('close', () => dialog.remove());
    dialog.showModal();
    keyIn.focus();
  }
  const panels = new Set();
  const refreshAll = () => panels.forEach(p => p.isConnected ? p.refresh() : panels.delete(p));

  // ---------- per-question panel ----------
  const CHIPS = [
    ['What is this asking?', 'Explain in plain words what this question is asking me to do. No answer.'],
    ['Hint', 'Give me one small hint for the next step. No answer.'],
    ['Why is mine wrong?', 'Look at my current answer and tell me the single most important thing that is wrong or missing.'],
    ['Explain the answer', 'Show me the answer and explain it briefly.'],
  ];

  function attach(card, ex, topic) {
    const head = card.querySelector('.ex-head');
    const btn = h('button', { class: 'tt-ask', title: 'Ask the AI tutor about this question', 'aria-expanded': 'false' }, '✦ Ask');
    head.insertBefore(btn, head.querySelector('.marks'));
    let panel = null;
    const history = [];
    let controller = null;

    btn.addEventListener('click', () => {
      if (panel) { panel.remove(); panel = null; btn.setAttribute('aria-expanded', 'false'); return; }
      btn.setAttribute('aria-expanded', 'true');
      panel = h('div', { class: 'tt-panel' });
      card.append(panel);
      panel.refresh = draw;
      panels.add(panel);
      draw();
    });

    function draw() {
      if (!panel) return;
      panel.replaceChildren();
      if (!cfg.key) {
        panel.append(h('div', { class: 'tt-setup' },
          h('span', null, 'Add your OpenRouter API key to use the tutor.'),
          h('button', { class: 'btn primary', onclick: () => openSettings() }, 'Add key')));
        return;
      }
      const log = h('div', { class: 'tt-log', 'aria-live': 'polite' });
      for (const m of history) log.append(bubble(m.role, m.content));
      const chips = h('div', { class: 'tt-chips' }, CHIPS.map(([label, prompt]) => h('button', { class: 'tt-chip', onclick: () => send(prompt, label) }, label)));
      const input = h('input', { type: 'text', class: 'tt-input', placeholder: 'Ask anything about this question…', enterkeyhint: 'send' });
      input.addEventListener('keydown', e => { if (e.key === 'Enter' && input.value.trim()) { send(input.value.trim()); input.value = ''; } });
      const sendBtn = h('button', { class: 'btn primary', onclick: () => { if (input.value.trim()) { send(input.value.trim()); input.value = ''; } } }, 'Send');
      panel.append(
        h('div', { class: 'tt-top' }, h('span', { class: 'tt-title' }, '✦ Tutor'), h('span', { class: 'muted small' }, model().split('/').pop()),
          h('span', { class: 'spacer' }), h('button', { class: 'tt-link', onclick: () => openSettings() }, 'Settings')),
        log, chips, h('div', { class: 'tt-row' }, input, sendBtn));
      panel.log = log;
      panel.input = input;
      log.scrollTop = log.scrollHeight;
    }

    function bubble(role, content) {
      const b = h('div', { class: `tt-msg ${role}` });
      if (role === 'assistant') b.innerHTML = render(content);
      else b.textContent = content;
      return b;
    }

    async function send(prompt, shown) {
      controller?.abort();
      controller = new AbortController();
      const userMsg = { role: 'user', content: shown || prompt, prompt };
      history.push(userMsg);
      panel.log.append(bubble('user', userMsg.content));
      const out = bubble('assistant', '');
      out.classList.add('pending');
      out.innerHTML = '<span class="tt-dots"><i></i><i></i><i></i></span>';
      panel.log.append(out);
      panel.log.scrollTop = panel.log.scrollHeight;
      // Fresh snapshot each time so the tutor sees the latest code/answer/feedback.
      const messages = [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: snapshot(card, ex, topic) },
        { role: 'assistant', content: 'Got it. What would you like help with?' },
        ...history.slice(0, -1).map(m => ({ role: m.role, content: m.prompt || m.content })),
        { role: 'user', content: prompt },
      ];
      let acc = '';
      try {
        await stream(messages, d => {
          acc += d;
          out.classList.remove('pending');
          out.innerHTML = render(acc);
          panel && (panel.log.scrollTop = panel.log.scrollHeight);
        }, controller.signal);
        if (!acc) throw new Error('The model returned an empty reply. Try again or pick another model in Settings.');
        history.push({ role: 'assistant', content: acc });
      } catch (e) {
        if (e.name === 'AbortError') return;
        history.pop();
        out.classList.remove('pending');
        out.classList.add('error');
        out.textContent = e.message === 'Failed to fetch' ? 'Couldn\'t reach OpenRouter. Check your internet connection.' : e.message;
      }
    }
  }

  return { attach, openSettings, get hasKey() { return !!cfg.key; } };
})();
