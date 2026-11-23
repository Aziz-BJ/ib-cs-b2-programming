B2.topics.push({
  id: "exam-mixed",
  code: "Paper 2",
  section: "Exam practice",
  title: "Mixed exam questions",
  summary: "Practise multi-part Paper 2 questions across B2.1 to B2.4.2 and learn how the marks are won and lost.",
  minutes: 90,
  lesson: [
    { h: "How to score on Paper 2 programming questions" },
    { p: "Paper 2 questions give you a short scenario (a cinema, a library, a shop) and then several parts. Each part starts with a <b>command term</b>. The command term tells you how much to write and what earns the marks. Most lost marks come from answering the wrong kind of question, not from not knowing the content." },
    { h: "Command terms" },
    { table: { head: ["Command term", "What you give", "Typical marks"], rows: [
      ["<b>State</b>, <b>Identify</b>", "One short fact or name. No reason needed.", "1 per item"],
      ["<b>Outline</b>, <b>Describe</b>", "The main points or the steps, in a few sentences.", "1 per point"],
      ["<b>Explain</b>, <b>Justify</b>", "A point <b>and a reason</b> (\"because...\", \"so...\"). Justify = say why you chose it.", "1 for the point + 1 for the reason"],
      ["<b>Compare</b>, <b>Distinguish</b>", "Similarities and differences, with <b>both</b> sides named. A table or two sentences each side.", "1 per comparison point"],
      ["<b>Construct</b>", "Write the code (or algorithm) that does the job.", "4 to 8, one per feature"],
      ["<b>Trace</b>", "Fill in a trace table or state the output step by step.", "1 per correct column/stage"]
    ] } },
    { list: [
      "<b>Marks = points.</b> A 3-mark Describe needs three separate points. Do not repeat one point in different words.",
      "<b>Explain</b> answers need a link word. \"A stack is LIFO\" is 1 mark. \"A stack is LIFO, so the last book returned is the first shelved\" earns the second.",
      "<b>Be specific</b> to the scenario: name the data (\"the queue of sensor readings\"), not just the structure.",
      "<b>Compare</b>: if you write only about one side you cannot get full marks."
    ] },
    { h: "Laying out a trace table" },
    { p: "Make one column per variable you are asked about, plus a column for conditions you must evaluate and a column for output. Fill it one row at a time and never skip ahead. Two rules the examiner looks for:" },
    { list: [
      "<b>One row per change.</b> Each time a variable is assigned, write a new row or a new entry.",
      "A variable that is <b>re-assigned</b> gets a new entry <b>even if the value is the same</b>.",
      "Booleans as <code>True</code> / <code>False</code>. Strings without quotes. Output only in the Output column."
    ] },
    { code: "total = 0\nfor i in range(1, 4):\n    total = total + i\n    print('i =', i, ' total =', total)\nprint('Final:', total)" },
    { table: { head: ["Step", "i", "total", "Output"], rows: [
      ["Start", "", "0", ""],
      ["Pass 1", "1", "1", "i = 1  total = 1"],
      ["Pass 2", "2", "3", "i = 2  total = 3"],
      ["Pass 3", "3", "6", "i = 3  total = 6"],
      ["End", "", "6", "Final: 6"]
    ] } },
    { h: "How a Construct answer is marked" },
    { p: "A Construct mark scheme almost always has one mark for each of these. Check them off before you move on:" },
    { table: { head: ["Mark point", "What the examiner wants to see", "Example"], rows: [
      ["Initialisation", "Counters, totals and flags set <b>before</b> the loop", "<code>count = 0</code>"],
      ["Loop", "Goes through <b>every</b> item (all rows and columns if 2D)", "<code>for i in range(len(a)):</code>"],
      ["Condition", "The right test, with the right operator", "<code>if a[i] &gt;= limit:</code>"],
      ["Update", "The change that happens when the condition is true", "<code>count = count + 1</code>"],
      ["Return / output", "<b>Returns</b> the result (or outputs it if told to)", "<code>return count</code>"]
    ] } },
    { code: "def count_at_least(a, limit):\n    count = 0                    # initialisation\n    for i in range(len(a)):      # loop over every item\n        if a[i] >= limit:        # condition\n            count = count + 1    # update\n    return count                 # return\n\nprint(count_at_least([4, 9, 7, 9, 1], 7))" },
    { h: "The marks students lose most" },
    { code: "def show_double(n):\n    print(n * 2)\n\ndef give_double(n):\n    return n * 2\n\nx = show_double(4)\ny = give_double(4)\nprint('x is', x, 'and y is', y)\nprint(7 / 2, 7 // 2)\nprint(list(range(1, 4)), list(range(4)))" },
    { table: { head: ["Mistake", "Fix"], rows: [
      ["<b>Printing instead of returning</b> (the caller gets <code>None</code>)", "Use <code>return</code> unless the question says \"output\" or \"display\""],
      ["<b>Forgetting to initialise</b> a counter or total", "<code>count = 0</code> before the loop"],
      ["<b>Off-by-one in range</b>: <code>range(1, len(a))</code> skips item 0; <code>range(len(a) + 1)</code> goes past the end", "<code>range(len(a))</code> for every index; stop is exclusive"],
      ["<b>= vs ==</b>: <code>if x = 5</code> is an error", "<code>=</code> assigns, <code>==</code> compares"],
      ["<b>&gt; vs &gt;=</b>: a boundary value such as exactly 50 is missed", "Read the wording: \"at least\" means <code>&gt;=</code>"],
      ["<b>/ vs //</b>: <code>/</code> gives a float, which cannot be a list index", "<code>//</code> for whole-number division"],
      ["<b>Return inside the loop</b> when you need the whole loop to finish", "Return after the loop unless you are searching"]
    ] } },
    { tip: "Spend your time where the marks are. A 6-mark Construct is about six small features: write the skeleton (function, init, loop, condition, update, return) first, then fill in details. A partly working answer still earns most of the marks. Leave a minute to read your code with a tiny example list, exactly as a trace." },
    { trap: "Never write \"it is faster\" on its own. Say <i>why</i> in terms of the scenario: \"binary search halves the range each step, so about 18 comparisons for 200 000 items instead of up to 200 000\"." }
  ],
  mustKnow: [
    "<b>State / Identify</b> = a fact. <b>Describe</b> = points. <b>Explain / Justify</b> = point + reason. <b>Compare</b> = both sides. <b>Construct</b> = working code. <b>Trace</b> = table or output.",
    "Number of marks = number of separate points to make.",
    "Trace table: one row per change; a re-assigned variable gets a new entry even if its value is unchanged.",
    "Construct marks: <b>initialise</b>, <b>loop</b> over everything, <b>condition</b>, <b>update</b>, <b>return</b> (or output).",
    "Most lost marks: print instead of return, no initialisation, off-by-one in range, = instead of ==, / instead of //.",
    "Applications must be specific: say what is pushed, what pops, what order, in the scenario.",
    "Stack = LIFO, queue = FIFO, binary search needs sorted data, Big O is worst-case growth."
  ],
  terms: [
    { term: "Command term", def: "The word at the start of an exam question (State, Describe, Explain, Construct...) that tells you how much to write and what earns the marks." },
    { term: "Construct", def: "Write working code or an algorithm that does what the question asks." },
    { term: "Trace", def: "Step through code by hand, recording each variable's value (and any output) in a trace table." },
    { term: "Explain", def: "Give a point and the reason for it, using words like because or so." },
    { term: "Compare", def: "Give similarities and differences, mentioning both things being compared." },
    { term: "Trace table", def: "A table with a column for each variable and a row for each change, used to follow what a program does." },
    { term: "Off-by-one error", def: "A loop or index that runs one step too few or too many, such as range(1, len(a)) skipping the first item." }
  ],
  exercises: [
    {
      id: "e1", type: "code", marks: 4,
      context: "A cinema stores the bookings for one screening in a 2D list <code>seats</code>. Each inner list is one row of seats, and each value is <code>1</code> if the seat is booked or <code>0</code> if it is free. A seat is <code>seats[row][col]</code>; rows and columns are numbered from 0.<pre><code>seats = [[1, 0, 0, 1],\n         [0, 0, 1, 1],\n         [1, 1, 1, 1]]</code></pre>",
      q: "<b>Construct</b> a function <code>count_booked(seats)</code> that returns the total number of booked seats in the whole cinema.",
      starter: "def count_booked(seats):\n    # your code here\n    pass\n",
      solution: "def count_booked(seats):\n    total = 0\n    for row in range(len(seats)):\n        for col in range(len(seats[row])):\n            if seats[row][col] == 1:\n                total = total + 1\n    return total\n",
      tests: [
        { call: "count_booked([[1, 0, 0, 1], [0, 0, 1, 1], [1, 1, 1, 1]])", label: "example from the question" },
        { call: "count_booked([[0, 0], [0, 0]])", label: "no bookings" },
        { call: "count_booked([[1, 1, 1]])", label: "one full row" },
        { call: "count_booked([])", label: "no rows" },
        { call: "count_booked([[0, 1], [1, 0], [0, 1]])", label: "three rows" }
      ],
      hints: [
        "You need to visit every seat, so use a loop inside a loop: rows outside, columns inside.",
        "Set <code>total = 0</code> before the loops and return it after both loops have finished."
      ],
      markscheme: [
        "Initialises a counter/total to 0 before the loops",
        "Outer loop through all rows and inner loop through all columns (nested)",
        "Tests whether seats[row][col] equals 1 (booked)",
        "Adds 1 to the counter when booked and returns the total after the loops"
      ],
      explain: "Nested loops visit every seat once. The counter is returned (not printed) after the loops."
    },
    {
      id: "e2", type: "code", marks: 4,
      context: "A cinema stores the bookings for one screening in a 2D list <code>seats</code>. Each inner list is one row of seats, and each value is <code>1</code> if the seat is booked or <code>0</code> if it is free. A seat is <code>seats[row][col]</code>; rows and columns are numbered from 0.<pre><code>seats = [[1, 0, 0, 1],\n         [0, 0, 1, 1],\n         [1, 1, 1, 1]]</code></pre>",
      q: "<b>Construct</b> a function <code>first_free_in_row(seats, row)</code> that returns the column number of the first free seat in the given row, or <code>-1</code> if the row is full.",
      starter: "def first_free_in_row(seats, row):\n    # your code here\n    pass\n",
      solution: "def first_free_in_row(seats, row):\n    for col in range(len(seats[row])):\n        if seats[row][col] == 0:\n            return col\n    return -1\n",
      tests: [
        { setup: "seats = [[1, 0, 0, 1], [0, 0, 1, 1], [1, 1, 1, 1]]", call: "first_free_in_row(seats, 0)", label: "row 0: free seat at column 1" },
        { setup: "seats = [[1, 0, 0, 1], [0, 0, 1, 1], [1, 1, 1, 1]]", call: "first_free_in_row(seats, 1)", label: "row 1: free seat at column 0" },
        { setup: "seats = [[1, 0, 0, 1], [0, 0, 1, 1], [1, 1, 1, 1]]", call: "first_free_in_row(seats, 2)", label: "row 2 is full" },
        { call: "first_free_in_row([[1, 1, 1, 0]], 0)", label: "last seat free" }
      ],
      hints: [
        "This is a linear search along one row: loop over the columns of <code>seats[row]</code>.",
        "Return the column the moment you find a 0. Return -1 only after the loop."
      ],
      markscheme: [
        "Loop through the columns of the given row",
        "Tests whether the seat is free (== 0)",
        "Returns the column index when the first free seat is found",
        "Returns -1 after the loop if no free seat was found"
      ],
      explain: "A linear search with early return. Putting <code>return -1</code> inside the loop would stop after the first seat."
    },
    {
      id: "e3", type: "code", marks: 6,
      context: "A cinema stores the bookings for one screening in a 2D list <code>seats</code>. Each inner list is one row of seats, and each value is <code>1</code> if the seat is booked or <code>0</code> if it is free. A seat is <code>seats[row][col]</code>; rows and columns are numbered from 0.<pre><code>seats = [[1, 0, 0, 1],\n         [0, 0, 1, 1],\n         [1, 1, 1, 1]]</code></pre>",
      q: "<b>Construct</b> a function <code>row_with_most_bookings(seats)</code> that returns the number of the row that has the most booked seats. If two rows have the same highest number, return the lower row number.",
      starter: "def row_with_most_bookings(seats):\n    # your code here\n    pass\n",
      solution: "def row_with_most_bookings(seats):\n    best_row = 0\n    best_count = 0\n    for row in range(len(seats)):\n        count = 0\n        for col in range(len(seats[row])):\n            if seats[row][col] == 1:\n                count = count + 1\n        if count > best_count:\n            best_count = count\n            best_row = row\n    return best_row\n",
      tests: [
        { call: "row_with_most_bookings([[1, 0, 0, 1], [0, 0, 1, 1], [1, 1, 1, 1]])", label: "example from the question" },
        { call: "row_with_most_bookings([[1, 1], [1, 1]])", label: "tie: lower row wins" },
        { call: "row_with_most_bookings([[0, 1], [1, 1], [1, 1]])", label: "tie between rows 1 and 2" },
        { call: "row_with_most_bookings([[0, 0], [0, 0]])", label: "no bookings at all" },
        { call: "row_with_most_bookings([[1, 0, 0], [1, 1, 0], [0, 0, 0]])", label: "middle row" }
      ],
      hints: [
        "Count the bookings in one row first (inner loop), then compare that count with the best so far.",
        "Reset the row counter to 0 at the start of <b>each</b> row. Use <code>&gt;</code> (not <code>&gt;=</code>) so a tie keeps the lower row."
      ],
      markscheme: [
        "Initialises best row and best count before the loops",
        "Outer loop through each row",
        "Row counter reset to 0 at the start of each row",
        "Inner loop counts booked seats in that row",
        "Strict comparison count &gt; best_count, then updates both best count and best row",
        "Returns the best row number after the loops"
      ],
      explain: "The common error is not resetting the row counter, so counts add up across rows. Strict <code>&gt;</code> keeps the first (lowest) row when there is a tie."
    },
    {
      id: "e4", type: "trace", marks: 4,
      context: "A library records its stock in two <b>parallel arrays</b>: <code>titles</code> and <code>copies</code>, where <code>copies[i]</code> is the number of copies available of <code>titles[i]</code>. Books that are handed back are put on a trolley, which is modelled as a <b>stack</b> called <code>returned</code>: a list where the last item is the top (push = <code>append</code>, pop = <code>pop()</code>).",
      q: "<b>Trace</b> this code, which models the trolley as a stack. Complete the table with one row per statement. Write a value only in the column that the statement changes. For the <code>returned</code> column write the whole stack from bottom to top (e.g. <code>Dune, Emma</code>), or <code>empty</code>.",
      code: "returned = []\nreturned.append('Dune')\nreturned.append('Emma')\nx = returned.pop()\nreturned.append('Ulysses')\ny = returned.pop()\nz = returned.pop()\nprint(x, y, z)",
      columns: ["Statement", "returned", "x", "y", "z", "Output"],
      rows: [
        ["Start", "empty", "", "", "", ""],
        ["append Dune", "Dune", "", "", "", ""],
        ["append Emma", "Dune, Emma", "", "", "", ""],
        ["x = pop", "Dune", "Emma", "", "", ""],
        ["append Ulysses", "Dune, Ulysses", "", "", "", ""],
        ["y = pop", "Dune", "", "Ulysses", "", ""],
        ["z = pop", "empty", "", "", "Dune", ""],
        ["print", "", "", "", "", "Emma Ulysses Dune"]
      ],
      prefill: 2,
      labelCol: true,
      explain: "<code>pop()</code> removes and returns the <b>top</b> (last) item, so the books come out in the reverse of the order they went in, apart from the one still underneath. Output: <code>Emma Ulysses Dune</code>."
    },
    {
      id: "e5", type: "code", marks: 6,
      context: "A library records its stock in two <b>parallel arrays</b>: <code>titles</code> and <code>copies</code>, where <code>copies[i]</code> is the number of copies available of <code>titles[i]</code>. Books that are handed back are put on a trolley, which is modelled as a <b>stack</b> called <code>returned</code>: a list where the last item is the top (push = <code>append</code>, pop = <code>pop()</code>).",
      q: "<b>Construct</b> a function <code>shelve_returns(returned, titles, copies)</code>. It must take every book off the stack, one at a time. If the title is in <code>titles</code>, add 1 to the matching item in <code>copies</code>. Titles that are not in the catalogue are ignored (they are still removed from the stack). Return the number of books that were shelved. Each title appears only once in <code>titles</code>.",
      starter: "def shelve_returns(returned, titles, copies):\n    # your code here\n    pass\n",
      solution: "def shelve_returns(returned, titles, copies):\n    shelved = 0\n    while len(returned) > 0:\n        title = returned.pop()\n        for i in range(len(titles)):\n            if titles[i] == title:\n                copies[i] = copies[i] + 1\n                shelved = shelved + 1\n    return shelved\n",
      tests: [
        { setup: "returned = ['Dune', 'Emma', 'Zorro']\ntitles = ['Dune', 'Emma', 'Ulysses']\ncopies = [2, 0, 1]", call: "shelve_returns(returned, titles, copies)", after: "(returned, copies)", label: "one unknown title" },
        { setup: "returned = []\ntitles = ['Dune']\ncopies = [1]", call: "shelve_returns(returned, titles, copies)", after: "(returned, copies)", label: "empty trolley" },
        { setup: "returned = ['Emma', 'Emma', 'Emma']\ntitles = ['Dune', 'Emma']\ncopies = [5, 0]", call: "shelve_returns(returned, titles, copies)", after: "(returned, copies)", label: "same title returned three times" },
        { setup: "returned = ['Q', 'R']\ntitles = ['Dune']\ncopies = [4]", call: "shelve_returns(returned, titles, copies)", after: "(returned, copies)", label: "no title matches" }
      ],
      hints: [
        "Outer loop: <code>while len(returned) &gt; 0</code>, taking the top book with <code>returned.pop()</code>.",
        "Inner loop: a linear search of <code>titles</code>. The copy count at the <i>same index</i> in <code>copies</code> goes up by 1.",
        "Keep a counter that is only increased when a match is found, and return it at the end."
      ],
      markscheme: [
        "Counter initialised to 0 before the loops",
        "Loops until the stack is empty",
        "Pops the top title from the stack on every pass",
        "Searches the titles array for that title",
        "Adds 1 to copies at the matching index (parallel arrays)",
        "Counts only matched books and returns the count"
      ],
      explain: "This combines a stack (pop until empty), a linear search, and parallel arrays (same index in <code>titles</code> and <code>copies</code>). The stack ends up empty."
    },
    {
      id: "e6", type: "written", marks: 3,
      context: "A library records its stock in two <b>parallel arrays</b>: <code>titles</code> and <code>copies</code>, where <code>copies[i]</code> is the number of copies available of <code>titles[i]</code>. Books that are handed back are put on a trolley, which is modelled as a <b>stack</b> called <code>returned</code>: a list where the last item is the top (push = <code>append</code>, pop = <code>pop()</code>).",
      q: "<b>Explain</b> why a stack is a suitable structure for the returned-books trolley, and what the program must check before it takes a book off.",
      markscheme: [
        "A stack is last in, first out (LIFO) (1 mark)",
        "The book put on the trolley last is on top, so it is the first one that can be taken off and shelved (1 mark)",
        "The program must check the stack is not empty (isEmpty) before pop; popping an empty stack is an underflow error (1 mark)"
      ],
      model: "A stack is <b>last in, first out</b>. On the trolley the last book returned is on the top, so it is the only one that can be reached and is the first to be taken off and shelved. Before each <code>pop</code> the program must check that the stack is not empty (<code>isEmpty</code>), because popping an empty stack causes an underflow error."
    },
    {
      id: "e7", type: "code", marks: 5,
      context: "A weather station sends temperature readings to a <b>queue</b> <code>q</code>, stored as a list. A new reading is added at the rear with <code>q.append(r)</code> (enqueue). The oldest reading is removed from the front with <code>q.pop(0)</code> (dequeue). The front of the queue is index 0.",
      q: "<b>Construct</b> a function <code>drain_alerts(q, limit)</code> that removes every reading from the queue, oldest first, and returns how many of the readings were greater than <code>limit</code>. The queue must be empty afterwards.",
      starter: "def drain_alerts(q, limit):\n    # your code here\n    pass\n",
      solution: "def drain_alerts(q, limit):\n    count = 0\n    while len(q) > 0:\n        r = q.pop(0)\n        if r > limit:\n            count = count + 1\n    return count\n",
      tests: [
        { setup: "q = [40, 70, 30, 90]", call: "drain_alerts(q, 50)", after: "q", label: "two readings above 50" },
        { setup: "q = [50, 50, 51]", call: "drain_alerts(q, 50)", after: "q", label: "exactly the limit is not an alert" },
        { setup: "q = []", call: "drain_alerts(q, 50)", after: "q", label: "empty queue" },
        { setup: "q = [10, 20]", call: "drain_alerts(q, 99)", after: "q", label: "no alerts" }
      ],
      hints: [
        "Keep removing from the front while the queue is not empty: <code>while len(q) &gt; 0:</code> and <code>r = q.pop(0)</code>.",
        "Do not loop over <code>q</code> with <code>for</code> while removing from it: you would skip items."
      ],
      markscheme: [
        "Counter initialised to 0",
        "Loop continues while the queue is not empty",
        "Dequeues the front item with q.pop(0) on every pass",
        "Compares the reading with the limit using &gt; (not &gt;=) and increments the counter",
        "Returns the count after the loop"
      ],
      explain: "Dequeuing uses <code>pop(0)</code> (front of the queue). Using <code>pop()</code> would take the newest reading and change the order."
    },
    {
      id: "e8", type: "trace", marks: 5,
      context: "A weather station sends temperature readings to a <b>queue</b> <code>q</code>, stored as a list. A new reading is added at the rear with <code>q.append(r)</code> (enqueue). The oldest reading is removed from the front with <code>q.pop(0)</code> (dequeue). The front of the queue is index 0.",
      q: "<b>Trace</b> this code. A reading above 50 is not counted but is put back at the rear of the queue, reduced by 30. Complete one row per pass of the loop. In the <code>q</code> column write the queue after the pass as a list, e.g. <code>[70, 30]</code>.",
      code: "q = [40, 70, 30]\ntotal = 0\nwhile len(q) > 0:\n    r = q.pop(0)\n    if r > 50:\n        q.append(r - 30)\n    else:\n        total = total + r\nprint(total)",
      columns: ["Pass", "r", "q", "total", "Output"],
      rows: [
        ["Start", "", "[40, 70, 30]", "0", ""],
        ["1", "40", "[70, 30]", "40", ""],
        ["2", "70", "[30, 40]", "40", ""],
        ["3", "30", "[40]", "70", ""],
        ["4", "40", "[]", "110", ""],
        ["End", "", "[]", "110", "110"]
      ],
      prefill: 2,
      labelCol: true,
      explain: "Pass 2: 70 is above 50, so it is not added to the total; 70 - 30 = 40 joins the rear of the queue ([30, 40]). Passes 3 and 4 add 30 and 40 to the total. When the queue is empty the loop stops and 110 is printed."
    },
    {
      id: "e9", type: "mcq", marks: 1,
      context: "A weather station sends temperature readings to a <b>queue</b> <code>q</code>, stored as a list. A new reading is added at the rear with <code>q.append(r)</code> (enqueue). The oldest reading is removed from the front with <code>q.pop(0)</code> (dequeue). The front of the queue is index 0.",
      q: "A programmer stores the queue in a list of N readings and dequeues with <code>q.pop(0)</code>. <b>Identify</b> the time complexity of one dequeue.",
      options: ["O(1)", "O(N)", "O(N&sup2;)", "O(log N)"],
      answer: 1,
      explain: "Removing the first item makes every other item shift one place to the left, so the work grows with N: O(N). A linked list or circular array gives O(1) dequeue."
    },
    {
      id: "e10", type: "output", marks: 3,
      context: "A shop identifies each product with a code string of the form <code>CC-NNNN-S</code>, for example <code>'SH-0042-M'</code>. <code>CC</code> is a 2-letter category, <code>NNNN</code> is a 4-digit item number and <code>S</code> is a size letter (S, M or L). The code is always 9 characters long.",
      q: "<b>State</b> the output of this program.",
      code: "code = 'SH-0042-M'\nprint(code[0:2])\nprint(code[3:7])\nprint(code[-1])\nprint(int(code[3:7]) + 1)",
      explain: "<code>code[0:2]</code> is indices 0 and 1 (the end index is exclusive): SH. <code>code[3:7]</code> is the four characters 0042 (a string, so the leading zeros stay). <code>code[-1]</code> is the last character, M. <code>int('0042')</code> is 42, plus 1 is 43."
    },
    {
      id: "e11", type: "code", marks: 4,
      context: "A shop identifies each product with a code string of the form <code>CC-NNNN-S</code>, for example <code>'SH-0042-M'</code>. <code>CC</code> is a 2-letter category, <code>NNNN</code> is a 4-digit item number and <code>S</code> is a size letter (S, M or L). The code is always 9 characters long.",
      q: "<b>Construct</b> a function <code>parse_code(code)</code> that takes a valid product code and returns a list of three items: the category (a string), the item number (as an <b>integer</b>) and the size (a string). For <code>'SH-0042-M'</code> it returns <code>['SH', 42, 'M']</code>.",
      starter: "def parse_code(code):\n    # your code here\n    pass\n",
      solution: "def parse_code(code):\n    category = code[0:2]\n    number = int(code[3:7])\n    size = code[8]\n    return [category, number, size]\n",
      tests: [
        { call: "parse_code('SH-0042-M')", label: "SH-0042-M" },
        { call: "parse_code('TV-1234-L')", label: "TV-1234-L" },
        { call: "parse_code('AB-0007-S')", label: "AB-0007-S (leading zeros)" },
        { call: "parse_code('ZZ-9999-S')", label: "ZZ-9999-S" }
      ],
      hints: [
        "Positions: category is index 0 to 1, the first hyphen is index 2, the number is index 3 to 6, the second hyphen is index 7, the size is index 8.",
        "The end index of a slice is exclusive, so the number is <code>code[3:7]</code>. Convert with <code>int()</code>."
      ],
      markscheme: [
        "Correct slice for the category (code[0:2])",
        "Correct slice for the number (code[3:7]) converted to an integer with int()",
        "Correct size character (code[8] or code[-1])",
        "Returns the three values as a list in the right order"
      ],
      explain: "Slicing is zero-based with an exclusive end index. <code>int('0042')</code> gives 42, so the leading zeros disappear."
    },
    {
      id: "e12", type: "code", marks: 6,
      context: "A shop identifies each product with a code string of the form <code>CC-NNNN-S</code>, for example <code>'SH-0042-M'</code>. <code>CC</code> is a 2-letter category, <code>NNNN</code> is a 4-digit item number and <code>S</code> is a size letter (S, M or L). The code is always 9 characters long.",
      q: "<b>Construct</b> a program for the till. It repeatedly reads a quantity sold (use <code>input()</code> with no prompt text). Entering <code>0</code> ends the input. A quantity greater than 20 is invalid: output <code>Invalid quantity</code> and ignore that quantity. At the end output <code>Total: </code> followed by the total of the valid quantities, then <code>Invalid: </code> followed by how many invalid quantities were entered.",
      starter: "# your code here\n",
      solution: "total = 0\ninvalid = 0\nqty = int(input())\nwhile qty != 0:\n    if qty > 20:\n        print('Invalid quantity')\n        invalid = invalid + 1\n    else:\n        total = total + qty\n    qty = int(input())\nprint('Total: ' + str(total))\nprint('Invalid: ' + str(invalid))\n",
      tests: [
        { stdin: "5\n30\n3\n0", label: "inputs 5, 30, 3, 0" },
        { stdin: "0", label: "ends immediately" },
        { stdin: "21\n20\n0", label: "20 is valid, 21 is not" },
        { stdin: "1\n2\n3\n0", label: "all valid" },
        { stdin: "25\n40\n0", label: "all invalid" }
      ],
      hints: [
        "Read the first value before the loop, then <code>while qty != 0:</code>. Read the next value at the <b>end</b> of the loop body.",
        "If you forget the second <code>input()</code> inside the loop the program never ends."
      ],
      markscheme: [
        "Initialises the total and the invalid counter to 0",
        "Reads and converts input to an integer with int(input())",
        "Loop condition stops at the sentinel 0",
        "Selection: quantity greater than 20 prints the message and counts it as invalid; otherwise adds it to the total",
        "Reads the next quantity inside the loop (update, so the loop can end)",
        "Outputs the total and the invalid count after the loop, in the required format"
      ],
      explain: "This is a sentinel-controlled <code>while</code> loop (the number of inputs is not known in advance). The update (the next <code>input()</code>) must be inside the loop."
    },
    {
      id: "e13", type: "written", marks: 3,
      context: "A shop identifies each product with a code string of the form <code>CC-NNNN-S</code>, for example <code>'SH-0042-M'</code>. <code>CC</code> is a 2-letter category, <code>NNNN</code> is a 4-digit item number and <code>S</code> is a size letter (S, M or L). The code is always 9 characters long.",
      q: "<b>Describe</b> how exception handling could be used so that the till program in the previous question does not crash if the user types letters instead of a quantity.",
      markscheme: [
        "Put the int(input()) conversion inside a try block (1 mark)",
        "An except ValueError block catches the error when the text cannot be converted (1 mark)",
        "The except block shows a friendly message / asks again, so the program carries on instead of terminating (1 mark)"
      ],
      model: "The conversion <code>int(input())</code> is placed in a <code>try</code> block. If the user types letters, Python raises a <code>ValueError</code>, which is caught by an <code>except ValueError</code> block. That block displays a friendly message (and asks for the quantity again), so the program carries on instead of crashing."
    },
    {
      id: "e14", type: "code", marks: 4,
      context: "A teacher's function should return how many marks in a list are <b>at least</b> the pass mark. The function below has errors, so it gives wrong results.",
      q: "<b>Identify</b> and correct the errors so that <code>count_passes(marks, pass_mark)</code> returns the number of marks that are greater than or equal to <code>pass_mark</code>.",
      starter: "def count_passes(marks, pass_mark):\n    count = 0\n    for i in range(1, len(marks)):\n        if marks[i] > pass_mark:\n            count = count + 1\n    print(count)\n",
      solution: "def count_passes(marks, pass_mark):\n    count = 0\n    for i in range(len(marks)):\n        if marks[i] >= pass_mark:\n            count = count + 1\n    return count\n",
      tests: [
        { call: "count_passes([50, 60, 40], 50)", label: "a mark exactly equal to the pass mark" },
        { call: "count_passes([70, 20], 50)", label: "pass in the first position" },
        { call: "count_passes([], 50)", label: "empty list" },
        { call: "count_passes([10, 20], 50)", label: "nobody passes" },
        { call: "count_passes([49, 50, 51, 100], 50)", label: "boundary values" }
      ],
      hints: [
        "Three separate errors: the loop start, the comparison operator and what the function does with the answer.",
        "\"At least\" means greater than <b>or equal to</b>. The first valid index is 0."
      ],
      markscheme: [
        "Loop starts at index 0 (range(len(marks))) so the first mark is included",
        "Uses &gt;= so a mark equal to the pass mark counts",
        "Returns the count instead of printing it",
        "Counter initialised and incremented correctly so an empty list gives 0"
      ],
      explain: "Errors: <code>range(1, ...)</code> skips index 0 (off-by-one), <code>&gt;</code> misses exactly-equal marks (boundary), and <code>print</code> gives the caller <code>None</code> instead of a value."
    },
    {
      id: "e15", type: "output", marks: 3,
      q: "<b>State</b> the output of this program.",
      code: "total = 10\n\ndef add(n):\n    total = 0\n    total = total + n\n    return total\n\ndef bump():\n    global total\n    total = total + 1\n\nprint(add(5))\nprint(total)\nbump()\nprint(total)",
      explain: "Inside <code>add</code>, <code>total</code> is a <b>local</b> variable that shadows the global one, so the global stays 10 (outputs 5, then 10). <code>bump</code> declares <code>global total</code>, so it changes the global: 11."
    },
    {
      id: "e16", type: "trace", marks: 5,
      context: "A warehouse stores its product numbers in a list <code>codes</code> that is always kept in ascending order. Staff need to find out quickly whether a product number is in stock. The warehouse holds about 200 000 product numbers.",
      q: "<b>Trace</b> a binary search for the product number 1031 in <code>codes</code> using the code below. Complete one row per pass. In the Action column write the assignment made (for example <code>low = 3</code>) or <code>found</code>.",
      code: "codes = [1004, 1010, 1023, 1031, 1047, 1052, 1068, 1075, 1090]\nnumber = 1031\nlow = 0\nhigh = len(codes) - 1\nfound = False\nwhile low <= high and not found:\n    mid = (low + high) // 2\n    if codes[mid] == number:\n        found = True\n    elif codes[mid] < number:\n        low = mid + 1\n    else:\n        high = mid - 1\nprint(found)",
      columns: ["Pass", "low", "high", "mid", "codes[mid]", "Action"],
      rows: [
        ["1", "0", "8", "4", "1047", "high = 3"],
        ["2", "0", "3", "1", "1010", "low = 2"],
        ["3", "2", "3", "2", "1023", "low = 3"],
        ["4", "3", "3", "3", "1031", "found"]
      ],
      prefill: 1,
      labelCol: true,
      explain: "Pass 1: mid = 4 and 1047 &gt; 1031, so high = 3. Pass 2: mid = (0 + 3) // 2 = 1 and 1010 &lt; 1031, so low = 2. Pass 3: mid = 2 and 1023 &lt; 1031, so low = 3. Pass 4: mid = 3 and codes[3] = 1031: found becomes True and the loop ends. Four passes for nine items."
    },
    {
      id: "e17", type: "code", marks: 6,
      context: "A warehouse stores its product numbers in a list <code>codes</code> that is always kept in ascending order. Staff need to find out quickly whether a product number is in stock. The warehouse holds about 200 000 product numbers.",
      q: "<b>Construct</b> a function <code>in_stock(codes, number)</code> that uses <b>binary search</b> to return <code>True</code> if <code>number</code> is in the sorted list <code>codes</code> and <code>False</code> otherwise.",
      starter: "def in_stock(codes, number):\n    # your code here\n    pass\n",
      solution: "def in_stock(codes, number):\n    low = 0\n    high = len(codes) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if codes[mid] == number:\n            return True\n        elif codes[mid] < number:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return False\n",
      tests: [
        { call: "in_stock([1004, 1010, 1023, 1031, 1047, 1052, 1068, 1075, 1090], 1031)", label: "present" },
        { call: "in_stock([1004, 1010, 1023, 1031, 1047, 1052, 1068, 1075, 1090], 1004)", label: "first item" },
        { call: "in_stock([1004, 1010, 1023, 1031, 1047, 1052, 1068, 1075, 1090], 1090)", label: "last item" },
        { call: "in_stock([1004, 1010, 1023, 1031, 1047, 1052, 1068, 1075, 1090], 1030)", label: "missing, inside the range" },
        { call: "in_stock([1004, 1010, 1023, 1031, 1047, 1052, 1068, 1075, 1090], 2000)", label: "missing, too big" },
        { call: "in_stock([], 1004)", label: "empty list" },
        { call: "in_stock([7], 7)", label: "single item" }
      ],
      forbid: [" in codes", "codes.index(", ".count("],
      hints: [
        "Set <code>low = 0</code>, <code>high = len(codes) - 1</code>, and loop while <code>low &lt;= high</code>.",
        "Return <code>True</code> inside the loop when <code>codes[mid] == number</code>. Return <code>False</code> after the loop."
      ],
      markscheme: [
        "Initialises low = 0 and high = len(codes) - 1",
        "Loop continues while low <= high",
        "mid calculated with integer division (low + high) // 2",
        "Returns True when codes[mid] equals the number",
        "Moves low = mid + 1 or high = mid - 1 correctly",
        "Returns False after the loop"
      ],
      explain: "Same skeleton as any binary search; only the return values differ. <code>//</code> and <code>len(codes) - 1</code> are the usual lost marks."
    },
    {
      id: "e18", type: "written", marks: 4,
      context: "A warehouse stores its product numbers in a list <code>codes</code> that is always kept in ascending order. Staff need to find out quickly whether a product number is in stock. The warehouse holds about 200 000 product numbers.",
      q: "<b>Justify</b> the use of binary search rather than linear search for this warehouse, referring to the time complexity of each.",
      markscheme: [
        "The list is already sorted, so binary search can be used (1 mark)",
        "Linear search is O(N): worst case about 200 000 comparisons (1 mark)",
        "Binary search is O(log N): the range is halved each time, about 18 comparisons for 200 000 items (1 mark)",
        "Therefore binary search scales much better for a large list / is much faster (1 mark)",
        "Accept: new product numbers must be inserted in order for binary search to keep working (1 mark, alternative)"
      ],
      model: "The list is kept in ascending order, so binary search can be used. Linear search is O(N) and would need up to about 200 000 comparisons for a missing item. Binary search is O(log N): it halves the range each time, so it needs at most about 18 comparisons. For a list this large, binary search is therefore far faster and scales better."
    }
  ]
});
