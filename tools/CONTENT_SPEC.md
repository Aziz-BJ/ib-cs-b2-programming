# Content spec

Each file in `content/` registers topics with:

```js
B2.topics.push({ ...topic }, { ...topic });
```

Plain JS objects only (no functions, no imports). Use template literals (backticks) for multi-line Python code. **Backslashes:** inside a JS template literal `\n` becomes a real newline, which breaks Python strings. If the Python needs `\n` or `\t`, write `\\n` / `\\t` in the JS source. Avoid backticks and `${` inside code.

## Topic

| field | type | notes |
|---|---|---|
| `id` | string | e.g. `"b2-1-2"` (lowercase, digits, hyphens) |
| `code` | string | syllabus code shown in UI, e.g. `"B2.1.2"` |
| `section` | string | exactly one of `"B2.1 Programming fundamentals"`, `"B2.2 Data structures"`, `"B2.3 Programming constructs"`, `"B2.4 Programming algorithms"`, `"Exam practice"` |
| `title` | string | short, e.g. `"Substrings"` |
| `summary` | string | one sentence: what you'll be able to do |
| `minutes` | number | honest estimate to learn + practise |
| `lesson` | block[] | the teaching, in order (see below) |
| `mustKnow` | string[] (HTML) | 4–8 bullet "what you must know" lines |
| `terms` | {term, def}[] | key vocabulary for flashcards: exam-quality one-sentence definitions |
| `exercises` | exercise[] | 8–12 per topic, roughly easiest → hardest |

## Lesson blocks (exactly one key per block)

- `{h: "Subheading"}`
- `{p: "HTML paragraph"}` — `<b>`, `<code>`, `<i>` allowed
- `{list: ["HTML", "HTML"]}`
- `{code: \`python\`, stdin: "5\n3"}` — runnable, editable example. `stdin` optional (one line per `input()` call). Must run without error unless you add `error: true` (use that only to demonstrate an error on purpose). Every code block should `print` something so the student sees a result.
- `{tip: "HTML"}` — exam tip (yellow)
- `{trap: "HTML"}` — "don't confuse" / common mistake (red)
- `{table: {head: ["A","B"], rows: [["1","2"]]}}` — cells are HTML strings

Teaching style: plain, direct, short sentences. Intuition first, then the exact IB wording, then a runnable example. Lesson should be readable in ~5–8 minutes. Don't pad. Use the source learning guide's facts (and its † corrections).

## Exercises (common fields)

`id` (unique within topic, e.g. `"e1"`), `type`, `marks` (IB-style mark value), `q` (HTML question; start with the IB command term in bold, e.g. `<b>Construct</b> a function…`, `<b>State</b> the output…`, `<b>Trace</b>…`, `<b>Identify</b>…`, `<b>Describe</b>…`, `<b>Explain</b>…`), optional `context` (HTML scenario text shown above the question, e.g. "A cinema stores seat bookings in a 2D list…"), `explain` (HTML shown after the student checks: why the answer is what it is).

### `mcq`
`options: ["HTML", ...]`, `answer: <index>`. Use for quick concept checks (error types, Big O class, which structure fits). Distractors must be the real mistakes students make.

### `output` — "State the output"
`code` (Python that prints), optional `stdin`. The expected output is computed automatically by running the code; do not supply it. Student types the exact output. Keep output short (1–6 lines). Code must not raise an error.

### `trace` — trace table
`code`, `columns: ["Pass", "i", "total", "Output"]`, `rows: [["Start", "", "0", ""], ["1", "0", "5", ""], ...]` (full correct answer, strings), `prefill: 1` (number of rows shown filled in; default 1), `labelCol: true` (first column always shown, e.g. step labels). Blank cells = `""` (student must leave blank or type `-`). Booleans as `True`/`False`. Strings without quotes. **You must verify every row by actually running instrumented code with python3** — a wrong trace table is the worst possible bug.

### `code` — "Construct" / "Write" / debug-and-fix
- `starter`: code shown in the editor (function header + `# your code here` / `pass`, or buggy code to fix).
- `solution`: a correct reference solution (simple, the way an IB markscheme would write it — no clever one-liners).
- `tests`: at least 3; each object:
  - `call`: Python expression, e.g. `"count_above([3, 8, 9], 5)"` — return value compared with the reference solution's.
  - `setup` (optional): statements run before `call`, e.g. `"a = [3, 1, 2]"`.
  - `after` (optional): expression compared after the call, e.g. `"a"` to check in-place changes, or `"stack"` for a global.
  - `out: true` (optional): also compare what was printed during the call. (Automatic when the reference returns `None` and prints.)
  - `stdin` (optional) and no `call`: whole-program test — runs the whole program with that input and compares printed output. Use for programs that use `input()`.
  - `label` (optional): readable description shown to the student, e.g. `"empty list returns 0"`.
  - Expected values are produced by running `solution`; never hard-code them. Include edge cases (empty list, single item, target missing, boundary values like exactly 50).
- `forbid` (optional): substrings not allowed in the student's code, e.g. `["max(", "sum("]` when the question says "without using built-in functions". Must not appear in `solution`.
- `hints`: 1–3 progressive hints (HTML).
- `markscheme`: IB-style mark points, one per mark, e.g. `"Initialises total to 0 before the loop"`, `"Loop iterates over every element"`, `"Correct comparison with the threshold"`, `"Returns the count (not prints)"`. `marks` should equal markscheme length.
- `starter` should NOT already pass all tests.
- Each test runs the code fresh, so globals reset between tests. Top-level code in the student's file runs before each test, so a starter shouldn't call `input()` at top level for `call` tests.

### `written` — Describe / Explain / Compare / Justify
`markscheme: ["point (1 mark)", ...]` (marks = number of points awarded max; list may be longer than marks — "any N of"), `model`: model answer HTML. Student writes an answer, then reveals the markscheme and ticks the points they made.

## Validation

Run `node tools/validate.mjs content/<file>.js` — it must print `OK`. It loads the file, checks the schema, runs every lesson code block, every output question, every trace table's code, and every reference solution against its tests using the exact same Python runtime as the site (python3 3.9 locally, so **no `match`, no `|` type unions, no 3.10+ syntax**). It warns if a starter already passes every test.
