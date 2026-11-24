// Turns a model solution into its "shape": each line keeps its keyword and indentation,
// expressions become ___, and each line is labelled with its job (initialise, loop, ...).
// Teaches how an answer is structured without giving the answer away.
window.Structure = (() => {
  // Strip a trailing comment, ignoring # inside quotes.
  function stripComment(line) {
    let q = null;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (q) { if (c === '\\') i++; else if (c === q) q = null; }
      else if (c === '"' || c === "'") q = c;
      else if (c === '#') return line.slice(0, i).replace(/\s+$/, '');
    }
    return line.replace(/\s+$/, '');
  }

  const ROLE = {
    header: 'Header',
    init: 'Initialise',
    input: 'Input',
    loop: 'Loop',
    decide: 'Decision',
    update: 'Update',
    after: 'After the loop',
    ret: 'Return',
    out: 'Output',
    exit: 'Exit early',
    error: 'Error handling',
    other: 'Step',
  };

  function analyse(src) {
    const rows = [];
    const stack = []; // open blocks: { indent, kind }
    let loopSeen = false;
    const all = src.replace(/\t/g, '    ').split('\n');
    const hasDef = all.some(l => /^\s*def\s/.test(l));
    // Is there a loop later in the current function (or program, if no functions)?
    const loopAhead = from => {
      for (let k = from + 1; k < all.length; k++) {
        if (/^def\s/.test(all[k])) return false;
        if (/^\s*(for|while)\b/.test(all[k])) return true;
      }
      return false;
    };
    for (const [li, raw] of all.entries()) {
      const code = stripComment(raw);
      const t = code.trim();
      if (!t) continue;
      const indent = code.match(/^ */)[0].length;
      while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
      const inLoop = stack.some(b => b.kind === 'loop');
      let shape = t, kind = 'other', note = '', opens = null, m;

      if ((m = t.match(/^def\s+(\w+)\s*\((.*)\)\s*:$/))) {
        kind = 'header'; opens = 'def'; loopSeen = false;
        note = 'Copy the name and parameters exactly from the question.';
      } else if ((m = t.match(/^for\s+(.+?)\s+in\s+(.+):$/))) {
        kind = 'loop'; opens = 'loop'; loopSeen = true;
        shape = `for ___ in ___:`;
        note = inLoop ? 'Inner loop: runs fully for every pass of the outer loop.' : /range\s*\(\s*len/.test(m[2]) ? 'Count-controlled loop over the indices.' : /range/.test(m[2]) ? 'Count-controlled loop: a fixed number of passes.' : 'Visit every item.';
      } else if (/^while\b/.test(t)) {
        kind = 'loop'; opens = 'loop'; loopSeen = true;
        shape = t === 'while True:' ? 'while True:' : 'while ___:';
        note = t === 'while True:' ? 'Repeat until a break (post-condition loop).' : 'Repeat while the condition is True; something inside must change it.';
      } else if (/^if\b/.test(t)) {
        kind = 'decide'; opens = 'if'; shape = 'if ___:';
        note = inLoop ? 'Test the current item / pass.' : 'Choose a path.';
      } else if (/^elif\b/.test(t)) {
        kind = 'decide'; opens = 'if'; shape = 'elif ___:'; note = 'Next test, only if the ones above were False.';
      } else if (t === 'else:') {
        kind = 'decide'; opens = 'if'; note = 'Otherwise.';
      } else if (t === 'try:') {
        kind = 'error'; opens = 'try'; note = 'Put only the code that might fail here.';
      } else if (/^except\b/.test(t)) {
        kind = 'error'; opens = 'try'; note = 'Catch that specific error and respond.';
      } else if (t === 'finally:') {
        kind = 'error'; opens = 'try'; note = 'Runs whether or not there was an error.';
      } else if (/^return\b/.test(t)) {
        kind = 'ret'; shape = t === 'return' ? 'return' : 'return ___';
        note = inLoop ? 'Inside the loop: stops as soon as the answer is found.' : loopSeen ? 'After the loop (not inside it), so every item was checked first.' : 'Send the result back to the caller.';
      } else if (/^print\s*\(/.test(t)) {
        kind = 'out'; shape = 'print(___)';
        note = inLoop ? 'Inside the loop: prints once per pass.' : 'Show the result.';
      } else if (t === 'break') {
        kind = 'exit'; note = 'Leave the loop now.';
      } else if (t === 'continue' || t === 'pass') {
        kind = 'other';
      } else if (/^global\b/.test(t)) {
        kind = 'other'; note = 'Lets this function change the global variable.';
      } else if (/^(import|from)\b/.test(t)) {
        kind = 'other'; note = 'Import before using it.';
      } else if ((m = t.match(/^([A-Za-z_][\w\[\]\.\s,+\-*]*?)\s*(\+=|-=|\*=|\/=|\/\/=|%=|=)(?!=)\s*(.+)$/))) {
        const target = m[1].trim(), op = m[2], rhs = m[3];
        if (/\binput\s*\(/.test(rhs)) {
          kind = 'input';
          shape = `${target} = ${/^(int|float)\s*\(/.test(rhs) ? rhs.match(/^(int|float)/)[1] + '(input())' : 'input()'}`;
          note = inLoop ? 'Read the next value: this is what changes the loop condition.' : /^(int|float)/.test(rhs) ? 'input() gives a string: convert it.' : 'Read a line of input.';
        } else {
          shape = `${target} ${op} ___`;
          if (/,/.test(target)) {
            const vars = target.split(',').map(v => v.trim());
            const swap = vars.length === 2 && rhs.replace(/\s/g, '') === `${vars[1]},${vars[0]}`.replace(/\s/g, '');
            kind = inLoop ? 'update' : loopSeen ? 'after' : 'init';
            note = swap ? 'Swap the two values in one step.' : 'Set several variables at once.';
          } else if (inLoop) {
            kind = 'update';
            note = /\[/.test(target) ? 'Change one element.' : op !== '=' ? `Accumulate into ${target}.` : `Change ${target} for the next step.`;
          } else if (stack.some(b => b.kind === 'if' || b.kind === 'try')) {
            kind = 'update'; note = /\[/.test(target) ? 'Change one element.' : `Change ${target}.`;
          } else if (loopSeen) {
            kind = 'after'; note = 'Uses the values the loop built up.';
          } else if (hasDef && !stack.some(b => b.kind === 'def')) {
            kind = 'init'; note = 'Global: set once at the top of the program.';
          } else {
            kind = 'init'; note = loopAhead(li) ? 'Before the loop, so it starts fresh.' : 'Set the starting value.';
          }
        }
      } else if ((m = t.match(/^([\w\.\[\]]+)\s*\(/))) {
        kind = inLoop ? 'update' : 'other';
        shape = `${m[1]}(___)`;
        note = /\.(append|insert|pop|remove)$/.test(m[1]) ? 'Change the list.' : 'Call it.';
      }
      if (/^(else:|try:|finally:|break|continue|pass)$/.test(t) || /^(global|import|from|except)\b/.test(t)) shape = t;
      rows.push({ indent, shape: ' '.repeat(indent) + shape, kind, role: ROLE[kind], note });
      if (opens) stack.push({ indent, kind: opens });
    }
    return rows;
  }

  function render(src) {
    const rows = analyse(src);
    const order = ['header', 'input', 'init', 'loop', 'decide', 'update', 'exit', 'error', 'after', 'ret', 'out'];
    const used = order.filter(k => rows.some(r => r.kind === k));
    const box = h('div', { class: 'struct' },
      h('div', { class: 'struct-head' },
        h('span', { class: 'c-label' }, 'Structure of a full-mark answer'),
        h('span', { class: 'struct-flow' }, used.map(k => ROLE[k]).join(' → '))),
      h('div', { class: 'struct-rows' }, rows.map(r => h('div', { class: `struct-row k-${r.kind}` },
        h('code', { class: 'struct-code' }, r.shape),
        h('span', { class: 'struct-role' }, h('b', null, r.role), r.note ? ` · ${r.note}` : '')))),
      h('div', { class: 'struct-foot muted small' }, 'Every ___ is something you work out. The shape and order are what the markscheme rewards.'));
    return box;
  }

  return { analyse, render };
})();
