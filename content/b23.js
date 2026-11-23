// B2.3 Programming constructs: 4 topics
B2.topics.push(
{
  id: "b2-3-1",
  code: "B2.3.1",
  section: "B2.3 Programming constructs",
  title: "Sequence and control flow",
  summary: "Order instructions correctly, spot why a loop never ends, and explain deadlock and how to prevent it.",
  minutes: 25,
  lesson: [
    {p: "A computer is a very literal reader. It does the first instruction, then the second, then the third. It never guesses what you meant. This is <b>sequence</b>: instructions run <b>one after another, in the exact order written</b>. Everything else in B2.3 (selection, loops, functions) just changes <i>which</i> instruction runs next. That is called <b>control flow</b>."},
    {h: "Order matters"},
    {p: "If you put an instruction before the thing it depends on, the program breaks or gives the wrong answer. Compare the two versions."},
    {code: `score1 = 5
score2 = 10
total = score1 + score2
average = total / 2
print(average)`},
    {p: "Now swap the last two instructions. Python reads <code>average = total / 2</code> before <code>total</code> exists:"},
    {code: `score1 = 5
score2 = 10
average = total / 2
total = score1 + score2
print(average)`, error: true},
    {trap: "† The learning guide calls this example a <b>logic error</b>. Strictly it is a <b>use-before-definition error</b> (a <code>NameError</code> in Python, a compile error in some languages) because the program crashes. The lesson is the same: <b>order matters</b>. A true <b>logic error</b> runs without crashing but gives the <b>wrong result</b>, as in the attendance example below."},
    {h: "Logic error: the attendance example"},
    {p: "A program counts how many students have a <b>valid</b> ID (1000 to 9999). Both versions run fine. Only one is correct."},
    {table: {head: ["Version", "Order", "Result"], rows: [
      ["V1", "Counter increases <b>before</b> the ID check", "Invalid IDs are counted"],
      ["V2", "Counter increases <b>inside</b> <code>if valid</code>", "Only valid IDs counted"]
    ]}},
    {code: `ids = [1500, 20, 3000]
v1 = 0
v2 = 0
for i in ids:
    v1 = v1 + 1          # V1: counted before the check
    if i >= 1000 and i <= 9999:
        v2 = v2 + 1      # V2: counted only if valid
print("V1 counts", v1)
print("V2 counts", v2)`},
    {tip: "A program that runs without crashing is <b>not</b> necessarily correct. Always check the output against what you expect. This is how logic errors hide."},
    {h: "Infinite loops"},
    {p: "A loop stops when its condition becomes false. If nothing in the loop body can ever make it false, the loop never ends. The usual cause is a <b>missing or misplaced update</b>. The fix: put the update <b>inside</b> the loop."},
    {code: `# The real bug is that nothing inside the loop ever sets more to False.
# We added a safety net so this demo stops.
count = 0
more = True
while more:
    count += 1
    if count == 5:
        print("Safety net stopped it. more is still", more)
        break`},
    {p: "The fixed version updates the condition variable inside the loop, so the stopping condition can be reached:"},
    {code: `count = 0
more = True
while more:
    count += 1
    if count == 5:
        more = False      # the update is inside the loop
print("Finished after", count, "passes")`},
    {trap: "Putting <code>more = False</code> <b>after</b> the loop (unindented) does nothing useful: it is never reached, because the loop never ends. A misplaced update is as bad as a missing one."},
    {h: "Link to the CPU"},
    {p: "The CPU keeps a <b>program counter</b>: the address of the next instruction. In a sequence it moves forward by one each time. A loop makes it <b>jump back</b>. An <b>infinite loop = the program counter keeps jumping back to the same address</b> and never moves on."},
    {h: "Deadlock"},
    {p: "<b>Deadlock</b>: two (or more) processes each <b>wait for a resource the other holds</b>. Neither can continue, so the system halts."},
    {table: {head: ["Step", "Process A", "Process B"], rows: [
      ["1", "Locks the printer", "Locks the scanner"],
      ["2", "Waits for the scanner (held by B)", "Waits for the printer (held by A)"],
      ["3", "Stuck forever", "Stuck forever"]
    ]}},
    {p: "<b>Prevention:</b> make all processes request resources in the <b>same fixed order</b>, e.g. always printer first, then scanner. Then B cannot hold the scanner while waiting for the printer, so a circular wait cannot form."},
    {tip: "Exam wording for deadlock: \"each process holds a resource and waits for one held by the other, so neither can proceed.\" Prevention: \"all processes request resources in the same fixed order.\""}
  ],
  mustKnow: [
    "<b>Sequence</b> = instructions run one after another in the exact order written.",
    "Wrong order can cause a <b>use-before-definition error</b> or a <b>logic error</b> (runs, wrong result).",
    "<b>Infinite loop</b>: the stopping condition is never reached, usually a <b>missing or misplaced update</b>. Fix: put the update <b>inside</b> the loop.",
    "<b>Deadlock</b>: two processes each wait for the other; the system halts. Prevent by requesting resources in the <b>same fixed order</b>.",
    "Infinite loop = the <b>program counter</b> keeps jumping back to the same address.",
    "A program that runs without crashing is not necessarily correct: check the output."
  ],
  terms: [
    {term: "Sequence", def: "Instructions run one after another in the exact order they are written."},
    {term: "Control flow", def: "The order in which instructions in a program are executed."},
    {term: "Logic error", def: "An error where the program runs without crashing but produces the wrong result, often because instructions are in the wrong order."},
    {term: "Infinite loop", def: "A loop whose stopping condition is never reached, usually because the update is missing or misplaced in the loop body."},
    {term: "Deadlock", def: "A situation where two processes each wait for a resource held by the other, so neither can progress and the system halts."},
    {term: "Preventing deadlock", def: "Making all processes request resources in the same fixed order so a circular wait cannot occur."},
    {term: "Program counter", def: "A CPU register holding the address of the next instruction to execute; an infinite loop keeps resetting it to the same address."}
  ],
  exercises: [
    {id: "e1", type: "mcq", marks: 1,
     q: "<b>Identify</b> what happens when line 3 <code>average = total / 2</code> runs before line 4 <code>total = score1 + score2</code>.",
     options: [
       "It runs and <code>average</code> is 0",
       "It runs and silently gives a wrong average",
       "It crashes with a <code>NameError</code> because <code>total</code> is used before it is defined",
       "It crashes with a <code>SyntaxError</code>"
     ], answer: 2,
     explain: "<code>total</code> has not been given a value yet, so Python raises a <code>NameError</code> (use-before-definition). It is not a syntax error: the line is written correctly, just in the wrong place. Order matters."},
    {id: "e2", type: "mcq", marks: 1,
     q: "A loop <code>while more:</code> has a body containing only <code>count += 1</code> and never ends. <b>Identify</b> the correct fix.",
     options: [
       "Change <code>count += 1</code> to <code>count = 1</code>",
       "Put <code>more = False</code> after the loop, unindented",
       "Add an update inside the loop that eventually sets <code>more</code> to <code>False</code>",
       "Replace <code>while</code> with <code>if</code>"
     ], answer: 2,
     explain: "The stopping condition can never be reached because nothing in the body changes <code>more</code>. The update must be <b>inside</b> the loop. Code after the loop is never reached."},
    {id: "e3", type: "output", marks: 1,
     q: "<b>State</b> the output of this program.",
     code: `a = 4
b = 7
a = a + b
b = a - b
a = a - b
print(a, b)`,
     explain: "Run in order: a = 11; b = 11 - 7 = 4; a = 11 - 4 = 7. So a is 7 and b is 4. The values swap, which only works because the three lines run in this exact order."},
    {id: "e4", type: "output", marks: 2,
     q: "<b>State</b> the output. Valid IDs are 1000 or more.",
     code: `ids = [1500, 20, 3000]
v1 = 0
v2 = 0
for i in ids:
    v1 = v1 + 1
    if i >= 1000:
        v2 = v2 + 1
print(v1)
print(v2)`,
     explain: "<code>v1</code> is increased before any check, so it counts all 3 IDs (the V1 logic error). <code>v2</code> is increased only inside the <code>if</code>, so it counts 1500 and 3000 only: 2."},
    {id: "e5", type: "trace", marks: 4,
     q: "<b>Trace</b> the program (version V2) and complete the table.",
     code: `ids = [1200, 50, 3400, 12000]
count = 0
for id_num in ids:
    if id_num >= 1000 and id_num <= 9999:
        count = count + 1
print(count)`,
     columns: ["Pass", "id_num", "valid?", "count", "Output"],
     rows: [
       ["Start", "", "", "0", ""],
       ["1", "1200", "True", "1", ""],
       ["2", "50", "False", "1", ""],
       ["3", "3400", "True", "2", ""],
       ["4", "12000", "False", "2", ""],
       ["After loop", "", "", "2", "2"]
     ],
     prefill: 2, labelCol: true,
     explain: "12000 is above 9999 and 50 is below 1000, so only 1200 and 3400 are valid. The counter changes only when the test is True."},
    {id: "e6", type: "trace", marks: 4,
     q: "<b>Trace</b> this loop. Record the values <b>after</b> each pass of the loop body.",
     code: `n = 1
total = 0
count = 0
while n <= 7:
    total = total + n
    n = n + 3
    count = count + 1
print(total)`,
     columns: ["Pass", "n", "total", "count", "Output"],
     rows: [
       ["Start", "1", "0", "0", ""],
       ["1", "4", "1", "1", ""],
       ["2", "7", "5", "2", ""],
       ["3", "10", "12", "3", ""],
       ["After loop", "10", "12", "3", "12"]
     ],
     prefill: 2, labelCol: true,
     explain: "Pass 1 adds n = 1 then n becomes 4. Pass 2 adds 4 (total 5) then n becomes 7. Pass 3 adds 7 (total 12) then n becomes 10. The test <code>10 &lt;= 7</code> is False, so the loop ends. Notice that the update <code>n = n + 3</code> is what lets the loop end."},
    {id: "e7", type: "code", marks: 4,
     context: "A school system reads student ID numbers. A <b>valid</b> ID is a whole number from 1000 to 9999 inclusive.",
     q: "<b>Construct</b> a function <code>count_valid_ids(ids)</code> that takes a list of ID numbers and <b>returns</b> how many are valid. Only valid IDs may be counted.",
     starter: `def count_valid_ids(ids):
    # your code here
    pass`,
     solution: `def count_valid_ids(ids):
    count = 0
    for id_num in ids:
        if id_num >= 1000 and id_num <= 9999:
            count = count + 1
    return count`,
     tests: [
       {call: "count_valid_ids([1200, 50, 3400, 12000])", label: "two valid IDs"},
       {call: "count_valid_ids([])", label: "empty list"},
       {call: "count_valid_ids([1000, 9999])", label: "both boundaries are valid"},
       {call: "count_valid_ids([999, 10000])", label: "just outside both boundaries"},
       {call: "count_valid_ids([5000])", label: "single valid ID"}
     ],
     hints: ["Start with a counter set to 0 <b>before</b> the loop.", "The counter must increase <b>inside</b> the <code>if</code> (version V2), not before the check."],
     markscheme: ["Initialises the counter to 0 before the loop", "Loop iterates over every ID", "Correct validity test (1000 to 9999 inclusive, both boundaries)", "Counter increased only inside the if, and the count is returned"],
     explain: "This is the V2 order: check first, then count."},
    {id: "e8", type: "code", marks: 3,
     context: "This function should return the average of two scores. It crashes.",
     q: "<b>Identify</b> the order error and <b>correct</b> the function so it returns the average.",
     starter: `def average_of_two(score1, score2):
    average = total / 2
    total = score1 + score2
    return average`,
     solution: `def average_of_two(score1, score2):
    total = score1 + score2
    average = total / 2
    return average`,
     tests: [
       {call: "average_of_two(4, 6)"},
       {call: "average_of_two(7, 8)"},
       {call: "average_of_two(0, 0)"}
     ],
     hints: ["Which line creates <code>total</code>? Does it run before the line that uses it?"],
     markscheme: ["Identifies that total is used before it is assigned", "Moves the total calculation before the average calculation", "Function returns the correct average"],
     explain: "Use-before-definition: swap the two lines so <code>total</code> exists before it is read."},
    {id: "e9", type: "code", marks: 3,
     context: "This function should return the sum of the whole numbers 1 to n. It runs and stops, but the answer is wrong. The update is misplaced.",
     q: "<b>Correct</b> the function so that <code>sum_to(4)</code> returns 10.",
     starter: `def sum_to(n):
    total = 0
    i = 1
    while i <= n:
        i = i + 1
        total = total + i
    return total`,
     solution: `def sum_to(n):
    total = 0
    i = 1
    while i <= n:
        total = total + i
        i = i + 1
    return total`,
     tests: [
       {call: "sum_to(4)"},
       {call: "sum_to(1)"},
       {call: "sum_to(10)"},
       {call: "sum_to(0)", label: "n = 0 gives 0"}
     ],
     hints: ["Trace n = 1 by hand: which value of <code>i</code> gets added?"],
     markscheme: ["Identifies that i is updated before it is added", "Adds i to total before the update", "Update stays inside the loop and the function returns total"],
     explain: "The update ran first, so every number added was 1 too big and the last pass added n + 1. Update <b>after</b> using the value. A misplaced update gives a logic error even though the loop ends."},
    {id: "e10", type: "code", marks: 3,
     context: "A shop till reads the hours worked and the hourly rate (both whole numbers), one per line.",
     q: "<b>Write</b> a program that reads the hours then the rate and prints the gross pay (hours x rate) on the first line, then the pay after a fixed deduction of 10 on the second line. Use <code>input()</code> without any prompt text.",
     starter: `hours = int(input())
rate = int(input())
# your code here`,
     solution: `hours = int(input())
rate = int(input())
gross = hours * rate
print(gross)
net = gross - 10
print(net)`,
     tests: [
       {stdin: "40\n12", label: "hours 40, rate 12"},
       {stdin: "10\n20", label: "hours 10, rate 20"},
       {stdin: "35\n11", label: "hours 35, rate 11"}
     ],
     hints: ["The deduction uses the gross pay, so gross must be calculated before the second print."],
     markscheme: ["Gross pay calculated as hours x rate", "Gross pay printed first", "Deduction of 10 applied to the gross pay (in the correct order)"],
     explain: "A sequence: read, calculate, print. The net pay depends on the gross, so the order matters."},
    {id: "e11", type: "written", marks: 3,
     q: "<b>Describe</b> what is meant by deadlock and <b>outline</b> one way to prevent it.",
     markscheme: [
       "Two (or more) processes each hold a resource (1 mark)",
       "Each waits for a resource held by the other, so neither can continue / system halts (1 mark)",
       "Prevention: all processes request resources in the same fixed order, so no circular wait (1 mark)"
     ],
     model: "Deadlock happens when two processes each hold a resource and each waits for the resource the other holds, so neither can progress and the system halts. It can be prevented by making every process request resources in the same fixed order (for example printer before scanner), so a circular wait cannot form."},
    {id: "e12", type: "written", marks: 3,
     context: "<code>more = True</code><br><code>while more:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;count += 1</code><br><code>more = False</code>",
     q: "<b>Explain</b> why this program never ends, and what this means for the CPU's program counter.",
     markscheme: [
       "The loop condition <code>more</code> is never changed inside the loop body (1 mark)",
       "<code>more = False</code> is outside / after the loop so it is never reached (1 mark)",
       "The program counter keeps jumping back to the same address (start of the loop) and never moves on (1 mark)"
     ],
     model: "The statement that sets <code>more</code> to False is placed after the loop, so it can never run. Nothing inside the loop makes the condition false, so it is always True. The program counter keeps jumping back to the address of the loop test and never reaches the next instruction. The fix is to update <code>more</code> inside the loop."}
  ]
},
{
  id: "b2-3-2",
  code: "B2.3.2",
  section: "B2.3 Programming constructs",
  title: "Selection",
  summary: "Choose paths with if / elif / else, combine conditions with and / or / not, and get the order and boundaries right.",
  minutes: 30,
  lesson: [
    {p: "<b>Selection</b> chooses a <b>different path</b> through the program depending on a condition. The condition is something that is either <code>True</code> or <code>False</code>. Think of a fork in the road: the program takes one branch."},
    {h: "Relational operators"},
    {table: {head: ["Operator", "Meaning", "Operator", "Meaning"], rows: [
      ["<code>&lt;</code>", "less than", "<code>&gt;</code>", "greater than"],
      ["<code>&lt;=</code>", "less than or equal to", "<code>&gt;=</code>", "greater than or equal to"],
      ["<code>==</code>", "equal to", "<code>!=</code>", "not equal to"]
    ]}},
    {trap: "<code>=</code> <b>assigns</b>, <code>==</code> <b>compares</b>. <code>if x = 5:</code> is a syntax error. Boundaries: <code>grade &gt; 50</code> <b>fails</b> a grade of exactly 50. Use <code>&gt;=</code> to include it."},
    {h: "Boolean operators and precedence"},
    {table: {head: ["Boolean operator", "Meaning", "Python"], rows: [
      ["AND", "Both conditions true", "<code>and</code>"],
      ["OR", "At least one true", "<code>or</code>"],
      ["NOT", "Reverses the truth value", "<code>not</code>"]
    ]}},
    {p: "Precedence: <code>not</code> first, then <code>and</code>, then <code>or</code>. Use <b>brackets</b> to show your intent."},
    {code: `age = 16
has_id = True
vip = True
print(age >= 18 and has_id or vip)     # (age>=18 and has_id) or vip
print(age >= 18 and (has_id or vip))   # brackets change the meaning
print(not False or True and False)     # True or (True and False)`},
    {h: "if / elif / else: first true wins"},
    {p: "Conditions are read <b>in order</b>. The <b>first true one runs</b> and the rest are skipped. <code>else</code> runs only if none were true."},
    {code: `grade = 88
attendance = 85
if grade >= 85 and attendance >= 90:
    print("Academic Award")
elif grade < 50 or attendance < 80:
    print("Academic Warning")
else:
    print("Support Workshop")`},
    {h: "Order matters"},
    {p: "A <b>broad</b> test placed before a <b>specific</b> one hides it. <code>grade &gt; 50</code> before <code>grade &gt; 90</code> means 95 never reaches the second test. Put the <b>most specific (strictest) test first</b>."},
    {code: `mark = 95
# Wrong order: the broad test catches everything first
if mark > 50:
    print("Pass")
elif mark > 90:
    print("Distinction")

# Right order: strictest first
if mark > 90:
    print("Distinction")
elif mark > 50:
    print("Pass")`},
    {trap: "Separate <code>if</code> statements are <b>not</b> the same as <code>if / elif</code>. Two <code>if</code>s are both tested, so both can run. With <code>elif</code>, once one is true the rest are skipped."},
    {h: "Nested if"},
    {p: "An <code>if</code> <b>inside</b> another. The inner test runs <b>only when the outer one is true</b>."},
    {code: `age = 20
has_id = False
if age >= 18:
    if has_id:             # only tested if age >= 18
        print("Entry allowed")
    else:
        print("Show ID")
else:
    print("Too young")`},
    {h: "Validation by selection"},
    {p: "<b>Validation</b> checks that input is sensible <i>before</i> using it. A range check is one condition:"},
    {code: `mark = 105
if 0 <= mark <= 100:
    print("Valid mark")
else:
    print("Invalid mark")`},
    {tip: "In Paper 2 trace questions, test boundaries: the exact value (50), one below (49) and one above (51). Most selection bugs are <code>&gt;</code> versus <code>&gt;=</code>, or a broad test in the wrong place."}
  ],
  mustKnow: [
    "Relational operators: <code>&lt; &lt;= &gt; &gt;= == !=</code>. Boolean: AND, OR, NOT (<code>and or not</code>).",
    "Precedence: <b>not</b>, then <b>and</b>, then <b>or</b>. Brackets show intent.",
    "Chain with <code>elif</code>: conditions are checked in order and the <b>first true one wins</b>.",
    "<b>Order matters</b>: a broad test before a specific one hides it. Put the strictest test first.",
    "A <b>nested if</b> inner test runs only when the outer one is true.",
    "<code>=</code> assigns, <code>==</code> compares. <code>grade &gt; 50</code> fails exactly 50; use <code>&gt;=</code>.",
    "<b>Validation by selection</b>: <code>if 0 &lt;= mark &lt;= 100:</code> checks input is sensible."
  ],
  terms: [
    {term: "Selection", def: "A construct that chooses a different path of execution depending on whether a condition is true or false."},
    {term: "Relational operator", def: "An operator that compares two values and gives True or False: <, <=, >, >=, ==, !=."},
    {term: "Boolean operator", def: "AND, OR or NOT: operators that combine or reverse conditions."},
    {term: "Operator precedence", def: "The order in which operators are evaluated: not first, then and, then or; brackets override it."},
    {term: "Chained selection (elif)", def: "More than two outcomes tested in order; the first condition that is true runs and the rest are skipped."},
    {term: "Sequential evaluation", def: "Conditions in an if / elif chain are read in order and the first true one runs."},
    {term: "Nested if", def: "An if statement inside another; the inner test runs only when the outer condition is true."},
    {term: "Validation by selection", def: "Checking that input is sensible (for example in range) with a condition before using it."}
  ],
  exercises: [
    {id: "e1", type: "mcq", marks: 1,
     q: "<b>Identify</b> the value of <code>not False or True and False</code>.",
     options: ["<code>True</code>", "<code>False</code>", "A syntax error", "<code>None</code>"], answer: 0,
     explain: "Precedence: <code>not</code> first: <code>True or True and False</code>. Then <code>and</code>: <code>True and False</code> is False. Then <code>or</code>: <code>True or False</code> is True. Reading strictly left to right would give False, which is the common mistake."},
    {id: "e2", type: "mcq", marks: 1,
     q: "<code>if mark &gt;= 40:</code> prints Pass, <code>elif mark &gt;= 70:</code> prints Merit. <b>Identify</b> what is printed when <code>mark = 85</code>.",
     options: ["Pass", "Merit", "Pass and Merit", "Nothing"], answer: 0,
     explain: "85 is already &gt;= 40, so the first branch runs and the <code>elif</code> is skipped (first true wins). The broad test hides the specific one."},
    {id: "e3", type: "output", marks: 2,
     q: "<b>State</b> the output.",
     code: `x = 15
if x > 10:
    print("A")
if x > 5:
    print("B")
elif x > 0:
    print("C")
else:
    print("D")`,
     explain: "The first <code>if</code> is separate: 15 &gt; 10, so A. The second statement starts a new chain: 15 &gt; 5 is true, so B, and the <code>elif</code> and <code>else</code> are skipped."},
    {id: "e4", type: "output", marks: 2,
     q: "<b>State</b> the output.",
     code: `age = 16
has_id = True
vip = True
if age >= 18 and has_id or vip:
    print("Enter")
else:
    print("Refused")
print(age >= 18 and (has_id or vip))`,
     explain: "<code>and</code> binds tighter: <code>(age &gt;= 18 and has_id) or vip</code> is <code>False or True</code> = True, so Enter. With brackets, <code>age &gt;= 18</code> is False and False and anything is False, so the last line prints False."},
    {id: "e5", type: "trace", marks: 5,
     q: "<b>Trace</b> the program and give the output for each pass.",
     code: `marks = [95, 80, 79, 50, 49]
for mark in marks:
    if mark >= 80:
        print("Distinction")
    elif mark >= 50:
        print("Pass")
    else:
        print("Fail")`,
     columns: ["Pass", "mark", "Output"],
     rows: [
       ["1", "95", "Distinction"],
       ["2", "80", "Distinction"],
       ["3", "79", "Pass"],
       ["4", "50", "Pass"],
       ["5", "49", "Fail"]
     ],
     prefill: 1, labelCol: true,
     explain: "Boundaries: 80 satisfies <code>&gt;= 80</code>, 50 satisfies <code>&gt;= 50</code>, 49 falls to else."},
    {id: "e6", type: "trace", marks: 5,
     q: "<b>Trace</b> the program for the four cases. For each, give the value of the condition and the output.",
     code: `cases = [(20, False, False), (16, True, False), (16, False, True), (25, True, True)]
for age, has_id, vip in cases:
    if age >= 18 and has_id or vip:
        print("Enter")
    else:
        print("Refused")`,
     columns: ["Case", "age", "has_id", "vip", "Condition", "Output"],
     rows: [
       ["1", "20", "False", "False", "False", "Refused"],
       ["2", "16", "True", "False", "False", "Refused"],
       ["3", "16", "False", "True", "True", "Enter"],
       ["4", "25", "True", "True", "True", "Enter"]
     ],
     prefill: 1, labelCol: true,
     explain: "<code>and</code> is evaluated before <code>or</code>. Case 1: False and False = False, or False = False. Case 2: False and True = False, or False = False. Case 3: False or True = True (a VIP gets in regardless of age). Case 4: True and True = True."},
    {id: "e7", type: "code", marks: 4,
     context: "A school converts exam marks (0 to 100) into grade bands: 80 or more is \"Distinction\", 65 to 79 is \"Merit\", 50 to 64 is \"Pass\" and below 50 is \"Fail\".",
     q: "<b>Construct</b> a function <code>grade(mark)</code> that <b>returns</b> the correct band as a string. You may assume the mark is valid.",
     starter: `def grade(mark):
    # your code here
    pass`,
     solution: `def grade(mark):
    if mark >= 80:
        return "Distinction"
    elif mark >= 65:
        return "Merit"
    elif mark >= 50:
        return "Pass"
    else:
        return "Fail"`,
     tests: [
       {call: "grade(100)"}, {call: "grade(80)", label: "boundary 80"}, {call: "grade(79)", label: "boundary 79"},
       {call: "grade(65)", label: "boundary 65"}, {call: "grade(64)"}, {call: "grade(50)", label: "boundary 50"},
       {call: "grade(49)", label: "boundary 49"}, {call: "grade(0)"}
     ],
     hints: ["Test the highest band first, then work down with <code>elif</code>.", "Use <code>&gt;=</code> so the boundary value itself is included."],
     markscheme: ["Correct condition for Distinction (>= 80)", "Correct conditions for Merit and Pass in a correct order (strictest first)", "else (or final test) gives Fail", "Returns the string (does not print it)"],
     explain: "Strictest test first means each <code>elif</code> already knows the mark is below the previous boundary."},
    {id: "e8", type: "code", marks: 5,
     context: "A cinema prices tickets by age: under 5 is free (0), ages 5 to 17 cost 8, ages 18 to 64 cost 12, and 65 or over cost 6. An age below 0 or above 120 is invalid.",
     q: "<b>Construct</b> a function <code>ticket_price(age)</code> that <b>returns</b> the price, or <code>-1</code> if the age is invalid.",
     starter: `def ticket_price(age):
    # your code here
    pass`,
     solution: `def ticket_price(age):
    if age < 0 or age > 120:
        return -1
    elif age < 5:
        return 0
    elif age < 18:
        return 8
    elif age < 65:
        return 12
    else:
        return 6`,
     tests: [
       {call: "ticket_price(-1)"}, {call: "ticket_price(0)"}, {call: "ticket_price(4)"}, {call: "ticket_price(5)"},
       {call: "ticket_price(17)"}, {call: "ticket_price(18)"}, {call: "ticket_price(64)"}, {call: "ticket_price(65)"},
       {call: "ticket_price(120)"}, {call: "ticket_price(121)"}
     ],
     hints: ["Check the invalid range first. Use <code>or</code> to combine the two invalid cases.", "After that, test each upper boundary in increasing order using <code>&lt;</code>."],
     markscheme: ["Invalid age test with or (below 0 or above 120)", "Returns -1 for invalid", "Correct conditions and order for the three price bands", "Correct boundary handling at 5, 18 and 65", "Returns the values (does not print)"],
     explain: "Validation first, then bands from lowest to highest. Each <code>elif</code> relies on the earlier ones having failed."},
    {id: "e9", type: "code", marks: 3,
     context: "A classroom CO2 sensor must report \"Normal\" up to 400, \"Warning\" above 400, \"Danger\" above 1000 and \"Evacuate\" above 5000. The function runs but never returns \"Danger\" or \"Evacuate\".",
     q: "<b>Identify</b> the error and <b>correct</b> the function.",
     starter: `def alert(co2):
    if co2 > 400:
        return "Warning"
    elif co2 > 1000:
        return "Danger"
    elif co2 > 5000:
        return "Evacuate"
    else:
        return "Normal"`,
     solution: `def alert(co2):
    if co2 > 5000:
        return "Evacuate"
    elif co2 > 1000:
        return "Danger"
    elif co2 > 400:
        return "Warning"
    else:
        return "Normal"`,
     tests: [
       {call: "alert(300)"}, {call: "alert(400)", label: "boundary 400"}, {call: "alert(401)"}, {call: "alert(1000)"},
       {call: "alert(1001)"}, {call: "alert(5000)"}, {call: "alert(5001)"}, {call: "alert(9000)"}
     ],
     hints: ["Any reading above 1000 is also above 400. Which test catches it first?"],
     markscheme: ["Identifies that the broad test (> 400) is first and hides the others", "Reorders so the strictest test (> 5000) is first", "All four outputs correct at the boundaries"],
     explain: "Broad before specific: 1500 is &gt; 400, so it never reached the <code>&gt; 1000</code> test. Strictest first."},
    {id: "e10", type: "code", marks: 5,
     context: "A teacher enters a mark. The program must validate it and then classify it with a nested if.",
     q: "<b>Write</b> a program that reads one whole number. If it is not between 0 and 100 inclusive, print <code>Invalid mark</code>. Otherwise, if it is 50 or more print <code>Pass</code> on one line and, if it is also 80 or more, print <code>Distinction</code> on the next line. If it is below 50, print <code>Fail</code>. Use <code>input()</code> without prompt text.",
     starter: `mark = int(input())
# your code here`,
     solution: `mark = int(input())
if mark < 0 or mark > 100:
    print("Invalid mark")
else:
    if mark >= 50:
        print("Pass")
        if mark >= 80:
            print("Distinction")
    else:
        print("Fail")`,
     tests: [
       {stdin: "101"}, {stdin: "-1"}, {stdin: "0"}, {stdin: "49"}, {stdin: "50"}, {stdin: "79"}, {stdin: "80"}, {stdin: "100"}
     ],
     hints: ["Validate first with an outer if / else, then classify inside the else.", "<code>Distinction</code> is tested only when the mark already passed, so nest it inside the Pass branch."],
     markscheme: ["Reads the mark as an integer", "Range check covers both ends (0 and 100 valid)", "Prints Invalid mark for out-of-range values", "Pass printed for 50 or more, Fail below 50", "Distinction printed only for 80 or more, after Pass"],
     explain: "Validation by selection, then a nested if: the inner test runs only when the outer one is true."},
    {id: "e11", type: "written", marks: 3,
     q: "<b>Explain</b> why the order of conditions in an <code>if / elif</code> chain matters. Use an example in your answer.",
     markscheme: [
       "Conditions are checked in order / the first true condition runs and the rest are skipped (1 mark)",
       "A broad condition placed before a specific one hides it (1 mark)",
       "Valid example, e.g. grade > 50 before grade > 90 means 95 never reaches the Distinction branch (1 mark)"
     ],
     model: "In an if / elif chain the conditions are tested in order, and the first one that is true runs while the rest are skipped. If a broad condition comes before a specific one, the specific one can never run. For example, testing <code>grade &gt; 50</code> before <code>grade &gt; 90</code> means a grade of 95 is caught by the first test and never reaches the second. The strictest condition should come first."},
    {id: "e12", type: "written", marks: 2,
     q: "A programmer writes <code>if grade &gt; 50:</code> to decide who passes, and a student with exactly 50 complains. <b>Explain</b> the error and give the correction.",
     markscheme: [
       "&gt; means strictly greater than, so 50 is excluded (boundary error) (1 mark)",
       "Use &gt;= (greater than or equal to) so 50 is included (1 mark)"
     ],
     model: "The operator <code>&gt;</code> means strictly greater than, so a grade of exactly 50 fails the test. The condition should be <code>grade &gt;= 50</code> so that the boundary value is included."}
  ]
},
{
  id: "b2-3-3",
  code: "B2.3.3",
  section: "B2.3 Programming constructs",
  title: "Loops",
  summary: "Choose for or while, write safe sentinel and validation loops, and rewrite between loop types.",
  minutes: 35,
  lesson: [
    {p: "A <b>loop</b> repeats instructions. The only real question is: <b>do I know how many times before I start?</b>"},
    {table: {head: ["", "Counted loop", "Conditional loop"], rows: [
      ["Written as", "<code>for</code>", "<code>while</code>"],
      ["Use when", "Iterations <b>known</b> before the loop starts", "Iterations <b>not known</b> in advance"],
      ["Stops", "After the fixed count", "When the condition becomes false"],
      ["Note", "Counter starts at 0, +1 each time", "Condition checked <b>before</b> each pass; false at the start = body never runs"]
    ]}},
    {h: "Three loop types"},
    {table: {head: ["Loop", "Condition checked", "Runs at least once?", "Python"], rows: [
      ["Count-controlled (FOR)", "Counter reaches the limit", "Only if the count &gt; 0", "<code>for i in range(n):</code>"],
      ["Pre-condition (WHILE)", "<b>Before</b> each pass", "No: can run 0 times", "<code>while cond:</code>"],
      ["Post-condition (REPEAT-UNTIL)", "<b>After</b> each pass", "<b>Yes</b>: at least once", "<code>while True:</code> + <code>if cond: break</code>"]
    ]}},
    {p: "Python has no repeat-until, so we build it with <code>while True</code> and a <code>break</code>."},
    {h: "range(start, stop, step)"},
    {p: "<code>stop</code> is <b>exclusive</b> (never reached). <code>start</code> defaults to 0 and <code>step</code> to 1. A <b>negative step</b> counts down."},
    {table: {head: ["range(...)", "Values", "Note"], rows: [
      ["<code>range(5)</code>", "0, 1, 2, 3, 4", "Start 0; stop is <b>exclusive</b>"],
      ["<code>range(1, 6)</code>", "1, 2, 3, 4, 5", "Start and stop"],
      ["<code>range(0, 10, 2)</code>", "0, 2, 4, 6, 8", "Step 2"],
      ["<code>range(100, 0, -1)</code>", "100 down to 1", "Negative step counts down"]
    ]}},
    {code: `for i in range(5):
    print(i, end=" ")
print()
for i in range(1, 6):
    print(i, end=" ")
print()
for i in range(0, 10, 2):
    print(i, end=" ")
print()
for i in range(10, 0, -3):
    print(i, end=" ")
print()`},
    {h: "Sentinel values and the safe while loop"},
    {p: "A <b>sentinel value</b> signals the <b>end of input</b> (for example -1 for a mark). It must be <b>impossible as real data</b>. A <b>combined condition</b> stops when the sentinel appears <b>or</b> a maximum count is reached, which prevents an endless loop."},
    {p: "The safe while loop has four parts: <b>initialise</b> then <b>condition</b> then <b>body</b> then <b>update</b>. Omit the update and the loop never ends."},
    {code: `total = 0
count = 0
mark = int(input())          # initialise (first read)
while mark != -1:            # condition (sentinel)
    total = total + mark     # body
    count = count + 1
    mark = int(input())      # update: read the next mark
if count > 0:
    print("Average:", total / count)
else:
    print("No marks entered")`, stdin: "70\n80\n90\n-1"},
    {tip: "<b>Initialise</b> counters and totals (<code>total = 0</code>) <b>before</b> the loop. Putting <code>total = 0</code> inside the loop resets it every pass. Forgetting it is a classic lost mark."},
    {p: "Combined condition: stop at the sentinel <b>or</b> after at most 3 marks."},
    {code: `count = 0
total = 0
mark = int(input())
while mark != -1 and count < 3:
    total = total + mark
    count = count + 1
    mark = int(input())
print("Total:", total)`, stdin: "40\n60\n70\n80\n-1"},
    {h: "Validation and verification"},
    {table: {head: ["", "Checks", "How"], rows: [
      ["<b>Validation</b>", "Input is <b>sensible</b> (range, type, length)", "Re-ask while it is invalid"],
      ["<b>Verification</b>", "Input was <b>copied accurately</b>", "<b>Double entry</b>: type it twice until both match"]
    ]}},
    {code: `age = int(input())
while age < 0 or age > 120:                 # validation
    age = int(input())
print("Age accepted:", age)

pw = input()
while input() != pw:                        # verification (double entry)
    print("No match")
print("Password confirmed")

while True:                                 # post-condition: runs at least once
    n = int(input())
    if 1 <= n <= 10:
        break
print("Number accepted:", n)`, stdin: "150\n-3\n34\nsecret\nsecrt\nsecret\n0\n11\n7"},
    {h: "Nested loops"},
    {p: "The <b>inner loop runs fully for every pass of the outer loop</b>: total repetitions = outer x inner. When both depend on N this is O(N<sup>2</sup>)."},
    {code: `count = 0
for i in range(3):        # outer: 3 passes
    for j in range(4):    # inner: 4 passes each
        count = count + 1
print(count)              # 3 x 4`},
    {h: "FOR to WHILE"},
    {p: "Any <code>for</code> loop can be rewritten as a <code>while</code>: <b>initialise</b>, <b>test</b>, <b>update</b>."},
    {code: `# FOR version
for i in range(1, 4):
    print(i)

# WHILE version: same output
i = 1               # initialise
while i < 4:        # test
    print(i)
    i = i + 1       # update`},
    {tip: "When asked to justify a loop: state <b>known count = for</b>, <b>unknown count = while with a sentinel</b>, and say <b>what updates the condition</b>."}
  ],
  mustKnow: [
    "<b>for</b> = known count; <b>while</b> = unknown count: use a <b>sentinel</b> and combine it with a <b>maximum count</b>.",
    "Count-controlled (FOR), pre-condition (WHILE, may run 0 times) and post-condition (REPEAT-UNTIL, at least once: <code>while True</code> + <code>break</code>).",
    "<code>range(start, stop, step)</code>: stop is <b>exclusive</b>; a negative step counts down.",
    "Safe while loop: <b>initialise, condition, body, update</b>. Missing update means an infinite loop.",
    "<b>Validation</b> = input is sensible. <b>Verification</b> = input copied accurately (double entry).",
    "Nested loops: inner runs fully for each outer pass, so repetitions = outer x inner (O(N<sup>2</sup>)).",
    "Any FOR loop can be rewritten as WHILE: initialise, test, update.",
    "<b>Initialise</b> counters and totals before the loop."
  ],
  terms: [
    {term: "Count-controlled loop", def: "A loop (for) used when the number of iterations is known before the loop starts."},
    {term: "Pre-condition loop", def: "A while loop that checks its condition before each pass, so the body may run zero times."},
    {term: "Post-condition loop", def: "A loop that checks its condition after each pass, so the body runs at least once (while True with break in Python)."},
    {term: "Sentinel value", def: "A special value that signals the end of input; it must be impossible as real data, e.g. -1 for a mark."},
    {term: "Combined condition", def: "A loop condition made of the sentinel test AND a maximum count, so the loop stops when either fails, preventing an infinite loop."},
    {term: "Safe while loop", def: "A while loop built as initialise, compound condition, body, then update; omitting the update makes it endless."},
    {term: "Validation", def: "Checking that input is sensible (right range, type or length) and asking again while it is invalid."},
    {term: "Verification", def: "Checking that input was copied accurately, e.g. double entry where the user types it twice until both match."},
    {term: "Nested loops", def: "A loop inside another loop: the inner loop runs fully for each pass of the outer loop, giving outer x inner repetitions."}
  ],
  exercises: [
    {id: "e1", type: "mcq", marks: 1,
     q: "A program must ask for a password at least once and keep asking until it is valid. <b>Identify</b> the best structure.",
     options: [
       "<code>for i in range(0):</code>",
       "A pre-condition <code>while</code> loop whose condition is false at the start",
       "<code>while True:</code> with an <code>if valid: break</code> at the end of the body",
       "An <code>if / else</code> statement"
     ], answer: 2,
     explain: "A post-condition loop checks <i>after</i> each pass, so the body runs at least once. Python builds it with <code>while True</code> and <code>break</code>. A pre-condition loop with a false starting condition would run zero times."},
    {id: "e2", type: "mcq", marks: 1,
     q: "<b>Identify</b> the values produced by <code>range(2, 11, 3)</code>.",
     options: ["2, 5, 8", "2, 5, 8, 11", "5, 8, 11", "2, 3, 4, 5, 6, 7, 8, 9, 10"], answer: 0,
     explain: "Start 2, step 3: 2, 5, 8, 11, ... but stop is <b>exclusive</b>, so 11 is never included."},
    {id: "e3", type: "output", marks: 2,
     q: "<b>State</b> the output of this program.",
     code: `for i in range(10, 0, -3):
    print(i)`,
     explain: "The negative step counts down: 10, 7, 4, 1. The next value would be -2, which is not greater than the stop value 0, so the loop ends."},
    {id: "e4", type: "output", marks: 3,
     q: "<b>State</b> the output of this nested loop.",
     code: `for i in range(1, 4):
    for j in range(i):
        print("*", end="")
    print()`,
     explain: "The inner loop runs <code>i</code> times for each pass of the outer loop: 1 star, then 2, then 3. The empty <code>print()</code> ends each line."},
    {id: "e5", type: "trace", marks: 5,
     q: "<b>Trace</b> this program with the input shown (40, 60, 70, 80, -1). Record the values after the first read and after each pass.",
     code: `count = 0
total = 0
mark = int(input())
while mark != -1 and count < 3:
    total = total + mark
    count = count + 1
    mark = int(input())
print(total)`,
     stdin: "40\n60\n70\n80\n-1",
     columns: ["Step", "mark", "count", "total", "Output"],
     rows: [
       ["Before loop", "40", "0", "0", ""],
       ["After pass 1", "60", "1", "40", ""],
       ["After pass 2", "70", "2", "100", ""],
       ["After pass 3", "80", "3", "170", ""],
       ["After loop", "80", "3", "170", "170"]
     ],
     prefill: 1, labelCol: true,
     explain: "After pass 3 the count is 3, so <code>count &lt; 3</code> is False and the loop stops even though the sentinel -1 has not been read yet. The 80 was read but never added. This is why a maximum count protects against missing sentinels."},
    {id: "e6", type: "code", marks: 5,
     context: "A teacher types exam marks one per line. A mark of -1 means there are no more marks.",
     q: "<b>Write</b> a program that reads marks until -1 is entered, then prints the average (<code>total / count</code>, no rounding). If no marks were entered, print <code>No marks</code>. Use <code>input()</code> without prompt text.",
     starter: `total = 0
count = 0
mark = int(input())
# your code here`,
     solution: `total = 0
count = 0
mark = int(input())
while mark != -1:
    total = total + mark
    count = count + 1
    mark = int(input())
if count == 0:
    print("No marks")
else:
    print(total / count)`,
     tests: [
       {stdin: "70\n80\n90\n-1", label: "three marks"},
       {stdin: "50\n-1", label: "one mark"},
       {stdin: "-1", label: "sentinel first: no marks"},
       {stdin: "65\n70\n-1", label: "average with a decimal"},
       {stdin: "0\n100\n-1", label: "0 is a real mark"}
     ],
     hints: ["Read the next mark at the <b>end</b> of the loop body: that is the update.", "Guard the division: if <code>count</code> is 0, do not divide."],
     markscheme: ["Total and count initialised to 0 before the loop", "Loop condition tests the sentinel -1", "Adds the mark and increases count inside the loop", "Reads the next mark as the update inside the loop", "Calculates and prints the average, with No marks case handled"],
     explain: "Initialise, condition, body, update. The sentinel -1 is not a real mark so it must not be added."},
    {id: "e7", type: "code", marks: 4,
     context: "A program asks for a number from 1 to 10.",
     q: "<b>Write</b> a program that reads a whole number. While it is not between 1 and 10 inclusive, print <code>Invalid</code> and read another. When a valid number is entered, print <code>Accepted:</code> followed by the number (use <code>print(\"Accepted:\", n)</code>). Use <code>input()</code> without prompt text.",
     starter: `n = int(input())
# your code here`,
     solution: `n = int(input())
while n < 1 or n > 10:
    print("Invalid")
    n = int(input())
print("Accepted:", n)`,
     tests: [
       {stdin: "5"}, {stdin: "0\n11\n10"}, {stdin: "-3\n1"}, {stdin: "10"}, {stdin: "99\n100\n-1\n7"}
     ],
     hints: ["The condition for <b>invalid</b> uses <code>or</code>: below 1 <b>or</b> above 10.", "The loop body must read a new value, otherwise it never ends."],
     markscheme: ["Reads the first value as an integer", "Loop condition correct (n < 1 or n > 10)", "Prints Invalid inside the loop", "Reads a new value inside the loop (update)"],
     explain: "This is validation: re-ask while the input is not sensible."},
    {id: "e8", type: "code", marks: 4,
     context: "When setting a password the user types it twice to check that it was entered accurately.",
     q: "<b>Write</b> a program that reads a password, then reads the confirmation. While the confirmation does not match, print <code>No match</code> and read the confirmation again. When it matches, print <code>Accepted</code>. Use <code>input()</code> without prompt text.",
     starter: `password = input()
# your code here`,
     solution: `password = input()
again = input()
while again != password:
    print("No match")
    again = input()
print("Accepted")`,
     tests: [
       {stdin: "abc\nabc"}, {stdin: "abc\nabd\nab\nabc"}, {stdin: "Secret1\nsecret1\nSecret1"}
     ],
     hints: ["Read the first confirmation <b>before</b> the loop so the loop has something to test."],
     markscheme: ["Reads the confirmation entry", "Loop condition tests for not equal (!=)", "Prints No match inside the loop", "Reads the confirmation again inside the loop, then prints Accepted after it"],
     explain: "This is verification (double entry): it checks the input was copied accurately, not that the password is sensible."},
    {id: "e9", type: "code", marks: 5,
     context: "A sensor logs readings in a list. The list ends with -1, but the list might end without it. At most <code>max_count</code> readings are used.",
     q: "<b>Construct</b> a function <code>average_before_sentinel(readings, max_count)</code> that adds up readings from the start of the list until it reaches -1, runs out of readings, or has used <code>max_count</code> readings, and <b>returns</b> their average. If no readings were used, return 0.",
     starter: `def average_before_sentinel(readings, max_count):
    # your code here
    pass`,
     solution: `def average_before_sentinel(readings, max_count):
    total = 0
    count = 0
    i = 0
    while i < len(readings) and readings[i] != -1 and count < max_count:
        total = total + readings[i]
        count = count + 1
        i = i + 1
    if count == 0:
        return 0
    return total / count`,
     tests: [
       {call: "average_before_sentinel([10, 20, 30, -1], 10)", label: "stops at the sentinel"},
       {call: "average_before_sentinel([10, 20, 30, 40, -1], 2)", label: "stops at max_count"},
       {call: "average_before_sentinel([-1], 5)", label: "sentinel first"},
       {call: "average_before_sentinel([5, 5], 5)", label: "no sentinel in the list"},
       {call: "average_before_sentinel([], 3)", label: "empty list"}
     ],
     hints: ["Use a <code>while</code> loop with an index. The condition has three parts joined with <code>and</code>.", "Check the index is inside the list <b>before</b> reading <code>readings[i]</code>."],
     markscheme: ["Total, count and index initialised before the loop", "Compound condition includes the sentinel and the max count", "Condition also guards against running past the end of the list", "Adds the reading and updates count and index inside the loop", "Returns average, or 0 when no readings used"],
     explain: "A combined condition: the loop stops when <b>either</b> part fails. The update <code>i = i + 1</code> keeps it safe."},
    {id: "e10", type: "code", marks: 2,
     context: "This function should return the total of a list of marks. It returns only the last mark and crashes on an empty list.",
     q: "<b>Identify</b> the error and <b>correct</b> the function.",
     starter: `def total_marks(marks):
    for m in marks:
        total = 0
        total = total + m
    return total`,
     solution: `def total_marks(marks):
    total = 0
    for m in marks:
        total = total + m
    return total`,
     tests: [
       {call: "total_marks([3, 4, 5])"}, {call: "total_marks([10])"}, {call: "total_marks([])", label: "empty list gives 0"}, {call: "total_marks([2, 2])"}
     ],
     hints: ["Where should <code>total = 0</code> happen: once, or on every pass?"],
     markscheme: ["Moves total = 0 to before the loop (initialised once)", "Loop adds to total and the function returns it"],
     explain: "Initialising inside the loop resets the total every pass, so only the last mark survives. Initialise totals <b>before</b> the loop."},
    {id: "e11", type: "code", marks: 3,
     context: "The original function used a FOR loop:<br><code>def squares_for(n):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;result = []</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;for i in range(1, n + 1):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result.append(i * i)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;return result</code>",
     q: "<b>Construct</b> <code>squares_while(n)</code>, which gives the same result (a list of the squares of 1 to n) using a <code>while</code> loop. You may not use <code>for</code>.",
     starter: `def squares_while(n):
    # your code here
    pass`,
     solution: `def squares_while(n):
    result = []
    i = 1
    while i <= n:
        result.append(i * i)
        i = i + 1
    return result`,
     forbid: ["for ", "range("],
     tests: [
       {call: "squares_while(5)"}, {call: "squares_while(1)"}, {call: "squares_while(0)", label: "n = 0 gives an empty list"}, {call: "squares_while(3)"}
     ],
     hints: ["A FOR to WHILE rewrite has three parts: initialise <code>i = 1</code>, test <code>i &lt;= n</code>, update <code>i = i + 1</code>."],
     markscheme: ["Initialises the counter and the result list before the loop", "Condition i <= n (stop is inclusive here, so n is included)", "Appends the square and updates the counter inside the loop"],
     explain: "FOR to WHILE: initialise, test, update. <code>range(1, n + 1)</code> stops before n + 1, which is the same as <code>i &lt;= n</code>."},
    {id: "e12", type: "written", marks: 4,
     q: "A program must (a) process the 30 marks of a class, and (b) read marks typed by a teacher until the teacher types -1. <b>Justify</b> the choice of loop for each.",
     markscheme: [
       "(a) for / count-controlled loop because the number of iterations (30) is known in advance (1 mark)",
       "(a) the counter reaches the limit so the loop stops by itself (1 mark)",
       "(b) while / conditional loop because the number of marks is not known in advance (1 mark)",
       "(b) uses the sentinel -1 (impossible as a real mark) in the condition, with the next mark read inside the loop as the update (1 mark)"
     ],
     model: "(a) A for loop (count-controlled) is suitable because the number of iterations, 30, is known before the loop starts, and it stops automatically when the counter reaches the limit. (b) A while loop (conditional) is suitable because the number of marks is not known in advance. The condition tests for the sentinel value -1, which cannot be a real mark, and the next mark is read inside the loop so that the condition can eventually become false."}
  ]
},
{
  id: "b2-3-4",
  code: "B2.3.4",
  section: "B2.3 Programming constructs",
  title: "Functions and modularisation",
  summary: "Write functions with parameters and return values, split programs into single-purpose modules, and use local and global scope safely.",
  minutes: 30,
  lesson: [
    {p: "A <b>function</b> is a named block of code that performs <b>one specific task</b>. You write it once and call it as many times as you like. Instead of copying the same five lines everywhere, you give them a name."},
    {code: `def avg(scores):
    total = 0                  # local
    for s in scores:
        total += s
    return total / len(scores)

print(avg([4, 6]))
print(avg([10, 20, 30]))`},
    {h: "Parameter vs argument, return"},
    {table: {head: ["Term", "Meaning"], rows: [
      ["<b>Parameter</b>", "The <b>variable in the definition</b>: an input, so one function gives a different result per call"],
      ["<b>Argument</b>", "The <b>actual value</b> passed in the call"],
      ["<code>return</code>", "Sends the <b>output</b> back to the calling code"]
    ]}},
    {h: "Procedure vs function"},
    {p: "A <b>procedure</b> performs a task and returns <b>nothing</b> (for example it prints). A <b>function</b> uses <code>return</code> to give back a value."},
    {code: `def show_sum(a, b):       # procedure: no return
    print(a + b)

def add(a, b):            # function: returns a value
    return a + b

show_sum(2, 3)            # 2 and 3 are arguments
total = add(2, 3)         # total = 5
print(total)`},
    {trap: "<code>print</code> shows a value on screen; <code>return</code> hands it back to the program. A function that only prints gives <code>None</code> back, so <code>total = show_sum(2, 3)</code> stores <code>None</code>."},
    {h: "Modularisation"},
    {p: "<b>Modularisation</b> = dividing a program into functions that each have a <b>single purpose</b> (read, calculate, format, print)."},
    {list: [
      "Easier to <b>read and maintain</b>: change only the function affected",
      "Each function can be <b>tested independently</b>",
      "<b>Reuse</b>, and work can be <b>shared across a team</b>"
    ]},
    {code: `def get_total(prices):
    total = 0
    for p in prices:
        total = total + p
    return total

def apply_discount(total):
    if total >= 100:
        return total - 10
    return total

def show(total):
    print("You pay", total)

show(apply_discount(get_total([50, 40, 30])))`},
    {h: "The call stack"},
    {p: "Each function call pushes a <b>stack frame</b> (its local variables and the return address) onto the <b>call stack</b>. When the function returns, its frame is <b>removed</b> and execution continues at the return address."},
    {code: `def double(x):
    x = x * 2          # x is local to this call
    return x

a = 3
b = double(a)          # frame created for double, x = 3, then removed
print(a, b)            # a is unchanged`},
    {h: "Global vs local scope"},
    {table: {head: ["Scope", "Global", "Local"], rows: [
      ["Declared", "Outside all functions", "Inside a function"],
      ["Lifetime", "Whole program", "One call; removed from memory when it ends"],
      ["Risk", "Shared: a <b>stale</b> <code>total_score</code> carries marks into the next call (wrong result)", "None: starts fresh (<code>total = 0</code>) every call"]
    ]}},
    {p: "The stale global problem, shown running:"},
    {code: `total = 0

def class_total(scores):
    global total          # bad: changes a global
    for s in scores:
        total = total + s
    return total

print(class_total([4, 6]))
print(class_total([4, 6]))   # same call, different answer!`},
    {p: "Fix: use a <b>local</b> total that starts at 0 on every call."},
    {code: `def class_total(scores):
    total = 0                # local, fresh each call
    for s in scores:
        total = total + s
    return total

print(class_total([4, 6]))
print(class_total([4, 6]))`},
    {trap: "A local variable with the same name as a global is a <b>separate</b> variable (shadowing). The global is <b>unchanged</b>. <b>Avoid changing globals inside functions</b>: pass values in as parameters and return results, so each function is self-contained and easy to test."},
    {tip: "For a \"benefits of modularisation\" question give three different points: <b>readability/maintenance</b>, <b>independent testing</b>, <b>reuse and teamwork</b>. Relate them to the scenario."}
  ],
  mustKnow: [
    "A function has <b>parameters</b> in and a <b>return</b> out; locals are fresh per call.",
    "<b>Parameter</b> = variable in the definition; <b>argument</b> = actual value in the call.",
    "<b>Procedure</b> = no return value (e.g. prints); <b>function</b> = returns one.",
    "<b>Modularisation</b> = single-purpose functions: easier to read, test, reuse and share.",
    "<b>Call stack</b>: each call pushes a stack frame (locals + return address); it is removed on return.",
    "<b>Local</b> variables live for one call. <b>Global</b> variables live for the whole program and can go stale between calls.",
    "<b>Avoid changing globals inside functions</b>: pass in parameters and return results."
  ],
  terms: [
    {term: "Function", def: "A named block of code that performs one specific task; written once and called many times."},
    {term: "Parameter", def: "The variable in a function definition that receives an input value."},
    {term: "Argument", def: "The actual value passed to a function when it is called."},
    {term: "return", def: "A statement that sends a value back from a function to the calling code."},
    {term: "Procedure", def: "A subprogram that performs a task and returns no value, for example one that only prints."},
    {term: "Modularisation", def: "Dividing a program into functions that each have a single purpose."},
    {term: "Benefits of modularisation", def: "Code is easier to read and maintain, each function can be tested independently, and functions can be reused and shared across a team."},
    {term: "Call stack", def: "A structure in which each function call pushes a stack frame (local variables and return address), removed when the function returns."},
    {term: "Local variable", def: "A variable declared inside a function that exists only for one call and is removed when it ends."},
    {term: "Global variable", def: "A variable declared outside all functions that exists for the whole program; a stale value can carry into later calls."}
  ],
  exercises: [
    {id: "e1", type: "mcq", marks: 1,
     q: "In the code <code>def area(w, h):</code> ... <code>x = area(3, 4)</code>, <b>identify</b> what <code>3</code> is.",
     options: ["A parameter", "An argument", "A return value", "A local variable"], answer: 1,
     explain: "<code>w</code> and <code>h</code> are the <b>parameters</b> (in the definition). <code>3</code> and <code>4</code> are the <b>arguments</b> (the actual values passed in the call)."},
    {id: "e2", type: "mcq", marks: 1,
     q: "<b>Identify</b> which of these is a <i>function</i> rather than a procedure.",
     options: [
       "<code>def f(a, b):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(a + b)</code>",
       "<code>def f(a, b):<br>&nbsp;&nbsp;&nbsp;&nbsp;return a + b</code>",
       "<code>def f():<br>&nbsp;&nbsp;&nbsp;&nbsp;print(\"Hello\")</code>",
       "<code>def f(a):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(a)</code>"
     ], answer: 1,
     explain: "A function uses <code>return</code> to give a value back. The others only print, so they are procedures."},
    {id: "e3", type: "output", marks: 2,
     q: "<b>State</b> the output.",
     code: `x = 7
def f():
    x = 5
    return x * 2
print(f())
print(x)`,
     explain: "Inside <code>f</code>, <code>x = 5</code> creates a separate <b>local</b> variable (shadowing). <code>f()</code> returns 10. The global <code>x</code> is unchanged, so 7 is printed."},
    {id: "e4", type: "output", marks: 2,
     q: "<b>State</b> the output.",
     code: `total = 0
def add_scores(scores):
    global total
    for s in scores:
        total = total + s
    return total / len(scores)
print(add_scores([4, 6]))
print(add_scores([4, 6]))`,
     explain: "The function changes the <b>global</b> <code>total</code>, which is never reset. First call: total = 10, 10 / 2 = 5.0. Second call starts from the stale total of 10, so it reaches 20, and 20 / 2 = 10.0. Same call, different answer."},
    {id: "e5", type: "trace", marks: 5,
     q: "<b>Trace</b> the program. Show the value of the local variable <code>x</code> while <code>double</code> is running, and leave it blank when no call is active.",
     code: `def double(x):
    x = x * 2
    return x

a = 3
b = double(a)
a = double(b)
print(a, b)`,
     columns: ["Step", "a", "b", "x", "Output"],
     rows: [
       ["a = 3", "3", "", "", ""],
       ["in double(a), after x = x * 2", "3", "", "6", ""],
       ["b = double(a) finished", "3", "6", "", ""],
       ["in double(b), after x = x * 2", "3", "6", "12", ""],
       ["a = double(b) finished", "12", "6", "", ""],
       ["print", "12", "6", "", "12 6"]
     ],
     prefill: 1, labelCol: true,
     explain: "Each call gets its own stack frame with its own <code>x</code>, removed on return. Changing <code>x</code> never changes <code>a</code> or <code>b</code>. The second call receives b = 6, so x becomes 12 and a is assigned 12."},
    {id: "e6", type: "code", marks: 4,
     context: "A teacher wants the average of a list of marks. The function will be called many times with different lists.",
     q: "<b>Construct</b> a function <code>average(scores)</code> that <b>returns</b> the average of a list of marks. If the list is empty, return 0. Do not use <code>sum()</code> and do not use any global variables.",
     starter: `def average(scores):
    # your code here
    pass`,
     solution: `def average(scores):
    if len(scores) == 0:
        return 0
    total = 0
    for s in scores:
        total = total + s
    return total / len(scores)`,
     forbid: ["sum(", "global"],
     tests: [
       {call: "average([4, 6])"}, {call: "average([10])"}, {call: "average([])", label: "empty list"}, {call: "average([1, 2, 3, 4])"}
     ],
     hints: ["Use a <b>local</b> total set to 0 inside the function.", "Check for the empty list before dividing."],
     markscheme: ["Empty list handled (returns 0, no division by zero)", "Local total initialised to 0 inside the function", "Loop adds every mark to the total", "Returns total divided by the number of marks"],
     explain: "A local <code>total = 0</code> is created fresh on every call, so there is no stale total."},
    {id: "e7", type: "code", marks: 6,
     context: "A program is divided into modules. Each exam is marked out of 100.",
     q: "<b>Construct</b> two subprograms. <code>total_marks(marks)</code> <b>returns</b> the sum of a list of marks. <code>report(name, marks)</code> is a procedure that calls <code>total_marks</code> and prints one line in the form <code>Ali scored 240 out of 300</code> (the maximum is 100 per mark).",
     starter: `def total_marks(marks):
    # your code here
    pass

def report(name, marks):
    # your code here
    pass`,
     solution: `def total_marks(marks):
    total = 0
    for m in marks:
        total = total + m
    return total

def report(name, marks):
    total = total_marks(marks)
    maximum = 100 * len(marks)
    print(name, "scored", total, "out of", maximum)`,
     tests: [
       {call: "total_marks([80, 90, 70])"}, {call: "total_marks([])", label: "empty list"},
       {call: "report('Ali', [80, 90, 70])", label: "report prints a line"}, {call: "report('Bo', [50])"}
     ],
     hints: ["<code>print(name, \"scored\", total, \"out of\", maximum)</code> puts single spaces between the parts.", "<code>report</code> should <b>call</b> <code>total_marks</code>, not repeat the loop."],
     markscheme: ["total_marks initialises a local total to 0", "total_marks loops through the marks adding each one", "total_marks returns the total (does not print it)", "report calls total_marks", "Maximum calculated as 100 x number of marks", "Prints the line in the required format (report returns nothing)"],
     explain: "Single-purpose functions: one calculates, one reports. <code>report</code> is a procedure (prints, no return); <code>total_marks</code> is a function (returns)."},
    {id: "e8", type: "code", marks: 3,
     context: "This function gives a different answer when called twice with the same list, because it uses a global total that is never reset.",
     q: "<b>Identify</b> the cause and <b>correct</b> the function so that the global <code>total</code> is never changed and every call gives the right average.",
     starter: `total = 0

def class_average(scores):
    global total
    for s in scores:
        total = total + s
    return total / len(scores)`,
     solution: `total = 0

def class_average(scores):
    total = 0
    for s in scores:
        total = total + s
    return total / len(scores)`,
     tests: [
       {call: "class_average([4, 6])", after: "total", label: "first call, global total must stay 0"},
       {setup: "class_average([4, 6])", call: "class_average([4, 6])", after: "total", label: "second call gives the same answer"},
       {setup: "class_average([10, 20])", call: "class_average([1, 3])", after: "total", label: "different list after an earlier call"}
     ],
     hints: ["Remove the <code>global total</code> line so <code>total</code> becomes local, and make sure it starts at 0 every call."],
     markscheme: ["Identifies the global total is not reset, so values carry over between calls", "Uses a local total and removes the global declaration", "Initialises the local total to 0 inside the function"],
     explain: "A global total goes <b>stale</b>. A local total is created fresh at 0 every call and the global is left alone."},
    {id: "e9", type: "code", marks: 4,
     context: "A calendar program must decide whether a year is a leap year. A year is a leap year if it is divisible by 4, except century years (divisible by 100), which must also be divisible by 400.",
     q: "<b>Construct</b> a function <code>is_leap_year(year)</code> that <b>returns</b> <code>True</code> or <code>False</code>.",
     starter: `def is_leap_year(year):
    # your code here
    pass`,
     solution: `def is_leap_year(year):
    if year % 400 == 0:
        return True
    elif year % 100 == 0:
        return False
    elif year % 4 == 0:
        return True
    else:
        return False`,
     tests: [
       {call: "is_leap_year(2024)"}, {call: "is_leap_year(2023)"}, {call: "is_leap_year(1900)", label: "century, not leap"},
       {call: "is_leap_year(2000)", label: "century divisible by 400"}, {call: "is_leap_year(2100)"}, {call: "is_leap_year(2400)"}, {call: "is_leap_year(1)"}
     ],
     hints: ["Test the most specific rule first: divisible by 400. Then by 100. Then by 4.", "<code>year % 4 == 0</code> tests divisibility."],
     markscheme: ["Correct test for divisible by 400 returning True", "Correct test for divisible by 100 (not 400) returning False", "Correct test for divisible by 4 returning True, else False", "Conditions in a correct order and the result is returned, not printed"],
     explain: "A function combining selection and modulus: strictest rule first."},
    {id: "e10", type: "code", marks: 5,
     context: "A shop adds up item prices. Orders of 100 or more get 10 off.",
     q: "<b>Write</b> a modular program with two functions: <code>get_total(prices)</code> returns the sum of a list, and <code>apply_discount(total)</code> returns <code>total - 10</code> if the total is 100 or more, otherwise the total unchanged. The main program reads the number of items n, then n prices (one per line, whole numbers), and prints the final amount to pay. Use <code>input()</code> without prompt text.",
     starter: `def get_total(prices):
    # your code here
    pass

def apply_discount(total):
    # your code here
    pass

# main program: read n, then n prices, print the amount to pay
`,
     solution: `def get_total(prices):
    total = 0
    for p in prices:
        total = total + p
    return total

def apply_discount(total):
    if total >= 100:
        return total - 10
    return total

n = int(input())
prices = []
for i in range(n):
    prices.append(int(input()))
print(apply_discount(get_total(prices)))`,
     tests: [
       {stdin: "3\n50\n40\n30", label: "total 120, discounted to 110"},
       {stdin: "2\n20\n30", label: "total 50, no discount"},
       {stdin: "1\n100", label: "exactly 100 gets the discount"},
       {stdin: "0", label: "no items"}
     ],
     hints: ["Read n first, then use a <code>for</code> loop to read n prices into a list.", "The main program should call <code>apply_discount(get_total(prices))</code>."],
     markscheme: ["get_total returns the sum using a local total starting at 0", "apply_discount tests total >= 100", "apply_discount returns the reduced or unchanged total (returns, not prints)", "Main program reads n and then n prices", "Main program calls both functions and prints the result"],
     explain: "Each function has a single purpose, and the main program just joins them together."},
    {id: "e11", type: "written", marks: 3,
     q: "<b>Outline</b> three benefits of modularising a program into functions.",
     markscheme: [
       "Easier to read and maintain: only the affected function needs changing (1 mark)",
       "Each function can be tested independently (1 mark)",
       "Functions can be reused / written once and called many times (1 mark)",
       "Work can be shared across a team (1 mark)"
     ],
     model: "Modularisation makes the program easier to read and maintain, because a change only needs to be made in the function affected. Each function can be tested independently, which makes errors easier to find. Functions can be reused wherever the same task is needed, and different team members can write different functions at the same time."},
    {id: "e12", type: "written", marks: 3,
     q: "<b>Describe</b> what happens on the call stack when a function is called and when it returns, and state what a stack frame contains.",
     markscheme: [
       "A stack frame is pushed onto the call stack when the function is called (1 mark)",
       "The frame holds the function's local variables and the return address (1 mark)",
       "When the function returns, the frame is removed and execution continues at the return address (1 mark)"
     ],
     model: "When a function is called, a stack frame is pushed onto the call stack. The frame contains the function's local variables and the return address. When the function returns, its frame is removed from the stack, its local variables disappear, and execution continues at the return address in the calling code."}
  ]
}
);
