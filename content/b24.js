B2.topics.push(
{
  id: "b2-4-1",
  code: "B2.4.1",
  section: "B2.4 Programming algorithms",
  title: "Algorithmic efficiency and Big O",
  summary: "Judge how an algorithm's time and memory grow with input size, and name its Big O class from the code.",
  minutes: 40,
  lesson: [
    { p: "Two programs can both give the right answer, yet one takes a second and the other takes a year once the data is big enough. <b>Efficiency</b> is about the resources an algorithm needs: <b>time</b> (how long it runs) and <b>space</b> (how much memory it uses). We care about how those grow as the input size <b>N</b> grows." },
    { table: { head: ["Term", "Meaning"], rows: [
      ["Time complexity", "How the <b>run time</b> grows as the input size N grows."],
      ["Space complexity", "How the <b>memory used</b> grows as N grows. A new array of size N is O(N); changing an array <b>in place</b> is O(1) extra."],
      ["Big O notation", "Describes the <b>worst-case growth</b> as N grows. It is an <b>upper limit</b>, not an average."],
      ["Scalability", "Whether a solution still copes when the data set becomes very large."]
    ] } },
    { h: "Counting steps" },
    { p: "Do not time the program in seconds. Count how many times the main step runs. A statement with no loop runs once: <b>O(1)</b>. A loop over N items runs N times: <b>O(N)</b>. A loop inside a loop runs N &times; N times: <b>O(N&sup2;)</b>." },
    { code: "def single_loop(n):\n    steps = 0\n    for i in range(n):\n        steps += 1\n    return steps\n\ndef nested_loops(n):\n    steps = 0\n    for i in range(n):\n        for j in range(n):\n            steps += 1\n    return steps\n\nfor n in [10, 20, 40]:\n    print('N =', n, ' single loop:', single_loop(n), ' nested loops:', nested_loops(n))\n# double N: the single loop doubles, the nested loops go up four times" },
    { h: "Dropping constants and non-dominant terms" },
    { p: "Big O keeps only the part that wins when N is huge. Two rules:" },
    { table: { head: ["Rule", "Example", "Becomes"], rows: [
      ["Drop constants", "O(2N)", "<b>O(N)</b>"],
      ["Drop non-dominant terms", "O(N&sup2; + N)", "<b>O(N&sup2;)</b>"],
      ["Both", "N&sup2; + 3N", "<b>O(N&sup2;)</b>"]
    ] } },
    { p: "Two loops one after the other (not nested) cost N + N = 2N, which is O(N). Only a loop <i>inside</i> a loop gives O(N&sup2;)." },
    { h: "What to count for space" },
    { list: [
      "<b>Variables and constants</b>: a fixed number of them is O(1).",
      "<b>Inputs</b>: an array of N items takes O(N).",
            "A <b>new</b> list built with N items is O(N) extra space. Swapping items inside the existing list is O(1) extra."
    ] },
    { h: "The six classes" },
    { table: { head: ["Class", "Name", "Growth", "Example"], rows: [
      ["O(1)", "Constant", "Same whatever N is", "Stack push / pop"],
      ["O(log N)", "Logarithmic", "Grows very slowly", "Binary search"],
      ["O(N)", "Linear", "In proportion to N", "Single loop, linear search"],
      ["O(N log N)", "Linearithmic", "Between linear and quadratic", "Quicksort (average)"],
      ["O(N&sup2;)", "Quadratic", "Square of N", "Nested loops"],
      ["O(2^N)", "Exponential", "Doubles with every extra input", "Naive recursive Fibonacci"]
    ] } },
    { code: "import math\nprint('N', 'log N', 'N log N', 'N squared')\nfor n in [10, 100, 1000, 10000]:\n    print(n, round(math.log2(n)), round(n * math.log2(n)), n * n)\nprint()\nfor n in [10, 20, 30]:\n    print('2^N for N =', n, 'is', 2 ** n)" },
    { p: "Read that table: at N = 10 000, log N is about 13 steps but N&sup2; is 100 million. That gap is why the class matters more than the exact code." },
    { h: "Best, average and worst case (linear search)" },
    { table: { head: ["Case", "What happens", "Checks", "Big O"], rows: [
      ["Best", "Target is first", "1", "O(1)"],
      ["Average", "Target around the middle", "N / 2", "O(N) (constant dropped)"],
      ["Worst", "Target last or missing", "N", "O(N)"]
    ] } },
    { h: "Choosing an algorithm by situation" },
    { table: { head: ["Situation", "Prefer"], rows: [
      ["Small data set", "A simple algorithm is fine, even O(N&sup2;)"],
      ["Large data set", "Lower growth: O(N log N) or O(log N) scales better"],
      ["Real-time requirement", "O(1) or O(log N) where possible"],
      ["Complex problem", "Divide-and-conquer (e.g. quicksort) or dynamic programming"],
      ["Time vs space", "Memory is cheap, so cut time even if it costs extra space"]
    ] } },
    { trap: "Big O is <b>not</b> the average time; it is the <b>worst-case growth</b>. &dagger; Also note: the nested-loop example in the source is labelled \"linear search\" by mistake. Nested loops are <b>O(N&sup2;)</b>; linear search is <b>O(N)</b>." },
    { tip: "Always say what N is (\"N is the number of items in the list\"). To justify a class, point at the loops: \"one loop over N items, so O(N)\". To explain why we drop terms: for large N the biggest term dominates." }
  ],
  mustKnow: [
    "<b>Time complexity</b> = how run time grows with N; <b>space complexity</b> = how memory grows with N.",
    "Big O is the <b>worst-case growth</b> (an upper limit), not the average.",
    "No loop = O(1); one loop over N = O(N); a loop inside a loop = O(N&sup2;).",
    "<b>Drop constants</b> (O(2N) = O(N)) and <b>non-dominant terms</b> (O(N&sup2; + N) = O(N&sup2;)).",
    "Order from slowest growth to fastest: O(1), O(log N), O(N), O(N log N), O(N&sup2;), O(2^N).",
    "Linear search: best O(1), average O(N), worst O(N). Binary search: best O(1), average and worst O(log N).",
    "New array of size N = O(N) space; changing an array in place = O(1) extra space.",
    "Small data: simple is fine. Large data or real-time: choose the lower-growth algorithm."
  ],
  terms: [
    { term: "Algorithmic efficiency", def: "The resources (time and memory) an algorithm needs to complete its task." },
    { term: "Time complexity", def: "How the run time of an algorithm grows as the input size N grows." },
    { term: "Space complexity", def: "How the memory used by an algorithm grows as the input size N grows." },
    { term: "Big O notation", def: "A way of describing the worst-case growth of time or space as N grows; an upper limit, not an average." },
    { term: "Scalability", def: "Whether a solution still copes when the data set becomes very large." },
    { term: "Dominant term", def: "The part of an expression that grows fastest, so it is the only part kept in Big O (N&sup2; in N&sup2; + 3N)." },
    { term: "O(log N)", def: "Logarithmic growth: the work grows very slowly because each step halves the problem, as in binary search." },
    { term: "O(2^N)", def: "Exponential growth: the work doubles with every extra input item, so only tiny inputs are practical." }
  ],
  exercises: [
    {
      id: "e1", type: "mcq", marks: 1,
      q: "<b>Identify</b> what Big O notation describes.",
      options: [
        "The exact run time of a program in seconds",
        "The worst-case growth of time or space as the input size increases",
        "The average run time over many different inputs",
        "The number of lines of code in the algorithm"
      ],
      answer: 1,
      explain: "Big O is an <b>upper limit on growth</b>, i.e. the worst case, as N increases. It is not a time in seconds and it is not the average."
    },
    {
      id: "e2", type: "mcq", marks: 1,
      q: "<b>Identify</b> the simplified Big O notation for an algorithm that takes 3N&sup2; + 5N + 2 steps.",
      options: ["O(3N&sup2;)", "O(N&sup2;)", "O(N)", "O(3N&sup2; + 5N + 2)"],
      answer: 1,
      explain: "Drop the constants (3, 2) and the non-dominant terms (5N and 2). Only N&sup2; remains: O(N&sup2;)."
    },
    {
      id: "e3", type: "mcq", marks: 1,
      q: "<b>Identify</b> the time complexity of this code, where N is <code>len(items)</code>.<pre><code>total = 0\nfor x in items:\n    total += x\nprint(total)</code></pre>",
      options: ["O(1)", "O(N)", "O(N&sup2;)", "O(log N)"],
      answer: 1,
      explain: "One loop that runs once per item: O(N). The statements outside the loop are O(1) and are dropped."
    },
    {
      id: "e4", type: "mcq", marks: 1,
      q: "<b>Identify</b> the time complexity of this code, where N is <code>len(items)</code>.<pre><code>count = 0\nfor i in range(len(items)):\n    for j in range(len(items)):\n        if items[i] == items[j]:\n            count += 1</code></pre>",
      options: ["O(N)", "O(2N)", "O(N&sup2;)", "O(log N)"],
      answer: 2,
      explain: "A loop inside a loop: the inner loop runs N times for each of the N passes of the outer loop, so N &times; N = O(N&sup2;). (&dagger; This is quadratic, not linear.)"
    },
    {
      id: "e5", type: "mcq", marks: 1,
      q: "<b>Identify</b> the time complexity of this code, where N is <code>len(items)</code>.<pre><code>first = items[0]\nlast = items[len(items) - 1]\nprint(first + last)</code></pre>",
      options: ["O(1)", "O(N)", "O(N&sup2;)", "O(log N)"],
      answer: 0,
      explain: "There is no loop. Reading an element by index takes the same time however long the list is, so it is O(1). Calling <code>len()</code> does not loop over the items."
    },
    {
      id: "e6", type: "output", marks: 2,
      q: "<b>State</b> the output of this program. It counts how many times the inner statement runs.",
      code: "count = 0\nfor i in range(4):\n    for j in range(3):\n        count += 1\nprint(count)\nfor k in range(5):\n    count += 1\nprint(count)",
      explain: "The nested loops run 4 &times; 3 = 12 times, so the first line is 12. The separate loop adds 5 more (it is not nested): 17."
    },
    {
      id: "e7", type: "mcq", marks: 1,
      q: "<b>Identify</b> the time complexity of this code, where N is the starting value of <code>n</code>.<pre><code>steps = 0\nwhile n > 1:\n    n = n // 2\n    steps += 1</code></pre>",
      options: ["O(N)", "O(N&sup2;)", "O(log N)", "O(1)"],
      answer: 2,
      explain: "<code>n</code> is halved on every pass, so the loop runs about log&#8322; N times. Halving the problem each step is the signature of O(log N), as in binary search."
    },
    {
      id: "e8", type: "mcq", marks: 1,
      q: "<b>Identify</b> the space complexity of this function, where N is <code>len(a)</code>.<pre><code>def doubled(a):\n    result = []\n    for x in a:\n        result.append(x * 2)\n    return result</code></pre>",
      options: ["O(1)", "O(N)", "O(N&sup2;)", "O(log N)"],
      answer: 1,
      explain: "The function builds a <b>new list</b> that ends up with N items, so it needs O(N) extra memory. Changing <code>a</code> in place would be O(1) extra space."
    },
    {
      id: "e9", type: "mcq", marks: 1,
      q: "<b>Identify</b> the list that shows the classes in order from slowest growth to fastest growth.",
      options: [
        "O(1), O(log N), O(N), O(N log N), O(N&sup2;), O(2^N)",
        "O(1), O(N), O(log N), O(N log N), O(N&sup2;), O(2^N)",
        "O(log N), O(1), O(N), O(N&sup2;), O(N log N), O(2^N)",
        "O(1), O(log N), O(N), O(N&sup2;), O(N log N), O(2^N)"
      ],
      answer: 0,
      explain: "Constant, logarithmic, linear, linearithmic (N log N), quadratic, exponential. N log N sits between N and N&sup2;."
    },
    {
      id: "e10", type: "code", marks: 4,
      q: "<b>Construct</b> a function <code>has_duplicate(items)</code> that returns <code>True</code> if any value appears more than once in the list and <code>False</code> otherwise. Use nested loops and do not use <code>set()</code>. Then state the time complexity of your function (it is O(N&sup2;): a loop inside a loop).",
      starter: "def has_duplicate(items):\n    # your code here\n    pass\n",
      solution: "def has_duplicate(items):\n    for i in range(len(items)):\n        for j in range(i + 1, len(items)):\n            if items[i] == items[j]:\n                return True\n    return False\n",
      tests: [
        { call: "has_duplicate([])", label: "empty list" },
        { call: "has_duplicate([5])", label: "one item" },
        { call: "has_duplicate([1, 2, 3, 4])", label: "no duplicates" },
        { call: "has_duplicate([1, 2, 3, 1])", label: "first and last match" },
        { call: "has_duplicate([4, 4])", label: "two equal items" },
        { call: "has_duplicate(['a', 'b', 'c', 'b'])", label: "strings" }
      ],
      forbid: ["set("],
      hints: [
        "Compare every item with every <i>later</i> item. The inner loop can start at <code>i + 1</code> so an item is never compared with itself.",
        "Return <code>True</code> as soon as a match is found. Return <code>False</code> only after both loops have finished."
      ],
      markscheme: [
        "Outer loop goes through every index of the list",
        "Inner loop goes through the items after the current one (so an item is not compared with itself)",
        "Correct comparison of the two items, returning True when they are equal",
        "Returns False after the loops finish (not inside the loop)"
      ],
      explain: "Nested loops make this O(N&sup2;). The <code>i + 1</code> start halves the comparisons but the growth is still quadratic (N&sup2;/2 drops the constant)."
    },
    {
      id: "e11", type: "written", marks: 3,
      q: "<b>Explain</b> why an O(N&sup2;) algorithm may be acceptable for a class register of 30 students but not for a database of 10 million records.",
      markscheme: [
        "For small N the number of steps is tiny (e.g. 30&sup2; = 900), so the run time is not noticeable (1 mark)",
        "For large N, N&sup2; grows very quickly (10 million&sup2; = 10&sup1;&sup4; steps) (1 mark)",
        "The algorithm does not scale / would take far too long, so a lower-growth algorithm such as O(N log N) or O(log N) is needed (1 mark)"
      ],
      model: "With 30 students, an O(N&sup2;) algorithm needs only about 900 steps, which a computer completes instantly, so a simple algorithm is fine. With 10 million records it needs about 10&sup1;&sup4; steps. The run time grows with the square of N, so the algorithm does not <b>scale</b> and would take far too long. For large data a lower-growth algorithm such as O(N log N) or O(log N) should be chosen."
    },
    {
      id: "e12", type: "written", marks: 2,
      q: "<b>Distinguish</b> between time complexity and space complexity.",
      markscheme: [
        "Time complexity describes how the run time of an algorithm grows as the input size grows (1 mark)",
        "Space complexity describes how the memory used by an algorithm grows as the input size grows (1 mark)"
      ],
      model: "<b>Time complexity</b> measures how the <i>run time</i> grows as the size of the input N grows. <b>Space complexity</b> measures how the <i>memory used</i> grows as N grows, for example a new array of N items is O(N) but changing an array in place is O(1) extra."
    }
  ]
},
{
  id: "b2-4-2",
  code: "B2.4.2",
  section: "B2.4 Programming algorithms",
  title: "Linear and binary search",
  summary: "Write and trace linear and binary search, and justify which one to use.",
  minutes: 50,
  lesson: [
    { p: "<b>Linear search</b> is how you look for a name in a pile of unsorted papers: check each one in turn until you find it. <b>Binary search</b> is how you look up a word in a dictionary: open the middle, decide which half the word must be in, throw the other half away, and repeat. Each step <b>halves</b> the range, but it only works if the data is <b>sorted</b>." },
    { table: { head: ["", "Linear search", "Binary search"], rows: [
      ["Method", "Check each item in turn, first to last, until found", "Compare with the <b>middle</b>; <b>halve</b> the range each step"],
      ["Data must be", "Any order (unsorted is fine)", "<b>Sorted</b> (strict rule)"],
      ["Best / average / worst", "O(1) / O(N) / O(N)", "O(1) / O(log N) / O(log N)"],
      ["Choose when", "Unsorted or small lists; searching by an unsorted field", "Large sorted data (sorting cost counts if not yet sorted)"],
      ["Real world", "Database <b>full table scan</b> (no index)", "Database <b>indexed</b> field lookup"]
    ] } },
    { h: "Linear search" },
    { p: "Trace: <code>array = [45, 12, 89, 33, 7]</code>, target 33." },
    { table: { head: ["Linear trace", "index 0", "index 1", "index 2", "index 3"], rows: [
      ["Value (target 33)", "45", "12", "89", "33"],
      ["Equal to 33?", "no", "no", "no", "<b>yes: found (4 checks)</b>"]
    ] } },
    { code: "a = [45, 12, 89, 33, 7]\ntarget = 33\nfound = -1\nfor i in range(len(a)):\n    if a[i] == target:\n        found = i\n        break\nprint('index:', found)" },
    { p: "A <code>for</code> linear search checks every item unless you <code>break</code> when it is found. A <code>while</code> loop with a found flag also stops early. The result <code>-1</code> means \"not found\" (it can never be a real index)." },
    { h: "Binary search" },
    { p: "Keep two pointers, <code>low</code> and <code>high</code>, around the part of the list that could still contain the target. Look at the middle item <code>mid</code>:" },
    { list: [
      "<code>a[mid] == target</code>: found.",
      "<code>a[mid] &lt; target</code>: the target must be to the right, so <code>low = mid + 1</code>.",
      "<code>a[mid] &gt; target</code>: the target must be to the left, so <code>high = mid - 1</code>.",
      "If <code>low &gt; high</code> the range is empty: the target is not in the list."
    ] },
    { p: "Trace: <code>sortedArray = [4, 7, 8, 9, 11, 15, 16, 23, 31, 42]</code>, target 15." },
    { table: { head: ["Step", "low", "high", "mid", "Value at mid", "Decision"], rows: [
      ["1", "0", "9", "4", "11", "11 &lt; 15: low = 5"],
      ["2", "5", "9", "7", "23", "23 &gt; 15: high = 6"],
      ["3", "5", "6", "5", "15", "15 = 15: found"]
    ] } },
    { code: "a = [4, 7, 8, 9, 11, 15, 16, 23, 31, 42]\ntarget = 15\nlow = 0\nhigh = len(a) - 1\nfound = -1\nwhile low <= high:\n    mid = (low + high) // 2\n    print('low', low, 'high', high, 'mid', mid, 'value', a[mid])\n    if a[mid] == target:\n        found = mid\n        break\n    elif a[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1\nprint('index:', found)" },
    { h: "Why binary search is so much faster" },
    { code: "def binary_steps(a, target):\n    low = 0\n    high = len(a) - 1\n    steps = 0\n    while low <= high:\n        steps += 1\n        mid = (low + high) // 2\n        if a[mid] == target:\n            return steps\n        elif a[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return steps\n\nbig = list(range(1000000))\nprint('linear search, worst case:', len(big), 'checks')\nprint('binary search, worst case:', binary_steps(big, -5), 'checks')" },
    { p: "A million items: up to 1 000 000 checks for linear search, about 20 for binary search. Doubling the list adds only <b>one</b> extra step. That is O(log N)." },
    { trap: "Binary search on <b>unsorted</b> data gives wrong answers, because discarding half the list is only valid if everything to the left is smaller and everything to the right is bigger. &dagger; Start with <code>high = len(a) - 1</code> (the last valid index is <code>len - 1</code>; <code>len(a)</code> can make <code>a[mid]</code> go out of range) and use <code>//</code> so <code>mid</code> is an integer (a float cannot be a list index)." },
    { tip: "In a binary trace table show <b>low, high, mid and the value at mid</b> on every step, and the decision. To justify a search: unsorted = linear; large sorted data = binary. Searching by a database index behaves like binary search; scanning every row (no index) behaves like linear search." }
  ],
  mustKnow: [
    "<b>Linear search</b> checks each item in turn: works on unsorted data; best O(1), average O(N), worst O(N).",
    "<b>Binary search</b> compares with the middle and halves the range: the data <b>must be sorted</b>; best O(1), average and worst O(log N).",
    "Binary search: <code>mid = (low + high) // 2</code>; if too small <code>low = mid + 1</code>; if too big <code>high = mid - 1</code>; stop when <code>low &gt; high</code>.",
    "Start with <code>high = len(a) - 1</code> and use <code>//</code> (integer division).",
    "Return <code>-1</code> (or use a found flag) when the target is not in the list; use <code>break</code> / return to stop early.",
    "Choose linear for unsorted or small lists; binary for large sorted data (counting the cost of sorting if not already sorted).",
    "Database: full table scan = linear; indexed field lookup = binary-style.",
    "In a trace table show low, high, mid, the value at mid and the decision at every step."
  ],
  terms: [
    { term: "Linear search", def: "A search that checks each item in turn, from first to last, until the target is found or the list ends." },
    { term: "Binary search", def: "A search on a sorted list that compares the target with the middle item and halves the range each step." },
    { term: "Sorted data", def: "Data arranged in order, which binary search requires so that half the range can be discarded safely." },
    { term: "Found flag", def: "A variable (such as found = -1 or True/False) that records whether and where the target was found." },
    { term: "Full table scan", def: "A database search with no index, which checks every record in turn (like linear search)." },
    { term: "Indexed lookup", def: "A database search that uses an index on the field to jump to the record quickly (like binary search)." },
    { term: "Midpoint", def: "The index (low + high) // 2 in the middle of the current search range in binary search." }
  ],
  exercises: [
    {
      id: "e1", type: "mcq", marks: 1,
      q: "<b>Identify</b> the maximum number of comparisons binary search needs to find a value in a sorted list of 1 000 000 items.",
      options: ["About 20", "About 1 000", "About 500 000", "1 000 000"],
      answer: 0,
      explain: "Each step halves the range: 1 000 000 &rarr; 500 000 &rarr; ... &rarr; 1 takes about 20 halvings, since 2&sup2;&#8304; is about a million. That is O(log N). Linear search could need all 1 000 000."
    },
    {
      id: "e2", type: "trace", marks: 4,
      q: "<b>Trace</b> the binary search below. Complete the table: one row per pass of the loop. In the Action column write the assignment that is made (for example <code>low = 3</code>) or <code>found</code>.",
      code: "a = [3, 8, 12, 19, 25, 31, 40, 52]\ntarget = 40\nlow = 0\nhigh = len(a) - 1\nfound = -1\nwhile low <= high:\n    mid = (low + high) // 2\n    if a[mid] == target:\n        found = mid\n        break\n    elif a[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1\nprint(found)",
      columns: ["Step", "low", "high", "mid", "a[mid]", "Action"],
      rows: [
        ["1", "0", "7", "3", "19", "low = 4"],
        ["2", "4", "7", "5", "31", "low = 6"],
        ["3", "6", "7", "6", "40", "found"]
      ],
      prefill: 1,
      labelCol: true,
      explain: "Step 1: mid = (0 + 7) // 2 = 3 and 19 &lt; 40, so low = 4. Step 2: mid = (4 + 7) // 2 = 5 and 31 &lt; 40, so low = 6. Step 3: mid = (6 + 7) // 2 = 6 and a[6] = 40: found at index 6 (the program prints 6)."
    },
    {
      id: "e3", type: "trace", marks: 5,
      q: "<b>Trace</b> this binary search for a target that is <b>not</b> in the list. Complete one row per pass, then a final row <code>end</code> showing <code>low</code> and <code>high</code> when the loop stops (leave mid and a[mid] blank). In the Action column write the assignment made (for example <code>high = 3</code>), or <code>stop</code>.",
      code: "a = [2, 5, 9, 14, 20, 27]\ntarget = 10\nlow = 0\nhigh = len(a) - 1\nfound = -1\nwhile low <= high:\n    mid = (low + high) // 2\n    if a[mid] == target:\n        found = mid\n        break\n    elif a[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1\nprint(found)",
      columns: ["Step", "low", "high", "mid", "a[mid]", "Action"],
      rows: [
        ["1", "0", "5", "2", "9", "low = 3"],
        ["2", "3", "5", "4", "20", "high = 3"],
        ["3", "3", "3", "3", "14", "high = 2"],
        ["end", "3", "2", "", "", "stop"]
      ],
      prefill: 1,
      labelCol: true,
      explain: "The range keeps shrinking until <code>low &gt; high</code> (3 &gt; 2), which means the range is empty and the target is not present. The program prints -1."
    },
    {
      id: "e4", type: "written", marks: 2,
      q: "<b>Explain</b> why binary search cannot be used on unsorted data.",
      markscheme: [
        "Binary search compares the target with the middle item and uses the result to discard half of the list (1 mark)",
        "This is only valid if the list is sorted; in an unsorted list the target could be in the half that was discarded, so it may be missed (1 mark)"
      ],
      model: "Binary search compares the target with the middle item and then discards the half that cannot contain the target (for example, if the target is bigger than the middle, everything to the left is thrown away). That only works because a sorted list guarantees everything on the left is smaller. In an unsorted list the target could be in the discarded half, so binary search could wrongly report that it is not there."
    },
    {
      id: "e5", type: "written", marks: 4,
      q: "<b>Compare</b> linear search and binary search.",
      markscheme: [
        "Linear search works on unsorted or sorted data; binary search needs the data to be sorted (1 mark)",
        "Linear checks each item in turn; binary compares with the middle and halves the range each time (1 mark)",
        "Linear is O(N) in the average and worst case; binary is O(log N) (1 mark)",
        "Binary is much faster on large sorted data; linear is simpler and fine for small or unsorted lists (1 mark)",
        "Real-world link: database full table scan (linear) vs indexed lookup (binary-style) (1 mark, optional)"
      ],
      model: "<b>Similarity:</b> both find a target value in a list and can return its position. <b>Differences:</b> linear search checks each item in turn and works on any list, sorted or not. Binary search compares with the middle item and halves the range each step, so the data must be sorted. Linear search is O(N) in the average and worst case; binary search is O(log N), so it is far faster for large sorted lists (about 20 steps for a million items rather than up to a million). Linear search is simpler and better for small or unsorted lists. In a database, a full table scan is like linear search and an indexed lookup is like binary search."
    },
    {
      id: "e6", type: "code", marks: 4,
      q: "<b>Construct</b> a function <code>linear_search(a, target)</code> that returns the index of the first item equal to <code>target</code>, or <code>-1</code> if it is not in the list. Do not use <code>.index()</code>.",
      starter: "def linear_search(a, target):\n    # your code here\n    pass\n",
      solution: "def linear_search(a, target):\n    for i in range(len(a)):\n        if a[i] == target:\n            return i\n    return -1\n",
      tests: [
        { call: "linear_search([45, 12, 89, 33, 7], 33)", label: "found in the middle" },
        { call: "linear_search([45, 12, 89, 33, 7], 45)", label: "first item" },
        { call: "linear_search([45, 12, 89, 33, 7], 7)", label: "last item" },
        { call: "linear_search([45, 12, 89, 33, 7], 100)", label: "not in list" },
        { call: "linear_search([], 5)", label: "empty list" },
        { call: "linear_search([4, 9, 4], 4)", label: "duplicates: first index" }
      ],
      forbid: [".index(", ".find("],
      hints: [
        "Loop over every index: <code>for i in range(len(a))</code>.",
        "If <code>a[i] == target</code>, return <code>i</code> straight away. Only return <code>-1</code> <i>after</i> the loop."
      ],
      markscheme: [
        "Loop through the indices of the list",
        "Compares each item with the target",
        "Returns the index (not the value) as soon as a match is found",
        "Returns -1 after the loop if there was no match"
      ],
      explain: "Returning inside the loop stops the search early (like <code>break</code>). The <code>return -1</code> is outside the loop, so it runs only if every item was checked."
    },
    {
      id: "e7", type: "code", marks: 4,
      q: "<b>Construct</b> a function <code>find_score(names, scores, name)</code>. The lists <code>names</code> and <code>scores</code> are <b>parallel arrays</b> (<code>scores[i]</code> belongs to <code>names[i]</code>). Return the score of <code>name</code>, or <code>-1</code> if the name is not in the list.",
      starter: "def find_score(names, scores, name):\n    # your code here\n    pass\n",
      solution: "def find_score(names, scores, name):\n    for i in range(len(names)):\n        if names[i] == name:\n            return scores[i]\n    return -1\n",
      tests: [
        { call: "find_score(['Ana', 'Ben', 'Cy'], [72, 88, 65], 'Ben')", label: "name in the middle" },
        { call: "find_score(['Ana', 'Ben', 'Cy'], [72, 88, 65], 'Ana')", label: "first name" },
        { call: "find_score(['Ana', 'Ben', 'Cy'], [72, 88, 65], 'Cy')", label: "last name" },
        { call: "find_score(['Ana', 'Ben', 'Cy'], [72, 88, 65], 'Dee')", label: "name missing" },
        { call: "find_score([], [], 'Ana')", label: "empty lists" }
      ],
      hints: [
        "Search the <i>names</i> list for the index, but return the item at that <i>same index</i> in <code>scores</code>.",
        "Do not return <code>i</code>: the question asks for the score."
      ],
      markscheme: [
        "Loop through the indices of the names list",
        "Compares names[i] with the name searched for",
        "Returns scores[i] (the item at the same index in the parallel array)",
        "Returns -1 after the loop if the name is not found"
      ],
      explain: "Parallel arrays share an index: whatever index the name is found at, the score is at the same index in the other list."
    },
    {
      id: "e8", type: "code", marks: 5,
      q: "<b>Construct</b> a function <code>first_and_last(a, target)</code> for an unsorted list. It returns a list <code>[first, last]</code> with the index of the first and of the last occurrence of <code>target</code>. If the target is not in the list it returns <code>[-1, -1]</code>.",
      starter: "def first_and_last(a, target):\n    # your code here\n    pass\n",
      solution: "def first_and_last(a, target):\n    first = -1\n    last = -1\n    for i in range(len(a)):\n        if a[i] == target:\n            if first == -1:\n                first = i\n            last = i\n    return [first, last]\n",
      tests: [
        { call: "first_and_last([4, 9, 4, 7, 4], 4)", label: "three occurrences" },
        { call: "first_and_last([4, 9, 4, 7, 4], 9)", label: "one occurrence" },
        { call: "first_and_last([4, 9, 4, 7, 4], 5)", label: "missing" },
        { call: "first_and_last([], 1)", label: "empty list" },
        { call: "first_and_last([2, 2, 2], 2)", label: "all equal" },
        { call: "first_and_last([8], 8)", label: "single item" }
      ],
      hints: [
        "Keep two variables, <code>first</code> and <code>last</code>, both starting at -1. You must check <i>every</i> item, so do not return early.",
        "Set <code>first</code> only the first time you see the target (while <code>first</code> is still -1). Update <code>last</code> every time."
      ],
      markscheme: [
        "Initialises first and last to -1 before the loop",
        "Loop checks every index of the list (no early return)",
        "Sets first only for the first match",
        "Updates last on every match",
        "Returns both values as a list [first, last]"
      ],
      explain: "Because you need the <i>last</i> match, the loop cannot stop at the first one. This is a full pass through the list, still O(N)."
    },
    {
      id: "e9", type: "code", marks: 5,
      q: "<b>Construct</b> a function <code>find_in_grid(grid, target)</code> that searches a 2D list row by row (left to right, top to bottom). Return <code>[row, col]</code> for the first cell equal to <code>target</code>, or <code>[-1, -1]</code> if it is not found.",
      starter: "def find_in_grid(grid, target):\n    # your code here\n    pass\n",
      solution: "def find_in_grid(grid, target):\n    for r in range(len(grid)):\n        for c in range(len(grid[r])):\n            if grid[r][c] == target:\n                return [r, c]\n    return [-1, -1]\n",
      tests: [
        { call: "find_in_grid([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 6)", label: "found in row 1" },
        { call: "find_in_grid([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1)", label: "top-left cell" },
        { call: "find_in_grid([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 9)", label: "bottom-right cell" },
        { call: "find_in_grid([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 10)", label: "not in grid" },
        { call: "find_in_grid([[5, 5], [5, 5]], 5)", label: "duplicates: first one" },
        { call: "find_in_grid([], 3)", label: "empty grid" }
      ],
      hints: [
        "You need a nested loop: the outer loop over rows, the inner loop over the columns of that row.",
        "A cell is <code>grid[r][c]</code>. Return as soon as it matches; return <code>[-1, -1]</code> after both loops."
      ],
      markscheme: [
        "Outer loop goes through the rows",
        "Inner loop goes through the columns of the current row",
        "Compares grid[row][col] with the target",
        "Returns [row, col] (both indices) when found",
        "Returns [-1, -1] after both loops if not found"
      ],
      explain: "Searching a 2D list is a linear search in a nested loop. With R rows and C columns it checks up to R &times; C cells."
    },
    {
      id: "e10", type: "code", marks: 6,
      q: "<b>Construct</b> a function <code>binary_search(a, target)</code> that uses binary search on the sorted list <code>a</code>. It returns the index of <code>target</code>, or <code>-1</code> if the target is not in the list.",
      starter: "def binary_search(a, target):\n    # your code here\n    pass\n",
      solution: "def binary_search(a, target):\n    low = 0\n    high = len(a) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if a[mid] == target:\n            return mid\n        elif a[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n",
      tests: [
        { call: "binary_search([4, 7, 8, 9, 11, 15, 16, 23, 31, 42], 15)", label: "found" },
        { call: "binary_search([4, 7, 8, 9, 11, 15, 16, 23, 31, 42], 4)", label: "first item" },
        { call: "binary_search([4, 7, 8, 9, 11, 15, 16, 23, 31, 42], 42)", label: "last item" },
        { call: "binary_search([4, 7, 8, 9, 11, 15, 16, 23, 31, 42], 10)", label: "missing, inside the range" },
        { call: "binary_search([4, 7, 8, 9, 11, 15, 16, 23, 31, 42], 100)", label: "missing, bigger than all" },
        { call: "binary_search([4, 7, 8, 9, 11, 15, 16, 23, 31, 42], 1)", label: "missing, smaller than all" },
        { call: "binary_search([], 3)", label: "empty list" },
        { call: "binary_search([6], 6)", label: "single item" }
      ],
      forbid: [".index(", ".find("],
      hints: [
        "Start with <code>low = 0</code> and <code>high = len(a) - 1</code>. Loop <code>while low &lt;= high</code>.",
        "Inside the loop: <code>mid = (low + high) // 2</code>, then compare <code>a[mid]</code> with the target.",
        "Too small: <code>low = mid + 1</code>. Too big: <code>high = mid - 1</code>. After the loop return -1."
      ],
      markscheme: [
        "Initialises low = 0 and high = len(a) - 1",
        "Loop continues while low <= high",
        "Calculates mid using integer division (low + high) // 2",
        "Returns mid if a[mid] equals the target",
        "Moves the correct pointer (low = mid + 1 or high = mid - 1) without looping forever",
        "Returns -1 after the loop"
      ],
      explain: "Both <code>mid + 1</code> and <code>mid - 1</code> are needed: if you wrote <code>low = mid</code> the range might never shrink and the loop would never end."
    },
    {
      id: "e11", type: "code", marks: 5,
      q: "<b>Construct</b> a function <code>binary_steps(a, target)</code> that performs binary search on the sorted list <code>a</code> and returns the <b>number of times the middle item was examined</b> (the number of passes of the loop), whether or not the target was found.",
      starter: "def binary_steps(a, target):\n    # your code here\n    pass\n",
      solution: "def binary_steps(a, target):\n    low = 0\n    high = len(a) - 1\n    steps = 0\n    while low <= high:\n        steps = steps + 1\n        mid = (low + high) // 2\n        if a[mid] == target:\n            return steps\n        elif a[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return steps\n",
      tests: [
        { call: "binary_steps([1, 3, 5, 7, 9], 5)", label: "found on the first look" },
        { call: "binary_steps([1, 3, 5, 7, 9], 7)", label: "found on the second look" },
        { call: "binary_steps([1, 3, 5, 7, 9], 1)", label: "far left" },
        { call: "binary_steps([1, 3, 5, 7, 9], 4)", label: "not found" },
        { call: "binary_steps(list(range(1000)), 999)", label: "1000 items, last one" },
        { call: "binary_steps([], 3)", label: "empty list: zero looks" }
      ],
      hints: [
        "This is a normal binary search with a counter. Create <code>steps = 0</code> before the loop.",
        "Add 1 to the counter at the top of each pass, so a found target is also counted. Return the counter when found <i>and</i> after the loop."
      ],
      markscheme: [
        "Initialises a counter to 0 before the loop",
        "Correct binary search loop (low, high, mid with integer division)",
        "Adds 1 to the counter on every pass",
        "Pointer updates correct (mid + 1 / mid - 1)",
        "Returns the counter in both the found and not-found cases"
      ],
      explain: "For 1000 items the answer is at most 10. The counter shows how slowly the work grows: O(log N)."
    },
    {
      id: "e12", type: "code", marks: 3,
      q: "<b>Identify</b> and fix the three errors in this binary search. It should return the index of <code>target</code> in the sorted list <code>a</code>, or <code>-1</code>. (Hint: one error would also make the loop run forever on some inputs.)",
      starter: "def binary_search(a, target):\n    low = 0\n    high = len(a)\n    while low <= high:\n        mid = (low + high) / 2\n        if a[mid] == target:\n            return mid\n        elif a[mid] < target:\n            low = mid\n        else:\n            high = mid - 1\n    return -1\n",
      solution: "def binary_search(a, target):\n    low = 0\n    high = len(a) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if a[mid] == target:\n            return mid\n        elif a[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n",
      tests: [
        { call: "binary_search([4, 7, 8, 9, 11, 15, 16, 23, 31, 42], 15)", label: "found" },
        { call: "binary_search([4, 7, 8, 9, 11, 15, 16, 23, 31, 42], 42)", label: "last item" },
        { call: "binary_search([4, 7, 8, 9, 11, 15, 16, 23, 31, 42], 4)", label: "first item" },
        { call: "binary_search([4, 7, 8, 9, 11, 15, 16, 23, 31, 42], 10)", label: "missing" },
        { call: "binary_search([4, 7, 8, 9, 11, 15, 16, 23, 31, 42], 100)", label: "bigger than all" },
        { call: "binary_search([], 3)", label: "empty list" },
        { call: "binary_search([6], 6)", label: "single item" }
      ],
      hints: [
        "Check the very first line: what is the last valid index of a list of length <code>len(a)</code>?",
        "<code>/</code> gives a float such as 3.5 (or 4.0). A list index must be an integer: which operator drops the fraction?",
        "When <code>a[mid]</code> is too small, <code>mid</code> itself has already been checked. Move <code>low</code> past it."
      ],
      markscheme: [
        "high = len(a) - 1 (not len(a), which is out of range)",
        "mid = (low + high) // 2 (integer division, not /)",
        "low = mid + 1 (not low = mid, which can loop forever)"
      ],
      explain: "The three fixes: <code>high = len(a) - 1</code> (&dagger; the last valid index), <code>//</code> so <code>mid</code> is an integer, and <code>low = mid + 1</code> so the range always shrinks. With <code>low = mid</code> the same <code>mid</code> can be chosen forever and the loop never ends."
    }
  ]
}
);
