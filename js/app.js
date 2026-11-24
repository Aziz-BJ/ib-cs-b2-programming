// Router and views: home, topic (learn / practice), practice paper, flashcards, review.
(() => {
  const topics = window.B2.topics;
  const byId = Object.fromEntries(topics.map(t => [t.id, t]));
  const SECTION_ORDER = ['B2.1 Programming fundamentals', 'B2.2 Data structures', 'B2.3 Programming constructs', 'B2.4 Programming algorithms', 'Exam practice'];
  const sections = SECTION_ORDER.map(name => ({ name, topics: topics.filter(t => t.section === name) })).filter(s => s.topics.length);
  const ordered = sections.flatMap(s => s.topics);
  const main = document.getElementById('main');
  const app = document.querySelector('.app');

  // ---------- progress ----------
  function topicProgress(t) {
    let score = 0, max = 0, done = 0;
    for (const ex of t.exercises) {
      max += ex.marks;
      const r = Store.result(`${t.id}/${ex.id}`);
      if (r) { score += r.score; done++; }
    }
    return { score, max, done, count: t.exercises.length, frac: max ? score / max : 0 };
  }
  function overall() {
    let score = 0, max = 0, done = 0, count = 0;
    for (const t of topics) { const p = topicProgress(t); score += p.score; max += p.max; done += p.done; count += p.count; }
    return { score, max, done, count, frac: max ? score / max : 0 };
  }
  function ring(frac, size = 16, stroke = 2.5) {
    const r = (size - stroke) / 2, c = 2 * Math.PI * r;
    const svg = `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
      <circle class="track" cx="${size / 2}" cy="${size / 2}" r="${r}" style="stroke-width:${stroke}"/>
      <circle class="fill" cx="${size / 2}" cy="${size / 2}" r="${r}" style="stroke-width:${stroke}" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - Math.min(1, frac))}" transform="rotate(-90 ${size / 2} ${size / 2})"/></svg>`;
    const span = h('span', { html: svg });
    return span.firstElementChild;
  }

  // ---------- sidebar ----------
  const sidebar = document.getElementById('sidebar');
  function renderSidebar() {
    const route = location.hash || '#/';
    const navItem = (href, icon, title, extra) => h('a', { class: `nav-item${route === href || (href !== '#/' && route.startsWith(href + '/')) ? ' active' : ''}`, href }, icon, h('span', { class: 'nav-title' }, title), extra);
    const icon = s => h('span', { class: 'nav-icon' }, s);
    sidebar.replaceChildren(
      h('a', { class: 'brand', href: '#/' }, h('span', { class: 'brand-mark' }, 'B2'), h('span', null, h('div', { class: 'brand-name' }, 'Programming'), h('div', { class: 'brand-sub' }, 'IB CS · exam prep'))),
      navItem('#/', icon('⌂'), 'Overview'),
      navItem('#/paper', icon('✎'), 'Practice paper'),
      navItem('#/cards', icon('❏'), 'Flashcards'),
      navItem('#/review', icon('↺'), 'Mistakes to redo', reviewCount() ? h('span', { class: 'muted small' }, String(reviewCount())) : null),
      ...sections.map(s => h('div', { class: 'nav-group' },
        h('div', { class: 'nav-label' }, s.name),
        s.topics.map(t => {
          const active = route.startsWith(`#/t/${t.id}`);
          return h('a', { class: `nav-item${active ? ' active' : ''}`, href: `#/t/${t.id}` },
            h('span', { class: 'nav-code' }, t.code), h('span', { class: 'nav-title' }, t.title), ring(topicProgress(t).frac));
        }))),
      h('div', { class: 'sidebar-foot' }, pyDot = h('span', { class: `dot ${Py.status}` }), pyLabel = h('span', null, statusText(Py.status)), h('span', { class: 'spacer' }),
        h('button', { class: 'tt-link', onclick: () => Tutor.openSettings(() => renderSidebar()), title: 'AI tutor settings' }, Tutor.hasKey ? '✦ Tutor' : '✦ Set up tutor')));
  }
  let pyDot, pyLabel;
  const statusText = s => ({ loading: 'Python is starting…', ready: 'Python ready', error: 'Python failed to load (offline?)' }[s]);
  Py.onStatus(s => { if (pyDot) { pyDot.className = `dot ${s}`; pyLabel.textContent = statusText(s); } });

  function reviewItems() {
    const items = [];
    for (const t of ordered) for (const [i, ex] of t.exercises.entries()) {
      const r = Store.result(`${t.id}/${ex.id}`);
      if (r && r.score < r.max) items.push({ t, ex, i, r });
    }
    return items;
  }
  const reviewCount = () => reviewItems().length;

  // ---------- views ----------
  function page(cls = '') {
    const p = h('div', { class: `page page-enter ${cls}` });
    main.replaceChildren(p);
    window.scrollTo(0, 0);
    return p;
  }

  function viewHome() {
    const p = page();
    const o = overall();
    const last = Store.get('lastTopic') && byId[Store.get('lastTopic')];
    const next = last || ordered.find(t => topicProgress(t).done < t.exercises.length) || ordered[0];
    const big = h('div', { class: 'big-ring' }, ring(o.frac, 96, 7), h('div', { class: 'label' }, `${Math.round(o.frac * 100)}%`));
    p.append(
      h('div', { class: 'eyebrow' }, 'IB Computer Science · B2 Programming'),
      h('h1', null, 'Learn to code it, not just read it.'),
      h('p', { class: 'lede' }, 'Everything on your exam, from data types to binary search. Read a short lesson, run the examples, then answer IB-style questions that check your code for you.'),
      h('div', { class: 'card hero-card' }, big,
        h('div', null,
          h('div', { style: 'font-weight:600;font-size:17px' }, `${o.score} of ${o.max} marks earned`),
          h('div', { class: 'muted small', style: 'margin:2px 0 14px' }, `${o.done} of ${o.count} questions attempted across ${topics.length} topics`),
          next ? h('a', { class: 'btn primary', href: `#/t/${next.id}${Store.isRead(next.id) ? '/practice' : ''}` }, last ? `Continue ${next.code}` : `Start with ${next.code}`, ' →') : null)),
      h('div', { class: 'tiles' },
        tile('#/paper', '✎', 'Practice paper', 'Timed, mixed, exam-style'),
        tile('#/cards', '❏', 'Flashcards', `${(window.B2.flashcards || []).filter(c => c.scope).length} cards for this exam`),
        tile('#/review', '↺', 'Mistakes to redo', reviewCount() ? `${reviewCount()} questions` : 'Nothing yet')),
      ...sections.map(s => h('div', { class: 'section-block' },
        h('div', { class: 'section-head' }, h('h3', null, s.name)),
        h('div', { class: 'topic-list' }, s.topics.map(t => {
          const tp = topicProgress(t);
          return h('a', { class: 'topic-row', href: `#/t/${t.id}` },
            h('span', { class: 'code' }, t.code),
            h('span', null, h('div', { class: 'title' }, t.title), h('div', { class: 'sum' }, t.summary)),
            h('span', { class: 'meta' }, tp.done ? `${tp.score}/${tp.max}` : `${t.minutes || 20} min`),
            ring(tp.frac, 22, 3));
        })))),
      h('p', { class: 'muted small', style: 'margin-top:40px' }, 'Not on this exam: bubble sort, selection sort, recursion and file processing. Your progress is saved in this browser. ',
        h('a', { href: '#/', onclick: e => { e.preventDefault(); if (confirm('Clear all your saved progress and answers?')) { Store.reset(); route(); } } }, 'Reset progress')));
  }
  const tile = (href, icon, title, sub) => h('a', { class: 'tile', href }, h('span', { class: 't-icon' }, icon), h('span', { class: 't-title' }, title), h('span', { class: 't-sub' }, sub));

  function viewTopic(id, mode, qIndex) {
    const t = byId[id];
    if (!t) return viewHome();
    Store.set('lastTopic', id);
    const p = page();
    const idx = ordered.indexOf(t);
    const nextT = ordered[idx + 1];
    p.append(h('div', { class: 'eyebrow' }, t.code), h('h1', null, t.title), h('p', { class: 'lede' }, t.summary));
    const seg = h('div', { class: 'seg', role: 'tablist' },
      h('button', { class: mode === 'learn' ? 'on' : '', role: 'tab', onclick: () => go(`#/t/${id}`) }, 'Learn'),
      h('button', { class: mode === 'practice' ? 'on' : '', role: 'tab', onclick: () => go(`#/t/${id}/practice`) }, `Practice · ${t.exercises.length}`));
    p.append(seg);

    if (mode === 'learn') {
      const L = h('div', { class: 'lesson' });
      for (const [i, b] of t.lesson.entries()) {
        if ('h' in b) L.append(h('h3', null, b.h));
        else if ('p' in b) L.append(h('p', { html: b.p }));
        else if ('list' in b) L.append(h('ul', null, b.list.map(x => h('li', { html: x }))));
        else if ('tip' in b) L.append(h('div', { class: 'callout tip' }, h('span', { class: 'c-label' }, 'Exam tip'), h('span', { html: b.tip })));
        else if ('trap' in b) L.append(h('div', { class: 'callout trap' }, h('span', { class: 'c-label' }, "Don't confuse"), h('span', { html: b.trap })));
        else if ('table' in b) L.append(h('div', { class: 'table-wrap' }, h('table', { class: 't' },
          h('thead', null, h('tr', null, b.table.head.map(c => h('th', { html: c })))),
          h('tbody', null, b.table.rows.map(r => h('tr', null, r.map(c => h('td', { html: c }))))))));
        else if ('code' in b) L.append(makeRunner(b.code, { stdin: b.stdin || '', label: 'Try it: edit and run', storeKey: `lesson:${t.id}/${i}` }).el);
      }
      L.append(h('div', { class: 'must' }, h('h3', null, 'What you must know'), h('ul', null, t.mustKnow.map(m => h('li', { html: m })))));
      L.append(h('div', { class: 'lesson-end' }, h('button', { class: 'btn primary lg', onclick: () => { Store.markRead(t.id); go(`#/t/${id}/practice`); } }, `Practice ${t.exercises.length} questions →`)));
      p.append(L);
      return;
    }

    // practice: one question at a time
    const n = t.exercises.length;
    let i = Math.max(0, Math.min(n - 1, qIndex || 0));
    const pager = h('div', { class: 'pager', role: 'navigation', 'aria-label': 'Questions' });
    const holder = h('div');
    const nav = h('div', { class: 'practice-nav' });
    p.append(pager, holder, nav);
    const pillClass = (ex, j) => {
      const r = Store.result(`${t.id}/${ex.id}`);
      return `pill${j === i ? ' cur' : ''}${r ? ' ' + (r.score >= r.max ? 'full' : r.score > 0 ? 'part' : 'zero') : ''}`;
    };
    const drawPager = () => pager.replaceChildren(...t.exercises.map((ex, j) =>
      h('button', { class: pillClass(ex, j), onclick: () => show(j), 'aria-label': `Question ${j + 1}`, 'aria-current': j === i ? 'step' : null }, String(j + 1))));
    const show = (j) => {
      i = j;
      history.replaceState(null, '', `#/t/${id}/practice/${j + 1}`);
      drawPager();
      const card = renderExercise(t.exercises[j], t, { number: j + 1, onResult: drawPager });
      card.classList.add('page-enter');
      holder.replaceChildren(card);
      const isLast = j === n - 1;
      nav.replaceChildren(
        h('button', { class: 'btn', onclick: () => show(j - 1), disabled: j === 0 }, '← Previous'),
        h('span', { class: 'spacer' }),
        h('span', { class: 'muted small' }, `${j + 1} of ${n}`),
        h('span', { class: 'spacer' }),
        isLast
          ? (nextT ? h('a', { class: 'btn primary', href: `#/t/${nextT.id}` }, `Next: ${nextT.code} ${nextT.title} →`) : h('a', { class: 'btn primary', href: '#/paper' }, 'Try a practice paper →'))
          : h('button', { class: 'btn primary', onclick: () => show(j + 1) }, 'Next →'));
      if (j !== qIndex) holder.scrollIntoView({ block: 'nearest' });
      requestAnimationFrame(() => card.querySelectorAll('.CodeMirror').forEach(c => c.CodeMirror && c.CodeMirror.refresh()));
    };
    show(i);
    practiceKeys = e => {
      if (e.target.closest('input, textarea, .CodeMirror, button') || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'ArrowRight' && i < n - 1) show(i + 1);
      if (e.key === 'ArrowLeft' && i > 0) show(i - 1);
    };
  }
  let practiceKeys = null;
  document.addEventListener('keydown', e => practiceKeys && practiceKeys(e));

  // ---------- practice paper ----------
  let paperState = null;
  function viewPaper() {
    if (paperState && paperState.active) return drawPaper();
    const p = page();
    let target = Store.get('paperMarks') || 30;
    const chosen = new Set(Store.get('paperSections') || sections.map(s => s.name));
    p.append(h('div', { class: 'eyebrow' }, 'Exam practice'), h('h1', null, 'Practice paper'),
      h('p', { class: 'lede' }, 'A mixed set of exam-style questions with a clock running. Aim for about a mark a minute. Questions you\'ve dropped marks on are picked more often.'));
    const choices = h('div', { class: 'choice-grid' });
    const opts = [[15, '15 marks', '≈ 18 minutes'], [30, '30 marks', '≈ 35 minutes'], [50, '50 marks', '≈ 1 hour']];
    const drawChoices = () => choices.replaceChildren(...opts.map(([m, a, b]) => h('button', { class: `choice${m === target ? ' on' : ''}`, onclick: () => { target = m; drawChoices(); } }, h('span', { class: 'c-big' }, a), h('span', { class: 'c-sub' }, b))));
    drawChoices();
    const checks = h('div', { class: 'checks' }, sections.map(s => {
      const cb = h('input', { type: 'checkbox', checked: chosen.has(s.name), onchange: () => { cb.checked ? chosen.add(s.name) : chosen.delete(s.name); } });
      return h('label', null, cb, s.name, h('span', { class: 'spacer' }), h('span', { class: 'muted small' }, `${s.topics.reduce((n, t) => n + t.exercises.length, 0)} questions`));
    }));
    p.append(h('h3', null, 'Length'), choices, h('h3', null, 'Include'), checks,
      h('button', { class: 'btn primary lg', onclick: () => {
        if (!chosen.size) return;
        Store.set('paperMarks', target); Store.set('paperSections', [...chosen]);
        paperState = { active: true, items: buildPaper(target, chosen), start: Date.now(), scores: {}, minutes: Math.round(target * 1.15) };
        drawPaper();
      } }, 'Start paper'));
  }
  function buildPaper(target, chosen) {
    const pool = [];
    for (const t of topics) if (chosen.has(t.section)) for (const ex of t.exercises) {
      const r = Store.result(`${t.id}/${ex.id}`);
      let w = ex.type === 'mcq' ? 0.5 : ex.type === 'code' ? 1.6 : 1;
      if (!r) w *= 1.4; else if (r.score < r.max) w *= 2; else w *= 0.35;
      pool.push({ t, ex, w });
    }
    const picked = [];
    let marks = 0;
    while (pool.length && marks < target) {
      const total = pool.reduce((s, x) => s + x.w, 0);
      let x = Math.random() * total, k = 0;
      while (k < pool.length - 1 && (x -= pool[k].w) > 0) k++;
      const [item] = pool.splice(k, 1);
      if (marks + item.ex.marks > target + 3) continue;
      picked.push(item);
      marks += item.ex.marks;
    }
    const order = ordered.map(t => t.id);
    picked.sort((a, b) => order.indexOf(a.t.id) - order.indexOf(b.t.id));
    return picked;
  }
  let timerHandle = null;
  function drawPaper() {
    const st = paperState;
    const p = page();
    const max = st.items.reduce((s, x) => s + x.ex.marks, 0);
    const timer = h('span', { class: 'timer' });
    const tally = h('span', { class: 'tally' });
    const updTally = () => {
      const got = Object.values(st.scores).reduce((s, x) => s + x, 0);
      tally.textContent = `${got} / ${max} marks · ${Object.keys(st.scores).length}/${st.items.length} answered`;
    };
    const tick = () => {
      const s = Math.floor((Date.now() - st.start) / 1000);
      timer.textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
      timer.style.color = s > st.minutes * 60 ? 'var(--bad)' : '';
    };
    clearInterval(timerHandle);
    timerHandle = setInterval(tick, 1000);
    tick(); updTally();
    p.append(h('div', { class: 'paper-bar' }, timer, h('span', { class: 'muted small' }, `of ~${st.minutes} min`), h('span', { class: 'spacer' }), tally,
      h('button', { class: 'btn', onclick: () => { if (confirm('End this paper? Your marks so far are saved.')) { paperState.active = false; clearInterval(timerHandle); finishPaper(max); } } }, 'Finish')));
    p.append(h('h1', null, 'Practice paper'), h('p', { class: 'lede' }, `${st.items.length} questions · ${max} marks. Answer in any order; check each one as you go.`));
    st.items.forEach(({ t, ex }, j) => {
      p.append(renderExercise(ex, t, { number: j + 1, fromTopic: true, onResult: (s) => { st.scores[j] = s; updTally(); } }));
    });
    p.append(h('div', { class: 'btn-row' }, h('span', { class: 'spacer' }), h('button', { class: 'btn primary lg', onclick: () => { paperState.active = false; clearInterval(timerHandle); finishPaper(max); } }, 'Finish paper')));
  }
  function finishPaper(max) {
    const st = paperState;
    const got = Object.values(st.scores).reduce((s, x) => s + x, 0);
    const mins = Math.round((Date.now() - st.start) / 60000);
    const p = page();
    const weak = {};
    st.items.forEach(({ t, ex }, j) => { const s = st.scores[j] ?? 0; if (s < ex.marks) weak[t.id] = (weak[t.id] || 0) + (ex.marks - s); });
    const weakList = Object.entries(weak).sort((a, b) => b[1] - a[1]).slice(0, 4);
    p.append(h('div', { class: 'card done-card' },
      h('div', { class: 'muted' }, 'Paper complete'),
      h('div', { class: 'big' }, `${got} / ${max}`),
      h('div', { class: 'muted' }, `${Math.round(100 * got / Math.max(1, max))}% in ${mins} minute${mins === 1 ? '' : 's'}`)));
    if (weakList.length) p.append(h('h3', null, 'Where you dropped the most marks'), h('div', { class: 'topic-list' }, weakList.map(([id, lost]) =>
      h('a', { class: 'topic-row', href: `#/t/${id}` }, h('span', { class: 'code' }, byId[id].code), h('span', null, h('div', { class: 'title' }, byId[id].title)), h('span', { class: 'meta' }, `−${lost} marks`), h('span', { class: 'chev' }, '›')))));
    p.append(h('div', { class: 'btn-row', style: 'margin-top:24px' }, h('a', { class: 'btn primary', href: '#/paper' }, 'New paper'), h('a', { class: 'btn', href: '#/review' }, 'Redo mistakes')));
  }

  // ---------- flashcards (styled after IB_CS_HL_Flashcards.pdf) ----------
  const CARDS = window.B2.flashcards || [];
  const CARD_SECTIONS = window.B2.sections || [];
  function fcCard(c, { open = true, onToggle } = {}) {
    const body = h('div', { class: 'fc-body' },
      h('div', { class: 'fc-answer' }, c.a),
      c.code ? h('pre', { class: 'fc-code' }, c.code) : null,
      c.output ? h('div', { class: 'fc-out-label' }, 'Output') : null,
      c.output ? h('pre', { class: 'fc-out' }, c.output) : null);
    const card = h('article', { class: `fc${open ? ' open' : ''}${c.scope ? '' : ' beyond'}` },
      h('header', { class: 'fc-head', onclick: () => onToggle && onToggle() },
        h('span', { class: 'fc-num' }, `#${c.n}`), h('span', { class: 'fc-q' }, c.q),
        c.scope ? null : h('span', { class: 'fc-tag' }, 'Not on this exam')),
      h('div', { class: 'fc-reveal' }, body));
    return card;
  }
  function viewCards(filter = Store.get('cardFilter') || 'scope', mode = Store.get('cardMode') || 'study') {
    Store.set('cardFilter', filter); Store.set('cardMode', mode);
    const p = page();
    const pick = c => filter === 'all' ? true : filter === 'scope' ? c.scope : c.section === filter;
    const pool = CARDS.filter(pick);
    p.append(h('div', { class: 'eyebrow' }, 'IB Computer Science HL'), h('h1', null, 'Flashcards'),
      h('p', { class: 'lede' }, 'Read the question, answer it out loud, then reveal. Code cards show the program and its exact output.'));
    const sel = h('select', { class: 'btn', style: 'padding-right:28px', onchange: () => viewCards(sel.value, mode) },
      h('option', { value: 'scope', selected: filter === 'scope' }, `Exam scope (${CARDS.filter(c => c.scope).length})`),
      CARD_SECTIONS.map(s => h('option', { value: s, selected: s === filter }, `${s} (${CARDS.filter(c => c.section === s).length})`)),
      h('option', { value: 'all', selected: filter === 'all' }, `All cards (${CARDS.length})`));
    const seg = h('div', { class: 'seg', style: 'margin:0' },
      h('button', { class: mode === 'study' ? 'on' : '', onclick: () => viewCards(filter, 'study') }, 'Study'),
      h('button', { class: mode === 'browse' ? 'on' : '', onclick: () => viewCards(filter, 'browse') }, 'Browse'));
    p.append(h('div', { class: 'btn-row', style: 'margin-bottom:20px' }, sel, h('span', { class: 'spacer' }), seg));

    if (mode === 'browse') {
      let lastSection = null;
      for (const c of pool) {
        if (c.section !== lastSection) { p.append(h('div', { class: 'fc-banner' }, c.section)); lastSection = c.section; }
        const card = fcCard(c, { open: false, onToggle: () => card.classList.toggle('open') });
        p.append(card);
      }
      p.append(h('p', { class: 'muted small', style: 'text-align:center;margin-top:24px' }, 'Click a question to show its answer.'));
      return;
    }

    let deck = pool.slice().sort(() => Math.random() - 0.5);
    const total = deck.length;
    let known = 0, revealed = false;
    const count = h('span', { class: 'muted small' });
    const bar = h('div');
    const stage = h('div', { class: 'fc-stage' });
    const actions = h('div', { class: 'flash-actions' });
    p.append(h('div', { class: 'btn-row' }, h('span', { class: 'muted small', id: 'fc-section' }), h('span', { class: 'spacer' }), count),
      h('div', { class: 'progress-line', style: 'margin-bottom:20px' }, bar), stage, actions,
      h('p', { class: 'muted small', style: 'text-align:center;margin-top:18px' }, h('kbd', null, 'Space'), ' reveal · ', h('kbd', null, '1'), ' again · ', h('kbd', null, '2'), ' got it'));
    const draw = () => {
      count.textContent = `${known} of ${total} known`;
      bar.style.width = `${total ? 100 * known / total : 0}%`;
      if (!deck.length) {
        stage.replaceChildren(h('div', { class: 'card done-card' }, h('div', { class: 'big' }, 'Done'), h('div', { class: 'muted' }, `All ${total} cards reviewed.`)));
        actions.replaceChildren(h('button', { class: 'btn primary', onclick: () => viewCards(filter, mode) }, 'Shuffle and restart'));
        cardKeys = null;
        return;
      }
      const c = deck[0];
      revealed = false;
      document.getElementById('fc-section').textContent = c.section;
      const card = fcCard(c, { open: false, onToggle: reveal });
      card.classList.add('page-enter', 'study');
      stage.replaceChildren(card);
      actions.replaceChildren(h('button', { class: 'btn primary lg', onclick: reveal }, 'Reveal answer'));
    };
    const reveal = () => {
      if (revealed || !deck.length) return;
      revealed = true;
      stage.querySelector('.fc').classList.add('open');
      actions.replaceChildren(
        h('button', { class: 'btn lg', onclick: again }, 'Again'),
        h('button', { class: 'btn primary lg', onclick: got }, 'Got it'));
    };
    const again = () => { const c = deck.shift(); deck.splice(Math.min(deck.length, 3 + Math.floor(Math.random() * 4)), 0, c); draw(); };
    const got = () => { deck.shift(); known++; draw(); };
    cardKeys = e => {
      if (e.target.closest('select, input, textarea')) return;
      if (e.key === ' ') { e.preventDefault(); revealed ? null : reveal(); }
      if (revealed && e.key === '1') again();
      if (revealed && e.key === '2') got();
    };
    draw();
  }
  let cardKeys = null;
  document.addEventListener('keydown', e => cardKeys && cardKeys(e));

  // ---------- review ----------
  function viewReview() {
    const p = page();
    const items = reviewItems();
    p.append(h('div', { class: 'eyebrow' }, 'Review'), h('h1', null, 'Mistakes to redo'),
      h('p', { class: 'lede' }, 'Every question where you dropped marks. Redo them until they leave this list: that\'s the fastest way to close gaps.'));
    if (!items.length) { p.append(h('div', { class: 'card empty' }, 'Nothing here yet. Questions you lose marks on will appear here.')); return; }
    const groups = {};
    for (const it of items) (groups[it.t.id] = groups[it.t.id] || []).push(it);
    for (const [id, list] of Object.entries(groups)) {
      const t = byId[id];
      p.append(h('div', { class: 'section-block' },
        h('div', { class: 'section-head' }, h('h3', null, `${t.code} ${t.title}`)),
        h('div', { class: 'topic-list' }, list.map(({ ex, i, r }) => {
          const tmp = h('div', { html: ex.q });
          return h('a', { class: 'review-item', href: `#/t/${id}/practice/${i + 1}` },
            h('span', { class: `score ${r.score > 0 ? 'part' : 'zero'}`, style: 'font:600 12px/1 var(--mono);padding:5px 7px;border-radius:6px' }, `${r.score}/${r.max}`),
            h('span', { class: 'q' }, tmp.textContent), h('span', { class: 'chev' }, '›'));
        }))));
    }
  }

  // ---------- router ----------
  const go = hash => { location.hash = hash; };
  function route() {
    practiceKeys = null; cardKeys = null;
    clearInterval(timerHandle);
    app.classList.remove('nav-open');
    const parts = (location.hash || '#/').slice(2).split('/');
    if (parts[0] === 't') viewTopic(parts[1], parts[2] === 'practice' ? 'practice' : 'learn', parts[3] ? parseInt(parts[3], 10) - 1 : 0);
    else if (parts[0] === 'paper') viewPaper();
    else if (parts[0] === 'cards') viewCards();
    else if (parts[0] === 'review') viewReview();
    else viewHome();
    renderSidebar();
    const t = parts[0] === 't' && byId[parts[1]];
    document.getElementById('topbar-title').textContent = t ? `${t.code} ${t.title}` : 'B2 Programming';
    document.title = t ? `${t.code} ${t.title} · B2 Programming` : 'B2 Programming';
  }
  window.addEventListener('hashchange', route);
  document.addEventListener('progress', () => {
    // refresh sidebar rings without rebuilding the page
    const route = location.hash;
    if (route) renderSidebar();
  });
  document.getElementById('menu-btn').addEventListener('click', () => app.classList.toggle('nav-open'));
  document.querySelector('.scrim').addEventListener('click', () => app.classList.remove('nav-open'));
  if (!topics.length) {
    main.replaceChildren(h('div', { class: 'page' }, h('h1', null, 'No content loaded'), h('p', { class: 'lede' }, 'The content files in content/ did not load.')));
    return;
  }
  route();
})();
