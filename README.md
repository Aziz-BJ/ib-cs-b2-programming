# B2 Programming: exam prep

An interactive study site for IB Computer Science B2.1.1 to B2.4.2 (data types through binary search). Bubble sort, selection sort, recursion and file processing are not covered.

**Open it: https://aziz-bj.github.io/ib-cs-b2-programming/**  (nothing to install)

## Run it locally

Double-click `start.command`. It opens http://127.0.0.1:8765. If you prefer the terminal, run `python3 -m http.server 8765` in this folder and open that address.

Python runs in your browser (Pyodide). The first load downloads it, about 10 MB, so you need internet the first time. After that your browser caches it.

## What's inside

- **Learn**: a short lesson for each syllabus point, with editable examples you can run.
- **Practice**: IB-style questions with automatic checking.
  - *Construct* questions run your code against tests.
  - *State the output* and *trace table* questions are checked cell by cell.
  - *Describe* and *explain* questions show the markscheme so you can tick the points you made.
- **Practice paper**: a timed, mixed paper. It picks questions you got wrong more often.
- **Flashcards**: every key term.
- **Mistakes to redo**: every question where you dropped marks.

- **AI tutor (optional)**: press **✦ Ask** on any question to get short explanations and hints. Set it up once with **✦ Set up tutor** at the bottom of the sidebar: paste an OpenRouter key from https://openrouter.ai/keys. The key stays in your browser's storage and is sent only to OpenRouter. The default model is `anthropic/claude-haiku-5.5`, and you can change it in the same dialog.

Shortcut: ⌘↵ checks your answer. Progress is saved in your browser.

## Editing content

Topics live in `content/*.js` (format: `tools/CONTENT_SPEC.md`). After editing, run `node tools/validate.mjs`. It runs every model solution, example and output question against the same Python grader the site uses.
