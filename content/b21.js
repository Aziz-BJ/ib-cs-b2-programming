B2.topics.push({
  id: "b2-1-1",
  code: "B2.1.1",
  section: "B2.1 Programming fundamentals",
  title: "Data types, operators & scope",
  summary: "Choose the right data type, convert between types, use every arithmetic operator correctly, and predict what global and local variables do.",
  minutes: 35,
  lesson: [
    { h: "Why types matter" },
    { p: "Every value has a <b>data type</b>. The type decides what you can do with it and how much memory it needs. You can add two numbers, but you cannot add a number to text: Python crashes, or (in other languages) gives a wrong answer silently. So you must <b>convert explicitly</b>." },
    { table: { head: ["Type", "Stores", "Python", "Example"], rows: [
      ["Integer", "Whole number", "<code>int</code>", "<code>14</code>"],
      ["Decimal", "Fractional number", "<code>float</code>", "<code>23.5</code>"],
      ["String", "Text", "<code>str</code>", "<code>\"tomato\"</code>"],
      ["Char", "One character", "a <code>str</code> of length 1", "<code>'A'</code>"],
      ["Boolean", "True or false", "<code>bool</code>", "<code>True</code>"]
    ] } },
    { p: "Python has no separate char type: a char is just a string of length 1. Use <code>type(x)</code> to see a type." },
    { code: `age = 14
price = 23.5
name = "tomato"
letter = "A"
done = True
print(type(age), type(price), type(name), type(letter), type(done))` },
    { h: "Variables, constants, flags, input" },
    { list: [
      "<b>Variable</b>: a named memory location whose value <b>can change</b>. <b>Assignment</b> <code>x = 5</code> stores the right-hand value in the name on the left.",
      "<b>Constant</b>: a named value that <b>never changes</b> while the program runs. Python convention: capitals, e.g. <code>TAX_RATE = 0.2</code>. Python does not enforce it.",
      "<b>Boolean flag</b>: a True/False variable that records a state and controls a loop or decision, e.g. <code>found = False</code>.",
      "<b><code>input()</code> always returns a string.</b> Convert with <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>bool()</code>."
    ] },
    { code: `TAX_RATE = 0.2
text = input()
price = float(text)
print("Price with tax:", price * (1 + TAX_RATE))
print(text + text)
print(price + price)`, stdin: "10" },
    { p: "Notice <code>text + text</code> joins strings (<code>1010</code>) but <code>price + price</code> adds numbers. Same operator, different type, different result." },
    { h: "Swapping two variables" },
    { p: "<code>a = b</code> then <code>b = a</code> does not swap: the first line destroys the old value of <code>a</code>. Use a <b>temporary variable</b>. Python also has a shortcut." },
    { code: `a = 3
b = 8
temp = a
a = b
b = temp
print(a, b)
a, b = b, a      # Python shortcut swaps back
print(a, b)` },
    { h: "Operators" },
    { table: { head: ["Operator", "Meaning", "Example", "Result"], rows: [
      ["<code>+ - *</code>", "Add, subtract, multiply (<b>binary</b>: two operands)", "<code>7 * 2</code>", "14"],
      ["<code>/</code>", "<b>Floating-point</b> division: fraction kept", "<code>7 / 2</code>", "3.5"],
      ["<code>//</code>", "<b>Integer division</b> (DIV): fraction dropped, rounds <b>down</b>", "<code>7 // 2</code>", "3"],
      ["<code>%</code>", "<b>Modulus</b> (MOD): the remainder", "<code>7 % 2</code>", "1"],
      ["<code>**</code>", "Power", "<code>2 ** 3</code>", "8"],
      ["<code>-x</code>", "<b>Unary</b> minus (one operand)", "<code>-5</code>", "-5"]
    ] } },
    { code: `print(7 * 2, 7 / 2, 7 // 2, 7 % 2, 2 ** 3, -5)
print(-7 // 2)    # rounds DOWN (floor), so -4 not -3
print(-7 % 2)` },
    { trap: "<code>//</code> rounds <b>down</b> (towards minus infinity), so <code>-7 // 2</code> is <b>-4</b>, not -3. Python also has no <code>++</code> or <code>--</code>: write <code>i += 1</code>." },
    { h: "Four patterns you will use constantly" },
    { list: [
      "<code>n % 2 == 0</code> tests whether <code>n</code> is even.",
      "<code>n % 10</code> gives the <b>last digit</b>.",
      "<code>n // 10</code> <b>removes</b> the last digit.",
      "Together they peel a number apart digit by digit (see the loop below)."
    ] },
    { code: `n = 472
while n > 0:
    print("last digit:", n % 10)
    n = n // 10` },
    { h: "Overflow: Ariane 5 (1996)" },
    { p: "A 64-bit floating-point value was converted into a 16-bit integer. The value was too big for 16 bits, so it <b>overflowed</b>. The inertial guidance systems failed, the rocket veered off course and self-destructed. Lesson: the type you choose decides the range of values a variable can hold, so choose and convert types carefully." },
    { h: "Scope: global vs local" },
    { table: { head: ["Term", "Meaning"], rows: [
      ["Global variable", "Declared <b>outside</b> any function; accessible anywhere."],
      ["Local variable", "Declared <b>inside</b> a function; exists only while it runs."],
      ["Variable shadowing", "A local with the same name <b>hides</b> the global inside that function. The global is <b>not</b> changed."],
      ["Update the global", "Declare <code>global w</code> inside the function, then assign to it."]
    ] } },
    { code: `w = 100          # global
def f():
    w = 50       # a NEW local called w (shadows the global)
    w = w - 10   # 40
    print("inside:", w)
f()
print("outside:", w)   # still 100

def g():
    global w
    w = w - 10
g()
print("after global:", w)` },
    { tip: "To trace scope questions, keep two columns: the global <code>w</code> and the local <code>w</code>. A plain assignment inside a function creates a local; only <code>global</code> reaches the outside one." },
    { trap: "Different types never combine automatically: use <code>int(\"5\")</code>. Also, any non-empty string is True: <code>bool(\"False\")</code> is <b>True</b>, and <code>bool(\"\")</code> is False." },
    { code: `print(bool("False"), bool(""), bool(0), bool(7))
print("5" + "3", int("5") + 3)` }
  ],
  mustKnow: [
    "Five types: integer, decimal (float), string, char, Boolean. Mixing types needs <b>explicit conversion</b>.",
    "<code>input()</code> always returns a <b>string</b>.",
    "<code>/</code> keeps the fraction; <code>//</code> (DIV) drops it and rounds <b>down</b> (<code>-7 // 2</code> is -4); <code>%</code> (MOD) gives the remainder.",
    "<code>n % 10</code> = last digit; <code>n // 10</code> = remove last digit; <code>n % 2 == 0</code> = even.",
    "Swap with a temporary variable (or <code>a, b = b, a</code> in Python).",
    "Global = outside functions; local = inside; a local of the same name <b>shadows</b> the global. Use <code>global</code> to change it.",
    "Ariane 5: 64-bit float converted to 16-bit integer, overflow, rocket destroyed.",
    "<code>bool(\"False\")</code> is True: any non-empty string is True."
  ],
  terms: [
    { term: "Variable", def: "A named memory location whose value can change while the program runs." },
    { term: "Constant", def: "A named value that never changes while the program runs (Python convention: capital letters, e.g. TAX_RATE)." },
    { term: "Boolean flag", def: "A True/False variable that records a state and is used to control a loop or a decision." },
    { term: "Assignment", def: "Storing the value of the right-hand expression in the variable named on the left." },
    { term: "Explicit conversion (casting)", def: "Deliberately changing a value from one data type to another with int(), float(), str() or bool()." },
    { term: "Integer division (DIV, //)", def: "Division that drops the fractional part and rounds down, e.g. 7 // 2 = 3." },
    { term: "Modulus (MOD, %)", def: "The remainder after integer division, e.g. 7 % 2 = 1." },
    { term: "Unary operator", def: "An operator with one operand, such as the minus in -x." },
    { term: "Overflow", def: "A value too large for the storage allocated to its data type, giving a wrong result or failure (Ariane 5)." },
    { term: "Global variable", def: "A variable declared outside any function that can be accessed anywhere in the program." },
    { term: "Local variable", def: "A variable declared inside a function that exists only while that function runs." },
    { term: "Variable shadowing", def: "A local variable with the same name as a global hides the global inside that function; the global is not changed." }
  ],
  exercises: [
    { id: "e1", type: "mcq", marks: 1,
      q: "<b>Identify</b> the data type of <code>age</code> after this code runs and the user types <code>16</code>: <pre>age = input(\"Age: \")</pre>",
      options: ["integer", "string", "decimal (float)", "Boolean"], answer: 1,
      explain: "<code>input()</code> always returns a string, whatever the user types. You need <code>int(input(...))</code> to get an integer." },
    { id: "e2", type: "mcq", marks: 1,
      q: "<b>Identify</b> the value of <code>-7 // 2</code> in Python.",
      options: ["-3", "-3.5", "-4", "-1"], answer: 2,
      explain: "<code>//</code> rounds <b>down</b> (floor). -3.5 rounded down is -4. A common mistake is to drop the fraction (giving -3), which is rounding towards zero." },
    { id: "e3", type: "output", marks: 2,
      q: "<b>State</b> the output of the program.",
      code: `print(17 // 5, 17 % 5)
print(17 / 5)
print(2 ** 4, -3 * 2)`,
      explain: "17 // 5 = 3 remainder 2; 17 / 5 = 3.4; 2 ** 4 = 16; -3 * 2 = -6. <code>print</code> separates the values with a space." },
    { id: "e4", type: "output", marks: 3,
      q: "<b>State</b> the output of the program.",
      code: `count = 0
def add():
    count = 5
    print(count)
def reset():
    global count
    count = 1
add()
print(count)
reset()
print(count)`,
      explain: "<code>add</code> creates a new <b>local</b> <code>count</code> (shadowing): it prints 5 but the global stays 0. <code>reset</code> declares <code>global</code>, so it changes the real one to 1." },
    { id: "e5", type: "output", marks: 3,
      q: "<b>State</b> the output of the program.",
      code: `print(bool("False"))
print(bool(""))
print("5" + "3", int("5") + 3)
print(-7 // 2, -7 % 2)`,
      explain: "Non-empty string is True (even \"False\"); empty string is False. <code>\"5\" + \"3\"</code> joins text, giving 53; <code>int(\"5\") + 3</code> is 8. -7 // 2 is -4 and -7 % 2 is 1 because -4 * 2 + 1 = -7." },
    { id: "e6", type: "trace", marks: 4,
      q: "<b>Trace</b> the algorithm to show the value of each variable after each pass.",
      code: `n = 472
total = 0
while n > 0:
    digit = n % 10
    total = total + digit
    n = n // 10
print(total)`,
      columns: ["Pass", "n", "digit", "total", "Output"],
      rows: [["Start", "472", "", "0", ""], ["1", "47", "2", "2", ""], ["2", "4", "7", "9", ""], ["3", "0", "4", "13", ""], ["End", "0", "", "13", "13"]],
      prefill: 1, labelCol: true,
      explain: "Each pass takes the last digit (<code>n % 10</code>), adds it to <code>total</code> and removes it (<code>n // 10</code>). The loop stops when <code>n</code> reaches 0. The algorithm outputs the <b>sum of the digits</b> (4 + 7 + 2 = 13)." },
    { id: "e7", type: "code", marks: 4,
      context: "A lottery app validates a ticket number by adding up its digits.",
      q: "<b>Construct</b> a function <code>digit_sum(n)</code> that takes a non-negative integer and <b>returns</b> the sum of its digits, using <code>%</code> and <code>//</code> (do not convert the number to a string).",
      starter: `def digit_sum(n):
    # your code here
    pass`,
      solution: `def digit_sum(n):
    total = 0
    while n > 0:
        total = total + n % 10
        n = n // 10
    return total`,
      tests: [
        { call: "digit_sum(472)" }, { call: "digit_sum(0)", label: "zero" }, { call: "digit_sum(9)", label: "single digit" },
        { call: "digit_sum(1000)", label: "zeros inside" }, { call: "digit_sum(99999)" }
      ],
      forbid: ["str("],
      hints: ["Start a running total at 0 before the loop.", "<code>n % 10</code> is the last digit. <code>n // 10</code> removes it.", "Loop while <code>n &gt; 0</code>, then return the total after the loop."],
      markscheme: ["Initialises total to 0 before the loop", "Loop continues while n &gt; 0", "Adds n % 10 to the total and removes the last digit with n // 10", "Returns the total (not prints) after the loop"] },
    { id: "e8", type: "code", marks: 2,
      context: "A till program keeps a global running total of sales.",
      q: "The function below should add each sale to the global <code>total</code>, but it crashes. <b>Identify</b> the cause and <b>fix</b> the code.",
      starter: `total = 0

def add_sale(amount):
    total = total + amount`,
      solution: `total = 0

def add_sale(amount):
    global total
    total = total + amount`,
      tests: [
        { setup: "total = 10", call: "add_sale(5)", after: "total", label: "10 + 5" },
        { setup: "total = 0", call: "add_sale(20)", after: "total", label: "0 + 20" },
        { setup: "total = 100", call: "add_sale(0)", after: "total", label: "adding 0" }
      ],
      hints: ["Assigning to <code>total</code> inside a function creates a <i>local</i> variable. It is read before it exists.", "Tell Python you mean the global one: <code>global total</code>."],
      markscheme: ["Identifies that total is treated as a local variable (shadowing) so it is read before assignment", "Adds <code>global total</code> inside the function"] },
    { id: "e9", type: "code", marks: 3,
      context: "A shop stores a tax constant and receives prices as text from a form.",
      q: "<b>Construct</b> a function <code>price_with_tax(price_text)</code> that converts the text to a decimal, adds tax at the constant <code>TAX_RATE</code> (20%), and <b>returns</b> the result rounded to 2 decimal places.",
      starter: `TAX_RATE = 0.2

def price_with_tax(price_text):
    # your code here
    pass`,
      solution: `TAX_RATE = 0.2

def price_with_tax(price_text):
    price = float(price_text)
    total = price + price * TAX_RATE
    return round(total, 2)`,
      tests: [
        { call: "price_with_tax('10')" }, { call: "price_with_tax('19.99')", label: "needs rounding" },
        { call: "price_with_tax('0')", label: "zero" }, { call: "price_with_tax('5.5')" }
      ],
      hints: ["The input is a string: convert with <code>float()</code> first.", "<code>round(value, 2)</code> rounds to 2 decimal places."],
      markscheme: ["Converts the string to a float", "Calculates price plus tax using TAX_RATE (not a hard-coded 0.2)", "Returns the value rounded to 2 decimal places"] },
    { id: "e10", type: "code", marks: 4,
      context: "A sports app records race times in seconds.",
      q: "<b>Write</b> a program that reads a whole number of seconds from the user and prints it as hours, minutes and seconds in the format <code>1h 2m 5s</code>. Use <code>//</code> and <code>%</code>.",
      starter: `seconds = input()
# your code here`,
      solution: `total = int(input())
h = total // 3600
m = (total % 3600) // 60
s = total % 60
print(str(h) + "h " + str(m) + "m " + str(s) + "s")`,
      tests: [
        { stdin: "3725", label: "3725 seconds" }, { stdin: "59", label: "under a minute" },
        { stdin: "3600", label: "exactly an hour" }, { stdin: "0", label: "zero" }, { stdin: "86399" }
      ],
      hints: ["<code>input()</code> gives a string, so convert it with <code>int()</code>.", "Hours = seconds // 3600. The seconds left over are <code>seconds % 3600</code>.", "Minutes = leftover // 60, seconds = leftover % 60."],
      markscheme: ["Converts the input to an integer", "Calculates hours with // 3600", "Calculates minutes and seconds correctly using % and //", "Prints in the required format"] },
    { id: "e11", type: "code", marks: 3,
      q: "<b>Write</b> a program that reads two integers, one per line, into <code>a</code> then <code>b</code>. <b>Swap</b> their values using a temporary variable, then print <code>a = </code> and <code>b = </code> in the format shown by the tests, e.g. <code>a = 8, b = 3</code>.",
      starter: `a = int(input())
b = int(input())
# swap here, then print`,
      solution: `a = int(input())
b = int(input())
temp = a
a = b
b = temp
print("a = " + str(a) + ", b = " + str(b))`,
      tests: [
        { stdin: "3\n8" }, { stdin: "-4\n0" }, { stdin: "7\n7", label: "equal values" }
      ],
      forbid: ["a, b = b, a", "a,b=b,a"],
      hints: ["Save <code>a</code> in <code>temp</code> before overwriting it.", "Order: <code>temp = a</code>, <code>a = b</code>, <code>b = temp</code>."],
      markscheme: ["Stores one value in a temporary variable first", "Assigns the values across so no value is lost", "Prints the swapped values in the correct format"] },
    { id: "e12", type: "written", marks: 3,
      q: "<b>Outline</b> why the Ariane 5 rocket failed in 1996 and what this shows about data types.",
      markscheme: ["A 64-bit floating-point value was converted to a 16-bit integer (1 mark)", "The value was too large for 16 bits, causing an overflow (1 mark)", "The guidance system failed and the rocket veered off course and self-destructed (1 mark)", "Lesson: the type chosen limits the range of values; types must be chosen and converted carefully (1 mark)"],
      model: "A 64-bit floating-point number was converted into a 16-bit integer. The number was bigger than a 16-bit integer can hold, so it <b>overflowed</b>. The inertial guidance systems failed, the rocket veered off course and self-destructed. It shows that the data type decides the range of values a variable can store, so developers must choose types and conversions carefully." }
  ]
});
B2.topics.push({
  id: "b2-1-2",
  code: "B2.1.2",
  section: "B2.1 Programming fundamentals",
  title: "Substrings",
  summary: "Extract and manipulate parts of a string using indexes, slices, and string methods, and predict the exact result.",
  minutes: 30,
  lesson: [
    { h: "Strings are sequences of characters" },
    { p: "A <b>string</b> is a sequence of characters. A <b>substring</b> is a smaller sequence taken from it. To pick characters out we use their <b>index</b>: the position of a character." },
    { list: [
      "<b>Index</b> is <b>zero-based</b>: the first character is at index 0; the last is at <code>len(s) - 1</code>.",
      "<b>End index is exclusive</b>: it says where to <i>stop</i>, not which character to include.",
      "<b>Negative index</b> counts from the end: <code>s[-1]</code> is the last character."
    ] },
    { table: { head: ["Char", "u", "n", "i", "q", "l", "o", "-", "s", "h", "i", "r", "t"], rows: [
      ["Index", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
      ["Negative", "-12", "-11", "-10", "-9", "-8", "-7", "-6", "-5", "-4", "-3", "-2", "-1"]
    ] } },
    { p: "<code>s[0:6]</code> takes indices 0 to 5, which is <code>\"uniqlo\"</code>. The slice <code>s[start:end]</code> always has <code>end - start</code> characters." },
    { code: `s = "uniqlo-shirt"
print(s[0:6])      # uniqlo
print(s[7:12])     # shirt
print(len(s))      # 12, so last index is 11
print(s[0])        # u
print(s[-1])       # t` },
    { trap: "<code>s[0:6]</code> gives indices <b>0-5</b>, not 6. A 12-character string ends at index <b>11</b>. Both the beginning and the end of a slice trip people up: count carefully." },
    { h: "Slicing cheat sheet" },
    { p: "Using <code>text = \"Computer Science is fun\"</code>:" },
    { table: { head: ["Task", "Python", "Result"], rows: [
      ["Length (spaces count)", "<code>len(text)</code>", "23"],
      ["Slice: start to end - 1", "<code>text[9:16]</code>", "Science"],
      ["From the start / to the end", "<code>text[:5]</code> &nbsp; <code>text[9:]</code>", "Compu &nbsp; Science is fun"],
      ["Negative index (from the end)", "<code>text[-1]</code> &nbsp; <code>text[-6:]</code>", "n &nbsp; is fun"],
      ["Strip spaces from both ends", "<code>\"  hi \".strip()</code>", "hi"],
      ["Replace (one or more characters)", "<code>text.replace(\"is\", \"will be\")</code>", "Computer Science will be fun"],
      ["Change case", "<code>text.upper()</code> &nbsp; <code>text.lower()</code>", "COMPUTER SCIENCE IS FUN"],
      ["Concatenate (join)", "<code>\"Comp\" + \"uter\"</code>", "Computer"],
      ["Number into a string", "<code>\"Grade \" + str(9)</code> &nbsp; <code>f\"Grade {9}\"</code>", "Grade 9"],
      ["Escape characters", "<code>\\n</code> new line, <code>\\t</code> tab, <code>\\\"</code> quote, <code>\\\\</code> backslash", "special character shown"],
      ["Multi-line string", "triple quotes <code>\"\"\"...\"\"\"</code>", "text can span lines"]
    ] } },
    { code: `text = "Computer Science is fun"
print(len(text))
print(text[9:16])
print(text[:5], "|", text[9:])
print(text[-1], "|", text[-6:])
print("  hi ".strip())
print(text.replace("is", "will be"))
print(text.upper())
print("Comp" + "uter")
print("Grade " + str(9), f"Grade {9}")` },
    { trap: "<b>Correction:</b> some sources put the \"S\" of \"Science\" at index 8. Index 8 is the space. \"Science\" is <code>text[9:16]</code>: S at 9, e at 15, end index 16 excluded." },
    { h: "Methods return a new string" },
    { p: "Strings are <b>immutable</b>: <code>strip</code>, <code>replace</code>, <code>upper</code> and <code>lower</code> give back a <i>new</i> string and leave the original unchanged. Store the result or you lose it. You can chain them left to right." },
    { code: `s = "TATA-Shoe"
s.lower()              # result thrown away!
print(s)
r = s.replace("-", "/").lower()
print(r)
url = "shop.com/" + r
print(url)` },
    { h: "Escape characters and triple quotes" },
    { p: "A backslash inside a string starts an <b>escape sequence</b>: <code>\\n</code> is a new line, <code>\\t</code> a tab, <code>\\\"</code> a quote mark inside a string, <code>\\\\</code> a single backslash. Triple quotes let a string run over several lines." },
    { code: `print("Line 1\\nLine 2")
print("She said \\"hi\\"")
print("C:\\\\data")
print("""Dear customer,
your order has shipped.""")` },
    { tip: "Exam recipe: write the string out with its indexes underneath (like the table above), then count. For <code>s[a:b]</code> circle index <code>a</code> and stop just before <code>b</code>." }
  ],
  mustKnow: [
    "Indexing starts at <b>0</b>; the last index is <code>len(s) - 1</code>.",
    "The end index of a slice is <b>exclusive</b>: <code>s[a:b]</code> has <code>b - a</code> characters.",
    "Negative indices count from the end: <code>s[-1]</code> is the last character.",
    "<code>s[:n]</code> = first n characters; <code>s[n:]</code> = from index n to the end.",
    "<code>len</code>, <code>strip</code>, <code>replace</code>, <code>upper</code>, <code>lower</code>; methods return a new string.",
    "Join with <code>+</code> (numbers need <code>str()</code>) or use an f-string.",
    "Escapes: <code>\\n</code> <code>\\t</code> <code>\\\"</code> <code>\\\\</code>; triple quotes for multi-line text.",
    "\"Science\" in \"Computer Science is fun\" is <code>text[9:16]</code>."
  ],
  terms: [
    { term: "String", def: "A sequence of characters, such as text." },
    { term: "Substring", def: "A smaller sequence of characters taken from a string." },
    { term: "Index", def: "The position of a character in a string; zero-based, so the first character is at index 0." },
    { term: "End index (exclusive)", def: "The index in a slice where extraction stops; the character at that index is not included." },
    { term: "Slice", def: "A substring extracted with s[start:end], containing the characters from start up to but not including end." },
    { term: "Negative index", def: "An index counted from the end of the string, so s[-1] is the last character." },
    { term: "Concatenation", def: "Joining two or more strings end to end, using + in Python." },
    { term: "f-string", def: "A string prefixed with f in which expressions in braces are evaluated and inserted, e.g. f\"Grade {9}\"." },
    { term: "Escape character", def: "A backslash sequence inside a string that represents a special character, e.g. \\n (new line) or \\\" (quote)." },
    { term: "Triple-quoted string", def: "A string written between three quotation marks that can span several lines." }
  ],
  exercises: [
    { id: "e1", type: "mcq", marks: 1,
      q: "<b>Identify</b> the expression that returns <code>\"Science\"</code> from <code>text = \"Computer Science is fun\"</code>.",
      options: ["<code>text[8:15]</code>", "<code>text[9:15]</code>", "<code>text[9:16]</code>", "<code>text[10:17]</code>"], answer: 2,
      explain: "C-o-m-p-u-t-e-r is indexes 0-7, the space is 8, so \"S\" is 9. \"Science\" has 7 letters, so the end index is 9 + 7 = 16 (exclusive)." },
    { id: "e2", type: "mcq", marks: 1,
      q: "<b>Identify</b> the result of <code>\"uniqlo-shirt\"[-5:]</code>.",
      options: ["<code>shirt</code>", "<code>-shirt</code>", "<code>hirt</code>", "<code>uniql</code>"], answer: 0,
      explain: "Index -5 is the 5th character from the end: s. <code>[-5:]</code> runs from there to the end, giving \"shirt\"." },
    { id: "e3", type: "output", marks: 4,
      q: "<b>State</b> the output of the program.",
      code: `text = "Computer Science is fun"
print(text[:5])
print(text[-3:])
print(text[9:16])
print(len(text))`,
      explain: "<code>[:5]</code> is indices 0-4 = Compu; <code>[-3:]</code> is the last three characters = fun; <code>[9:16]</code> = Science; the length (including 3 spaces) is 23." },
    { id: "e4", type: "output", marks: 3,
      q: "<b>State</b> the output of the program.",
      code: `raw = "  TATA-Shoe "
r = raw.strip().replace("-", "/").lower()
print(r)
print("shop.com/" + r)
print(len(raw))`,
      explain: "<code>strip</code> removes the outer spaces, <code>replace</code> changes - to /, <code>lower</code> lowercases: tata/shoe. <code>raw</code> itself is unchanged and still has 12 characters (2 spaces + 9 for TATA-Shoe + 1 space)." },
    { id: "e5", type: "output", marks: 3,
      q: "<b>State</b> the output of the program.",
      code: `print("Say \\"hi\\"\\nBye\\\\")
print("""A
B""")
print("Grade " + str(9), f"Total: {2 + 3}")`,
      explain: "<code>\\\"</code> prints a quote mark, <code>\\n</code> starts a new line, <code>\\\\</code> prints one backslash. The triple-quoted string keeps its line break. The f-string evaluates <code>2 + 3</code>." },
    { id: "e6", type: "trace", marks: 4,
      q: "<b>Trace</b> the program.",
      code: `s = "BANANA"
i = 0
count = 0
while i < len(s) - 1:
    pair = s[i:i + 2]
    if pair == "AN":
        count = count + 1
    i = i + 1
print(count)`,
      columns: ["Pass", "pair", "count", "i"],
      rows: [["Start", "", "0", "0"], ["1", "BA", "0", "1"], ["2", "AN", "1", "2"], ["3", "NA", "1", "3"], ["4", "AN", "2", "4"], ["5", "NA", "2", "5"]],
      prefill: 1, labelCol: true,
      explain: "Each pass takes the 2-character substring starting at <code>i</code>. The loop stops once <code>i</code> reaches 5 (<code>len(s) - 1</code>). It counts how many times \"AN\" occurs: 2." },
    { id: "e7", type: "code", marks: 4,
      context: "A school creates an email username from a student's names.",
      q: "<b>Construct</b> a function <code>make_username(first, last)</code> that returns the first letter of the first name followed by the whole last name, all in lower case. Names may have spaces at the start or end, which must be removed.",
      starter: `def make_username(first, last):
    # your code here
    pass`,
      solution: `def make_username(first, last):
    first = first.strip()
    last = last.strip()
    username = first[0] + last
    return username.lower()`,
      tests: [
        { call: "make_username('Ada', 'Lovelace')" }, { call: "make_username('  Grace ', 'HOPPER')", label: "spaces and capitals" },
        { call: "make_username('x', 'Y')", label: "single letters" }
      ],
      hints: ["<code>first[0]</code> is the first character.", "<code>.strip()</code> removes spaces; <code>.lower()</code> changes case.", "Remember to <b>return</b> the string."],
      markscheme: ["Removes surrounding spaces from the names", "Extracts the first character of the first name", "Concatenates it with the last name and converts to lower case", "Returns the result (not prints)"] },
    { id: "e8", type: "code", marks: 4,
      context: "Product codes look like <code>TSH-0042-L</code>: a 3-letter category, a 4-digit item number, then a 1-letter size, separated by hyphens.",
      q: "<b>Construct</b> a function <code>describe_code(code)</code> that returns a string in the form <code>TSH item 42 size L</code> (the item number has no leading zeros).",
      starter: `def describe_code(code):
    # your code here
    pass`,
      solution: `def describe_code(code):
    category = code[0:3]
    number = int(code[4:8])
    size = code[-1]
    return category + " item " + str(number) + " size " + size`,
      tests: [
        { call: "describe_code('TSH-0042-L')" }, { call: "describe_code('SHO-0007-M')" },
        { call: "describe_code('CAP-1000-S')", label: "no leading zeros to drop" }, { call: "describe_code('JKT-0000-L')", label: "item 0" }
      ],
      hints: ["Positions: category 0-2, hyphen at 3, digits at 4-7, hyphen at 8, size at 9.", "Slice <code>code[0:3]</code> and <code>code[4:8]</code>; the size is the last character, <code>code[-1]</code>.", "<code>int(\"0042\")</code> drops the leading zeros; <code>str()</code> turns it back to text."],
      markscheme: ["Extracts the category with a correct slice", "Extracts the item number with a correct slice (end index exclusive)", "Converts to int to remove leading zeros / uses str() to concatenate", "Extracts the size and returns the correctly formatted string"] },
    { id: "e9", type: "code", marks: 4,
      q: "<b>Construct</b> a function <code>is_palindrome(text)</code> that returns <code>True</code> if the text reads the same forwards and backwards, ignoring upper/lower case and spaces. Compare characters using indexes inside a loop.",
      starter: `def is_palindrome(text):
    # your code here
    pass`,
      solution: `def is_palindrome(text):
    text = text.lower().replace(" ", "")
    n = len(text)
    for i in range(n // 2):
        if text[i] != text[n - 1 - i]:
            return False
    return True`,
      tests: [
        { call: "is_palindrome('Level')" }, { call: "is_palindrome('Nurses run')", label: "spaces ignored" },
        { call: "is_palindrome('Hello')" }, { call: "is_palindrome('')", label: "empty string" },
        { call: "is_palindrome('a')", label: "single character" }, { call: "is_palindrome('ab')" }
      ],
      hints: ["Clean the text first: <code>.lower().replace(\" \", \"\")</code>.", "Compare <code>text[i]</code> with <code>text[len(text) - 1 - i]</code>.", "You only need to check the first half."],
      markscheme: ["Converts to lower case and removes spaces", "Compares characters from the start and the end using correct indexes", "Returns False as soon as a pair differs", "Returns True if no pair differs"] },
    { id: "e10", type: "code", marks: 4,
      context: "A payment screen must hide card numbers.",
      q: "<b>Construct</b> a function <code>mask_card(number)</code> that takes a card number as a string and returns it with every character except the last four replaced by <code>*</code>. If it has four or fewer characters, return it unchanged.",
      starter: `def mask_card(number):
    # your code here
    pass`,
      solution: `def mask_card(number):
    masked = ""
    for i in range(len(number) - 4):
        masked = masked + "*"
    return masked + number[-4:]`,
      tests: [
        { call: "mask_card('1234567812345678')" }, { call: "mask_card('12345')", label: "5 characters" },
        { call: "mask_card('1234')", label: "exactly 4" }, { call: "mask_card('123')", label: "fewer than 4" }
      ],
      hints: ["The last four characters are <code>number[-4:]</code>.", "You need <code>len(number) - 4</code> stars: build them in a loop, or think about what a slice does when asked for more than exists.", "If the length is 4 or less, the loop must run zero times."],
      markscheme: ["Extracts the last four characters using a negative index/slice", "Builds a string of * of the correct length (len - 4)", "Concatenates masked part and last four characters", "Handles 4 or fewer characters without error"] },
    { id: "e11", type: "code", marks: 2,
      context: "A discount site stores tags like <code>[SALE]</code>.",
      q: "The function should remove the first and last characters of a tag (the brackets), but it returns the wrong text. <b>Identify</b> the error and <b>fix</b> the code.",
      starter: `def remove_brackets(tag):
    return tag[1:len(tag) - 2]`,
      solution: `def remove_brackets(tag):
    return tag[1:len(tag) - 1]`,
      tests: [
        { call: "remove_brackets('[SALE]')" }, { call: "remove_brackets('[A]')", label: "one character inside" },
        { call: "remove_brackets('(NEW)')" }
      ],
      hints: ["The end index is exclusive. Which index must the slice stop at?", "To drop the last character, stop at <code>len(tag) - 1</code>."],
      markscheme: ["Identifies that the end index len(tag) - 2 cuts off an extra character", "Corrects the end index to len(tag) - 1 (or -1)"] },
    { id: "e12", type: "written", marks: 3,
      q: "<b>Explain</b> why <code>s[0:6]</code> on the string <code>\"uniqlo-shirt\"</code> returns six characters, and state which characters those are.",
      markscheme: ["Indexes start at 0, so the first character is at index 0 (1 mark)", "The end index is exclusive: extraction stops before index 6 (1 mark)", "So indices 0-5 are returned, giving \"uniqlo\" (1 mark)"],
      model: "Index positions start at 0. In a slice the start index is included but the end index is exclusive, so extraction stops just before index 6. The characters at indices 0, 1, 2, 3, 4 and 5 are returned: \"uniqlo\" (6 characters = 6 - 0)." }
  ]
});
B2.topics.push({
  id: "b2-1-3",
  code: "B2.1.3",
  section: "B2.1 Programming fundamentals",
  title: "Exception handling",
  summary: "Use try / except / finally to stop a program crashing on bad input or missing resources, and write an input-validation loop.",
  minutes: 30,
  lesson: [
    { h: "Where programs fail" },
    { p: "Even a correct program can meet things it cannot control. These are <b>points of failure</b>:" },
    { table: { head: ["Point of failure", "Example"], rows: [
      ["Unexpected input", "Letters typed where a number is needed; blank required field."],
      ["Resource unavailability", "Deleted file; server time-out from a lost network connection."],
      ["Logic error", "Impossible operation such as dividing by zero."]
    ] } },
    { p: "<b>Exception handling</b> is a safety net: the program <b>catches</b> the error and runs a backup plan instead of being terminated." },
    { h: "try / except / finally" },
    { table: { head: ["Block", "Meaning"], rows: [
      ["<code>try</code>", "Contains code that <b>might fail</b>."],
      ["<code>except</code> (catch)", "Runs <b>only if</b> an error occurs in the try block; the program responds without crashing."],
      ["<code>finally</code>", "Runs <b>always</b>, error or not. Used for clean-up (close a file, hide a spinner)."]
    ] } },
    { code: `try:
    age = int("two")
    print("This line is skipped")
except ValueError:
    print("Invalid number")
finally:
    print("Done")        # always runs` },
    { p: "As soon as an exception happens, Python <b>jumps</b> out of the try block (the rest of it is skipped) to the matching except. With no error, the except is skipped." },
    { code: `try:
    age = int("16")
    print("Age is", age)
except ValueError:
    print("Invalid number")
finally:
    print("Done")` },
    { trap: "<code>finally</code> runs in <b>all</b> cases, not only when an error occurs." },
    { h: "Common exceptions" },
    { table: { head: ["Exception", "Raised when", "Example"], rows: [
      ["<code>ValueError</code>", "Right type, unusable value", "<code>int(\"two\")</code>"],
      ["<code>TypeError</code>", "Operation on the wrong type", "<code>\"5\" + 3</code>"],
      ["<code>ZeroDivisionError</code>", "Division or modulus by 0", "<code>10 / 0</code>"],
      ["<code>IndexError</code>", "List index out of range", "<code>items[10]</code>"],
      ["<code>FileNotFoundError</code>", "File does not exist", "<code>open(\"x.txt\")</code>"]
    ] } },
    { h: "Specific vs bare except" },
    { p: "<code>except ValueError:</code> handles <b>one</b> type, so you know the cause and can give the right message. A bare <code>except:</code> catches <b>everything</b>, including genuine bugs you never meant to hide. You can stack several excepts for different errors." },
    { code: `for text in ["4", "x", "0"]:
    try:
        print(12 // int(text))
    except ValueError:
        print("Not a whole number")
    except ZeroDivisionError:
        print("Cannot divide by zero")` },
    { h: "Validating input in a loop" },
    { p: "To keep asking until the input is valid, wrap the try in a <code>while True</code> loop. <code>break</code> only runs when the conversion succeeded." },
    { code: `while True:                    # keep asking until valid
    try:
        age = int(input("Age: "))
        break
    except ValueError:
        print("Enter a whole number")
print("Age accepted:", age)`, stdin: "abc\n\n17" },
    { h: "Limits and good practice" },
    { list: [
      "Exception handling <b>cannot fix syntax errors</b>. A syntax error stops the program running at all; exceptions are for <b>runtime</b> problems in a correct program.",
      "An <b>exception</b> is an event that interrupts normal execution and <b>can be caught</b>.",
      "Never show raw exception text to end users: it can reveal file paths, code structure or database details. Show a <b>friendly message</b> and log the detail privately."
    ] },
    { tip: "Describe questions: say what <b>try</b> holds (risky code), when <b>except</b> runs (only on error), and that <b>finally</b> always runs. Quote a specific exception name in your example." }
  ],
  mustKnow: [
    "Points of failure: unexpected input, resource unavailability (file, network), logic errors such as divide by zero.",
    "<b>try</b> = risky code; <b>except</b> = runs only if an error occurs; <b>finally</b> = runs always.",
    "Exception handling cannot fix <b>syntax errors</b>; it manages runtime exceptions in a correct program.",
    "Specific excepts (ValueError, ZeroDivisionError...) show the cause; a bare <code>except:</code> catches everything and can hide real bugs.",
    "Know the five exceptions: ValueError, TypeError, ZeroDivisionError, IndexError, FileNotFoundError.",
    "Validate input with <code>while True</code> + <code>try</code> + <code>break</code> on success.",
    "Show users a friendly message, not raw error text; keep the detail in a private log."
  ],
  terms: [
    { term: "Exception handling", def: "A safety net in which a program catches an error and runs a backup plan instead of being terminated." },
    { term: "Exception", def: "An event during execution that interrupts the normal flow of the program and can be caught." },
    { term: "try", def: "The block containing code that might fail." },
    { term: "except (catch)", def: "The block that runs only if an error occurs in the try block." },
    { term: "finally", def: "The block that always runs, whether or not an error occurred; used for clean-up." },
    { term: "Bare except", def: "An except clause with no exception type that catches every error and can hide the real bug." },
    { term: "ValueError", def: "Raised when a value has the right type but cannot be used, e.g. int(\"two\")." },
    { term: "TypeError", def: "Raised when an operation is applied to the wrong type, e.g. \"5\" + 3." },
    { term: "ZeroDivisionError", def: "Raised when dividing or taking a modulus by zero." },
    { term: "IndexError", def: "Raised when a list index is outside the valid range." },
    { term: "FileNotFoundError", def: "Raised when a file that is opened does not exist." },
    { term: "Point of failure", def: "A place in a program where something can go wrong, such as unexpected input or an unavailable resource." }
  ],
  exercises: [
    { id: "e1", type: "mcq", marks: 1,
      q: "<b>Identify</b> the exception raised by <code>int(\"two\")</code>.",
      options: ["TypeError", "ValueError", "IndexError", "ZeroDivisionError"], answer: 1,
      explain: "The argument is a string (a valid type for <code>int()</code>) but its value cannot be converted: <b>ValueError</b>. TypeError is for an operation on the wrong type, like <code>\"5\" + 3</code>." },
    { id: "e2", type: "mcq", marks: 1,
      q: "<b>Identify</b> the problem that <code>try / except</code> cannot fix.",
      options: ["A file that does not exist", "A user typing letters instead of a number", "A missing colon after <code>if</code> (syntax error)", "A division by zero"], answer: 2,
      explain: "A syntax error stops the program from running at all, so it never reaches the try block. Exception handling manages runtime exceptions in a correct program." },
    { id: "e3", type: "output", marks: 3,
      q: "<b>State</b> the output of the program.",
      code: `try:
    print("A")
    x = 10 // 0
    print("B")
except ZeroDivisionError:
    print("C")
finally:
    print("D")`,
      explain: "A prints. The division raises ZeroDivisionError, so B is skipped and control jumps to except (C). <code>finally</code> always runs (D)." },
    { id: "e4", type: "output", marks: 3,
      q: "<b>State</b> the output of the program.",
      code: `def share(v):
    try:
        return 12 // int(v)
    except ValueError:
        return -1
    except ZeroDivisionError:
        return 0
    finally:
        print("checked", v)
print(share("4"))
print(share("x"))
print(share("0"))`,
      explain: "<code>finally</code> runs even though the function returns. So for each call, \"checked\" prints <i>before</i> the returned value is printed: 3 for \"4\", -1 for ValueError (\"x\"), 0 for ZeroDivisionError (\"0\")." },
    { id: "e5", type: "trace", marks: 5,
      q: "<b>Trace</b> the program, giving the value of <code>total</code> and any output after each pass.",
      code: `total = 0
for v in ["4", "x", "0", "3"]:
    try:
        total = total + 12 // int(v)
    except ValueError:
        print("bad")
    except ZeroDivisionError:
        print("zero")
print(total)`,
      columns: ["Pass", "v", "total", "Output"],
      rows: [["Start", "", "0", ""], ["1", "4", "3", ""], ["2", "x", "3", "bad"], ["3", "0", "3", "zero"], ["4", "3", "7", ""], ["End", "", "7", "7"]],
      prefill: 1, labelCol: true,
      explain: "When an exception happens, <code>total</code> is not updated because the assignment never completes. 12 // 4 = 3 and 12 // 3 = 4, so total = 7." },
    { id: "e6", type: "code", marks: 3,
      context: "A form field returns text, and a blank or non-numeric entry must not crash the program.",
      q: "<b>Construct</b> a function <code>safe_int(text, default)</code> that returns <code>text</code> converted to an integer, or <code>default</code> if it cannot be converted. Catch only the appropriate exception.",
      starter: `def safe_int(text, default):
    # your code here
    pass`,
      solution: `def safe_int(text, default):
    try:
        return int(text)
    except ValueError:
        return default`,
      tests: [
        { call: "safe_int('42', 0)" }, { call: "safe_int('4x2', -1)", label: "letters" }, { call: "safe_int('', 0)", label: "blank" },
        { call: "safe_int('3.5', 99)", label: "decimal text" }, { call: "safe_int(' 7 ', 0)", label: "spaces around a number" }
      ],
      forbid: ["except:"],
      hints: ["Put the <code>int(text)</code> conversion in a <code>try</code> block.", "Which exception does <code>int(\"abc\")</code> raise?"],
      markscheme: ["Uses try with the conversion inside it", "Returns the integer if conversion succeeds", "Catches ValueError specifically and returns default"] },
    { id: "e7", type: "code", marks: 3,
      context: "A grades program divides the total mark by the number of students, but a class may be empty.",
      q: "<b>Construct</b> a function <code>average(total, count)</code> that returns <code>total / count</code>, or <code>0</code> if <code>count</code> is 0. You must use exception handling, not an <code>if</code> statement.",
      starter: `def average(total, count):
    return total / count`,
      solution: `def average(total, count):
    try:
        return total / count
    except ZeroDivisionError:
        return 0`,
      tests: [
        { call: "average(10, 4)" }, { call: "average(0, 5)" }, { call: "average(7, 0)", label: "count is zero" }, { call: "average(0, 0)", label: "both zero" }
      ],
      forbid: ["if ", "except:"],
      hints: ["Move the division into a try block.", "Division by zero raises <code>ZeroDivisionError</code>."],
      markscheme: ["Division is placed inside a try block", "Catches ZeroDivisionError specifically", "Returns 0 in the except block and the quotient otherwise"] },
    { id: "e8", type: "code", marks: 3,
      context: "A stock app shows the item at a position chosen by the user.",
      q: "<b>Construct</b> a function <code>get_item(items, position)</code> that returns <code>items[position]</code>, or the string <code>\"Invalid position\"</code> if the position is outside the list. Do not show raw error text.",
      starter: `def get_item(items, position):
    # your code here
    pass`,
      solution: `def get_item(items, position):
    try:
        return items[position]
    except IndexError:
        return "Invalid position"`,
      tests: [
        { call: "get_item(['pen', 'ink', 'pad'], 1)" }, { call: "get_item(['pen', 'ink', 'pad'], 10)", label: "too large" },
        { call: "get_item([], 0)", label: "empty list" }, { call: "get_item(['pen'], 0)" }
      ],
      forbid: ["except:"],
      hints: ["Wrap the indexing in try.", "Index out of range raises <code>IndexError</code>."],
      markscheme: ["Indexing inside a try block", "Catches IndexError specifically", "Returns the item, or \"Invalid position\" (a friendly message) when it fails"] },
    { id: "e9", type: "code", marks: 5,
      context: "A school registration system asks for a student's age.",
      q: "<b>Write</b> a program that keeps reading an age with <code>input()</code> until the user enters a whole number from 1 to 120. If the text is not a whole number print <code>Please enter a whole number.</code> If the number is outside the range print <code>Age must be between 1 and 120.</code> When a valid age is entered, print <code>Age: </code> followed by the age.",
      starter: `# your code here`,
      solution: `while True:
    try:
        age = int(input())
        if age < 1 or age > 120:
            print("Age must be between 1 and 120.")
        else:
            break
    except ValueError:
        print("Please enter a whole number.")
print("Age: " + str(age))`,
      tests: [
        { stdin: "abc\n-5\n200\n17", label: "text, then out of range twice, then valid" }, { stdin: "30", label: "valid first time" },
        { stdin: "x\ny\n0\n120", label: "boundary 120" }, { stdin: "1", label: "boundary 1" }
      ],
      hints: ["Use <code>while True:</code> and leave with <code>break</code> only when the age is valid.", "<code>int(input())</code> goes inside <code>try</code>; the range check can go after it.", "The ValueError message goes in the except block."],
      markscheme: ["Loop repeats until a valid age is entered", "Conversion to int inside try", "Catches ValueError and prints the correct message", "Range check 1 to 120 with correct message", "Prints the valid age in the required format"] },
    { id: "e10", type: "code", marks: 2,
      context: "A checkout converts a price typed as text. Invalid text should give <code>-1.0</code>.",
      q: "The function below still crashes with some inputs because the wrong exception is caught. <b>Identify</b> the error and <b>fix</b> it. Do not use a bare <code>except:</code>.",
      starter: `def to_price(text):
    try:
        return float(text)
    except TypeError:
        return -1.0`,
      solution: `def to_price(text):
    try:
        return float(text)
    except ValueError:
        return -1.0`,
      tests: [
        { call: "to_price('12.5')" }, { call: "to_price('abc')", label: "letters" }, { call: "to_price('')", label: "blank" }
      ],
      forbid: ["except:"],
      hints: ["What does <code>float(\"abc\")</code> raise: TypeError or ValueError?"],
      markscheme: ["Identifies that float(\"abc\") raises ValueError, not TypeError", "Changes the except clause to ValueError"] },
    { id: "e11", type: "written", marks: 3,
      q: "<b>Describe</b> the purpose of the <code>try</code>, <code>except</code> and <code>finally</code> blocks in exception handling.",
      markscheme: ["try contains the code that might fail (1 mark)", "except runs only if an error occurs in the try block, and handles it so the program does not crash (1 mark)", "finally always runs, whether or not an error occurred, e.g. to close a file (1 mark)"],
      model: "The <b>try</b> block holds the risky code. If an error occurs inside it, the <b>except</b> block runs as a backup plan, so the program recovers instead of crashing. If no error occurs, the except block is skipped. The <b>finally</b> block runs in every case, error or not, and is used for clean-up such as closing a file." },
    { id: "e12", type: "written", marks: 4,
      q: "<b>Explain</b> why a program should catch a specific exception such as <code>ValueError</code> rather than use a bare <code>except:</code>, and why raw exception text should not be shown to users.",
      markscheme: ["A specific except handles only one known cause (1 mark)", "So the program can give the right message/recovery for that cause (1 mark)", "A bare except catches everything, including real bugs, hiding them (1 mark)", "Raw error text can reveal file paths, code structure or database details; show a friendly message and log the detail privately (1 mark)"],
      model: "A specific except such as <code>ValueError</code> only handles the one problem the programmer expects, so the program can respond correctly. A bare <code>except:</code> catches <b>every</b> error, including genuine bugs, and so hides the real problem. Raw exception text should not be shown to users because it can reveal file paths, code structure or database details to an attacker; instead show a friendly message and log the detail privately." }
  ]
});
B2.topics.push({
  id: "b2-1-4",
  code: "B2.1.4",
  section: "B2.1 Programming fundamentals",
  title: "Debugging",
  summary: "Classify errors, and construct and use a debugging method: print statements, trace tables, breakpoints and stepping.",
  minutes: 30,
  lesson: [
    { h: "Three kinds of error" },
    { table: { head: ["Error", "What happens", "Example"], rows: [
      ["<b>Syntax error</b>", "Breaks the language grammar; the program <b>will not run</b>.", "missing colon or bracket"],
      ["<b>Runtime error</b>", "Program starts, then <b>crashes</b> while running.", "divide by zero, missing file, bad index"],
      ["<b>Logic error</b>", "Runs without crashing but gives the <b>wrong result</b>; no error message, so hardest to fix.", "using <code>&gt;</code> instead of <code>&gt;=</code>"]
    ] } },
    { code: `marks = [60, 70, 80]
total = 0
for m in marks:
    total = total + m
print("Average:", total / 2)   # logic error: no crash, wrong answer (should divide by 3)` },
    { h: "Systematic debugging" },
    { p: "Do not change code at random. Work in three steps: <b>hypothesis</b> (where do I think the error is?) &rarr; <b>evidence</b> (observe the program's behaviour to test it) &rarr; <b>conclusion</b> (confirm or reject the hypothesis, then fix and re-test)." },
    { h: "Tools to gather evidence" },
    { table: { head: ["Technique", "Meaning"], rows: [
      ["Print statements", "Temporary lines that display variable values at set points to check hidden state. <b>Delete them</b> afterwards."],
      ["Trace table", "Columns = variables, conditions, output. Records each step to find where values stop matching expectations; often used at design stage. A reassigned variable gets a new entry <b>even if the value is unchanged</b>."],
      ["Breakpoint", "A marker on a line; the IDE <b>pauses before</b> that line runs."],
      ["Step-by-step execution", "Run one line at a time and watch the IDE variable panel. <b>Step into</b> enters a called function; <b>step over</b> runs it without entering."]
    ] } },
    { code: `total = 0
for m in [60, 70, 80]:
    total = total + m
    print("DEBUG m =", m, "total =", total)   # temporary: remove later
print(total / 3)` },
    { h: "Example: the discount sequence error" },
    { p: "A shop gives free shipping when an order has <b>more than 5 items</b>. A tester finds that an order that grows from 5 to 6 items never gets the discount. The trace table shows why." },
    { table: { head: ["Step", "itemCount", "shippingTotal", "discountApplied"], rows: [
      ["Initial", "5", "50.0", "false"],
      ["Check <code>itemCount &gt; 5</code>", "5", "50.0", "false"],
      ["Update count", "6", "50.0", "false"]
    ] } },
    { code: `item_count = 5
shipping_total = 50.0
discount_applied = False
if item_count > 5:               # checked BEFORE the update
    shipping_total = 0.0
    discount_applied = True
item_count = item_count + 1      # updated too late
print(item_count, shipping_total, discount_applied)` },
    { tip: "The discount test runs <b>before</b> the count is updated (a <b>sequence error</b>), so 6 items never get the discount. Fix: update the count first, then test." },
    { h: "Example: what does this algorithm do?" },
    { p: "Trace tables are how you answer \"what does this code do?\" Here <code>reminder</code> is the last digit (<code>% 10</code>) and each pass builds <code>temp</code> by appending it, so the digits come out reversed." },
    { code: `num = 1231
temp = 0
value = num
while value > 0:
    reminder = value % 10
    value = value // 10
    temp = temp * 10 + reminder
print(temp == num)`},
    { table: { head: ["Pass", "value &gt; 0", "reminder", "value", "temp"], rows: [
      ["Start", "", "", "1231", "0"],
      ["1", "True", "1", "123", "1"],
      ["2", "True", "3", "12", "13"],
      ["3", "True", "2", "1", "132"],
      ["4", "True", "1", "0", "1321"],
      ["End", "False", "", "0", "<code>1321 == 1231</code> is False"]
    ] } },
    { p: "Purpose: it rebuilds the digits in <b>reverse</b> and compares with the original. That is a <b>palindrome check</b> (try <code>num = 1221</code>: it gives True)." },
    { trap: "A trace table row is written <b>every time a variable is assigned</b>, even if its value is unchanged. And the loop condition (<code>value &gt; 0</code>) is checked once more at the end, giving False." }
  ],
  mustKnow: [
    "<b>Syntax error</b>: program will not run. <b>Runtime error</b>: crashes while running. <b>Logic error</b>: runs but wrong output.",
    "Systematic debugging: <b>hypothesis</b> &rarr; <b>evidence</b> &rarr; <b>conclusion</b>.",
    "Print statements show hidden state; delete them afterwards.",
    "Trace tables: columns are variables, conditions and output; one row per step.",
    "A <b>breakpoint</b> pauses the program before a chosen line runs.",
    "<b>Step into</b> enters a function; <b>step over</b> runs it without entering.",
    "Discount example: the test ran before the count was updated (sequence error). Fix: update first.",
    "Reverse-digits algorithm (<code>% 10</code>, <code>// 10</code>, <code>temp * 10 + digit</code>) is a palindrome check for numbers."
  ],
  terms: [
    { term: "Syntax error", def: "An error that breaks the grammar rules of the language, so the program will not run." },
    { term: "Runtime error", def: "An error that occurs while the program is running and makes it crash, e.g. dividing by zero." },
    { term: "Logic error", def: "An error where the program runs without crashing but produces the wrong result." },
    { term: "Systematic debugging", def: "Finding errors by forming a hypothesis, gathering evidence by observing behaviour, and drawing a conclusion." },
    { term: "Print statement (debugging)", def: "A temporary line that displays variable values at a set point to reveal hidden state; removed afterwards." },
    { term: "Trace table", def: "A table whose columns are variables, conditions and output, recording values step by step to find where they stop matching expectations." },
    { term: "Breakpoint", def: "A marker on a line of code; the IDE pauses before that line runs." },
    { term: "Step into", def: "Stepping through code one line at a time and entering any function that is called." },
    { term: "Step over", def: "Running a function call as a single step without entering the function." },
    { term: "Sequence error", def: "A logic error caused by statements being in the wrong order, e.g. testing a value before updating it." }
  ],
  exercises: [
    { id: "e1", type: "mcq", marks: 1,
      q: "A program to calculate an average runs without any error message but prints 60 instead of 70. <b>Identify</b> the type of error.",
      options: ["Syntax error", "Runtime error", "Logic error", "Exception"], answer: 2,
      explain: "It runs and does not crash, but the result is wrong: a logic error. These are the hardest to find because there is no error message." },
    { id: "e2", type: "mcq", marks: 1,
      q: "A function call <code>process_order(basket)</code> is highlighted in the debugger. <b>Identify</b> the action that runs the function but does not open its code line by line.",
      options: ["Step into", "Step over", "Set a breakpoint", "Add a print statement"], answer: 1,
      explain: "<b>Step over</b> runs the call as one step without entering it. <b>Step into</b> enters the function so you can watch each line inside." },
    { id: "e3", type: "output", marks: 2,
      q: "<b>State</b> the output of the program.",
      code: `total = 0
for i in range(1, 5):
    total = total + i
print(total)
print(i)`,
      explain: "<code>range(1, 5)</code> gives 1, 2, 3, 4 (end excluded): total = 10. After the loop <code>i</code> keeps its last value, 4." },
    { id: "e4", type: "output", marks: 2,
      q: "<b>State</b> the output of the program. The number is not a palindrome: the answer shows why.",
      code: `num = 1210
temp = 0
value = num
while value > 0:
    digit = value % 10
    value = value // 10
    temp = temp * 10 + digit
print(temp, temp == num)`,
      explain: "The digits are rebuilt in reverse: 0, then 1, 2, 1, so temp = 0, 1, 12, 121. The leading zero of 0121 disappears (it is the integer 121), so 121 is not equal to 1210: False. The number is not a palindrome." },
    { id: "e5", type: "trace", marks: 5,
      q: "<b>Trace</b> the palindrome algorithm for <code>num = 452</code>.",
      code: `num = 452
temp = 0
value = num
while value > 0:
    digit = value % 10
    value = value // 10
    temp = temp * 10 + digit
print(temp == num)`,
      columns: ["Pass", "value > 0", "digit", "value", "temp", "Output"],
      rows: [["Start", "", "", "452", "0", ""], ["1", "True", "2", "45", "2", ""], ["2", "True", "5", "4", "25", ""], ["3", "True", "4", "0", "254", ""], ["End", "False", "", "0", "254", "False"]],
      prefill: 1, labelCol: true,
      explain: "Each pass peels off the last digit and appends it to <code>temp</code>. temp ends as 254, the reverse of 452; 254 == 452 is False, so 452 is not a palindrome." },
    { id: "e6", type: "trace", marks: 4,
      context: "An online shop gives free shipping when an order has more than 5 items. Two items are added one after the other to a basket that already has 4.",
      q: "<b>Trace</b> the program. (The table shows why the discount is never applied.)",
      code: `item_count = 4
discount_applied = False
for i in range(2):
    if item_count > 5:
        discount_applied = True
    item_count = item_count + 1
print(item_count, discount_applied)`,
      columns: ["Pass", "item_count > 5", "item_count", "discount_applied", "Output"],
      rows: [["Start", "", "4", "False", ""], ["1", "False", "5", "False", ""], ["2", "False", "6", "False", ""], ["End", "", "6", "False", "6 False"]],
      prefill: 1, labelCol: true,
      explain: "The test <code>item_count &gt; 5</code> is made <i>before</i> the count is updated, so on pass 2 it tests 5, not 6. The basket ends with 6 items but no discount: a sequence (logic) error." },
    { id: "e7", type: "code", marks: 3,
      context: "A shop gives free shipping (0.0) when the basket holds more than 5 items after the new items are added; otherwise shipping is 50.0.",
      q: "This function has a <b>sequence error</b>. <b>Identify</b> it and <b>fix</b> the code.",
      starter: `def final_shipping(items_in_basket, new_items):
    shipping = 50.0
    if items_in_basket > 5:
        shipping = 0.0
    items_in_basket = items_in_basket + new_items
    return shipping`,
      solution: `def final_shipping(items_in_basket, new_items):
    items_in_basket = items_in_basket + new_items
    shipping = 50.0
    if items_in_basket > 5:
        shipping = 0.0
    return shipping`,
      tests: [
        { call: "final_shipping(5, 1)", label: "5 -> 6 items" }, { call: "final_shipping(4, 1)", label: "5 items" },
        { call: "final_shipping(3, 5)" }, { call: "final_shipping(6, 0)" }, { call: "final_shipping(0, 0)" }
      ],
      hints: ["Which line decides the shipping, and which line adds the new items? In what order do they run?", "The count must be updated <b>before</b> the test."],
      markscheme: ["Identifies that the condition is tested before items_in_basket is updated (sequence error)", "Moves the update before the condition test", "Function still returns 50.0 / 0.0 correctly"] },
    { id: "e8", type: "code", marks: 4,
      context: "A trace table of this algorithm showed that it rebuilds the digits of a number in reverse.",
      q: "<b>Construct</b> a function <code>is_palindrome_number(n)</code> that takes a non-negative integer and returns <code>True</code> if its digits read the same forwards and backwards, using <code>%</code> and <code>//</code> (no string conversion).",
      starter: `def is_palindrome_number(n):
    # your code here
    pass`,
      solution: `def is_palindrome_number(n):
    value = n
    temp = 0
    while value > 0:
        digit = value % 10
        value = value // 10
        temp = temp * 10 + digit
    return temp == n`,
      tests: [
        { call: "is_palindrome_number(1221)" }, { call: "is_palindrome_number(1231)" }, { call: "is_palindrome_number(7)", label: "single digit" },
        { call: "is_palindrome_number(0)", label: "zero" }, { call: "is_palindrome_number(10)", label: "trailing zero" }, { call: "is_palindrome_number(12321)", label: "odd length" }
      ],
      forbid: ["str("],
      hints: ["Keep the original number safe: work on a copy called <code>value</code>.", "Each pass: <code>digit = value % 10</code>, <code>value = value // 10</code>, <code>temp = temp * 10 + digit</code>.", "Compare <code>temp</code> with the original after the loop."],
      markscheme: ["Keeps a copy of the original number", "Loop continues while the copy &gt; 0, extracting the last digit and removing it", "Builds the reversed number with temp * 10 + digit", "Returns the comparison of the reversed number with the original"] },
    { id: "e9", type: "code", marks: 3,
      context: "A school counts how many students passed. A pass is 50 or more.",
      q: "The function has <b>two logic errors</b>. <b>Identify</b> both and <b>fix</b> the code.",
      starter: `def count_passes(marks):
    count = 0
    for i in range(1, len(marks)):
        if marks[i] > 50:
            count = count + 1
    return count`,
      solution: `def count_passes(marks):
    count = 0
    for i in range(0, len(marks)):
        if marks[i] >= 50:
            count = count + 1
    return count`,
      tests: [
        { call: "count_passes([50, 49, 80])", label: "first mark and a boundary 50" }, { call: "count_passes([])", label: "empty" },
        { call: "count_passes([30])" }, { call: "count_passes([50])", label: "boundary" }, { call: "count_passes([90, 90, 10])" }
      ],
      hints: ["Use the tests: [50] should count 1. Which part of the code ignores it? There are two causes.", "<code>range(1, ...)</code> starts at index 1; and 50 is a pass, so the comparison must include it."],
      markscheme: ["Identifies/fixes the loop starting at index 1 so the first mark is skipped (range should start at 0)", "Identifies/fixes the comparison &gt; 50 which excludes 50 (should be &gt;= 50)", "Returns the correct count for all cases"] },
    { id: "e10", type: "code", marks: 3,
      q: "This function should return the mean of a list of marks (or <code>0</code> for an empty list) but returns the wrong value. <b>Identify</b> the error and <b>fix</b> the code.",
      starter: `def average(marks):
    total = 0
    for m in marks:
        total = total + m
        return total / len(marks)`,
      solution: `def average(marks):
    if len(marks) == 0:
        return 0
    total = 0
    for m in marks:
        total = total + m
    return total / len(marks)`,
      tests: [
        { call: "average([60, 70, 80])" }, { call: "average([])", label: "empty list" }, { call: "average([90])" }, { call: "average([10, 20])" }
      ],
      hints: ["Add a print inside the loop to see how many times <code>return</code> is reached.", "The <code>return</code> is indented inside the loop, so the function ends after the first mark.", "Also handle the empty list before dividing."],
      markscheme: ["Identifies the return statement inside the loop (returns after the first item)", "Moves the return after the loop", "Returns 0 for an empty list"] },
    { id: "e11", type: "written", marks: 3,
      q: "<b>Distinguish</b> between a syntax error, a runtime error and a logic error, giving an example of each.",
      markscheme: ["Syntax error: breaks the grammar of the language so the program will not run; e.g. a missing colon or bracket (1 mark)", "Runtime error: the program starts then crashes while running; e.g. division by zero, missing file (1 mark)", "Logic error: the program runs but gives the wrong result with no error message; e.g. using > instead of >= (1 mark)"],
      model: "A <b>syntax error</b> breaks the rules of the language, so the program will not run at all (e.g. a missing colon). A <b>runtime error</b> happens while the program is running and makes it crash (e.g. dividing by zero or a missing file). A <b>logic error</b> lets the program run to the end but produces the wrong result, with no error message (e.g. using <code>&gt;</code> instead of <code>&gt;=</code>)." },
    { id: "e12", type: "written", marks: 4,
      context: "A shop's program should give free shipping to orders over 5 items. Testers report that an order with exactly 6 items is not discounted, but the program does not crash.",
      q: "<b>Describe</b> how a systematic approach using a trace table and a breakpoint could be used to find the error.",
      markscheme: ["Form a hypothesis, e.g. the discount condition is not working / wrong order of statements (1 mark)", "Set a breakpoint before the discount check so the program pauses before that line runs (1 mark)", "Step through line by line watching itemCount, shippingTotal, discountApplied (or record them in a trace table with a new entry each step) (1 mark)", "Evidence shows the check happens before the count is updated, so it is a sequence error; conclusion: update the count first, then re-test (1 mark)"],
      model: "Hypothesis: the discount is not applied because the condition is checked at the wrong time. Set a <b>breakpoint</b> on the line that tests <code>itemCount &gt; 5</code> so the program pauses before it runs. Use <b>step-by-step</b> execution and watch <code>itemCount</code>, <code>shippingTotal</code> and <code>discountApplied</code> in the variable panel, or record them in a <b>trace table</b>, one row per step. The evidence shows the test runs while <code>itemCount</code> is still 5, before the count is updated to 6. Conclusion: it is a sequence error; update the count first, then re-run the test with 6 items." }
  ]
});
