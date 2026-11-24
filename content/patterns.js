// "How to structure code" page: building blocks, standard patterns, checklist.
window.B2.patterns = {
  blocks: [
    ['Header', '<code>def name(parameters):</code> copied exactly from the question.'],
    ['Initialise', 'Starting values <b>before</b> the loop: <code>total = 0</code>, <code>count = 0</code>, <code>largest = items[0]</code>, <code>found = False</code>.'],
    ['Loop', '<code>for</code> when you know how many times (every item, every index). <code>while</code> when you stop on a condition (sentinel, found, valid input).'],
    ['Decision', '<code>if</code> inside the loop tests the current item.'],
    ['Update', 'Inside the loop (and usually inside the <code>if</code>): <code>count = count + 1</code>, <code>total = total + x</code>.'],
    ['Return / output', '<b>After</b> the loop, at the function\'s indentation: <code>return count</code>. Return if the question says "returns", print if it says "outputs".'],
  ],
  example: `def count_above(scores, limit):     # 1 HEADER
    count = 0                       # 2 INITIALISE (before the loop)
    for s in scores:                # 3 LOOP over every item
        if s > limit:               # 4 DECISION on the current item
            count = count + 1       # 5 UPDATE (inside the if)
    return count                    # 6 RETURN (after the loop)

print(count_above([45, 72, 90, 38, 66], 50))`,
  patterns: [
    {
      title: 'Count the items that match',
      when: '"How many…", "count the number of…"',
      code: `def count_passes(marks):
    count = 0                  # initialise
    for m in marks:            # loop: every item
        if m >= 50:            # decision
            count = count + 1  # update
    return count               # after the loop

print(count_passes([45, 72, 50, 38]))`,
    },
    {
      title: 'Total and average',
      when: '"Calculate the total / mean…"',
      code: `def average(values):
    if len(values) == 0:       # guard: no division by zero
        return 0
    total = 0                  # initialise
    for v in values:           # loop
        total = total + v      # update (no if needed)
    return total / len(values) # after the loop

print(average([4, 8, 9]))`,
    },
    {
      title: 'Largest or smallest',
      when: '"Find the highest / lowest…"',
      code: `def highest(temps):
    largest = temps[0]         # initialise from the FIRST item, not 0
    for t in temps:
        if t > largest:        # use < for smallest
            largest = t
    return largest

print(highest([-3, -8, -1, -5]))   # starting from 0 would wrongly give 0`,
    },
    {
      title: 'Linear search',
      when: '"Return the position of… or -1 if not found"',
      code: `def find(items, target):
    for i in range(len(items)):   # loop over indices (we need the position)
        if items[i] == target:
            return i              # found: return straight away (inside the loop)
    return -1                     # only reached if nothing matched (after the loop)

print(find(["pen", "ink", "pad"], "ink"), find(["pen"], "cap"))`,
    },
    {
      title: 'Binary search',
      when: 'Sorted data, "efficient search"',
      code: `def binary_search(a, target):
    low = 0
    high = len(a) - 1             # last valid index, not len(a)
    while low <= high:            # loop while there is something left to check
        mid = (low + high) // 2   # // so mid is an integer
        if a[mid] == target:
            return mid
        elif a[mid] < target:
            low = mid + 1         # search the upper half
        else:
            high = mid - 1        # search the lower half
    return -1

print(binary_search([4, 7, 8, 9, 11, 15, 16], 15))`,
    },
    {
      title: 'Validation loop',
      when: '"Keep asking until the input is valid"',
      stdin: '150\n-4\n17',
      code: `age = int(input("Age: "))           # read once before the loop
while age < 0 or age > 120:          # loop while INVALID
    print("Must be 0-120")
    age = int(input("Age: "))       # read again inside: this changes the condition
print("Accepted", age)`,
    },
    {
      title: 'Sentinel loop',
      when: '"Read values until -1 is entered"',
      stdin: '12\n8\n10\n-1',
      code: `total = 0
count = 0
mark = int(input())          # read the first value before the loop
while mark != -1:            # stop on the sentinel
    total = total + mark
    count = count + 1
    mark = int(input())      # read the next value LAST in the loop body
if count > 0:
    print(total / count)
else:
    print("No marks")`,
    },
    {
      title: '2D list: visit every cell',
      when: 'Grids, seats, "for each row… each column…"',
      code: `def count_booked(seats):
    count = 0
    for r in range(len(seats)):            # outer loop: rows
        for c in range(len(seats[r])):     # inner loop: columns
            if seats[r][c] == 1:
                count = count + 1
    return count

print(count_booked([[1, 0, 1], [0, 0, 1]]))`,
    },
    {
      title: 'Array stack with a top pointer',
      when: 'push / pop / isFull / isEmpty',
      code: `SIZE = 3
stack = [None] * SIZE
top = -1                      # -1 means empty

def push(v):
    global top                # we change the global pointer
    if top == SIZE - 1:       # check full BEFORE adding
        print("Stack overflow")
    else:
        top = top + 1         # move the pointer first...
        stack[top] = v        # ...then store

def pop():
    global top
    if top == -1:             # check empty BEFORE removing
        print("Stack underflow")
        return None
    v = stack[top]            # read first...
    top = top - 1             # ...then move the pointer
    return v

push("A"); push("B")
print(pop(), pop(), pop())`,
    },
    {
      title: 'Bubble sort (optimised)',
      when: '"Sort the list into ascending order"',
      code: `def bubble_sort(a):
    n = len(a)
    for i in range(n - 1):              # at most n - 1 passes
        swapped = False                 # initialise the flag each pass
        for j in range(n - 1 - i):      # last i items are already in place
            if a[j] > a[j + 1]:         # use < for descending
                temp = a[j]             # swap with a temp variable
                a[j] = a[j + 1]
                a[j + 1] = temp
                swapped = True
        if not swapped:                 # no swaps: already sorted, stop early
            break

nums = [14, 3, 9, 1, 7]
bubble_sort(nums)
print(nums)`,
    },
  ],
  mistakes: [
    {
      title: 'return inside the loop',
      wrong: `def has_negative(nums):
    for n in nums:
        if n < 0:
            return True
        else:
            return False     # stops after the FIRST item

print(has_negative([3, -2]))`,
      right: `def has_negative(nums):
    for n in nums:
        if n < 0:
            return True
    return False             # only after checking every item

print(has_negative([3, -2]))`,
    },
    {
      title: 'Initialising inside the loop',
      wrong: `def total(nums):
    for n in nums:
        t = 0                # reset every pass
        t = t + n
    return t

print(total([1, 2, 3]))`,
      right: `def total(nums):
    t = 0                    # once, before the loop
    for n in nums:
        t = t + n
    return t

print(total([1, 2, 3]))`,
    },
    {
      title: 'print instead of return',
      wrong: `def double(x):
    print(x * 2)             # shows it, but gives back None

result = double(4)
print(result + 1)`,
      right: `def double(x):
    return x * 2             # gives the value back to the caller

result = double(4)
print(result + 1)`,
    },
  ],
  checklist: [
    'Header copied exactly: same function name, same parameters, same order.',
    'Every counter, total and flag is initialised <b>before</b> the loop.',
    'The loop visits every item it should: check <code>range</code> start and end (end is excluded).',
    'Updates are <b>inside</b> the loop, and inside the <code>if</code> when they should only happen sometimes.',
    'A <code>while</code> loop changes something inside, so its condition can become False.',
    '<code>return</code> after the loop, unless you are returning early because you found the answer.',
    'Return when the question says "returns"; print when it says "outputs" or "displays".',
    '<code>==</code> to compare, <code>=</code> to assign; <code>//</code> for whole-number division, <code>/</code> for decimals.',
  ],
};
