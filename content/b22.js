B2.topics.push(
/* ===================================================================== */
{
  id: "b2-2-1",
  code: "B2.2.1",
  section: "B2.2 Data structures",
  title: "Static vs dynamic data structures",
  summary: "Compare static and dynamic structures (memory, speed, errors, access) and choose the right one for a scenario.",
  minutes: 25,
  lesson: [
    { p: "Every program stores data somewhere in memory. The big question is: <b>do you know how much data there will be before the program runs?</b> If yes, you can reserve exactly that much. If no, the structure has to grow and shrink while the program runs. That one question splits structures into <b>static</b> and <b>dynamic</b>." },
    { h: "The two ideas" },
    { table: { head: ["Term", "Meaning"], rows: [
      ["<b>Static structure</b>", "<b>Fixed size</b>, set before the program runs. One continuous block of memory. Example: a Python <b>tuple</b> (and the classic fixed-size array)."],
      ["<b>Dynamic structure</b>", "<b>Changes size</b> at run time by requesting more memory when needed. Example: a Python <b>list</b>. A <b>linked list</b> stores a reference to the next element."],
      ["<b>Memory allocation</b>", "Reserving memory for the program. Static: <b>once</b>, at creation. Dynamic: <b>as needed</b>, it grows and shrinks."]
    ] } },
    { h: "Full comparison (learn this table)" },
    { table: { head: ["Factor", "Static", "Dynamic"], rows: [
      ["<b>Memory</b>", "Unused slots are wasted (100 reserved, 5 used)", "Adjusts size, but over-allocates (e.g. doubles) and stores references"],
      ["<b>Speed</b>", "Fast direct access: the location is calculated", "Slower: follow references or pay a resize cost"],
      ["<b>Errors</b>", "Overflow beyond capacity: <code>IndexError</code>", "Grows automatically; unlimited growth can exhaust memory"],
      ["<b>Access</b>", "<b>Direct</b>: jump to any element by index", "<b>Sequential</b>: follow links from the start (linked list)"],
      ["<b>Insert / delete</b>", "Leaves a vacant slot or shifts items; inserting between items is slow", "Relink or resize: efficient in time and space"],
      ["<b>Programming</b>", "Easier: no size tracking, no overflow / underflow handling", "Harder: track size; handle <b>overflow</b> (full) and <b>underflow</b> (empty)"],
      ["<b>Stored in</b>", "Stack (fast, fixed region)", "Heap (flexible, needs garbage collection)"],
      ["<b>Use when</b>", "Size known and fixed (12 monthly codes)", "Size unpredictable (shopping cart, chat messages)"]
    ] } },
    { h: "In Python" },
    { p: "A tuple cannot change, so to \"change\" it you build a new one. A list just grows." },
    { code: `cart = (None,) * 10        # static: a tuple of 10 empty slots
print(len(cart))
cart = ("Laptop",) + cart[1:]   # builds a NEW tuple, slot 0 replaced
print(cart[0], len(cart))

c = []                     # dynamic: starts empty
c.append("Laptop")
c.append("Mouse")
print(c, len(c))` },
    { p: "A fixed-size array is often imitated with a list of <code>None</code> values. Writing past the end is an overflow error:" },
    { code: `slots = [None] * 3
slots[0] = "A"
try:
    slots[3] = "D"          # no such slot: capacity is 3
except IndexError:
    print("overflow: index 3 does not exist")
print(slots)` },
    { h: "Why resizing is not free" },
    { p: "To grow a block, the system allocates a <b>new, larger block</b> and <b>copies every element</b> across. The more elements, the more copying. Here is the idea by hand:" },
    { code: `old = [10, 20, 30]
new = [None] * 6            # bigger block
for i in range(len(old)):   # copy every element: cost grows with len(old)
    new[i] = old[i]
print(new)` },
    { trap: "<b>Resizing is not free.</b> A dynamic structure is flexible, but a resize costs time proportional to the number of elements, and it over-allocates memory. Do not write \"dynamic is always faster\"." },
    { tip: "<b>Compare</b> means similarities <i>and</i> differences. A similarity you can always give: both hold a collection of data in memory and are accessed by code. Then give 3-4 paired differences (one static point, the matching dynamic point) from the table." }
  ],
  mustKnow: [
    "<b>Static</b> = fixed size, set before the program runs, one continuous block, fast direct access, risks overflow (<code>IndexError</code>), wastes unused slots.",
    "<b>Dynamic</b> = size changes at run time (Python list, linked list), flexible, but resize cost and extra memory for references.",
    "Static is stored on the <b>stack</b>; dynamic on the <b>heap</b> (needs garbage collection).",
    "Static access is <b>direct</b> (by index); linked list access is <b>sequential</b>.",
    "Dynamic is harder to program: you must handle <b>overflow</b> and <b>underflow</b>.",
    "<b>Resizing is not free</b>: allocate a bigger block and copy every element.",
    "Use static when size is known and fixed; dynamic when it is unpredictable."
  ],
  terms: [
    { term: "Static data structure", def: "A structure whose size is fixed before the program runs and is stored in one continuous block of memory." },
    { term: "Dynamic data structure", def: "A structure whose size can change at run time by requesting or releasing memory as needed." },
    { term: "Memory allocation", def: "Reserving an area of memory for a program to store data in; static once at creation, dynamic as needed." },
    { term: "Tuple", def: "An immutable, fixed-size Python sequence; its elements cannot be changed after creation." },
    { term: "Linked list", def: "A dynamic structure in which each element stores a reference (pointer) to the next element." },
    { term: "Stack (memory)", def: "A fast, fixed region of memory where statically sized data is stored." },
    { term: "Heap", def: "A flexible region of memory where dynamic data is stored; unused memory needs garbage collection." },
    { term: "Overflow", def: "An attempt to store more data than a fixed-capacity structure can hold." }
  ],
  exercises: [
    { id: "e1", type: "mcq", marks: 1,
      q: "<b>Identify</b> the statement that correctly describes a static data structure.",
      options: [
        "Its size can grow as items are added at run time.",
        "Its size is fixed before the program runs and stored in one continuous block.",
        "Each item stores a reference to the next item.",
        "It is stored on the heap and needs garbage collection."
      ], answer: 1,
      explain: "Static = fixed size set in advance, continuous block of memory. The other three describe dynamic structures (growth, linked list, heap)." },
    { id: "e2", type: "mcq", marks: 1,
      context: "A school stores the 12 monthly report codes (always exactly 12, never changing).",
      q: "<b>Identify</b> the most suitable structure.",
      options: [
        "A dynamic structure, because it is always faster",
        "A static structure, because the size is known and fixed",
        "A dynamic structure, because static structures cannot store strings",
        "A linked list, because direct access is needed"
      ], answer: 1,
      explain: "Size known and fixed means static: fast direct access, no wasted slots, nothing to resize. Dynamic is not \"always faster\" (resizing costs time), and a linked list gives sequential, not direct, access." },
    { id: "e3", type: "mcq", marks: 1,
      q: "<b>Identify</b> the main drawback of making a static structure much larger than the data it usually holds.",
      options: [
        "Access by index becomes sequential",
        "Unused slots waste memory",
        "It raises a run-time resize error",
        "The garbage collector slows down"
      ], answer: 1,
      explain: "A static block is reserved in full whether it is used or not (100 reserved, 5 used), so memory is wasted." },
    { id: "e4", type: "output", marks: 2,
      q: "<b>State</b> the output of the code.",
      code: `a = (5, 6)
b = a
a = a + (7,)
print(a)
print(b)
l = [5, 6]
m = l
l.append(7)
print(m)` ,
      explain: "<code>a + (7,)</code> builds a <i>new</i> tuple, so <code>b</code> still refers to the old (5, 6). A list is changed in place, and <code>m</code> refers to the same list as <code>l</code>." },
    { id: "e5", type: "output", marks: 2,
      q: "<b>State</b> the output of the code.",
      code: `slots = [None] * 3
for i in range(5):
    try:
        slots[i] = i * 10
    except IndexError:
        print("overflow at", i)
print(slots)` ,
      explain: "Indexes 0-2 exist. At i = 3 and i = 4 the write is beyond the capacity of 3, so IndexError is caught and printed. The list never grows." },
    { id: "e6", type: "trace", marks: 4,
      q: "<b>Trace</b> the code. Write the list <code>c</code> in Python format, e.g. <code>[0, 2]</code>, as it is at the <b>end</b> of each pass of the loop.",
      code: `c = []
for i in range(4):
    c.append(i * 2)
    if len(c) > 3:
        c.pop(0)
print(c)`,
      columns: ["Pass", "i", "c", "len(c) > 3", "Output"],
      rows: [
        ["Start", "", "[]", "", ""],
        ["1", "0", "[0]", "False", ""],
        ["2", "1", "[0, 2]", "False", ""],
        ["3", "2", "[0, 2, 4]", "False", ""],
        ["4", "3", "[2, 4, 6]", "True", ""],
        ["End", "", "", "", "[2, 4, 6]"]
      ],
      prefill: 2, labelCol: true,
      explain: "On pass 4 the list is [0, 2, 4, 6]; its length is 4, so the condition is True and <code>pop(0)</code> removes the first item, shifting the rest left. This list is dynamic: it changes size." },
    { id: "e7", type: "code", marks: 4,
      context: "A fixed-size shopping array is a list of <code>None</code> values; <code>None</code> means the slot is vacant.",
      q: "<b>Construct</b> a function <code>add_item(cart, item)</code> that stores <code>item</code> in the <b>first vacant slot</b> of <code>cart</code> and returns <code>True</code>. If there is no vacant slot it must leave the array unchanged and return <code>False</code> (overflow). The array must never change size.",
      starter: `def add_item(cart, item):
    # your code here
    pass`,
      solution: `def add_item(cart, item):
    for i in range(len(cart)):
        if cart[i] is None:
            cart[i] = item
            return True
    return False`,
      tests: [
        { label: "empty array", setup: "cart = [None] * 3", call: "add_item(cart, 'Hat')", after: "cart" },
        { label: "partly full", setup: "cart = ['Hat', 'Shoes', None, None]", call: "add_item(cart, 'Socks')", after: "cart" },
        { label: "full array returns False", setup: "cart = ['A', 'B']", call: "add_item(cart, 'C')", after: "cart" },
        { label: "vacant slot in the middle", setup: "cart = ['A', None, 'C']", call: "add_item(cart, 'B')", after: "cart" }
      ],
      hints: ["Loop over the indexes with <code>range(len(cart))</code>.", "A vacant slot is <code>cart[i] is None</code>. Return as soon as you store the item.", "Only return <code>False</code> after the loop has finished."],
      markscheme: ["Loops through the slots of the array", "Tests whether a slot is vacant (None)", "Stores the item and returns True for the first vacant slot (then stops)", "Returns False after the loop if no slot was vacant, without changing the size"],
      explain: "The array is static: it can only fill slots, never append. A full array is the overflow case." },
    { id: "e8", type: "code", marks: 3,
      context: "A tuple is static: its items cannot be assigned to.",
      q: "<b>Construct</b> a function <code>replace_item(t, i, value)</code> that returns a <b>new tuple</b> equal to <code>t</code> but with the item at index <code>i</code> replaced by <code>value</code>. Assume <code>i</code> is a valid index.",
      starter: `def replace_item(t, i, value):
    # your code here
    pass`,
      solution: `def replace_item(t, i, value):
    return t[:i] + (value,) + t[i + 1:]`,
      tests: [
        { call: "replace_item((1, 2, 3), 1, 9)" },
        { label: "first item", call: "replace_item(('a', 'b'), 0, 'z')" },
        { label: "last item", call: "replace_item((4, 5, 6, 7), 3, 0)" },
        { label: "single item", call: "replace_item((1,), 0, 2)" }
      ],
      hints: ["You cannot write <code>t[i] = value</code> on a tuple.", "Slice before <code>i</code>, add a one-item tuple <code>(value,)</code>, then slice after <code>i</code>."],
      markscheme: ["Takes the items before index i", "Includes the new value as a one-item tuple (value,)", "Takes the items after index i and joins the three parts, returning the new tuple"],
      explain: "Building a new tuple copies every item. That copy is why \"changing\" a static structure is expensive." },
    { id: "e9", type: "code", marks: 4,
      context: "Growing a fixed block means allocating a new, bigger one and copying everything across.",
      q: "<b>Construct</b> a function <code>resize(old, new_size)</code> that creates a <b>new</b> list of <code>new_size</code> slots (all <code>None</code>), copies every element of <code>old</code> into it in the same positions, and returns the new list. Assume <code>new_size</code> is at least <code>len(old)</code>. Do not use <code>extend</code>, <code>copy</code> or slicing.",
      starter: `def resize(old, new_size):
    # your code here
    pass`,
      solution: `def resize(old, new_size):
    new = [None] * new_size
    for i in range(len(old)):
        new[i] = old[i]
    return new`,
      forbid: ["extend", ".copy(", "[:"],
      tests: [
        { call: "resize([1, 2, 3], 5)" },
        { label: "same size", call: "resize([4, 5], 2)" },
        { label: "empty old array", call: "resize([], 3)" },
        { label: "original is not modified", setup: "a = [7, 8]", call: "resize(a, 4)", after: "a" }
      ],
      hints: ["Start with <code>new = [None] * new_size</code>.", "Loop over the indexes of <code>old</code> and copy one element at a time."],
      markscheme: ["Creates a new list of new_size slots initialised to None", "Loop over every element of old", "Copies each element to the same index in the new list", "Returns the new list (old is not changed)"],
      explain: "The loop runs once per element, so the cost grows with the number of elements. Resizing is not free." },
    { id: "e10", type: "code", marks: 2,
      q: "The code below should add an item to a dynamic shopping cart, but it crashes with <code>IndexError</code>. <b>Identify</b> the error and <b>correct</b> the function so it returns the cart with the item added at the end.",
      starter: `def add_to_cart(cart, item):
    cart[len(cart)] = item
    return cart`,
      solution: `def add_to_cart(cart, item):
    cart.append(item)
    return cart`,
      tests: [
        { call: "add_to_cart([], 'Pen')" },
        { call: "add_to_cart(['Pen'], 'Book')" },
        { label: "list is changed in place", setup: "c = ['A', 'B']", call: "add_to_cart(c, 'C')", after: "c" }
      ],
      hints: ["Index <code>len(cart)</code> does not exist yet, so you cannot assign to it.", "A dynamic list grows with a method, not by assigning to a new index."],
      markscheme: ["Identifies that assigning to cart[len(cart)] is out of range (index does not exist)", "Uses append to add the item (list grows) and returns the cart"],
      explain: "Assignment by index only works on slots that already exist (static behaviour). <code>append</code> asks the dynamic list for more memory." },
    { id: "e11", type: "written", marks: 4,
      q: "<b>Compare</b> static and dynamic data structures.",
      markscheme: [
        "Static size is fixed before the program runs; dynamic size can change at run time (1)",
        "Static can waste memory (unused slots); dynamic uses only what is needed (but over-allocates / stores references) (1)",
        "Static gives fast direct access by index; dynamic (linked list) is slower / sequential, or pays a resize cost (1)",
        "Static can overflow (IndexError) when full; dynamic grows automatically but unlimited growth could exhaust memory (1)",
        "Static is easier to program (no size tracking); dynamic is harder (must handle overflow and underflow) (1)",
        "Static insertion/deletion is slow (shifting); dynamic can relink or resize efficiently (1)",
        "Static stored on the stack; dynamic on the heap (1)",
        "Similarity: both store a collection of data in memory that is accessed by code (1)"
      ],
      model: "A static structure has a fixed size set before the program runs, so some reserved slots may be wasted, but access is fast and direct by index. If it is full, adding more data causes an overflow error. A dynamic structure changes size at run time, so memory is used as needed, but resizing means allocating a bigger block and copying, and it is harder to program (track size, handle overflow and underflow). Both store a collection of data in memory that is accessed by code.",
      explain: "Make every point a pair: one static point and the matching dynamic point. A one-sided answer scores no comparison marks." },
    { id: "e12", type: "written", marks: 2,
      q: "A student says: \"A dynamic structure is always better because it can grow, and growing is free.\" <b>Explain</b> why the second claim is wrong.",
      markscheme: [
        "To grow, a new larger block of memory must be allocated (1)",
        "and every existing element is copied across, so the cost grows with the number of elements (1)",
        "Dynamic structures also over-allocate memory and store references (1)"
      ],
      model: "Resizing is not free. A new, larger block is allocated and every existing element is copied into it, so the time taken grows with the number of elements. The structure also over-allocates memory in advance.",
      explain: "This is the exam trap from the guide: flexible does not mean free." }
  ]
},

/* ===================================================================== */
{
  id: "b2-2-2",
  code: "B2.2.2",
  section: "B2.2 Data structures",
  title: "1D and 2D arrays and lists",
  summary: "Create, traverse and modify 1D and 2D lists, and write the standard total / minimum / count / row / column / diagonal patterns.",
  minutes: 40,
  lesson: [
    { p: "An <b>array</b> (in Python, a list) is a row of boxes under <b>one name</b>. Each box has a number, its <b>index</b>, and counting starts at <b>0</b>. Elements are normally all the same data type. A <b>2D array</b> is a table: a list of rows, each row a list. You find a cell with <code>[row][column]</code>." },
    { h: "1D basics" },
    { table: { head: ["Task", "Python"], rows: [
      ["Create with values", "<code>g = [75, 64, 95, 50, 34]</code>"],
      ["Create 5 zeros", "<code>g = [0] * 5</code> or <code>[0 for i in range(5)]</code>"],
      ["Empty dynamic list", "<code>g = []</code>, then <code>g[0] = 75</code> raises <code>IndexError</code>; use <code>g.append(75)</code>"],
      ["Read / change element", "<code>g[2]</code>, <code>g[2] = 60</code> (first index 0, last <code>len(g) - 1</code>)"],
      ["Traverse by index / by element", "<code>for i in range(len(g)):</code> or <code>for x in g:</code>"],
      ["Fill from the user", "<code>for i in range(5): g[i] = int(input(\"Grade: \"))</code>"]
    ] } },
    { table: { head: ["Method", "Effect", "Example"], rows: [
      ["<code>append(x)</code>", "Add to the <b>end</b>", "<code>g.append(75)</code>"],
      ["<code>insert(i, x)</code>", "Insert at index <code>i</code>; later items shift right", "<code>g.insert(0, 64)</code>"],
      ["<code>remove(x)</code>", "Delete the <b>first</b> occurrence of value <code>x</code>", "<code>g.remove(75)</code>"],
      ["<code>pop(i)</code> / <code>pop()</code>", "Delete at index <code>i</code> / delete the <b>last</b> item (and return it)", "<code>g.pop(0)</code>"],
      ["<code>index(x)</code>", "Index of the first occurrence of <code>x</code>", "<code>g.index(95)</code>"],
      ["<code>clear()</code> / <code>len()</code>", "Empty the list / number of items", "<code>len(g)</code>"]
    ] } },
    { code: `g = [75, 64, 95, 50, 34]
g.insert(0, 80)       # later items shift right
g.remove(95)          # first 95 removed, later items shift LEFT
last = g.pop()        # removes and returns 34
print(g, last)
print(g.index(50), len(g))` },
    { p: "<b>Removing from the middle shifts later items left</b>: their indexes drop by 1. This is why you must never remove from a list while a <code>for</code> loop is walking over it." },
    { code: `loans = ["Dune", "Beloved", "1984", "Pachinko", "Hamnet"]
loans.pop(1)                       # remove index 1
print(loans)
loans.pop(0)                       # remove index 0
print(loans)
loans.append("Hilary Mantel")
print(loans, len(loans))
print(loans[-1])                   # valid in Python: the last item` },
    { trap: "Check the index is within <code>0</code> to <code>len - 1</code> before access. Note: <code>loans[-1]</code> is <b>valid in Python</b> (it is the last item), so it does <i>not</i> raise an error, even though many exam questions treat a negative index as out of bounds. In Python, <code>loans[4]</code> on a 4-item list is what crashes." },
    { h: "The standard patterns" },
    { p: "Total, average, minimum, count. The key detail: <b>start the minimum from the first item</b> (<code>g[0]</code>), <b>not 0</b>. If every value is bigger than 0, a minimum starting at 0 would never be replaced." },
    { code: `g = [75, 64, 95, 50, 34]
smallest = g[0]            # start from the first item, NOT 0
total = odd = 0
for x in g:
    total += x
    if x < smallest:
        smallest = x
    if x % 2 == 1:
        odd += 1
average = total / len(g)
print(smallest, total, odd, average)` },
    { h: "Parallel arrays" },
    { p: "Two or more lists of the <b>same size</b> where index <i>n</i> in each describes one record. <code>names[2]</code> and <code>ages[2]</code> are the third student." },
    { code: `names = ["Asha", "Ben", "Chen"]
ages  = [16, 17, 15]
for i in range(len(names)):
    print(names[i], "is", ages[i])
youngest = ages.index(min(ages))
print("Youngest:", names[youngest])` },
    { h: "2D lists" },
    { code: `inv = [
  ["TV", "Radio"],        # row 0
  ["Shirt", "Jeans"]      # row 1
]
print(inv[1][1])          # Jeans: row 1, column 1
for row in inv:
    for item in row:
        print(item)` },
    { p: "Traverse with a <b>nested loop</b>: the outer loop is the rows, the inner loop is the columns. Rows first, then columns." },
    { code: `m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
row_sum  = sum(m[1])                           # row 1
col_sum  = sum(m[r][2] for r in range(3))      # column 2
diag     = sum(m[i][i] for i in range(3))      # principal diagonal
anti     = sum(m[i][2 - i] for i in range(3))  # secondary diagonal
print(row_sum, col_sum, diag, anti)

# nested loop: total of every cell
total = 0
for r in range(3):
    for c in range(3):
        total += m[r][c]
print(total)` },
    { h: "Building a 2D list: the aliasing trap" },
    { code: `bad = [[0] * 3] * 3                         # ONE row, repeated 3 times
bad[0][0] = 9
print(bad)

good = [[0 for c in range(3)] for r in range(3)]   # three separate rows
good[0][0] = 9
print(good)` },
    { trap: "<code>[[0] * 3] * 3</code> copies <b>one</b> row three times (three names for the same row), so changing one cell changes that cell in every row. Build 2D lists with the comprehension: <code>[[0 for c in range(cols)] for r in range(rows)]</code>." },
    { h: "2D array vs database" },
    { p: "A 2D array lives in <b>RAM</b>: it is lost when the program exits. A database table is stored <b>permanently on disk</b>." },
    { tip: "For a trace of a nested loop, the inner loop completes fully for each value of the outer loop. Write one row in the table per inner pass. A non-existent index (e.g. <code>m[3][0]</code> in a 3-row list) crashes with an out-of-bounds error." }
  ],
  mustKnow: [
    "Arrays and lists start at <b>index 0</b>; the last index is <code>len - 1</code>. A bad index is <b>out-of-bounds</b> (<code>IndexError</code>).",
    "A 2D element is <code>[row][column]</code>; traverse with a nested loop (outer = rows, inner = columns).",
    "Methods: <code>append</code>, <code>insert</code>, <code>remove</code> (first occurrence of a value), <code>pop</code>, <code>index</code>, <code>clear</code>, <code>len</code>; <code>[0] * n</code> makes n zeros.",
    "Removing from a dynamic list <b>shifts later items left</b>.",
    "Minimum / maximum: start from <code>g[0]</code>, not 0. Average = total / <code>len(g)</code>.",
    "Parallel arrays: same size, index n in each describes one record.",
    "<code>[[0] * 3] * 3</code> aliases one row; use the comprehension. <code>loans[-1]</code> is valid in Python.",
    "2D array = RAM, lost on exit; database = permanent on disk."
  ],
  terms: [
    { term: "Array / 1D list", def: "A collection of elements of the same data type held under one identifier and accessed by an index starting at 0." },
    { term: "Index", def: "The position number of an element within an array or list, counting from 0." },
    { term: "2D array", def: "An array of arrays arranged in rows and columns, where an element is accessed as [row][column]." },
    { term: "Nested loop", def: "A loop inside another loop; to traverse a 2D array the outer loop handles rows and the inner loop handles columns." },
    { term: "Out-of-bounds error", def: "A run-time error caused by using an index that does not exist in the array or list." },
    { term: "Parallel arrays", def: "Two or more arrays of the same size where the same index in each array holds data about one record." },
    { term: "Traversal", def: "Visiting every element of a data structure once, in order, either by index or by element." },
    { term: "2D array vs database", def: "A 2D array is held in RAM and lost when the program ends; a database table is stored permanently on disk." }
  ],
  exercises: [
    { id: "e1", type: "mcq", marks: 1,
      q: "A list is <code>g = [10, 20, 30, 40]</code>. After <code>g.remove(20)</code>, <b>identify</b> the value of <code>g[1]</code>.",
      options: ["20", "30", "10", "IndexError"], answer: 1,
      explain: "Removing 20 shifts later items left: g becomes [10, 30, 40], so g[1] is 30." },
    { id: "e2", type: "mcq", marks: 1,
      q: "<code>m = [[0] * 3] * 3</code> then <code>m[0][0] = 1</code>. <b>Identify</b> what <code>m</code> contains.",
      options: [
        "[[1, 0, 0], [0, 0, 0], [0, 0, 0]]",
        "[[1, 1, 1], [0, 0, 0], [0, 0, 0]]",
        "[[1, 0, 0], [1, 0, 0], [1, 0, 0]]",
        "An error is raised"
      ], answer: 2,
      explain: "The multiplication repeats the same row object, so all three rows are one list. Changing cell [0][0] changes it in every row." },
    { id: "e3", type: "output", marks: 3,
      q: "<b>State</b> the output of the code.",
      code: `g = [75, 64, 95, 50, 34]
g.insert(1, 80)
g.remove(95)
x = g.pop()
print(g)
print(x)
print(g.index(50))` ,
      explain: "After insert: [75, 80, 64, 95, 50, 34]. remove(95): [75, 80, 64, 50, 34]. pop() returns 34 leaving [75, 80, 64, 50]. 50 is at index 3." },
    { id: "e4", type: "output", marks: 3,
      q: "<b>State</b> the output of the code.",
      code: `seats = [["A", "B", "C"], ["D", "E", "F"]]
print(seats[1][2])
print(seats[0][-1])
for row in seats:
    print(row[0], len(row))` ,
      explain: "seats[1][2] is row 1, column 2 = F. seats[0][-1] is the last item of row 0 = C (negative indexes are valid in Python). Each row has 3 items." },
    { id: "e5", type: "trace", marks: 5,
      q: "<b>Trace</b> the code, completing the table for each pass of the loop.",
      code: `g = [7, 3, 9, 3]
smallest = g[0]
total = 0
odd = 0
for x in g:
    total += x
    if x < smallest:
        smallest = x
    if x % 2 == 1:
        odd += 1
print(smallest, total, odd)`,
      columns: ["Pass", "x", "total", "smallest", "odd", "Output"],
      rows: [
        ["Start", "", "0", "7", "0", ""],
        ["1", "7", "7", "7", "1", ""],
        ["2", "3", "10", "3", "2", ""],
        ["3", "9", "19", "3", "3", ""],
        ["4", "3", "22", "3", "4", ""],
        ["End", "", "", "", "", "3 22 4"]
      ],
      prefill: 2, labelCol: true,
      explain: "smallest starts at g[0] = 7 and is replaced only by a strictly smaller value. All four numbers are odd, so odd ends at 4." },
    { id: "e6", type: "trace", marks: 5,
      q: "<b>Trace</b> the nested loop, completing one row for each pass of the <b>inner</b> loop.",
      code: `m = [[1, 2], [3, 4]]
total = 0
for r in range(2):
    for c in range(2):
        if r == c:
            total += m[r][c]
        print(r, c, total)`,
      columns: ["Step", "r", "c", "m[r][c]", "total", "Output"],
      rows: [
        ["Start", "", "", "", "0", ""],
        ["1", "0", "0", "1", "1", "0 0 1"],
        ["2", "0", "1", "2", "1", "0 1 1"],
        ["3", "1", "0", "3", "1", "1 0 1"],
        ["4", "1", "1", "4", "5", "1 1 5"]
      ],
      prefill: 2, labelCol: true,
      explain: "Only cells where r == c (the principal diagonal: 1 and 4) are added, so total ends at 5. The inner loop finishes both columns before r moves on." },
    { id: "e7", type: "code", marks: 4,
      q: "<b>Construct</b> a function <code>stats(g)</code> that returns a tuple <code>(smallest, total, average)</code> for a non-empty list of numbers. Do not use <code>min()</code> or <code>sum()</code>.",
      starter: `def stats(g):
    # your code here
    pass`,
      solution: `def stats(g):
    smallest = g[0]
    total = 0
    for x in g:
        total = total + x
        if x < smallest:
            smallest = x
    average = total / len(g)
    return (smallest, total, average)`,
      forbid: ["min(", "sum("],
      tests: [
        { call: "stats([75, 64, 95, 50, 34])" },
        { label: "single item", call: "stats([8])" },
        { label: "all values above zero (minimum must not start at 0)", call: "stats([5, 9, 7])" },
        { label: "negative numbers", call: "stats([-2, -9, 4])" }
      ],
      hints: ["Start <code>smallest</code> at <code>g[0]</code>, not at 0.", "Average = total divided by <code>len(g)</code>.", "Return all three values: <code>return (smallest, total, average)</code>."],
      markscheme: ["smallest initialised to g[0] (not 0)", "Loop through every element accumulating the total", "Compares each element with smallest and updates it", "Calculates average as total / len(g) and returns all three values"],
      explain: "This is the standard IB pattern. Starting the minimum at 0 would give the wrong answer when every value is positive." },
    { id: "e8", type: "code", marks: 4,
      q: "<b>Construct</b> a function <code>remove_all(lst, x)</code> that removes <b>every</b> occurrence of <code>x</code> from <code>lst</code> <b>in place</b> (the same list is changed; nothing is returned).",
      starter: `def remove_all(lst, x):
    # your code here
    pass`,
      solution: `def remove_all(lst, x):
    while x in lst:
        lst.remove(x)`,
      tests: [
        { setup: "a = [3, 1, 3, 2, 3]", call: "remove_all(a, 3)", after: "a" },
        { label: "item not present", setup: "a = [1, 2]", call: "remove_all(a, 9)", after: "a" },
        { label: "all items removed", setup: "a = [4, 4, 4]", call: "remove_all(a, 4)", after: "a" },
        { label: "adjacent duplicates (shifting trap)", setup: "a = ['x', 'x', 'y', 'x', 'x']", call: "remove_all(a, 'x')", after: "a" }
      ],
      hints: ["<code>remove(x)</code> deletes only the <b>first</b> occurrence.", "Do not remove inside <code>for item in lst</code>: later items shift left and some are skipped.", "Repeat while the value is still in the list."],
      markscheme: ["Uses a loop that repeats while x is still present", "Uses remove (or pop of the correct index) to delete an occurrence", "Handles the case where x is absent (no error)", "Modifies the list in place and does not skip adjacent duplicates"],
      explain: "Removing shifts later items left, so a for loop over the list would skip the item that slides into the removed position." },
    { id: "e9", type: "code", marks: 4,
      context: "A cinema stores its seats in a 2D list. Each row is a row of seats; each cell is <code>\"free\"</code> or <code>\"taken\"</code>.",
      q: "<b>Construct</b> a function <code>count_free(seats)</code> that returns the total number of free seats, and then a function <code>first_free_row(seats)</code> that returns the index of the first row that contains at least one free seat, or <code>-1</code> if every seat is taken. Write both functions.",
      starter: `def count_free(seats):
    # your code here
    pass

def first_free_row(seats):
    # your code here
    pass`,
      solution: `def count_free(seats):
    count = 0
    for r in range(len(seats)):
        for c in range(len(seats[r])):
            if seats[r][c] == "free":
                count = count + 1
    return count

def first_free_row(seats):
    for r in range(len(seats)):
        for c in range(len(seats[r])):
            if seats[r][c] == "free":
                return r
    return -1`,
      tests: [
        { call: "count_free([['free', 'taken'], ['taken', 'free'], ['free', 'free']])" },
        { label: "no free seats", call: "count_free([['taken', 'taken'], ['taken', 'taken']])" },
        { call: "first_free_row([['taken', 'taken'], ['taken', 'free'], ['free', 'free']])" },
        { label: "first row has a free seat", call: "first_free_row([['free', 'taken'], ['free', 'free']])" },
        { label: "full cinema returns -1", call: "first_free_row([['taken'], ['taken']])" }
      ],
      hints: ["Use a nested loop: outer over rows, inner over columns.", "<code>seats[r][c]</code> is one seat.", "For the second function, <code>return r</code> as soon as you find a free seat; return -1 only after both loops end."],
      markscheme: ["Outer loop over rows and inner loop over columns", "Correctly compares seats[r][c] with \"free\"", "Count is initialised before the loops and incremented, then returned", "first_free_row returns the row index at the first free seat, else -1 after the loops"],
      explain: "Rows first, then columns. The early <code>return r</code> inside the loops stops the search at the first match." },
    { id: "e10", type: "code", marks: 4,
      context: "A teacher stores test scores in a 2D list <code>scores</code>: each row is one student, each column is one test. A parallel list <code>names</code> holds the student names in the same order.",
      q: "<b>Construct</b> a function <code>top_student(names, scores)</code> that returns the <b>name</b> of the student with the highest <b>total</b> score across all tests. If two students tie, return the one that appears first.",
      starter: `def top_student(names, scores):
    # your code here
    pass`,
      solution: `def top_student(names, scores):
    best_index = 0
    best_total = 0
    for r in range(len(scores)):
        total = 0
        for c in range(len(scores[r])):
            total = total + scores[r][c]
        if r == 0 or total > best_total:
            best_total = total
            best_index = r
    return names[best_index]`,
      tests: [
        { call: "top_student(['Asha', 'Ben', 'Chen'], [[70, 80], [90, 85], [60, 60]])" },
        { label: "best student is first", call: "top_student(['A', 'B'], [[9, 9, 9], [1, 2, 3]])" },
        { label: "tie returns the first", call: "top_student(['A', 'B', 'C'], [[5, 5], [6, 4], [1, 1]])" },
        { label: "single student", call: "top_student(['Solo'], [[0, 0]])" }
      ],
      hints: ["Use a nested loop to total each row.", "Keep the <b>index</b> of the best row so far, then use it with the parallel list <code>names</code>.", "Use a strict <code>&gt;</code> so a tie keeps the earlier student."],
      markscheme: ["Outer loop over students (rows) with the total reset for each row", "Inner loop adds every score in the row", "Tracks the highest total and its row index (strictly greater, so ties keep the first)", "Returns names[index] using the parallel array"],
      explain: "The row index <i>r</i> of <code>scores</code> is also the index of that student in <code>names</code>: that is what makes them parallel." },
    { id: "e11", type: "code", marks: 2,
      context: "A warehouse grid should be created with <code>rows</code> rows and <code>cols</code> columns, every cell 0. The programmer's version has a bug: changing one cell changes the same cell in every row.",
      q: "<b>Identify</b> the error and <b>correct</b> the function so each row is a separate list.",
      starter: `def make_grid(rows, cols):
    return [[0] * cols] * rows`,
      solution: `def make_grid(rows, cols):
    return [[0 for c in range(cols)] for r in range(rows)]`,
      tests: [
        { label: "correct size and contents", call: "make_grid(2, 3)" },
        { label: "setting one cell changes only that cell", setup: "g = make_grid(2, 3); g[0][0] = 9", call: "g" },
        { label: "single column", setup: "g = make_grid(3, 1); g[2][0] = 5", call: "g" }
      ],
      hints: ["<code>* rows</code> repeats the <b>same</b> row object.", "Use a list comprehension that builds a new inner list for each row."],
      markscheme: ["Identifies that [[0] * cols] * rows repeats one row (rows are aliases of the same list)", "Builds each row separately, e.g. with a comprehension over range(rows)"],
      explain: "The comprehension runs <code>[0 for c in range(cols)]</code> once per row, so every row is a different list." },
    { id: "e12", type: "written", marks: 4,
      q: "A cinema stores seat bookings in a 2D array. <b>Explain</b> two differences between storing the bookings in a 2D array and in a database table, and <b>state</b> what error would occur if the program accessed <code>seats[10][2]</code> in an array with only 8 rows.",
      markscheme: [
        "A 2D array lives in RAM / main memory, so the bookings are lost when the program ends (1)",
        "A database table is stored permanently on disk (so bookings survive) (1)",
        "Idea of a second valid difference: a database can be shared / queried by many programs or users, a 2D array exists only inside one running program (1)",
        "Out-of-bounds (index) error: row index 10 does not exist; valid rows are 0 to 7 (IndexError in Python) (1)"
      ],
      model: "A 2D array is held in RAM, so all the bookings disappear when the program exits; a database table is stored permanently on disk so the bookings survive. A database can also be shared and queried by several users or programs, whereas the array exists only inside one running program. Accessing seats[10][2] when there are only 8 rows (valid indexes 0 to 7) causes an out-of-bounds error (IndexError).",
      explain: "Always give the reason with the difference: \"RAM, so lost on exit\" scores; \"it is temporary\" alone is weaker." }
  ]
},

/* ===================================================================== */
{
  id: "b2-2-3",
  code: "B2.2.3",
  section: "B2.2 Data structures",
  title: "Stacks (LIFO)",
  summary: "Implement an array-based stack with push, pop, peek, isEmpty and isFull, and explain specific applications such as undo and RPN.",
  minutes: 40,
  lesson: [
    { p: "Picture a pile of plates. You add a plate to the <b>top</b>, and you take a plate from the <b>top</b>. You can't pull one out of the middle. The last plate you put on is the first one you take off: <b>last in, first out (LIFO)</b>." },
    { table: { head: ["Term", "Meaning"], rows: [
      ["<b>Stack</b>", "Linear structure, <b>last in, first out (LIFO)</b>: only the top item is accessible."],
      ["<b>push</b>", "Adds an item to the <b>top</b>."],
      ["<b>pop</b>", "<b>Removes and returns</b> the top item."],
      ["<b>peek</b>", "Returns the top item <b>without removing</b> it."],
      ["<b>isEmpty</b>", "Returns true/false; check <b>before</b> pop."],
      ["<b>Performance</b>", "All four touch only the top, nothing shifts: <b>O(1)</b> constant time."],
      ["<b>Stack overflow</b>", "Every push uses memory; exceeding it ends the program with a fatal run-time error."],
      ["<b>Bounded stack</b>", "Has a <b>maximum size</b> (e.g. 10 undo steps); a push when full must be handled to avoid a crash."],
      ["<b>Stack pointer</b>", "Variable holding the index of the <b>top</b> item (<code>-1</code> when empty)."],
      ["<b>isFull / underflow</b>", "<code>isFull</code> before push (push on a full stack = <b>overflow</b>). <code>isEmpty</code> before pop or peek (on an empty stack = <b>underflow</b>)."],
      ["<b>Implementation</b>", "<b>Array</b> (static, fixed size, can fill up) or <b>linked list</b> (dynamic, no fixed size)."]
    ] } },
    { h: "A stack with a Python list" },
    { code: `s = []
s.append("T-Shirt")    # push
s.append("Shoes")
print(s[-1])           # peek -> Shoes
print(s.pop())         # pop  -> Shoes
print(s)
print(len(s) == 0)     # isEmpty` },
    { h: "Array-based (bounded) stack with a stack pointer" },
    { p: "This is the version IB wants you to be able to write. The array has a fixed <code>SIZE</code>. The pointer <code>top</code> is the index of the top item and starts at <b>-1</b> (nothing stored yet). <b>Push</b>: move the pointer up, then store. <b>Pop</b>: read, then move the pointer down. The function changes <code>top</code>, so it needs <code>global top</code>." },
    { code: `SIZE = 4
stack = [None] * SIZE
top = -1                       # stack pointer: -1 = empty

def is_empty(): return top == -1
def is_full():  return top == SIZE - 1

def push(v):
    global top
    if is_full():
        print("Stack overflow")
    else:
        top += 1
        stack[top] = v

def pop():
    global top
    if is_empty():
        print("Stack underflow")
    else:
        v = stack[top]
        top -= 1
        return v

def peek(): return stack[top]

push(10); push(20); push(30)
print(peek(), top)
print(pop(), top)
push(1); push(2); push(3)       # the last one overflows
print(stack, top)` },
    { trap: "Pop does <b>not erase</b> the array slot. It only moves <code>top</code> down; the old value stays in the array until it is overwritten. Only the items from index 0 to <code>top</code> are really \"in\" the stack. Also: push moves the pointer <i>then</i> stores; pop reads <i>then</i> moves the pointer." },
    { h: "Uses of a stack (be specific)" },
    { table: { head: ["Use", "How the stack is used"], rows: [
      ["<b>Undo in a game</b>", "Each action is pushed; undo pops the most recent action"],
      ["<b>Browser back button</b>", "Each page visited is pushed; back pops it"],
      ["<b>Interrupt handling</b>", "Variables and return address pushed when the CPU is interrupted; popped to resume"],
      ["<b>Function calls</b>", "Return addresses and parameters pushed; popped as the calls unwind"],
      ["<b>Evaluating RPN</b>", "Operands pushed; an operator pops two, calculates, pushes the result"]
    ] } },
    { tip: "Applications must be <b>specific</b>: \"stacks are used for undo\" earns nothing; say \"each game action is pushed and undo pops the top action\"." },
    { h: "Reverse Polish Notation (RPN)" },
    { p: "In RPN the operator comes <b>after</b> its operands, so no brackets are needed. Read left to right: a number is pushed; an operator pops <b>two</b> numbers (the first popped is the <i>right</i> operand), calculates, and pushes the result. <code>5 2 * 3 2 + -</code> means (5 x 2) - (3 + 2) = 5." },
    { table: { head: ["Token", "5", "2", "*", "3", "2", "+", "-"], rows: [
      ["<b>Stack (bottom to top)</b>", "5", "5 2", "10", "10 3", "10 3 2", "10 5", "<b>5</b>"]
    ] } },
    { code: `tokens = ["5", "2", "*", "3", "2", "+", "-"]
stack = []
for t in tokens:
    if t in ("+", "-", "*"):
        b = stack.pop()          # right operand pops first
        a = stack.pop()
        if t == "+":
            stack.append(a + b)
        elif t == "-":
            stack.append(a - b)
        else:
            stack.append(a * b)
    else:
        stack.append(int(t))
    print(t, stack)
print("Result:", stack[-1])` },
    { h: "Bracket matching" },
    { p: "Push every opening bracket. For a closing bracket, pop and check it matches. At the end the stack must be empty. A closing bracket with an empty stack is unbalanced (underflow)." },
    { code: `def balanced(text):
    stack = []
    for ch in text:
        if ch == "(":
            stack.append(ch)
        elif ch == ")":
            if len(stack) == 0:
                return False
            stack.pop()
    return len(stack) == 0

print(balanced("(a+(b*c))"), balanced("(a+b))"), balanced("((a)"))` }
  ],
  mustKnow: [
    "<b>Stack = LIFO</b>: push (add to top), pop (remove and return top), peek (look at top), isEmpty. All are <b>O(1)</b>.",
    "Stack pointer <code>top</code> is <b>-1 when empty</b>; push: <code>top += 1</code> then store; pop: read then <code>top -= 1</code>.",
    "<b>Overflow</b> = push on a full stack (check <code>isFull</code>); <b>underflow</b> = pop/peek on an empty stack (check <code>isEmpty</code>).",
    "Array stack is bounded (fixed size); a linked-list stack is dynamic.",
    "Uses must be <b>specific</b>: undo (push actions, pop the latest), back button, interrupts, function calls, RPN.",
    "RPN: push operands; an operator pops two, calculates and pushes the result.",
    "Remember <code>global top</code> in the array version, since the function changes it."
  ],
  terms: [
    { term: "Stack", def: "A linear last-in, first-out (LIFO) structure in which items are added to and removed from the top only." },
    { term: "push", def: "The stack operation that adds an item to the top of the stack." },
    { term: "pop", def: "The stack operation that removes and returns the item at the top of the stack." },
    { term: "peek", def: "The stack operation that returns the top item without removing it." },
    { term: "Stack pointer", def: "A variable holding the index of the top item of an array-based stack, with the value -1 when the stack is empty." },
    { term: "Stack overflow", def: "An error caused by pushing an item onto a stack that is already full." },
    { term: "Stack underflow", def: "An error caused by popping or peeking at a stack that is empty." },
    { term: "Bounded stack", def: "A stack with a maximum size, so a push when it is full must be handled to avoid a crash." },
    { term: "Reverse Polish Notation (RPN)", def: "A notation where the operator follows its operands, evaluated with a stack so that no brackets are needed." }
  ],
  exercises: [
    { id: "e1", type: "mcq", marks: 1,
      q: "Items A, B, C are pushed onto an empty stack in that order, then one item is popped. <b>Identify</b> the item removed.",
      options: ["A", "B", "C", "It depends on the size of the stack"], answer: 2,
      explain: "A stack is LIFO: the last item pushed (C) is the first removed." },
    { id: "e2", type: "mcq", marks: 1,
      q: "<b>Identify</b> the situation that causes stack <b>underflow</b>.",
      options: [
        "Pushing onto a full stack",
        "Popping from an empty stack",
        "Peeking at a stack with one item",
        "Setting the stack pointer to 0"
      ], answer: 1,
      explain: "Underflow = trying to remove (or peek) when there is nothing there. Pushing onto a full stack is overflow." },
    { id: "e3", type: "mcq", marks: 1,
      q: "An array-based stack has <code>SIZE = 5</code> and the stack pointer <code>top = 4</code>. <b>Identify</b> the state of the stack.",
      options: ["Empty", "Full", "Holding 4 items", "Invalid: top must be -1"], answer: 1,
      explain: "top is the index of the top item. With indexes 0 to 4 in use, the stack holds 5 items: it is full (top == SIZE - 1)." },
    { id: "e4", type: "output", marks: 2,
      q: "<b>State</b> the output of the code.",
      code: `s = []
s.append(3)
s.append(8)
s.append(5)
print(s.pop())
s.append(1)
print(s[-1])
print(s)
print(len(s) == 0)` ,
      explain: "pop returns 5 (the last pushed). After pushing 1 the list is [3, 8, 1], so the peek is 1; the stack is not empty." },
    { id: "e5", type: "trace", marks: 7,
      q: "<b>Trace</b> the array-based stack. Complete <code>top</code> and the <code>stack</code> array (write it like <code>[4, 7, None]</code>) after each statement. Remember that pop does not erase the slot.",
      code: `SIZE = 3
stack = [None] * SIZE
top = -1
def push(v):
    global top
    if top == SIZE - 1:
        print("Stack overflow")
    else:
        top += 1
        stack[top] = v
def pop():
    global top
    if top == -1:
        print("Stack underflow")
    else:
        v = stack[top]
        top -= 1
        return v
push(4)
push(7)
x = pop()
push(2)
push(9)
push(5)
y = pop()
print(x, y)`,
      columns: ["Statement", "top", "stack", "Output"],
      rows: [
        ["Start", "-1", "[None, None, None]", ""],
        ["push(4)", "0", "[4, None, None]", ""],
        ["push(7)", "1", "[4, 7, None]", ""],
        ["x = pop()", "0", "[4, 7, None]", ""],
        ["push(2)", "1", "[4, 2, None]", ""],
        ["push(9)", "2", "[4, 2, 9]", ""],
        ["push(5)", "2", "[4, 2, 9]", "Stack overflow"],
        ["y = pop()", "1", "[4, 2, 9]", ""],
        ["print(x, y)", "1", "[4, 2, 9]", "7 9"]
      ],
      prefill: 2, labelCol: true,
      explain: "pop() leaves 7 in the array but moves top to 0 (so the next push overwrites it). push(5) fails because top == SIZE - 1 == 2: overflow, nothing changes." },
    { id: "e6", type: "trace", marks: 7,
      q: "<b>Trace</b> this RPN evaluation. For each token, write the stack from bottom to top as a list (e.g. <code>[6, 2]</code>).",
      code: `tokens = ["6", "2", "3", "+", "-", "4", "*"]
stack = []
for t in tokens:
    if t in ("+", "-", "*"):
        b = stack.pop()
        a = stack.pop()
        if t == "+":
            stack.append(a + b)
        elif t == "-":
            stack.append(a - b)
        else:
            stack.append(a * b)
    else:
        stack.append(int(t))
print(stack[-1])`,
      columns: ["Token", "Stack", "Output"],
      rows: [
        ["6", "[6]", ""],
        ["2", "[6, 2]", ""],
        ["3", "[6, 2, 3]", ""],
        ["+", "[6, 5]", ""],
        ["-", "[1]", ""],
        ["4", "[1, 4]", ""],
        ["*", "[4]", "4"]
      ],
      prefill: 1, labelCol: true,
      explain: "6 2 3 + - 4 * means (6 - (2 + 3)) * 4 = 4. For -, b = 5 pops first and a = 6 second, so the result is a - b = 1." },
    { id: "e7", type: "code", marks: 2,
      context: "A bounded stack uses an array <code>stack</code> of size <code>SIZE = 4</code> and a global stack pointer <code>top</code> (-1 when empty).",
      q: "<b>Construct</b> the functions <code>is_empty()</code> and <code>is_full()</code>, each returning <code>True</code> or <code>False</code>.",
      starter: `SIZE = 4
stack = [None] * SIZE
top = -1

def is_empty():
    # your code here
    pass

def is_full():
    # your code here
    pass`,
      solution: `SIZE = 4
stack = [None] * SIZE
top = -1

def is_empty():
    return top == -1

def is_full():
    return top == SIZE - 1`,
      tests: [
        { label: "empty stack: is_empty", call: "is_empty()" },
        { label: "empty stack: is_full", call: "is_full()" },
        { label: "two items: is_empty", setup: "top = 1", call: "is_empty()" },
        { label: "two items: is_full", setup: "top = 1", call: "is_full()" },
        { label: "full stack: is_full", setup: "top = 3", call: "is_full()" }
      ],
      hints: ["The stack is empty when <code>top</code> is -1.", "The last valid index is <code>SIZE - 1</code>."],
      markscheme: ["is_empty returns True only when top == -1", "is_full returns True only when top == SIZE - 1"],
      explain: "Using <code>SIZE - 1</code> (not 4) keeps the code correct if the size changes." },
    { id: "e8", type: "code", marks: 4,
      context: "The stack uses a global array <code>stack</code> (size <code>SIZE = 4</code>) and a global stack pointer <code>top</code>. <code>is_empty()</code> and <code>is_full()</code> are already written.",
      q: "<b>Construct</b> the function <code>push(v)</code>. If the stack is full it must print <code>Stack overflow</code> and change nothing; otherwise it adds <code>v</code> to the top of the stack.",
      starter: `SIZE = 4
stack = [None] * SIZE
top = -1

def is_empty():
    return top == -1

def is_full():
    return top == SIZE - 1

def push(v):
    # your code here
    pass`,
      solution: `SIZE = 4
stack = [None] * SIZE
top = -1

def is_empty():
    return top == -1

def is_full():
    return top == SIZE - 1

def push(v):
    global top
    if is_full():
        print("Stack overflow")
    else:
        top = top + 1
        stack[top] = v`,
      tests: [
        { label: "push onto empty stack", call: "push(5)", after: "(stack, top)" },
        { label: "push onto stack with two items", setup: "stack[0] = 1; stack[1] = 2; top = 1", call: "push(9)", after: "(stack, top)" },
        { label: "push onto full stack: overflow", setup: "stack[:] = [1, 2, 3, 4]; top = 3", call: "push(9)", after: "(stack, top)", out: true },
        { label: "fill the stack exactly", setup: "stack[:] = [1, 2, 3, None]; top = 2", call: "push(4)", after: "(stack, top)" }
      ],
      hints: ["Check <code>is_full()</code> first.", "The function changes <code>top</code>, so declare <code>global top</code>.", "Move the pointer up <b>first</b>, then store the value at <code>stack[top]</code>."],
      markscheme: ["Declares top as global", "Checks is_full() before pushing", "Prints \"Stack overflow\" when full and does not change the stack", "Increments top and stores v at stack[top]"],
      explain: "Order matters: increment the pointer, then store. Storing first would overwrite the current top item." },
    { id: "e9", type: "code", marks: 4,
      context: "Same bounded array stack (global <code>stack</code>, <code>SIZE = 4</code>, global <code>top</code>).",
      q: "<b>Construct</b> the function <code>pop()</code>. If the stack is empty it must print <code>Stack underflow</code> (and return nothing); otherwise it removes the top item and <b>returns</b> it.",
      starter: `SIZE = 4
stack = [None] * SIZE
top = -1

def is_empty():
    return top == -1

def is_full():
    return top == SIZE - 1

def pop():
    # your code here
    pass`,
      solution: `SIZE = 4
stack = [None] * SIZE
top = -1

def is_empty():
    return top == -1

def is_full():
    return top == SIZE - 1

def pop():
    global top
    if is_empty():
        print("Stack underflow")
    else:
        v = stack[top]
        top = top - 1
        return v`,
      tests: [
        { label: "pop from a stack with three items", setup: "stack[:] = [4, 7, 9, None]; top = 2", call: "pop()", after: "(stack, top)" },
        { label: "pop the only item", setup: "stack[0] = 8; top = 0", call: "pop()", after: "(stack, top)" },
        { label: "pop from empty stack: underflow", call: "pop()", after: "top", out: true },
        { label: "pop from a full stack", setup: "stack[:] = [1, 2, 3, 4]; top = 3", call: "pop()", after: "top" }
      ],
      hints: ["Check <code>is_empty()</code> first.", "Read <code>stack[top]</code> into a variable <b>before</b> you decrease <code>top</code>.", "Remember <code>global top</code> and <code>return v</code>."],
      markscheme: ["Declares top as global", "Checks is_empty() and prints \"Stack underflow\" when empty", "Reads the top item into a variable before moving the pointer", "Decrements top and returns the item"],
      explain: "The slot is not erased: only <code>top</code> moves. That is why the tests compare <code>top</code>, not the whole array." },
    { id: "e10", type: "code", marks: 4,
      context: "Evaluate Reverse Polish Notation. Tokens are strings: numbers such as <code>\"5\"</code> or one of <code>\"+\"</code>, <code>\"-\"</code>, <code>\"*\"</code>. Use a stack (a Python list).",
      q: "<b>Construct</b> a function <code>rpn(tokens)</code> that evaluates a valid RPN expression given as a list of tokens and returns the integer result.",
      starter: `def rpn(tokens):
    # your code here
    pass`,
      solution: `def rpn(tokens):
    stack = []
    for t in tokens:
        if t == "+" or t == "-" or t == "*":
            b = stack.pop()
            a = stack.pop()
            if t == "+":
                stack.append(a + b)
            elif t == "-":
                stack.append(a - b)
            else:
                stack.append(a * b)
        else:
            stack.append(int(t))
    return stack.pop()`,
      tests: [
        { call: "rpn(['5', '2', '*', '3', '2', '+', '-'])" },
        { label: "single number", call: "rpn(['7'])" },
        { label: "subtraction order matters", call: "rpn(['9', '4', '-'])" },
        { label: "nested", call: "rpn(['2', '3', '4', '*', '+'])" },
        { label: "multi-digit numbers", call: "rpn(['10', '25', '+', '3', '*'])" }
      ],
      hints: ["A number is pushed (as an <code>int</code>); an operator pops two items.", "Pop the <b>right</b> operand first: <code>b = stack.pop()</code> then <code>a = stack.pop()</code>.", "Push the result back; at the end the answer is the only item left."],
      markscheme: ["Loops through each token", "Pushes numbers converted to int", "Pops two operands (right operand first) for an operator", "Calculates correctly for + - * and pushes the result; returns the final item"],
      explain: "For - the order matters: 9 4 - is 9 - 4. The first item popped is the right-hand operand." },
    { id: "e11", type: "code", marks: 5,
      q: "<b>Construct</b> a function <code>is_balanced(text)</code> that returns <code>True</code> if every bracket in <code>text</code> is correctly matched and nested, otherwise <code>False</code>. The brackets are <code>()</code>, <code>[]</code> and <code>{}</code>; all other characters are ignored. Use a stack.",
      starter: `def is_balanced(text):
    # your code here
    pass`,
      solution: `def is_balanced(text):
    stack = []
    opening = "([{"
    closing = ")]}"
    for ch in text:
        if ch in opening:
            stack.append(ch)
        elif ch in closing:
            if len(stack) == 0:
                return False
            top = stack.pop()
            if opening.index(top) != closing.index(ch):
                return False
    return len(stack) == 0`,
      tests: [
        { call: "is_balanced('(a[b]{c})')" },
        { label: "wrong type of closing bracket", call: "is_balanced('(]')" },
        { label: "unclosed opening brackets", call: "is_balanced('((')" },
        { label: "closing bracket with nothing open (underflow)", call: "is_balanced('())')" },
        { label: "no brackets at all", call: "is_balanced('')" },
        { label: "wrong nesting order", call: "is_balanced('([)]')" }
      ],
      hints: ["Push every opening bracket.", "For a closing bracket: if the stack is empty return <code>False</code>, otherwise pop and check it is the matching type.", "After the loop the stack must be empty: <code>return len(stack) == 0</code>."],
      markscheme: ["Pushes opening brackets onto a stack", "For a closing bracket, returns False if the stack is empty", "Pops and checks the bracket matches the closing type (else False)", "Ignores other characters", "Returns True only if the stack is empty at the end"],
      explain: "Three different failures: wrong type, closing with nothing open, and openers left over. The final emptiness check catches the last one." },
    { id: "e12", type: "code", marks: 2,
      context: "A student's push has two bugs: the first value is stored at index -1 (the last slot), and the stack fills up one item too early.",
      q: "<b>Identify</b> the errors and <b>correct</b> the function so it works as in the lesson.",
      starter: `SIZE = 4
stack = [None] * SIZE
top = -1

def push(v):
    global top
    if top == SIZE - 2:
        print("Stack overflow")
    else:
        stack[top] = v
        top += 1`,
      solution: `SIZE = 4
stack = [None] * SIZE
top = -1

def push(v):
    global top
    if top == SIZE - 1:
        print("Stack overflow")
    else:
        top += 1
        stack[top] = v`,
      tests: [
        { label: "push onto empty stack", call: "push(5)", after: "(stack, top)" },
        { label: "push onto stack with three items fills it", setup: "stack[:] = [1, 2, 3, None]; top = 2", call: "push(4)", after: "(stack, top)" },
        { label: "push onto full stack: overflow", setup: "stack[:] = [1, 2, 3, 4]; top = 3", call: "push(9)", after: "(stack, top)", out: true }
      ],
      hints: ["The stack is full when <code>top</code> equals the last valid index, <code>SIZE - 1</code>.", "Increase the pointer <b>before</b> storing."],
      markscheme: ["Full test corrected to top == SIZE - 1", "Pointer incremented before the value is stored (top += 1 then stack[top] = v)"],
      explain: "With top = -1, storing first writes to stack[-1], the last slot of the array." },
    { id: "e13", type: "written", marks: 4,
      q: "<b>Explain</b> two specific applications of a stack, referring to how the stack operations are used in each.",
      markscheme: [
        "Undo: each action is pushed onto the stack as it is done (1)",
        "Undo: the undo command pops the most recent action and reverses it (1)",
        "Function calls / interrupts: the return address (and parameters / variables) is pushed when a function is called or the CPU is interrupted (1)",
        "popped when the function ends / the interrupt is handled, so execution resumes where it left off (1)",
        "Back button: each page visited is pushed; back pops it (1)",
        "RPN: operands are pushed; an operator pops two, calculates and pushes the result (1)"
      ],
      model: "In an undo feature in a game, each action the player takes is pushed onto a stack. When the player presses undo, the most recent action is popped from the top and reversed, which suits the last-in, first-out order. When a function is called, its return address and parameters are pushed onto the call stack; when the function finishes they are popped so the program resumes where it left off.",
      explain: "Name the application <i>and</i> say what is pushed and when it is popped. \"Stacks are used for undo\" alone earns nothing." }
  ]
},

/* ===================================================================== */
{
  id: "b2-2-4",
  code: "B2.2.4",
  section: "B2.2 Data structures",
  title: "Queues (FIFO)",
  summary: "Implement a circular queue with front and rear pointers, compare queue implementations, and explain FIFO and priority-queue uses.",
  minutes: 40,
  lesson: [
    { p: "A queue is a line at a checkout. People join at the <b>back (rear)</b> and are served from the <b>front</b>. The first person to arrive is the first to leave: <b>first in, first out (FIFO)</b>. A stack is LIFO (one end only); a queue uses <b>both ends</b>." },
    { table: { head: ["Term", "Meaning"], rows: [
      ["<b>Queue</b>", "Linear structure, <b>first in, first out (FIFO)</b>: items join at the <b>rear</b>, leave from the <b>front</b>, so arrival order is kept."],
      ["<b>enqueue</b>", "Adds an item to the <b>rear</b>."],
      ["<b>dequeue</b>", "<b>Removes and returns</b> the front item."],
      ["<b>front (peek)</b>", "Returns the front item <b>without removing</b> it."],
      ["<b>isEmpty</b>", "Checks whether the queue has any items."],
      ["<b>Priority queue</b>", "Each item has a priority; <b>higher priority is served first</b>, regardless of arrival (hospital emergency, packet routing)."],
      ["<b>OS link</b>", "FIFO = first come first served (FCFS) CPU scheduling."],
      ["<b>Front / rear pointers</b>", "<b>Front</b> = where items are removed; <b>rear</b> = where items are added."],
      ["<b>Circular queue</b>", "Array treated as a ring: after the last index the rear wraps to 0 (<code>(rear + 1) % size</code>), so freed slots are reused. Full = no free slot; empty = no items."],
      ["<b>Uses</b>", "Printer jobs, keyboard buffer, simulations (checkout lines, car parks)."]
    ] } },
    { h: "A queue with collections.deque" },
    { p: "A plain list is a poor queue: removing the first item (<code>pop(0)</code>) shifts everything left. Python's <code>deque</code> removes from the front in O(1)." },
    { code: `from collections import deque
q = deque()
q.append("Ticket #001")     # enqueue
q.append("Ticket #002")
print(q[0])                # front
print(q.popleft())         # dequeue
print(len(q) == 0)         # isEmpty
print(q)` },
    { h: "Circular queue (array-based)" },
    { p: "With a plain array, dequeue would leave empty slots at the start that are never reused. The fix: when a pointer reaches the end of the array it <b>wraps round to 0</b> using <code>% SIZE</code>. Here <code>count</code> tracks how many items are in the queue: <code>count == SIZE</code> means full, <code>count == 0</code> means empty. <code>front</code> starts at 0, <code>rear</code> at -1." },
    { code: `SIZE = 4
queue = [None] * SIZE
front, rear, count = 0, -1, 0

def enqueue(v):
    global rear, count
    if count == SIZE:
        print("Queue overflow")
    else:
        rear = (rear + 1) % SIZE      # wraps round
        queue[rear] = v
        count += 1

def dequeue():
    global front, count
    if count == 0:
        print("Queue underflow")
    else:
        v = queue[front]
        front = (front + 1) % SIZE
        count -= 1
        return v

for c in "ABCD":
    enqueue(c)
enqueue("E")                          # full
print(dequeue(), dequeue())           # A B leave; front = 2
enqueue("E")                          # rear wraps to index 0
print(queue, front, rear, count)` },
    { trap: "Use FIFO when <b>order of arrival</b> is the only priority (printer jobs, keyboard buffer). Use a <b>priority queue</b> when urgency overrides order. A <b>plain array</b> is a poor queue (O(n) dequeue). Don't mix up stack and queue: push/pop = one end (LIFO); enqueue/dequeue = two ends (FIFO)." },
    { h: "Comparing implementations" },
    { table: { head: ["Implementation", "Time", "Memory"], rows: [
      ["<b>Linked list</b> (dynamic)", "enqueue and dequeue <b>O(1)</b>", "Grows and shrinks; extra memory for pointers"],
      ["<b>Circular array</b> (static)", "enqueue and dequeue <b>O(1)</b>", "Fixed block; <b>queue overflow</b> if full"],
      ["<b>Plain array</b>", "dequeue <b>O(n)</b>: every item shifts left (999 shifts for 1000 items)", "Fixed block"]
    ] } },
    { h: "Reversing a queue with a stack" },
    { p: "A queue gives items out in arrival order, a stack in reverse. Move everything queue to stack, then stack back to queue: the order is reversed." },
    { code: `from collections import deque
q = deque([1, 2, 3])
s = []
while q:                       # queue -> stack
    s.append(q.popleft())
while s:                       # stack -> queue (order reversed)
    q.append(s.pop())
print(list(q))                 # [3, 2, 1]` },
    { tip: "As with stacks, be specific. \"Printer jobs: each job is enqueued when sent and the printer dequeues the oldest, so jobs print in the order they were sent.\" For a priority queue, name the urgency: \"an emergency patient is served before earlier, less urgent arrivals\"." }
  ],
  mustKnow: [
    "<b>Queue = FIFO</b>: enqueue at the <b>rear</b>, dequeue from the <b>front</b>, front peeks, isEmpty.",
    "Linked-list and circular-array queues give <b>O(1)</b> enqueue and dequeue; a plain array dequeue is <b>O(n)</b> (everything shifts).",
    "Use a <b>priority queue</b> when urgency matters more than arrival order.",
    "Front and rear pointers track where items come out and go in; a circular queue wraps with <code>(rear + 1) % SIZE</code> and reuses freed slots.",
    "A circular array queue is fixed size, so it can <b>overflow</b>; a linked-list queue grows and shrinks.",
    "Uses: printer jobs, keyboard buffer, FCFS CPU scheduling, simulations.",
    "In Python use <code>deque</code>: <code>append</code>, <code>popleft</code>, <code>q[0]</code>, <code>len(q) == 0</code>."
  ],
  terms: [
    { term: "Queue", def: "A linear first-in, first-out (FIFO) structure in which items are added at the rear and removed from the front." },
    { term: "enqueue", def: "The queue operation that adds an item to the rear of the queue." },
    { term: "dequeue", def: "The queue operation that removes and returns the item at the front of the queue." },
    { term: "Front pointer", def: "A variable holding the position of the front of the queue, where items are removed." },
    { term: "Rear pointer", def: "A variable holding the position of the rear of the queue, where items are added." },
    { term: "Circular queue", def: "An array-based queue treated as a ring, so that a pointer passing the last index wraps to 0 and freed slots are reused." },
    { term: "Priority queue", def: "A queue in which each item has a priority and the item with the highest priority is served first regardless of arrival order." },
    { term: "FCFS scheduling", def: "First come first served: the operating system runs processes in the order they arrived, using a FIFO queue." },
    { term: "Queue overflow", def: "An error caused by adding an item to a fixed-size queue that is full." }
  ],
  exercises: [
    { id: "e1", type: "mcq", marks: 1,
      q: "Items 1, 2, 3 are enqueued in that order, then one item is dequeued. <b>Identify</b> the item removed.",
      options: ["1", "2", "3", "All three"], answer: 0,
      explain: "A queue is FIFO: the first item in (1) is the first out." },
    { id: "e2", type: "mcq", marks: 1,
      q: "A circular queue has <code>SIZE = 5</code> and <code>rear = 4</code>. After one successful enqueue, <b>identify</b> the new value of <code>rear</code> using <code>rear = (rear + 1) % SIZE</code>.",
      options: ["5", "0", "4", "1"], answer: 1,
      explain: "(4 + 1) % 5 = 0. The rear wraps round to the start of the array so freed slots are reused." },
    { id: "e3", type: "mcq", marks: 1,
      q: "<b>Identify</b> the scenario that needs a <b>priority queue</b> rather than an ordinary FIFO queue.",
      options: [
        "Documents waiting for a printer in the order they were sent",
        "Keystrokes held in a keyboard buffer",
        "Patients waiting in a hospital emergency department",
        "Cars joining a drive-through line"
      ], answer: 2,
      explain: "Emergency patients are served by urgency, not arrival time. The other three are strictly first come, first served." },
    { id: "e4", type: "output", marks: 3,
      q: "<b>State</b> the output of the code.",
      code: `from collections import deque
q = deque()
q.append("A")
q.append("B")
q.append("C")
print(q.popleft())
q.append("D")
print(q[0])
print(len(q))` ,
      explain: "popleft removes A (the first in). The queue is then B, C, D: the front is B and there are 3 items." },
    { id: "e5", type: "output", marks: 2,
      q: "<b>State</b> the output of the code.",
      code: `from collections import deque
q = deque([1, 2, 3])
s = []
while q:
    s.append(q.popleft())
print(s)
while s:
    q.append(s.pop())
print(list(q))` ,
      explain: "Queue to stack: s is [1, 2, 3]. Popping from the stack gives 3, 2, 1 and these are appended to the queue in that order: the queue is reversed." },
    { id: "e6", type: "trace", marks: 7,
      q: "<b>Trace</b> the circular queue. Complete <code>front</code>, <code>rear</code>, <code>count</code> and the <code>queue</code> array (e.g. <code>['A', None, None]</code>) after each statement. Dequeue does not erase the slot.",
      code: `SIZE = 3
queue = [None] * SIZE
front, rear, count = 0, -1, 0
def enqueue(v):
    global rear, count
    if count == SIZE:
        print("Queue overflow")
    else:
        rear = (rear + 1) % SIZE
        queue[rear] = v
        count += 1
def dequeue():
    global front, count
    if count == 0:
        print("Queue underflow")
    else:
        v = queue[front]
        front = (front + 1) % SIZE
        count -= 1
        return v
enqueue("A")
enqueue("B")
print(dequeue())
enqueue("C")
enqueue("D")
enqueue("E")
print(dequeue())`,
      columns: ["Statement", "front", "rear", "count", "queue", "Output"],
      rows: [
        ["Start", "0", "-1", "0", "[None, None, None]", ""],
        ["enqueue(\"A\")", "0", "0", "1", "['A', None, None]", ""],
        ["enqueue(\"B\")", "0", "1", "2", "['A', 'B', None]", ""],
        ["print(dequeue())", "1", "1", "1", "['A', 'B', None]", "A"],
        ["enqueue(\"C\")", "1", "2", "2", "['A', 'B', 'C']", ""],
        ["enqueue(\"D\")", "1", "0", "3", "['D', 'B', 'C']", ""],
        ["enqueue(\"E\")", "1", "0", "3", "['D', 'B', 'C']", "Queue overflow"],
        ["print(dequeue())", "2", "0", "2", "['D', 'B', 'C']", "B"]
      ],
      prefill: 2, labelCol: true,
      explain: "enqueue(\"D\") makes rear = (2 + 1) % 3 = 0, reusing the slot freed by A. The queue is then full (count == 3), so enqueue(\"E\") overflows and changes nothing." },
    { id: "e7", type: "code", marks: 4,
      context: "A circular queue uses a global array <code>queue</code> (<code>SIZE = 4</code>) and global pointers <code>front</code> (starts 0), <code>rear</code> (starts -1) and a global <code>count</code> of items.",
      q: "<b>Construct</b> the function <code>enqueue(v)</code>. If the queue is full it must print <code>Queue overflow</code> and change nothing; otherwise it adds <code>v</code> at the rear, wrapping the rear pointer round the array.",
      starter: `SIZE = 4
queue = [None] * SIZE
front, rear, count = 0, -1, 0

def enqueue(v):
    # your code here
    pass`,
      solution: `SIZE = 4
queue = [None] * SIZE
front, rear, count = 0, -1, 0

def enqueue(v):
    global rear, count
    if count == SIZE:
        print("Queue overflow")
    else:
        rear = (rear + 1) % SIZE
        queue[rear] = v
        count = count + 1`,
      tests: [
        { label: "enqueue into empty queue", call: "enqueue('A')", after: "(queue, front, rear, count)" },
        { label: "enqueue into queue with two items", setup: "queue[:] = ['A', 'B', None, None]; rear = 1; count = 2", call: "enqueue('C')", after: "(queue, front, rear, count)" },
        { label: "rear wraps to index 0", setup: "queue[:] = [None, None, 5, 6]; front = 2; rear = 3; count = 2", call: "enqueue('X')", after: "(queue, front, rear, count)" },
        { label: "full queue: overflow", setup: "queue[:] = [1, 2, 3, 4]; rear = 3; count = 4", call: "enqueue('X')", after: "(queue, front, rear, count)", out: true }
      ],
      hints: ["Check <code>count == SIZE</code> for full.", "Declare <code>global rear, count</code>.", "Move the rear with <code>(rear + 1) % SIZE</code>, store the value, then add 1 to <code>count</code>."],
      markscheme: ["Declares the changed variables (rear, count) as global", "Tests for a full queue (count == SIZE) and prints \"Queue overflow\"", "Moves rear using (rear + 1) % SIZE and stores v at queue[rear]", "Increments count"],
      explain: "The % SIZE is what makes the queue circular: after index 3, the rear goes back to 0." },
    { id: "e8", type: "code", marks: 4,
      context: "Same circular queue (global <code>queue</code>, <code>SIZE = 4</code>, <code>front</code>, <code>rear</code>, <code>count</code>).",
      q: "<b>Construct</b> the function <code>dequeue()</code>. If the queue is empty it must print <code>Queue underflow</code>; otherwise it removes and <b>returns</b> the front item, moving the front pointer round the array.",
      starter: `SIZE = 4
queue = [None] * SIZE
front, rear, count = 0, -1, 0

def dequeue():
    # your code here
    pass`,
      solution: `SIZE = 4
queue = [None] * SIZE
front, rear, count = 0, -1, 0

def dequeue():
    global front, count
    if count == 0:
        print("Queue underflow")
    else:
        v = queue[front]
        front = (front + 1) % SIZE
        count = count - 1
        return v`,
      tests: [
        { label: "dequeue from queue with three items", setup: "queue[:] = ['A', 'B', 'C', None]; rear = 2; count = 3", call: "dequeue()", after: "(front, rear, count)" },
        { label: "front wraps to index 0", setup: "queue[:] = ['E', None, None, 'D']; front = 3; rear = 0; count = 2", call: "dequeue()", after: "(front, rear, count)" },
        { label: "dequeue the only item", setup: "queue[1] = 'Z'; front = 1; rear = 1; count = 1", call: "dequeue()", after: "(front, rear, count)" },
        { label: "empty queue: underflow", call: "dequeue()", after: "(front, rear, count)", out: true }
      ],
      hints: ["Check <code>count == 0</code> for empty.", "Read <code>queue[front]</code> into a variable <b>before</b> moving <code>front</code>.", "<code>front = (front + 1) % SIZE</code>, then reduce <code>count</code>."],
      markscheme: ["Declares front and count as global", "Tests for an empty queue and prints \"Queue underflow\"", "Reads queue[front] before moving the pointer", "Moves front with (front + 1) % SIZE, decrements count and returns the item"],
      explain: "Both pointers use the same wrap-round idea. <code>count</code> removes the ambiguity between full and empty (front and rear can look the same in both cases)." },
    { id: "e9", type: "code", marks: 4,
      q: "<b>Construct</b> a function <code>reverse_queue(q)</code> that reverses a <code>deque</code> <b>in place</b> using a stack (a Python list). Use only <code>append</code>, <code>popleft</code> and <code>pop</code>; do not use <code>reverse</code>, <code>reversed</code> or slicing.",
      starter: `from collections import deque

def reverse_queue(q):
    # your code here
    pass`,
      solution: `from collections import deque

def reverse_queue(q):
    s = []
    while len(q) > 0:
        s.append(q.popleft())
    while len(s) > 0:
        q.append(s.pop())`,
      forbid: [".reverse(", "reversed(", "[::"],
      tests: [
        { setup: "q = deque([1, 2, 3])", call: "reverse_queue(q)", after: "list(q)" },
        { label: "single item", setup: "q = deque(['A'])", call: "reverse_queue(q)", after: "list(q)" },
        { label: "empty queue", setup: "q = deque()", call: "reverse_queue(q)", after: "list(q)" },
        { label: "longer queue", setup: "q = deque([5, 4, 9, 1, 7])", call: "reverse_queue(q)", after: "list(q)" }
      ],
      hints: ["Move every item from the queue to the stack with <code>popleft</code> and <code>append</code>.", "Then move every item back with <code>pop</code> and <code>append</code>."],
      markscheme: ["Creates an empty stack", "Loops until the queue is empty, popleft from queue and push onto the stack", "Loops until the stack is empty, pops from the stack and enqueues onto the queue", "Works on the original queue (in place)"],
      explain: "The stack reverses the order: the first item out of the queue is the last into the stack, so it ends up last back in the queue." },
    { id: "e10", type: "code", marks: 4,
      context: "An emergency department keeps a waiting list as a list of <code>[name, priority]</code> pairs in order of arrival. A <b>higher number</b> means more urgent. Among patients with the same priority, the one who arrived first is served first.",
      q: "<b>Construct</b> a function <code>next_patient(queue)</code> that <b>removes</b> the next patient to be served from <code>queue</code> and returns their <b>name</b>. If the queue is empty, return <code>None</code>.",
      starter: `def next_patient(queue):
    # your code here
    pass`,
      solution: `def next_patient(queue):
    if len(queue) == 0:
        return None
    best = 0
    for i in range(1, len(queue)):
        if queue[i][1] > queue[best][1]:
            best = i
    name = queue[best][0]
    queue.pop(best)
    return name`,
      tests: [
        { setup: "q = [['Ann', 2], ['Bo', 5], ['Cy', 3]]", call: "next_patient(q)", after: "q" },
        { label: "tie: earliest arrival served first", setup: "q = [['Ann', 4], ['Bo', 4], ['Cy', 1]]", call: "next_patient(q)", after: "q" },
        { label: "single patient", setup: "q = [['Dee', 1]]", call: "next_patient(q)", after: "q" },
        { label: "empty queue", setup: "q = []", call: "next_patient(q)", after: "q" },
        { label: "most urgent is last", setup: "q = [['A', 1], ['B', 2], ['C', 9]]", call: "next_patient(q)", after: "q" }
      ],
      hints: ["Find the <b>index</b> of the highest priority.", "Use a strict <code>&gt;</code> so that, on a tie, the earlier patient stays the best.", "Remove it with <code>pop(index)</code> and return the name."],
      markscheme: ["Returns None for an empty queue", "Loops to find the index of the highest priority", "Uses strict comparison so the earliest arrival wins a tie", "Removes that item from the queue and returns its name"],
      explain: "Arrival order only breaks ties: urgency overrides it. That is what makes this a priority queue." },
    { id: "e11", type: "code", marks: 2,
      context: "In this circular queue, after the front pointer passes index 3 the program crashes.",
      q: "<b>Identify</b> the error in <code>dequeue</code> and <b>correct</b> it.",
      starter: `SIZE = 4
queue = [None] * SIZE
front, rear, count = 0, -1, 0

def dequeue():
    global front, count
    if count == 0:
        print("Queue underflow")
    else:
        v = queue[front]
        front += 1
        count -= 1
        return v`,
      solution: `SIZE = 4
queue = [None] * SIZE
front, rear, count = 0, -1, 0

def dequeue():
    global front, count
    if count == 0:
        print("Queue underflow")
    else:
        v = queue[front]
        front = (front + 1) % SIZE
        count -= 1
        return v`,
      tests: [
        { label: "ordinary dequeue", setup: "queue[:] = ['A', 'B', None, None]; rear = 1; count = 2", call: "dequeue()", after: "(front, count)" },
        { label: "front wraps from index 3 to 0", setup: "queue[:] = ['E', None, None, 'D']; front = 3; rear = 0; count = 2", call: "dequeue()", after: "(front, count)" },
        { label: "two dequeues across the wrap", setup: "queue[:] = ['E', None, None, 'D']; front = 3; rear = 0; count = 2", call: "(dequeue(), dequeue())", after: "(front, count)" }
      ],
      hints: ["What happens to <code>front</code> when it is 3 and SIZE is 4?", "Use the same wrap-round as the rear pointer."],
      markscheme: ["Identifies that front is increased without wrapping, so it goes past the end of the array (index out of range)", "Corrects with front = (front + 1) % SIZE"],
      explain: "Without <code>% SIZE</code> the front walks off the end of the array and the queue is not circular." },
    { id: "e12", type: "written", marks: 3,
      q: "<b>Compare</b> the use of a linked list, a circular array and a plain array to implement a queue.",
      markscheme: [
        "Linked list: enqueue and dequeue are O(1) (1)",
        "Linked list is dynamic: grows and shrinks, but needs extra memory for pointers (1)",
        "Circular array: enqueue and dequeue are O(1) because the pointers wrap and freed slots are reused (1)",
        "Circular array is a fixed block so it can overflow when full (1)",
        "Plain array: dequeue is O(n) because every item shifts left (e.g. 999 shifts for 1000 items) (1)"
      ],
      model: "A linked list queue has O(1) enqueue and dequeue and grows and shrinks as needed, at the cost of extra memory for the pointers. A circular array also has O(1) enqueue and dequeue because the front and rear pointers wrap round and reuse freed slots, but it is a fixed block, so it overflows when full. A plain array is a poor queue because dequeue is O(n): every remaining item must shift left.",
      explain: "Quote the time for each one. The key contrast is O(1) for linked list and circular array against O(n) dequeue for a plain array." },
    { id: "e13", type: "written", marks: 3,
      q: "<b>Explain</b> why a hospital emergency department would use a priority queue rather than an ordinary queue, and <b>state</b> one use of an ordinary FIFO queue in a computer system.",
      markscheme: [
        "In a priority queue each item (patient) has a priority and the highest priority is served first (1)",
        "so an urgent patient is treated before patients who arrived earlier; an ordinary queue would serve strictly in arrival order (1)",
        "FIFO use, specific: e.g. printer jobs are enqueued when sent and printed in the order sent / keyboard buffer keeps keystrokes in order / FCFS CPU scheduling (1)"
      ],
      model: "In a priority queue every patient has a priority and the most urgent is served first, regardless of when they arrived, so a seriously ill patient is not made to wait behind people with minor problems. An ordinary FIFO queue would serve them strictly in arrival order. A FIFO queue is used for printer jobs: each job is enqueued when sent and the printer dequeues the oldest, so documents print in the order they were sent.",
      explain: "Say <i>urgency overrides arrival order</i>, and give a use that actually depends on arrival order." }
  ]
}
);
