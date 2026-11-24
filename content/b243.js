// B2.4.3 Bubble sort (selection sort removed: not on the test).
B2.topics.push({
  id: "b2-4-3",
  code: "B2.4.3",
  section: "B2.4 Programming algorithms",
  title: "Bubble sort",
  summary: "Write and trace bubble sort, count its comparisons and swaps, and judge when it is a good choice.",
  minutes: 50,
  lesson: [
    {
      p: "<b>Sorting</b> puts the items of a list in order. The exam wants <b>bubble sort</b>, and above all that you can <b>trace</b> it pass by pass. Learn the picture first."
    },
    {
      h: "Bubble sort: the intuition"
    },
    {
      p: "Look at the list from left to right, two <b>neighbours</b> at a time. If the left one is bigger, swap them. By the end of the pass the <b>largest</b> item has been carried to the far right, like a bubble rising. Then start again. After pass 1 the biggest item is in its final place. After pass 2 the second biggest is in place, and so on. A list of N items needs <b>at most N - 1 passes</b>."
    },
    {
      h: "Swapping two items"
    },
    {
      p: "To swap you need somewhere to park one value. Without it, the first line overwrites an item and a value is lost. Python also allows a tuple swap in one line. Both are fine in the exam."
    },
    {
      code: `a = [5, 8]
a[0] = a[1]          # 5 is overwritten: lost!
a[1] = a[0]
print('no temp:  ', a)

a = [5, 8]
temp = a[0]
a[0] = a[1]
a[1] = temp
print('with temp:', a)

a = [5, 8]
a[0], a[1] = a[1], a[0]
print('tuple swap:', a)`
    },
    {
      h: "Bubble sort in Python (optimised)"
    },
    {
      p: "Two improvements make it efficient. <b>1.</b> After pass <code>i</code> the last <code>i</code> items are already in place, so the inner loop is shortened: <code>range(n - i - 1)</code>. <b>2.</b> A <code>swapped</code> flag: if a whole pass makes <b>no swap</b>, the list is sorted, so <code>break</code>. The program below prints the list after every pass so you can watch the bubbling."
    },
    {
      code: `a = [14, 3, 9, 1, 7]
n = len(a)
comparisons = 0
swaps = 0
for i in range(n - 1):
    swapped = False
    for j in range(n - i - 1):
        comparisons = comparisons + 1
        if a[j] > a[j + 1]:
            temp = a[j]
            a[j] = a[j + 1]
            a[j + 1] = temp
            swaps = swaps + 1
            swapped = True
    print('after pass', i + 1, ':', a)
    if not swapped:
        break
print('comparisons:', comparisons, ' swaps:', swaps)`
    },
    {
      p: "Trace of <code>[14, 3, 9, 1, 7]</code> (this is the table in your learning guide):"
    },
    {
      table: {
        head: [
          "Pass",
          "Comparisons",
          "List after the pass",
          "Swaps"
        ],
        rows: [
          [
            "1",
            "4",
            "3 9 1 7 <b>14</b>",
            "4"
          ],
          [
            "2",
            "3",
            "3 1 7 <b>9 14</b>",
            "2"
          ],
          [
            "3",
            "2",
            "1 <b>3 7 9 14</b>",
            "1"
          ],
          [
            "4",
            "1",
            "1 3 7 9 14 (no swap: stop)",
            "0"
          ],
          [
            "<b>Total</b>",
            "<b>10</b>",
            "",
            "<b>7</b>"
          ]
        ]
      }
    },
    {
      p: "Pass 4 is still a pass: it makes 1 comparison and finds no swap, and that is what tells the program to stop. If you remove the early stop and the shrinking range, you get the <b>basic</b> version: <code>for j in range(n - 1)</code> every time, so (N - 1) &times; (N - 1) comparisons whatever the data."
    },
    {
      h: "Best and worst case"
    },
    {
      table: {
        head: [
          "Case",
          "List",
          "What happens",
          "Big O"
        ],
        rows: [
          [
            "Best (optimised)",
            "Already sorted",
            "One pass, N - 1 comparisons, no swap, stop",
            "<b>O(N)</b>"
          ],
          [
            "Worst",
            "Reversed",
            "Every comparison swaps; N - 1 passes; N(N - 1) / 2 comparisons",
            "<b>O(N&sup2;)</b>"
          ],
          [
            "Average",
            "Random order",
            "About N&sup2; / 4 swaps, still nested loops",
            "O(N&sup2;)"
          ],
          [
            "Space",
            "-",
            "Sorts <b>in place</b>: one temp variable",
            "<b>O(1)</b>"
          ]
        ]
      }
    },
    {
      code: `def bubble_comparisons(a):
    n = len(a)
    count = 0
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            count = count + 1
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return count

print('sorted   :', bubble_comparisons([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
print('reversed :', bubble_comparisons([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]))`
    },
    {
      p: "For N = 10: sorted gives 9 (= N - 1, so O(N)); reversed gives 45 (= N(N - 1) / 2, so O(N&sup2;))."
    },
    {
      h: "Advantages and disadvantages for different data sets"
    },
    {
      table: {
        head: [
          "Data set",
          "Bubble sort is…",
          "Why"
        ],
        rows: [
          [
            "Small list",
            "a good choice",
            "Simple to write and check; the O(N&sup2;) cost hardly matters for a few items."
          ],
          [
            "Nearly sorted list",
            "a good choice (optimised version)",
            "The swapped flag stops it after a pass with no swaps, so it can finish in O(N)."
          ],
          [
            "Large, random list",
            "a poor choice",
            "O(N&sup2;) comparisons and many swaps: doubling N roughly quadruples the time."
          ],
          [
            "Reverse-sorted list",
            "its worst case",
            "Every comparison causes a swap: N(N - 1) / 2 comparisons and swaps."
          ],
          [
            "Little memory available",
            "fine",
            "Sorts in place: O(1) extra space (one temp variable)."
          ]
        ]
      }
    },
    {
      h: "Two common twists"
    },
    {
      p: "<b>Descending order:</b> flip the comparison from <code>&gt;</code> to <code>&lt;</code>. <b>Parallel arrays:</b> when two lists belong together (<code>names[i]</code> goes with <code>scores[i]</code>), compare on one list but swap the <b>same positions in both</b>, or the pairs get mixed up."
    },
    {
      code: `names = ['Ana', 'Ben', 'Cy', 'Dee']
scores = [72, 88, 65, 90]
n = len(scores)
for i in range(n - 1):
    for j in range(n - i - 1):
        if scores[j] < scores[j + 1]:          # < gives highest first
            scores[j], scores[j + 1] = scores[j + 1], scores[j]
            names[j], names[j + 1] = names[j + 1], names[j]
print(names)
print(scores)`
    },
    {
      trap: "Inner loop <code>range(n)</code> makes <code>a[j + 1]</code> go past the end: <b>IndexError</b>. Use <code>range(n - 1)</code> (basic) or <code>range(n - i - 1)</code> (shorter). Also: a swap without <code>temp</code> (or a tuple swap) copies one value over the other and <b>loses a value</b>."
    },
    {
      tip: "Tracing in the exam: write the list after <b>every pass</b>, count comparisons for the pass (even when there is no swap), and stop when a pass has no swaps. Learn the two numbers for N = 10: sorted gives 9 comparisons (optimised bubble), reversed gives 45; and remember the words <b>in place</b>, <b>O(1) space</b>, <b>O(N) best case with the flag</b>."
    }
  ],
  mustKnow: [
    "<b>Bubble sort</b>: compare neighbouring items and swap if in the wrong order. Each pass moves the largest remaining item to the end. At most N - 1 passes.",
    "<b>Optimised</b> bubble sort: inner loop <code>range(n - i - 1)</code> shrinks each pass, and a <code>swapped</code> flag stops the sort when a pass has no swaps.",
    "Swap with a <b>temp</b> variable (or <code>a[j], a[j+1] = a[j+1], a[j]</code>). Without temp one value is lost.",
    "Bubble sort: best case <b>O(N)</b> (sorted, optimised), worst case <b>O(N&sup2;)</b> (reversed), space <b>O(1)</b> (in place).",
    "Good for small or nearly sorted lists (simple, in place, stops early); poor for large random lists (O(N&sup2;)).",
    "Trace of [14, 3, 9, 1, 7]: 4 passes, 10 comparisons, 7 swaps (pass 4 has no swaps, so it stops).",
    "<b>Descending</b>: reverse the comparison. <b>Parallel arrays</b>: compare one list, swap both."
  ],
  terms: [
    {
      term: "Bubble sort",
      def: "A sorting algorithm that repeatedly compares neighbouring items and swaps them if they are in the wrong order, so the largest remaining item moves to the end on each pass."
    },
    {
      term: "Pass",
      def: "One complete run of the inner loop through the part of the list that is still unsorted."
    },
    {
      term: "Swapped flag",
      def: "A Boolean set to True when a swap happens in a pass; if it is still False at the end of a pass the list is sorted and the sort can stop early."
    },
    {
      term: "Temporary variable (swap)",
      def: "A variable that holds one value while two items are exchanged, so that no value is overwritten and lost."
    },
    {
      term: "In place",
      def: "Sorting by rearranging the items inside the original list, using only O(1) extra memory."
    },
    {
      term: "Best case of optimised bubble sort",
      def: "An already sorted list: one pass of N - 1 comparisons with no swap, so the time is O(N)."
    },
    {
      term: "Parallel arrays",
      def: "Two or more lists where the items at the same index belong together, so they must be swapped together when sorting."
    }
  ],
  exercises: [
    {
      id: "e1",
      type: "mcq",
      marks: 1,
      q: "<b>Identify</b> the time complexity of bubble sort (with the <code>swapped</code> flag) on a list of N items that is <b>already sorted</b>.",
      options: [
        "O(1)",
        "O(N)",
        "O(N&sup2;)",
        "O(log N)"
      ],
      answer: 1,
      explain: "With the flag, the first pass makes N - 1 comparisons and no swap, so the sort stops: O(N). (Without the flag, bubble sort would always make every pass: O(N&sup2;) even on a sorted list.)"
    },
    {
      id: "e3",
      type: "output",
      marks: 2,
      q: "<b>State</b> the output of this program, which tries to swap two items in two different ways.",
      code: `a = [5, 8]
a[0] = a[1]
a[1] = a[0]
print(a)
b = [5, 8]
b[0], b[1] = b[1], b[0]
print(b)`,
      explain: "In the first swap, <code>a[0] = a[1]</code> overwrites the 5 with 8, so <code>a[1] = a[0]</code> copies 8 again: [8, 8]. A temp variable (or the tuple swap used for <code>b</code>) keeps the 5: [8, 5]."
    },
    {
      id: "e4",
      type: "output",
      marks: 2,
      q: "<b>State</b> the output of this program. It runs <b>one pass</b> of bubble sort.",
      code: `a = [4, 2, 7, 1]
swaps = 0
for j in range(len(a) - 1):
    if a[j] > a[j + 1]:
        temp = a[j]
        a[j] = a[j + 1]
        a[j + 1] = temp
        swaps = swaps + 1
print(a)
print(swaps)`,
      explain: "4 &gt; 2: swap, [2, 4, 7, 1]. 4 &gt; 7? No. 7 &gt; 1: swap, [2, 4, 1, 7]. Two swaps, and the largest item (7) is now at the end. The list is not sorted yet: one pass is not enough."
    },
    {
      id: "e5",
      type: "trace",
      marks: 5,
      q: "<b>Trace</b> this bubble sort. After each pass the program prints the list. Complete the table: one row per pass, writing the list as, for example, <code>[3, 9, 1, 7, 14]</code>. The <code>Start</code> row is the list before sorting.",
      code: `a = [5, 1, 4, 2, 8]
n = len(a)
for i in range(n - 1):
    for j in range(n - i - 1):
        if a[j] > a[j + 1]:
            temp = a[j]
            a[j] = a[j + 1]
            a[j + 1] = temp
    print(i + 1, a)`,
      columns: [
        "Pass",
        "List after the pass"
      ],
      rows: [
        [
          "Start",
          "[5, 1, 4, 2, 8]"
        ],
        [
          "1",
          "[1, 4, 2, 5, 8]"
        ],
        [
          "2",
          "[1, 2, 4, 5, 8]"
        ],
        [
          "3",
          "[1, 2, 4, 5, 8]"
        ],
        [
          "4",
          "[1, 2, 4, 5, 8]"
        ]
      ],
      prefill: 1,
      labelCol: true,
      explain: "Pass 1: 5 moves right past 1, 4 and 2, and stops below 8: [1, 4, 2, 5, 8]. Pass 2: only 4 &gt; 2 swaps: [1, 2, 4, 5, 8]. The list is sorted after pass 2, but this version has <b>no swapped flag</b>, so it still runs passes 3 and 4 and the list does not change."
    },
    {
      id: "e6",
      type: "trace",
      marks: 6,
      q: "<b>Trace</b> this optimised bubble sort. Each row is the state at the <b>end of a pass</b>. <code>comparisons</code> and <code>swaps</code> are running totals. Write <code>swapped</code> as <code>True</code> or <code>False</code> and the list as, for example, <code>[2, 5, 3, 6]</code>.",
      code: `a = [6, 2, 5, 3]
n = len(a)
comparisons = 0
swaps = 0
for i in range(n - 1):
    swapped = False
    for j in range(n - i - 1):
        comparisons = comparisons + 1
        if a[j] > a[j + 1]:
            temp = a[j]
            a[j] = a[j + 1]
            a[j + 1] = temp
            swaps = swaps + 1
            swapped = True
    if not swapped:
        break`,
      columns: [
        "Pass",
        "comparisons",
        "swaps",
        "swapped",
        "a"
      ],
      rows: [
        [
          "Start",
          "0",
          "0",
          "",
          "[6, 2, 5, 3]"
        ],
        [
          "1",
          "3",
          "3",
          "True",
          "[2, 5, 3, 6]"
        ],
        [
          "2",
          "5",
          "4",
          "True",
          "[2, 3, 5, 6]"
        ],
        [
          "3",
          "6",
          "4",
          "False",
          "[2, 3, 5, 6]"
        ]
      ],
      prefill: 1,
      labelCol: true,
      explain: "Pass 1 compares 3 pairs (inner range is n - 1 = 3) and swaps every time: 6 moves to the end. Pass 2 compares 2 pairs (range 2) and swaps one: 5 &gt; 3. Pass 3 compares 1 pair (2 &lt; 3), no swap, so <code>swapped</code> stays False and the loop breaks. Totals: 6 comparisons, 4 swaps."
    },
    {
      id: "e7",
      type: "trace",
      marks: 5,
      q: "<b>Trace</b> this optimised bubble sort on a <b>nearly sorted</b> list. Each row is the state at the end of a pass; <code>comparisons</code> and <code>swaps</code> are running totals. Write the list as, for example, <code>[1, 2, 3, 4, 5, 6]</code> and <code>swapped</code> as <code>True</code> or <code>False</code>. The sort stops early.",
      code: `a = [1, 2, 4, 3, 5, 6]
n = len(a)
comparisons = 0
swaps = 0
for i in range(n - 1):
    swapped = False
    for j in range(n - i - 1):
        comparisons = comparisons + 1
        if a[j] > a[j + 1]:
            a[j], a[j + 1] = a[j + 1], a[j]
            swaps = swaps + 1
            swapped = True
    if not swapped:
        break`,
      columns: [
        "Pass",
        "comparisons",
        "swaps",
        "swapped",
        "a"
      ],
      rows: [
        [
          "Start",
          "0",
          "0",
          "",
          "[1, 2, 4, 3, 5, 6]"
        ],
        [
          "1",
          "5",
          "1",
          "True",
          "[1, 2, 3, 4, 5, 6]"
        ],
        [
          "2",
          "9",
          "1",
          "False",
          "[1, 2, 3, 4, 5, 6]"
        ]
      ],
      prefill: 1,
      labelCol: true,
      explain: "Pass 1: 5 comparisons, only 4 &gt; 3 swaps, so the list is already sorted. But the program does not know that until a pass makes no swap: pass 2 makes 4 more comparisons (the inner range has shrunk to 4), finds <code>swapped = False</code> and breaks. Total 9 comparisons, 1 swap. Without the flag it would need 5 + 4 + 3 + 2 + 1 = 15."
    },
    {
      id: "e9",
      type: "code",
      marks: 6,
      q: "<b>Construct</b> a function <code>bubble_sort(a)</code> that sorts the list <code>a</code> <b>in place</b> into ascending order using the optimised bubble sort: the inner loop shrinks by one each pass and the sort stops after a pass with no swap. It returns the <b>number of comparisons</b> made (every time two items are compared). Do not use <code>sorted()</code> or <code>.sort()</code>.",
      starter: `def bubble_sort(a):
    # your code here
    pass
`,
      solution: `def bubble_sort(a):
    n = len(a)
    count = 0
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            count = count + 1
            if a[j] > a[j + 1]:
                temp = a[j]
                a[j] = a[j + 1]
                a[j + 1] = temp
                swapped = True
        if not swapped:
            break
    return count
`,
      tests: [
        {
          setup: "a = [5, 1, 4, 2, 8]",
          call: "bubble_sort(a)",
          after: "a",
          label: "mixed list"
        },
        {
          setup: "a = [14, 3, 9, 1, 7]",
          call: "bubble_sort(a)",
          after: "a",
          label: "the guide's list: 10 comparisons"
        },
        {
          setup: "a = []",
          call: "bubble_sort(a)",
          after: "a",
          label: "empty list"
        },
        {
          setup: "a = [7]",
          call: "bubble_sort(a)",
          after: "a",
          label: "one item"
        },
        {
          setup: "a = [1, 2, 3, 4, 5]",
          call: "bubble_sort(a)",
          after: "a",
          label: "already sorted: stops after one pass"
        },
        {
          setup: "a = [5, 4, 3, 2, 1]",
          call: "bubble_sort(a)",
          after: "a",
          label: "reverse sorted: 10 comparisons"
        },
        {
          setup: "a = [3, 1, 3, 2, 1]",
          call: "bubble_sort(a)",
          after: "a",
          label: "duplicates"
        },
        {
          setup: "a = [1, 2, 4, 3, 5, 6]",
          call: "bubble_sort(a)",
          after: "a",
          label: "nearly sorted: 9 comparisons"
        }
      ],
      forbid: [
        "sorted(",
        ".sort("
      ],
      hints: [
        "Outer loop <code>for i in range(n - 1)</code>. At the top of each pass set <code>swapped = False</code>. Inner loop <code>for j in range(n - i - 1)</code>.",
        "Add 1 to a counter every time you compare <code>a[j]</code> with <code>a[j + 1]</code>, whether or not you swap. Swap with a temp variable and set <code>swapped = True</code>.",
        "After the inner loop: <code>if not swapped: break</code>. Return the counter after the loops."
      ],
      markscheme: [
        "Outer loop for the passes (at most n - 1)",
        "Inner loop compares neighbours a[j] and a[j + 1] with a range that does not go past the end of the list (shrinks with i)",
        "Swaps correctly when a[j] > a[j + 1] (using temp or tuple swap)",
        "Sets a swapped flag when a swap happens and resets it at the start of each pass",
        "Stops (break) when a pass has no swap",
        "Counts every comparison and returns the count"
      ],
      explain: "The list is changed in place (O(1) extra space) and the count is returned. On a sorted list of N items the count is N - 1 (best case, O(N)); on a reversed list it is N(N - 1) / 2 (worst case, O(N&sup2;))."
    },
    {
      id: "e10",
      type: "code",
      marks: 3,
      q: "<b>Identify</b> and fix the <b>three</b> errors in this bubble sort. It should sort <code>a</code> in place into ascending order. (One error crashes the program with an IndexError, one loses values, one stops the sort too early.)",
      starter: `def bubble_sort(a):
    n = len(a)
    for i in range(n - 2):
        for j in range(n - i):
            if a[j] > a[j + 1]:
                a[j] = a[j + 1]
                a[j + 1] = a[j]
`,
      solution: `def bubble_sort(a):
    n = len(a)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if a[j] > a[j + 1]:
                temp = a[j]
                a[j] = a[j + 1]
                a[j + 1] = temp
`,
      tests: [
        {
          setup: "a = [3, 1, 2]",
          call: "bubble_sort(a)",
          after: "a",
          label: "three items"
        },
        {
          setup: "a = [4, 3, 2, 1]",
          call: "bubble_sort(a)",
          after: "a",
          label: "reverse sorted (needs n - 1 passes)"
        },
        {
          setup: "a = [1, 2, 3]",
          call: "bubble_sort(a)",
          after: "a",
          label: "already sorted"
        },
        {
          setup: "a = [2, 1, 2, 1]",
          call: "bubble_sort(a)",
          after: "a",
          label: "duplicates"
        },
        {
          setup: "a = [9]",
          call: "bubble_sort(a)",
          after: "a",
          label: "one item"
        },
        {
          setup: "a = []",
          call: "bubble_sort(a)",
          after: "a",
          label: "empty list"
        }
      ],
      hints: [
        "In the inner loop <code>j + 1</code> must never reach <code>n</code>. What should the range be on pass <code>i</code>?",
        "Look at the two swap lines: after the first line, what is still stored in <code>a[j]</code>? You need a temp variable.",
        "How many passes might a list of N items need, at most?"
      ],
      markscheme: [
        "Inner range changed to range(n - i - 1) (or n - 1) so a[j + 1] stays inside the list",
        "Swap uses a temp variable (or tuple swap) so no value is lost",
        "Outer loop changed to range(n - 1) so enough passes are made"
      ],
      explain: "<code>range(n - i)</code> reaches <code>j = n - 1</code> on pass 0, so <code>a[j + 1]</code> is <code>a[n]</code>: IndexError. The two-line swap without temp copies the same value twice. <code>range(n - 2)</code> gives only n - 2 passes, but a reversed list needs n - 1."
    },
    {
      id: "e12",
      type: "code",
      marks: 6,
      q: "<b>Construct</b> a procedure <code>sort_by_score(names, scores)</code>. The lists are <b>parallel arrays</b> (<code>scores[i]</code> belongs to <code>names[i]</code>). Using a bubble sort, sort both lists <b>in place</b> so the scores are in <b>descending</b> order (highest first) and every name stays with its score. Do not use <code>sorted()</code>, <code>.sort()</code> or <code>zip(</code>.",
      starter: `def sort_by_score(names, scores):
    # your code here
    pass
`,
      solution: `def sort_by_score(names, scores):
    n = len(scores)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if scores[j] < scores[j + 1]:
                temp = scores[j]
                scores[j] = scores[j + 1]
                scores[j + 1] = temp
                temp = names[j]
                names[j] = names[j + 1]
                names[j + 1] = temp
`,
      tests: [
        {
          setup: "names = ['Ana', 'Ben', 'Cy', 'Dee']; scores = [72, 88, 65, 90]",
          call: "sort_by_score(names, scores)",
          after: "[names, scores]",
          label: "four students"
        },
        {
          setup: "names = ['Ana', 'Ben', 'Cy']; scores = [10, 20, 30]",
          call: "sort_by_score(names, scores)",
          after: "[names, scores]",
          label: "sorted ascending: fully reversed"
        },
        {
          setup: "names = ['Ana', 'Ben', 'Cy']; scores = [30, 20, 10]",
          call: "sort_by_score(names, scores)",
          after: "[names, scores]",
          label: "already in the right order"
        },
        {
          setup: "names = ['Zoe']; scores = [55]",
          call: "sort_by_score(names, scores)",
          after: "[names, scores]",
          label: "one student"
        },
        {
          setup: "names = []; scores = []",
          call: "sort_by_score(names, scores)",
          after: "[names, scores]",
          label: "empty lists"
        },
        {
          setup: "names = ['Al', 'Bo', 'Cy', 'Di', 'Ed']; scores = [50, 91, 7, 63, 28]",
          call: "sort_by_score(names, scores)",
          after: "[names, scores]",
          label: "five students"
        }
      ],
      forbid: [
        "sorted(",
        ".sort(",
        "zip("
      ],
      hints: [
        "Compare <code>scores[j]</code> with <code>scores[j + 1]</code>. For highest first, swap when the left score is <i>smaller</i> (<code>&lt;</code>).",
        "Inside the <code>if</code>, swap the two scores <b>and</b> the two names at the same positions <code>j</code> and <code>j + 1</code>."
      ],
      markscheme: [
        "Outer and inner loops make the passes with an inner range that stays inside the list",
        "Compares neighbouring scores",
        "Comparison is the right way round for descending order (scores[j] < scores[j + 1])",
        "Swaps the two scores correctly (temp or tuple swap)",
        "Swaps the two names at the same positions in the same step",
        "Sorts in place (no new lists returned or needed)"
      ],
      explain: "If you swapped only the scores, each name would end up next to the wrong score. Parallel arrays must always be swapped together. Descending order is just the comparison flipped."
    },
    {
      id: "e15",
      type: "written",
      marks: 3,
      q: "<b>Explain</b> why optimised bubble sort (with a <code>swapped</code> flag) is O(N) in the best case but O(N&sup2;) in the worst case.",
      markscheme: [
        "Best case is an already sorted list (1 mark)",
        "The first pass makes N - 1 comparisons, finds no swap, and the flag stops the sort: about N steps, O(N) (1 mark)",
        "Worst case is a reversed list: every pass is needed, (N - 1) + (N - 2) + … + 1 = N(N - 1) / 2 comparisons (1 mark)",
        "N(N - 1) / 2 grows with N&sup2; (dominant term, constants dropped), so O(N&sup2;) (1 mark)"
      ],
      model: "If the list is already sorted, the first pass makes N - 1 comparisons and no swaps, so the swapped flag stays False and the sort stops: the work grows linearly, O(N). If the list is in reverse order, every pass is needed and the passes make (N - 1) + (N - 2) + … + 1 = N(N - 1)/2 comparisons. The dominant term is N&sup2;, so the worst case is O(N&sup2;)."
    },
    {
      id: "e16",
      type: "written",
      marks: 4,
      context: "A school app sorts lists of students by score. One list holds the 25 students in a class and is usually already almost in order. Another holds all 40 000 exam results from a region, in random order.",
      q: "<b>Discuss</b> the advantages and disadvantages of using bubble sort for each of these two data sets.",
      markscheme: [
        "Class list: small N, so the O(N&sup2;) cost is negligible (1 mark)",
        "Class list: nearly sorted, so optimised bubble sort stops early after few passes, close to O(N) (1 mark)",
        "Bubble sort is simple to write, test and maintain (1 mark)",
        "Sorts in place: O(1) extra memory (1 mark)",
        "Regional list: large and random, so about N&sup2;/2 = 800 million comparisons: too slow, poor scalability (1 mark)",
        "Many swaps on random data add to the time; an O(N log N) sort would scale better (1 mark)"
      ],
      model: "For the class list bubble sort is a reasonable choice: with only 25 items the O(N&sup2;) cost is tiny, and because the list is nearly sorted the optimised version stops after a pass with no swaps, so it runs in close to O(N). It is simple, easy to check and sorts in place using O(1) extra memory. For the 40 000 random results it is a poor choice: it needs about N&sup2;/2 &asymp; 800 million comparisons and many swaps, so it scales badly; an O(N log N) algorithm would be far faster."
    }
  ]
});
