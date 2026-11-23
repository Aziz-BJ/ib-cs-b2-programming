// Runs Python (Pyodide) in a Web Worker so runaway code can be killed and restarted.
window.Py = (() => {
  const BASE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
  const src = `
    importScripts('${BASE}pyodide.js');
    let py;
    const ready = loadPyodide({ indexURL: '${BASE}' })
      .then(p => { py = p; py.runPython(${JSON.stringify(window.PY_RUNTIME)}); postMessage({ type: 'ready' }); })
      .catch(e => postMessage({ type: 'fail', error: String(e) }));
    onmessage = async (e) => {
      await ready;
      const { id, fn, args } = e.data;
      try {
        const f = py.globals.get(fn);
        const r = f(...args);
        f.destroy();
        postMessage({ type: 'result', id, result: r });
      } catch (err) {
        postMessage({ type: 'result', id, error: String(err) });
      }
    };`;
  const workerURL = URL.createObjectURL(new Blob([src], { type: 'text/javascript' }));
  let worker, readyP, seq = 0;
  let status = 'loading';
  const listeners = new Set();
  const pending = new Map();
  const setStatus = s => { status = s; listeners.forEach(f => f(s)); };

  function start() {
    setStatus('loading');
    worker = new Worker(workerURL);
    readyP = new Promise((resolve, reject) => {
      worker.onmessage = e => {
        const m = e.data;
        if (m.type === 'ready') { setStatus('ready'); resolve(); }
        else if (m.type === 'fail') { setStatus('error'); reject(new Error(m.error)); }
        else if (m.type === 'result') {
          const p = pending.get(m.id);
          if (!p) return;
          pending.delete(m.id);
          clearTimeout(p.timer);
          if (m.error) p.reject(new Error(m.error));
          else p.resolve(JSON.parse(m.result));
        }
      };
      worker.onerror = e => { setStatus('error'); reject(new Error(e.message || 'Python failed to load')); };
    });
    readyP.catch(() => {});
  }

  let chain = Promise.resolve();
  function call(fn, args, timeoutMs) {
    const job = chain.then(() => readyP).then(() => new Promise((resolve, reject) => {
      const id = ++seq;
      const timer = setTimeout(() => {
        pending.delete(id);
        worker.terminate();
        start();
        const err = new Error('timeout');
        err.timeout = true;
        reject(err);
      }, timeoutMs);
      pending.set(id, { resolve, reject, timer });
      worker.postMessage({ id, fn, args });
    }));
    chain = job.catch(() => {});
    return job;
  }

  start();
  return {
    get status() { return status; },
    onStatus(f) { listeners.add(f); f(status); return () => listeners.delete(f); },
    retry() { if (status === 'error') start(); },
    run: (code, stdin = '') => call('run_code', [code, stdin], 5000),
    grade: (user, solution, tests, forbid = []) =>
      call('grade', [user, solution, JSON.stringify(tests), JSON.stringify(forbid)], 10000),
  };
})();
