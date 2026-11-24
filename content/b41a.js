// B4.1.1-B4.1.3 Abstract data types and linked lists (generated; verified with validate.mjs).
B2.topics.push({
  "id": "b4-1-1",
  "code": "B4.1.1",
  "section": "B4.1 Abstract data types",
  "title": "Abstract data types",
  "summary": "Explain what an ADT is, how it differs from a data structure, and why hiding the implementation behind an interface is useful.",
  "minutes": 35,
  "lesson": [
    {
      "p": "Think of a <b>TV remote</b>. You press <i>volume up</i> and the sound gets louder. You do not know (or care) what circuits are inside. The buttons are the <b>interface</b>. The circuits are the <b>implementation</b>. The manufacturer can rebuild the inside and your remote still works, because the buttons did not change. That is the whole idea of an ADT."
    },
    {
      "h": "What an ADT is"
    },
    {
      "p": "An <b>abstract data type (ADT)</b> is a <b>high-level description</b> of a data structure: the data it holds and the <b>operations</b> allowed on that data, <b>without saying how it is stored</b>. It says <i>what</i> it does, never <i>how</i>. Examples: stack, queue, list, set, map."
    },
    {
      "table": {
        "head": [
          "Term",
          "Meaning"
        ],
        "rows": [
          [
            "<b>ADT</b>",
            "A model of data plus the operations allowed on it, independent of how it is stored. The <i>what</i>."
          ],
          [
            "<b>Interface</b>",
            "The public operations (name, inputs, result) that other code may call, e.g. <code>push</code>, <code>pop</code>, <code>peek</code>."
          ],
          [
            "<b>Implementation</b>",
            "The hidden code and storage that make the operations work (a Python list, linked nodes, a hash table)."
          ],
          [
            "<b>Data structure</b>",
            "A concrete way of storing the data in memory. The <i>how</i>. One ADT can have several data structures behind it."
          ],
          [
            "<b>Encapsulation</b>",
            "Data and the operations on it are bundled together in one unit (a class)."
          ],
          [
            "<b>Information hiding</b>",
            "Internal details are kept private so outside code cannot depend on them or corrupt them."
          ]
        ]
      }
    },
    {
      "trap": "<b>ADT = what</b> (behaviour, operations). <b>Data structure = how</b> (memory layout). A <i>stack</i> is an ADT. An <i>array</i> or a <i>linked list</i> is a data structure you can use to build it. Do not write &quot;a stack is a data structure that uses an array&quot; as if the two were the same thing."
    },
    {
      "h": "An ADT behind its interface (this is the code from your notes)"
    },
    {
      "code": "class Stack:                       # interface: push / pop / peek / is_empty\n    def __init__(self):\n        self._items = []           # hidden implementation (a Python list)\n    def push(self, x):\n        self._items.append(x)\n    def pop(self):\n        return self._items.pop()\n    def peek(self):\n        return self._items[-1]\n    def is_empty(self):\n        return len(self._items) == 0\n\ns = Stack()                        # user code calls the interface only\ns.push(\"Song A\")\ns.push(\"Song B\")\nprint(s.pop())\nprint(s.peek())\nprint(s.is_empty())"
    },
    {
      "p": "The leading underscore in <code>_items</code> is the Python convention for &quot;private: do not touch from outside&quot;. The user never writes <code>s._items</code>. They only call <code>push</code>, <code>pop</code>, <code>peek</code> and <code>is_empty</code>."
    },
    {
      "h": "Swap the implementation, callers do not change"
    },
    {
      "p": "Now build the <b>same ADT</b> with linked nodes instead of a list. The interface is identical, so the user code is word for word the same and gives the same answers."
    },
    {
      "code": "class LinkedStack:                 # same interface, different implementation\n    def __init__(self):\n        self._top = None           # hidden: a chain of [value, rest] pairs\n    def push(self, x):\n        self._top = [x, self._top]\n    def pop(self):\n        x = self._top[0]\n        self._top = self._top[1]\n        return x\n    def peek(self):\n        return self._top[0]\n    def is_empty(self):\n        return self._top is None\n\ns = LinkedStack()                  # only this line changed\ns.push(\"Song A\")\ns.push(\"Song B\")\nprint(s.pop())\nprint(s.peek())\nprint(s.is_empty())"
    },
    {
      "h": "Why ADTs are useful (the purpose)"
    },
    {
      "list": [
        "<b>Abstraction / modularity:</b> break a big problem into small self-contained units that can be built, tested and changed on their own.",
        "<b>Encapsulation and information hiding:</b> internals are hidden, so users can only use the operations. Fewer bugs, easier maintenance.",
        "<b>Flexibility:</b> the implementation can change (list to linked nodes, to improve speed or memory) <b>without changing the code that uses it</b>.",
        "<b>Reusability:</b> the same ADT is used in many programs and many parts of one program.",
        "<b>Design and teamwork:</b> one person designs the algorithm using <code>push</code> and <code>pop</code>, another writes the implementation, at the same time."
      ]
    },
    {
      "h": "Linear ADTs you meet first"
    },
    {
      "table": {
        "head": [
          "ADT",
          "Rule",
          "Operations",
          "Possible implementations"
        ],
        "rows": [
          [
            "Stack",
            "Last in, first out (LIFO)",
            "push, pop, peek, is_empty",
            "Python list; linked list (push/pop at the head)"
          ],
          [
            "Queue",
            "First in, first out (FIFO)",
            "enqueue, dequeue, is_empty",
            "Python list; linked list with a tail pointer"
          ],
          [
            "List",
            "Ordered sequence, items accessed by position",
            "insert, delete, search, traverse",
            "Array; linked list"
          ]
        ]
      }
    },
    {
      "tip": "Exam wording: <b>&quot;An ADT is a conceptual (high-level) description of a data structure and its operations. It defines what the structure can do, not how it does it.&quot;</b> For a 3-mark &quot;explain the purpose&quot; give three <i>different</i> purposes (modularity, information hiding, flexibility) and say <i>why</i> each helps. Queue is first in, <b>first out</b> (FIFO); the course PDF's &quot;first-in-first-put&quot; is a typo."
    }
  ],
  "mustKnow": [
    "An <b>ADT</b> is a high-level description of a data structure: the data and the operations on it, <b>not how it is stored</b>.",
    "<b>Interface</b> = the public operations. <b>Implementation</b> = the hidden code and storage. The caller needs only the interface.",
    "<b>ADT = what, data structure = how.</b> One ADT (a stack) can have several implementations (list or linked nodes).",
    "Purposes: <b>modularity, reusability, information hiding (encapsulation), flexibility</b> (change implementation without touching callers), easier design and teamwork.",
    "<b>Encapsulation</b> bundles data and operations in one class; <b>information hiding</b> keeps the internals private.",
    "Stack = LIFO (push, pop, peek, is_empty). Queue = FIFO (enqueue, dequeue)."
  ],
  "terms": [
    {
      "term": "Abstract data type (ADT)",
      "def": "A high-level description of a data structure: the data it holds and the operations allowed on it, without specifying how it is stored."
    },
    {
      "term": "Interface",
      "def": "The set of public operations (names, inputs and results) that other code can call to use an ADT."
    },
    {
      "term": "Implementation",
      "def": "The hidden code and storage structure that make the operations of an ADT work."
    },
    {
      "term": "Data structure",
      "def": "A concrete way of organising data in memory (such as an array or linked list) that can be used to implement an ADT."
    },
    {
      "term": "Encapsulation",
      "def": "Bundling data and the operations on it together in one unit, such as a class."
    },
    {
      "term": "Information hiding",
      "def": "Keeping the internal details of an ADT private so that other code cannot depend on or corrupt them."
    },
    {
      "term": "Stack",
      "def": "A linear ADT in which items are added and removed at the same end, so the last item in is the first item out (LIFO)."
    },
    {
      "term": "Queue",
      "def": "A linear ADT in which items are added at the back and removed from the front, so the first item in is the first item out (FIFO)."
    }
  ],
  "exercises": [
    {
      "id": "e1",
      "type": "mcq",
      "marks": 1,
      "q": "<b>Identify</b> the best description of an abstract data type.",
      "options": [
        "A particular array or linked list stored in memory",
        "A description of the data and the operations on it, independent of how it is stored",
        "The Python code that makes a data structure run fast",
        "A data type that can only hold numbers"
      ],
      "answer": 1,
      "explain": "An ADT says <i>what</i> can be done (the operations), not <i>how</i> it is stored. Option A describes a data structure, which is the concrete implementation."
    },
    {
      "id": "e2",
      "type": "mcq",
      "marks": 1,
      "q": "<b>Identify</b> which of these is part of the <i>interface</i> of a Stack ADT.",
      "options": [
        "The Python list <code>self._items</code> used to store the items",
        "The fact that <code>pop</code> uses <code>list.pop()</code>",
        "The operation <code>push(x)</code> that adds an item",
        "The memory addresses of the stored items"
      ],
      "answer": 2,
      "explain": "The interface is the public operations: push, pop, peek, is_empty. The storage and the way pop is coded are implementation details that callers should not depend on."
    },
    {
      "id": "e3",
      "type": "written",
      "marks": 2,
      "q": "<b>Define</b> the term <i>abstract data type</i>.",
      "markscheme": [
        "A high-level / conceptual description of a data structure (and the data it holds)",
        "Defines the <b>operations</b> that can be performed on the data",
        "Does not specify <b>how</b> the data is stored or the operations are implemented (hides implementation)"
      ],
      "model": "An abstract data type is a conceptual, high-level description of a data structure: it defines the data it holds and the operations that can be performed on it, but not how the data is stored or how the operations are coded.",
      "explain": "Any two of the three points earn the 2 marks. The key idea is <i>what, not how</i>."
    },
    {
      "id": "e4",
      "type": "written",
      "marks": 3,
      "q": "<b>Distinguish</b> between an abstract data type and a data structure, using a stack as an example.",
      "markscheme": [
        "An ADT is the abstract view / specification: <b>what</b> operations are available (e.g. stack: push, pop, peek, is_empty; last in, first out)",
        "A data structure is the concrete implementation: <b>how</b> the data is stored in memory (e.g. an array or a linked list)",
        "One ADT can be implemented by several data structures (a stack using a list or using linked nodes), and the user of the ADT does not need to know which"
      ],
      "model": "An ADT is the abstract description: it says what operations a stack has (push, pop, peek, is_empty) and that it is last in, first out. A data structure is the concrete way the data is stored, for example an array or a linked list. The same stack ADT can be implemented with either, and code that uses the stack does not need to know which.",
      "explain": "Distinguish means give the differences. Name both sides and use the example, as the question asks."
    },
    {
      "id": "e5",
      "type": "mcq",
      "marks": 1,
      "q": "A programmer changes a Stack class so it stores its items in linked nodes instead of a Python list. The <code>push</code>, <code>pop</code>, <code>peek</code> and <code>is_empty</code> methods keep the same names and behaviour. <b>Identify</b> what must happen to the code that uses the stack.",
      "options": [
        "It must be rewritten to use nodes",
        "It must be re-tested and rewritten because list methods no longer work",
        "Nothing: it keeps working because it only used the interface",
        "It must now call <code>_top</code> instead of <code>_items</code>"
      ],
      "answer": 2,
      "explain": "This is the main benefit of an ADT: the implementation can change without affecting the code that uses it, as long as the interface stays the same."
    },
    {
      "id": "e6",
      "type": "written",
      "marks": 3,
      "q": "<b>Explain</b> why using ADTs is helpful when a team of programmers writes a large program.",
      "markscheme": [
        "<b>Modularity</b>: the program is split into self-contained units that different programmers can build and test separately / at the same time",
        "<b>Information hiding / encapsulation</b>: users only call the interface, so they cannot corrupt the internals, giving fewer errors and easier maintenance",
        "<b>Flexibility</b>: the implementation can be changed or improved (e.g. list to linked list) without changing the code that uses it",
        "<b>Reusability</b>: the same ADT can be reused in other parts of the program or other programs"
      ],
      "model": "ADTs let the program be split into modules, so one programmer can write the stack implementation while another writes code that only calls push and pop. The internal data is hidden, so other code cannot corrupt it, which gives fewer bugs and easier maintenance. The implementation can later be replaced by a faster one without changing any of the code that uses it, and the ADT can be reused elsewhere.",
      "explain": "Any three developed points earn 3 marks. Say <i>why</i> each helps the team, not just its name."
    },
    {
      "id": "e7",
      "type": "code",
      "marks": 4,
      "q": "<b>Construct</b> a <code>Queue</code> ADT (first in, first out) as a class. It must store its items in the list <code>self._items</code>. Methods: <code>enqueue(x)</code> adds x at the back; <code>dequeue()</code> removes and <b>returns</b> the front item, or returns <code>None</code> if the queue is empty; <code>is_empty()</code> returns True or False; <code>size()</code> returns the number of items.",
      "starter": "class Queue:\n    def __init__(self):\n        self._items = []\n    def enqueue(self, x):\n        pass\n    def dequeue(self):\n        pass\n    def is_empty(self):\n        pass\n    def size(self):\n        pass\n",
      "solution": "class Queue:\n    def __init__(self):\n        self._items = []\n    def enqueue(self, x):\n        self._items.append(x)\n    def dequeue(self):\n        if len(self._items) == 0:\n            return None\n        return self._items.pop(0)\n    def is_empty(self):\n        return len(self._items) == 0\n    def size(self):\n        return len(self._items)\n",
      "tests": [
        {
          "setup": "q = Queue()\nq.enqueue(1)\nq.enqueue(2)\nq.enqueue(3)",
          "call": "q.dequeue()",
          "label": "dequeue returns the FRONT item (first in)"
        },
        {
          "setup": "q = Queue()\nq.enqueue('a')\nq.enqueue('b')\nq.dequeue()",
          "call": "q.dequeue()",
          "label": "second dequeue returns the second item"
        },
        {
          "setup": "q = Queue()",
          "call": "q.dequeue()",
          "label": "dequeue on an empty queue returns None"
        },
        {
          "setup": "q = Queue()",
          "call": "q.is_empty()",
          "label": "new queue is empty"
        },
        {
          "setup": "q = Queue()\nq.enqueue(5)",
          "call": "q.is_empty()",
          "label": "queue with one item is not empty"
        },
        {
          "setup": "q = Queue()\nq.enqueue(1)\nq.enqueue(2)\nq.enqueue(3)\nq.dequeue()",
          "call": "q.size()",
          "label": "size after 3 enqueues and 1 dequeue"
        },
        {
          "setup": "q = Queue()\nq.enqueue(9)\nq.dequeue()",
          "call": "q.is_empty()",
          "label": "empty again after removing the only item"
        }
      ],
      "hints": [
        "<code>enqueue</code> adds to the back of the list: <code>append</code>.",
        "The front of the queue is index 0. <code>pop(0)</code> removes and returns it. Check for an empty list first."
      ],
      "markscheme": [
        "<code>enqueue</code> adds the item at the back (append)",
        "<code>dequeue</code> removes and returns the front item (index 0)",
        "<code>dequeue</code> returns None when the queue is empty",
        "<code>is_empty</code> and <code>size</code> return correct values (using len)"
      ],
      "explain": "Users only call enqueue, dequeue, is_empty and size. If you later stored the items in linked nodes, they would not need to change a line."
    },
    {
      "id": "e8",
      "type": "output",
      "marks": 2,
      "q": "<b>State</b> the output of this program, then think about why both lines are the same.",
      "context": "Two different implementations of the same Stack ADT are used by the same function.",
      "code": "class ListStack:\n    def __init__(self):\n        self._items = []\n    def push(self, x):\n        self._items.append(x)\n    def pop(self):\n        return self._items.pop()\n\nclass LinkStack:\n    def __init__(self):\n        self._top = None\n    def push(self, x):\n        self._top = [x, self._top]\n    def pop(self):\n        x = self._top[0]\n        self._top = self._top[1]\n        return x\n\ndef run(s):\n    s.push(1)\n    s.push(2)\n    s.push(3)\n    s.pop()\n    print(s.pop())\n\nrun(ListStack())\nrun(LinkStack())",
      "explain": "Both stacks are last in, first out. After pushing 1, 2, 3, the first pop removes 3 and the second pop returns 2, so each call prints 2. <code>run</code> only uses the interface (push, pop), so it works with either implementation: that is the point of an ADT."
    }
  ]
}, {
  "id": "b4-1-2",
  "code": "B4.1.2",
  "section": "B4.1 Abstract data types",
  "title": "Evaluating linked lists",
  "summary": "Describe singly, doubly and circular linked lists, sketch how insertion, deletion, traversal and search work, and evaluate them against arrays.",
  "minutes": 45,
  "lesson": [
    {
      "p": "An array is a row of lockers side by side: locker 7 is easy to find, but squeezing a new locker into the middle means shifting all the rest. A <b>linked list</b> is a <b>treasure hunt</b>: each clue (node) holds a prize (the data) and tells you where the next clue is. Adding a clue in the middle only means changing one note. But to find clue 7 you have to follow clues 1 to 6."
    },
    {
      "h": "Node, head, tail"
    },
    {
      "p": "A <b>node</b> holds <b>data</b> plus a <b>pointer</b> (reference) to another node. The list is reached only through its <b>head</b> (first node). The <b>tail</b> (last node) points to <code>None</code>. Nodes are created wherever there is space in memory (<b>dynamic allocation</b>), so they are <b>not contiguous</b>. An <b>empty list</b> is simply <code>head is None</code>."
    },
    {
      "p": "<b>Singly linked</b> (one pointer, <code>next</code>, forward only):"
    },
    {
      "p": "<pre>head &rarr; [ A | &bull;]&rarr;[ B | &bull;]&rarr;[ C | &bull;]&rarr;[ D | None ]</pre>"
    },
    {
      "p": "<b>Doubly linked</b> (<code>prev</code> and <code>next</code>, both directions; first node's <code>prev</code> is None, last node's <code>next</code> is None):"
    },
    {
      "p": "<pre>None &larr; [ A ] &harr; [ B ] &harr; [ C ] &harr; [ D ] &rarr; None\n        &uarr;head                          &uarr;tail</pre>"
    },
    {
      "p": "<b>Circular</b> (the last node points back to the first, so there is <b>no None</b> at the end):"
    },
    {
      "p": "<pre>head &rarr; [ A ] &rarr; [ B ] &rarr; [ C ] &rarr; [ D ] &rarr; (back to A)</pre>"
    },
    {
      "table": {
        "head": [
          "Variant",
          "Pointers per node",
          "Traversal",
          "Typical use"
        ],
        "rows": [
          [
            "Singly linked",
            "next",
            "Forward only; ends at None",
            "Stacks, simple queues"
          ],
          [
            "Doubly linked",
            "next + prev",
            "Both directions; can delete a known node without finding its predecessor",
            "Undo/redo, browser history, music playlist"
          ],
          [
            "Circular",
            "next (and prev if doubly); last points to first",
            "Stop when you arrive back at the start (never reaches None)",
            "Round-robin scheduling, looping playlist"
          ]
        ]
      }
    },
    {
      "h": "Sketching the operations: the pointer steps, in order"
    },
    {
      "p": "Examiners want the <b>order</b> of pointer changes. The rule: <b>first make the new node point at what it will be followed by, then change the old pointer</b>. If you change the old pointer first, you lose the only link to the rest of the list."
    },
    {
      "table": {
        "head": [
          "Operation (singly linked)",
          "Steps in this order"
        ],
        "rows": [
          [
            "Traverse",
            "<code>current = head</code>; while <code>current</code> is not None: use <code>current.data</code>, then <code>current = current.next</code>"
          ],
          [
            "Search",
            "Traverse, comparing each <code>current.data</code> with the key. Found: stop. Reach None: not found. O(n)"
          ],
          [
            "Insert at start",
            "1. <code>new.next = head</code> &nbsp; 2. <code>head = new</code>"
          ],
          [
            "Insert after node cur",
            "1. <code>new.next = cur.next</code> &nbsp; 2. <code>cur.next = new</code>"
          ],
          [
            "Insert at end",
            "Walk to the last node (<code>next</code> is None), then <code>last.next = new</code>. Empty list: <code>head = new</code>"
          ],
          [
            "Delete the head",
            "<code>head = head.next</code>"
          ],
          [
            "Delete a middle / last node",
            "Find the node <b>before</b> it (<code>prev</code>), then <code>prev.next = cur.next</code> (bypass)"
          ],
          [
            "<b>Doubly:</b> insert between node1 and node2",
            "<code>new.prev = node1</code>, <code>new.next = node2</code>, <code>node1.next = new</code>, <code>node2.prev = new</code> (four pointers)"
          ],
          [
            "<b>Doubly:</b> delete a known node x",
            "<code>x.prev.next = x.next</code> and <code>x.next.prev = x.prev</code> (two pointers; update head or tail at the ends)"
          ],
          [
            "<b>Circular:</b> traverse",
            "Start at head; process; move on; <b>stop when you are back at the head</b>"
          ]
        ]
      }
    },
    {
      "p": "Watch the pointer order live. Inserting 20 after 10 in <code>5 &rarr; 10 &rarr; 30</code>:"
    },
    {
      "code": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\na = Node(5)\nb = Node(10)\nc = Node(30)\na.next = b\nb.next = c\n\nnew = Node(20)\nnew.next = b.next      # step 1: new points at 30 (rest of list is safe)\nb.next = new           # step 2: 10 now points at new\n\ncur = a\nitems = []\nwhile cur is not None:\n    items.append(cur.data)\n    cur = cur.next\nprint(items)"
    },
    {
      "h": "Linked list vs array: time complexity"
    },
    {
      "table": {
        "head": [
          "Operation",
          "Singly linked list",
          "Array / Python list"
        ],
        "rows": [
          [
            "Access by position",
            "O(n): follow pointers from the head",
            "<b>O(1)</b>: index"
          ],
          [
            "Search (unsorted)",
            "O(n)",
            "O(n)"
          ],
          [
            "Search (sorted)",
            "O(n): no binary search (cannot jump to the middle)",
            "O(log n) with binary search"
          ],
          [
            "Insert at start",
            "<b>O(1)</b>",
            "O(n): shift everything right"
          ],
          [
            "Insert at end",
            "O(n) to walk to the tail; O(1) with a tail pointer",
            "O(1) amortised"
          ],
          [
            "Insert / delete in the middle",
            "O(1) once at the node (but <b>finding</b> it is O(n))",
            "O(n): shifting"
          ],
          [
            "Delete a known node",
            "O(n) singly (need the predecessor); <b>O(1) doubly</b>",
            "O(n)"
          ]
        ]
      }
    },
    {
      "h": "Memory"
    },
    {
      "list": [
        "<b>Array:</b> data only, stored contiguously. No pointer overhead, but a fixed size: wasted space if not full, or an expensive resize (copy everything) if full.",
        "<b>Singly linked:</b> data + <b>one pointer</b> per element. <b>Doubly linked:</b> data + <b>two pointers</b> per element. A pointer may take 8 bytes, which is big if the data is a small integer.",
        "<b>Linked list grows and shrinks</b> one node at a time: memory used only as needed, no resizing.",
        "Non-contiguous nodes give worse <b>cache use</b>, so traversal is slower in practice than an array."
      ]
    },
    {
      "h": "Advantages and disadvantages"
    },
    {
      "table": {
        "head": [
          "Advantages",
          "Disadvantages"
        ],
        "rows": [
          [
            "Dynamic size, no resizing",
            "No random access: reaching item k takes k steps"
          ],
          [
            "Insert / delete without shifting items",
            "Extra memory for every pointer (doubly: two)"
          ],
          [
            "Memory used only as needed",
            "Non-contiguous memory: poor cache use; no binary search"
          ],
          [
            "Good base for stacks and queues",
            "Pointer mistakes lose nodes or crash on None"
          ]
        ]
      }
    },
    {
      "p": "<b>Evaluate = both sides + a judgement.</b> Choose a linked list when the size is unknown or changes a lot and there are many insertions and deletions at the front or at known nodes. Choose an array when you need fast access by index, binary search, or the least memory."
    },
    {
      "code": "import time\nn = 20000\ndata = []\nt = time.time()\nfor i in range(n):\n    data.insert(0, i)          # array insert at the START: shifts every item, O(n) each\nprint('list insert at front: slow-ish, shifts', n, 'items repeatedly')\n\nclass Node:\n    def __init__(self, d):\n        self.data = d\n        self.next = None\nhead = None\nfor i in range(n):\n    new = Node(i)\n    new.next = head            # linked insert at the START: 2 pointer changes, O(1)\n    head = new\nprint('linked insert at front: 2 steps each time, no shifting')"
    },
    {
      "trap": "A linked list is <b>not</b> always faster. Inserting in the middle is O(1) <i>only once you are at the node</i>. Finding that node is O(n), so the whole operation is O(n), the same as an array. The real win is inserting or deleting at the <b>head</b> (O(1) vs O(n)), or at a node you already hold in a <b>doubly</b> linked list."
    },
    {
      "tip": "In &quot;evaluate&quot; or &quot;compare&quot; answers name the <b>operation and its Big O</b>, e.g. &quot;inserting at the start is O(1) in a linked list but O(n) in an array because every element must shift&quot;. &quot;Faster&quot; on its own earns nothing. For circular lists, say you must <b>stop when you return to the starting node</b>, otherwise the loop never ends."
    }
  ],
  "mustKnow": [
    "<b>Node</b> = data + pointer(s). <b>Head</b> = first node; tail's <code>next</code> is None (singly). Empty list: <code>head is None</code>. Nodes are not contiguous.",
    "<b>Singly</b>: <code>next</code> only. <b>Doubly</b>: <code>next</code> + <code>prev</code> (two-way, 2 pointers of memory per node). <b>Circular</b>: last node points to the first, no None, stop when back at the start.",
    "Insert after cur: <b>new.next = cur.next FIRST, then cur.next = new</b>. Reverse order loses the rest of the list.",
    "Insert at head: <code>new.next = head</code>, then <code>head = new</code>. Delete head: <code>head = head.next</code>. Delete other: <code>prev.next = cur.next</code>.",
    "Doubly: insert = four pointer changes; delete a known node = two.",
    "Linked list: insert/delete at head <b>O(1)</b>, access by index <b>O(n)</b>, search <b>O(n)</b>, no binary search. Array: access <b>O(1)</b>, insert/delete in the middle or at the start <b>O(n)</b>.",
    "Linked lists: dynamic size, no shifting, but extra memory for pointers and no random access."
  ],
  "terms": [
    {
      "term": "Node",
      "def": "One element of a linked list: it holds a data value and one or more pointers to other nodes."
    },
    {
      "term": "Head",
      "def": "The pointer to the first node of a linked list; the list can only be entered through it."
    },
    {
      "term": "Singly linked list",
      "def": "A linked list in which each node has a single next pointer, so it can only be traversed forwards."
    },
    {
      "term": "Doubly linked list",
      "def": "A linked list in which each node has both next and prev pointers, so it can be traversed in both directions."
    },
    {
      "term": "Circular linked list",
      "def": "A linked list in which the last node points back to the first node, so there is no None at the end."
    },
    {
      "term": "Dynamic allocation",
      "def": "Creating nodes in memory as they are needed, wherever space exists, so the list can grow and shrink at run time."
    },
    {
      "term": "Pointer overhead",
      "def": "The extra memory used to store the pointers (references) in each node, in addition to the data."
    },
    {
      "term": "Random access",
      "def": "Reaching any element directly by its index in constant time, as in an array but not in a linked list."
    }
  ],
  "exercises": [
    {
      "id": "e1",
      "type": "mcq",
      "marks": 1,
      "q": "<b>Identify</b> the time complexity of inserting a new node at the <b>start</b> of a singly linked list that has n nodes.",
      "options": [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n&sup2;)"
      ],
      "answer": 0,
      "explain": "Two pointer changes (<code>new.next = head</code>, <code>head = new</code>) whatever the length. In an array it would be O(n) because every item shifts right."
    },
    {
      "id": "e2",
      "type": "mcq",
      "marks": 1,
      "q": "A singly linked list has 100 nodes and a pointer only to the head. <b>Identify</b> the best description of the work needed to read the 50th item.",
      "options": [
        "One step: the index is used to jump straight to it",
        "About 49 pointer follows from the head, which is O(n)",
        "About 6 steps, using binary search",
        "One step, because the nodes are stored next to each other"
      ],
      "answer": 1,
      "explain": "A linked list has no random access and nodes are not contiguous. You must follow 49 <code>next</code> pointers: O(n). Binary search needs direct access to the middle, so it cannot be used."
    },
    {
      "id": "e3",
      "type": "mcq",
      "marks": 1,
      "q": "1000 integers are stored three ways: in an array, in a singly linked list and in a doubly linked list. <b>Identify</b> which uses the <b>most</b> memory.",
      "options": [
        "The array",
        "The singly linked list",
        "The doubly linked list",
        "They all use the same"
      ],
      "answer": 2,
      "explain": "Array: data only. Singly: data + 1 pointer per element. Doubly: data + 2 pointers per element, so the most memory."
    },
    {
      "id": "e4",
      "type": "mcq",
      "marks": 1,
      "q": "<b>Identify</b> the correct way to know when a traversal of a <b>circular</b> linked list has gone all the way round.",
      "options": [
        "<code>current</code> becomes None",
        "<code>current.next</code> is None",
        "<code>current</code> is the same node as the starting (head) node again",
        "The list has run out of memory"
      ],
      "answer": 2,
      "explain": "In a circular list the last node points back to the head, so <code>None</code> is never reached. A loop that waits for None would run forever. Stop when <code>current</code> is back at the start."
    },
    {
      "id": "e5",
      "type": "written",
      "marks": 3,
      "q": "<b>Describe</b>, in order, the steps to insert a new node N <b>between</b> node A and node B in a singly linked list (A currently points to B).",
      "markscheme": [
        "Create the new node N holding the data",
        "Set N's next pointer to A's current next (so N points to B) <b>first</b>",
        "Then set A's next pointer to N",
        "Order matters: if A.next is changed first, the reference to B (and the rest of the list) is lost"
      ],
      "model": "Create node N. First set N.next to A.next, so N points to B. Then set A.next to N. The order matters: if A.next were changed first, the only link to B and the rest of the list would be lost.",
      "explain": "Three of the four points earn 3 marks. Always show the order: new.next = cur.next, <b>then</b> cur.next = new."
    },
    {
      "id": "e6",
      "type": "written",
      "marks": 3,
      "q": "<b>Describe</b> the steps to delete a node X from the <b>middle</b> of a <b>doubly</b> linked list when you already hold a reference to X, and state why this is easier than in a singly linked list.",
      "markscheme": [
        "Set the next pointer of the node before X (X.prev) to X.next",
        "Set the prev pointer of the node after X (X.next) to X.prev",
        "Easier because X.prev gives the predecessor directly, so no traversal from the head is needed (O(1)); in a singly linked list you must search from the head to find the node before X (O(n))"
      ],
      "model": "Set X.prev.next to X.next so the node before skips X. Set X.next.prev to X.prev so the node after points back to the node before X. Two pointer changes are enough. In a singly linked list there is no prev pointer, so the list must be traversed from the head to find the node before X, which is O(n); in a doubly linked list it is O(1).",
      "explain": "For the head or tail you must also update the head or tail pointer and skip the missing neighbour."
    },
    {
      "id": "e7",
      "type": "written",
      "marks": 4,
      "q": "<b>Compare</b> a singly linked list with an array (a Python list) for storing a collection of items.",
      "markscheme": [
        "Access by index: O(1) in an array, but O(n) in a linked list (must follow pointers from the head; no random access, no binary search)",
        "Insertion / deletion at the start: O(1) in a linked list but O(n) in an array because items must shift",
        "Size: a linked list grows and shrinks one node at a time (no resizing); an array has a fixed size or must be resized by copying",
        "Memory: a linked list needs an extra pointer per node (overhead); an array stores only the data, in contiguous memory (better cache use)"
      ],
      "model": "An array gives O(1) access by index, whereas a linked list has no random access and needs O(n) pointer-following, so binary search is not possible on it. Inserting or deleting at the start is O(1) in a linked list but O(n) in an array because all later items must shift. A linked list can grow and shrink node by node with no resizing, while an array has a fixed size or has to be copied when full. However, a linked list uses extra memory for the pointer in every node, and its non-contiguous memory is less cache-friendly than an array.",
      "explain": "Compare needs both structures in each point. Give any four contrasting points, each with a named operation or Big O."
    },
    {
      "id": "e8",
      "type": "written",
      "marks": 4,
      "q": "A music app stores a playlist that the user can add songs to or remove songs from at any point, and that loops back to the first song after the last. <b>Evaluate</b> the use of a <b>circular linked list</b> for this playlist.",
      "markscheme": [
        "Advantage: the last node points to the first, so playing &quot;next&quot; after the last song wraps round to the first with no special end test / no None",
        "Advantage: songs can be inserted or removed anywhere by changing pointers, with no shifting of the other songs (O(1) once at the node)",
        "Advantage: grows and shrinks dynamically, memory used only as needed",
        "Disadvantage: no direct access to song k (O(n) to reach it), so jumping to a numbered song is slow",
        "Disadvantage: extra memory per node for pointers; traversal must stop when it returns to the starting node or it loops forever",
        "A reasoned conclusion (e.g. suitable because the playlist is played in order and changes often; a doubly circular list would also allow &quot;previous&quot;)"
      ],
      "model": "A circular linked list suits this well. The last song points back to the first, so repeating the playlist needs no special case. Adding or removing a song only means changing a couple of pointers, with no shifting, and the list can grow or shrink as needed. The disadvantages are that jumping to the k-th song means following k pointers (O(n)), each node needs extra memory for its pointer, and traversal code must stop at the starting node or it loops for ever. Because the songs are mostly played in order and the playlist is edited often, it is a good choice; making it doubly linked would also allow &quot;previous song&quot;.",
      "explain": "Evaluate needs advantages, disadvantages <b>and</b> a conclusion. Any four points including a judgement earn 4 marks."
    },
    {
      "id": "e9",
      "type": "output",
      "marks": 3,
      "q": "<b>State</b> the output of this program.",
      "context": "Nodes A, B and C are linked in that order. A new node X is inserted, then a pointer is changed.",
      "code": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\na = Node(\"A\")\nb = Node(\"B\")\nc = Node(\"C\")\na.next = b\nb.next = c\n\nx = Node(\"X\")\nx.next = a.next\na.next = x\nb.next = None\n\nitems = []\ncur = a\nwhile cur is not None:\n    items.append(cur.data)\n    cur = cur.next\nprint(\" -> \".join(items))\nprint(c.data)",
      "explain": "After the insert the list is A, X, B, C. Then <code>b.next = None</code> cuts the list after B, so C is no longer reachable from A (but the variable <code>c</code> still refers to it, so the second line prints C). The traversal gives A -> X -> B."
    },
    {
      "id": "e10",
      "type": "trace",
      "marks": 4,
      "q": "<b>Trace</b> this search for the value 5 in the list 8, 3, 5, 1. Each row is the moment the <code>if</code> test is about to run.",
      "code": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\na = Node(8)\nb = Node(3)\nc = Node(5)\nd = Node(1)\na.next = b\nb.next = c\nc.next = d\nhead = a\n\ncurrent = head\nposition = 0\nwhile current is not None:\n    if current.data == 5:\n        print(\"found at\", position)\n        break\n    current = current.next\n    position = position + 1",
      "columns": [
        "Check",
        "current.data",
        "position",
        "Output"
      ],
      "rows": [
        [
          "1",
          "8",
          "0",
          ""
        ],
        [
          "2",
          "3",
          "1",
          ""
        ],
        [
          "3",
          "5",
          "2",
          "found at 2"
        ]
      ],
      "prefill": 1,
      "labelCol": true,
      "explain": "The search follows the pointers one node at a time. At the third check <code>current.data</code> is 5, so it prints the position (2, counting from 0) and stops. It never looks at the node containing 1. Worst case (value last or missing) it checks all n nodes: O(n)."
    }
  ]
}, {
  "id": "b4-1-3",
  "code": "B4.1.3",
  "section": "B4.1 Abstract data types",
  "title": "Linked lists in Python",
  "summary": "Write Node and LinkedList code to traverse, search, insert and delete (including edge cases), and code the doubly linked and circular variants.",
  "minutes": 60,
  "lesson": [
    {
      "p": "Now the code. Two small classes: a <b>Node</b> that holds data and a <b>next</b> pointer, and a <b>LinkedList</b> that holds only the <b>head</b>. Everything else is a loop that walks along the pointers. The names below match your flashcards (the learning guide uses <code>ListNode</code>, <code>insert_at_beginning</code>, <code>insert_at_end</code>, <code>insert_after_value</code> and <code>print_list</code> for the same ideas, so know both)."
    },
    {
      "h": "Node and LinkedList"
    },
    {
      "code": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None          # None = end of the list\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None          # empty list: head is None\n\nll = LinkedList()\nprint(ll.head)                    # empty\nll.head = Node(7)                 # one node: list is just that node\nprint(ll.head.data, ll.head.next)"
    },
    {
      "h": "Traversal and search: O(n)"
    },
    {
      "p": "<b>Pattern:</b> <code>current = self.head</code>, then <code>while current is not None:</code> do something, then <code>current = current.next</code>. Forget that last line and the loop never ends."
    },
    {
      "code": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def traverse(self):                  # returns the data as a Python list\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n    def search(self, value):             # position of value, or -1\n        current = self.head\n        position = 0\n        while current is not None:\n            if current.data == value:\n                return position\n            current = current.next\n            position = position + 1\n        return -1\n\nll = LinkedList()\nll.head = Node(5)\nll.head.next = Node(10)\nll.head.next.next = Node(30)\nprint(ll.traverse())\nprint(ll.search(10), ll.search(99))"
    },
    {
      "h": "Insertion: head, tail, after a node"
    },
    {
      "table": {
        "head": [
          "Case",
          "Steps (in this order)",
          "Cost"
        ],
        "rows": [
          [
            "Head",
            "1. <code>new.next = self.head</code> &nbsp; 2. <code>self.head = new</code>",
            "O(1)"
          ],
          [
            "Empty list",
            "<code>self.head = new</code> (works for head insert too, since <code>self.head</code> is None)",
            "O(1)"
          ],
          [
            "Tail",
            "Empty? <code>head = new</code>. Else walk until <code>current.next is None</code>, then <code>current.next = new</code>",
            "O(n)"
          ],
          [
            "After a node",
            "Find <code>current</code> with the target. 1. <code>new.next = current.next</code> &nbsp; 2. <code>current.next = new</code>",
            "O(n) to find, O(1) to link"
          ]
        ]
      }
    },
    {
      "code": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def traverse(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n    def insert_head(self, data):\n        new = Node(data)\n        new.next = self.head          # new points to the old first node\n        self.head = new               # head now points to new\n    def insert_tail(self, data):\n        new = Node(data)\n        if self.head is None:         # empty list\n            self.head = new\n            return\n        current = self.head\n        while current.next is not None:   # walk to the last node\n            current = current.next\n        current.next = new\n    def insert_after(self, target, data):\n        current = self.head\n        while current is not None and current.data != target:\n            current = current.next\n        if current is None:\n            return False              # target not found\n        new = Node(data)\n        new.next = current.next       # step 1: FIRST keep the rest of the list\n        current.next = new            # step 2: THEN link the new node in\n        return True\n\nll = LinkedList()\nll.insert_head(10)\nll.insert_head(5)\nll.insert_tail(30)\nprint(ll.traverse())\nprint(ll.insert_after(10, 20), ll.traverse())\nprint(ll.insert_after(99, 1), ll.traverse())"
    },
    {
      "trap": "<b>Pointer order.</b> Doing <code>current.next = new</code> <i>first</i> overwrites the only link to the old next node. You then write <code>new.next = current.next</code>, which is now <code>new</code> itself: the new node points to itself and the rest of the list is lost. Always <b>new.next first, then current.next</b>. Also, never write <code>self.head = self.head.next</code> in a traversal: use a separate <code>current</code>, or you throw away the front of the list."
    },
    {
      "h": "Deletion: head, middle, tail, only node, not found"
    },
    {
      "p": "To delete a node you must change the <code>next</code> of the node <b>before</b> it, so you walk with a pointer that stops one node early (<code>before</code>). The deleted node is simply bypassed and Python's garbage collector frees it."
    },
    {
      "table": {
        "head": [
          "Case",
          "What to do"
        ],
        "rows": [
          [
            "Empty list",
            "Nothing to delete: return False"
          ],
          [
            "Head (or the only node)",
            "<code>self.head = self.head.next</code>. For a one-node list this sets head to None: the list is now empty"
          ],
          [
            "Middle or tail",
            "Walk to <code>before</code>, the node whose <code>next</code> holds the value, then <code>before.next = before.next.next</code> (for the tail, <code>before.next.next</code> is None, so the list now ends at <code>before</code>)"
          ],
          [
            "Not found",
            "<code>before.next</code> reaches None: return False, change nothing"
          ]
        ]
      }
    },
    {
      "code": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def insert_tail(self, data):\n        new = Node(data)\n        if self.head is None:\n            self.head = new\n            return\n        current = self.head\n        while current.next is not None:\n            current = current.next\n        current.next = new\n    def traverse(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n    def delete(self, value):\n        if self.head is None:                  # empty list\n            return False\n        if self.head.data == value:            # delete the head\n            self.head = self.head.next\n            return True\n        before = self.head\n        while before.next is not None and before.next.data != value:\n            before = before.next               # find the node BEFORE\n        if before.next is None:\n            return False                       # value not in the list\n        before.next = before.next.next         # bypass the node\n        return True\n\nll = LinkedList()\nfor v in [5, 10, 20, 30]:\n    ll.insert_tail(v)\nprint(ll.delete(5), ll.traverse())      # head\nprint(ll.delete(20), ll.traverse())     # middle\nprint(ll.delete(30), ll.traverse())     # tail\nprint(ll.delete(99), ll.traverse())     # not found\nprint(ll.delete(10), ll.traverse())     # only node: list becomes empty\nprint(ll.delete(10), ll.traverse())     # empty list"
    },
    {
      "tip": "Always test the <b>edge cases</b>: empty list, one node, delete the head, delete the tail, value not found. These are what the markscheme checks. The guard <code>while before.next is not None and ...</code> must test <code>None</code> <b>first</b>, or you get an <i>AttributeError: 'NoneType' has no attribute 'data'</i>."
    },
    {
      "h": "Doubly linked list"
    },
    {
      "p": "Each node also has <code>prev</code>. Keep a <code>head</code> and a <code>tail</code>. Inserting needs <b>four</b> pointer changes, and deleting a known node needs only <b>two</b> (plus fixing head or tail at the ends), with no search for the predecessor."
    },
    {
      "code": "class DNode:\n    def __init__(self, data):\n        self.data = data\n        self.prev = None\n        self.next = None\n\nclass DoublyLinkedList:\n    def __init__(self):\n        self.head = None\n        self.tail = None\n    def insert_after(self, node, data):       # FOUR pointer changes\n        new = DNode(data)\n        after = node.next\n        new.next = after                       # 1\n        if after is not None:\n            after.prev = new                   # 2\n        else:\n            self.tail = new\n        new.prev = node                        # 3\n        node.next = new                        # 4\n    def delete_node(self, node):               # TWO pointer changes\n        if node.prev is not None:\n            node.prev.next = node.next\n        else:\n            self.head = node.next              # deleting the head\n        if node.next is not None:\n            node.next.prev = node.prev\n        else:\n            self.tail = node.prev              # deleting the tail\n    def forwards(self):\n        out = []\n        cur = self.head\n        while cur is not None:\n            out.append(cur.data)\n            cur = cur.next\n        return out\n    def backwards(self):\n        out = []\n        cur = self.tail\n        while cur is not None:\n            out.append(cur.data)\n            cur = cur.prev\n        return out\n\nd = DoublyLinkedList()\na = DNode(\"A\")\nc = DNode(\"C\")\na.next = c\nc.prev = a\nd.head = a\nd.tail = c\nd.insert_after(a, \"B\")\nprint(d.forwards(), d.backwards())\nd.delete_node(c)\nprint(d.forwards(), d.backwards())"
    },
    {
      "h": "Circular linked list"
    },
    {
      "p": "The last node points back to the first, so a loop that waits for <code>None</code> would <b>never stop</b>. Instead, remember where you started and stop when you come back to it."
    },
    {
      "code": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\na = Node(5)\nb = Node(10)\nc = Node(15)\na.next = b\nb.next = c\nc.next = a              # the last node points back to the head\nhead = a\n\ncurrent = head\nif current is not None:\n    while True:\n        print(current.data, end=\" \")\n        current = current.next\n        if current is head:       # back at the start: stop\n            break\nprint()"
    },
    {
      "p": "To add a node at the <b>end</b> of a circular (doubly) list in your notes: <code>tail = head.prev</code>, then <code>new.next = head</code>, <code>new.prev = tail</code>, <code>tail.next = new</code>, <code>head.prev = new</code>. If you keep a <b>tail</b> pointer instead (flashcard version), the head is <code>tail.next</code>, and a one-node list points to itself."
    },
    {
      "tip": "Checklist for any linked-list method: (1) empty list? (2) one node? (3) work at the head? (4) work at the tail? (5) value not found? (6) did I change pointers in a safe order? (7) in a circular list, did I stop at the start?"
    }
  ],
  "mustKnow": [
    "<b>Node</b> has <code>data</code> and <code>next</code> (None at the end). <b>LinkedList</b> holds only <code>head</code>; empty list is <code>head is None</code>.",
    "<b>Traversal</b>: <code>current = head</code>; <code>while current is not None:</code> process; <code>current = current.next</code>. O(n).",
    "<b>Insert at head</b>: <code>new.next = head</code> then <code>head = new</code>. <b>Insert after current</b>: <code>new.next = current.next</code> <b>first</b>, then <code>current.next = new</code>.",
    "<b>Insert at tail</b>: empty list means <code>head = new</code>; otherwise walk until <code>current.next is None</code>, then <code>current.next = new</code>.",
    "<b>Delete</b>: head is <code>head = head.next</code>; middle/tail is <code>before.next = before.next.next</code> (find the node <i>before</i>). Handle empty list, only node, not found.",
    "Loop condition order: test <code>is not None</code> <b>before</b> using <code>.next</code> or <code>.data</code>, or you get an AttributeError.",
    "<b>Doubly</b>: insert = 4 pointer changes, delete known node = 2; update head/tail at the ends. <b>Circular</b>: stop when <code>current is head</code> again (never None)."
  ],
  "terms": [
    {
      "term": "Traversal",
      "def": "Visiting every node of a linked list in order by starting at the head and repeatedly following the next pointer until None."
    },
    {
      "term": "Bypass a node",
      "def": "Deleting a node by making the previous node's next pointer skip over it to the following node."
    },
    {
      "term": "Insert at head",
      "def": "Adding a node at the front by setting new.next to the old head and then setting head to the new node; O(1)."
    },
    {
      "term": "Edge case",
      "def": "An unusual input that needs special handling, such as an empty list, a single-node list, deleting the head or tail, or a value that is not found."
    },
    {
      "term": "Garbage collection",
      "def": "Automatic freeing of memory for objects, such as a bypassed node, that nothing refers to any more."
    }
  ],
  "exercises": [
    {
      "id": "e1",
      "type": "code",
      "marks": 3,
      "q": "<b>Construct</b> the method <code>length(self)</code> that <b>returns</b> the number of nodes in the list (0 for an empty list).",
      "context": "The Node and LinkedList classes, a <code>to_list</code> method and a helper <code>build(values)</code> (which builds a list from a Python list) are given.",
      "starter": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def length(self):\n        # return the number of nodes\n        pass\n\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "solution": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def length(self):\n        count = 0\n        current = self.head\n        while current is not None:\n            count = count + 1\n            current = current.next\n        return count\n\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "tests": [
        {
          "setup": "ll = build([])",
          "call": "ll.length()",
          "label": "empty list gives 0"
        },
        {
          "setup": "ll = build([4])",
          "call": "ll.length()",
          "label": "one node"
        },
        {
          "setup": "ll = build([4, 8, 15, 16, 23])",
          "call": "ll.length()",
          "label": "five nodes"
        }
      ],
      "hints": [
        "Start a counter at 0 and walk from <code>self.head</code> with a <code>current</code> pointer.",
        "Each time <code>current</code> is not None add 1, then move on with <code>current = current.next</code>."
      ],
      "markscheme": [
        "Counter initialised to 0 and <code>current</code> set to <code>self.head</code>",
        "Loop continues while <code>current is not None</code>, moving <code>current = current.next</code>",
        "Counter incremented once per node and returned (0 for an empty list)"
      ],
      "explain": "A traversal with a counter. The empty list works automatically because the loop body never runs."
    },
    {
      "id": "e2",
      "type": "code",
      "marks": 3,
      "q": "<b>Construct</b> the method <code>count(self, value)</code> that <b>returns</b> how many nodes hold <code>value</code>.",
      "starter": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def count(self, value):\n        # return how many nodes have data == value\n        pass\n\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "solution": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def count(self, value):\n        total = 0\n        current = self.head\n        while current is not None:\n            if current.data == value:\n                total = total + 1\n            current = current.next\n        return total\n\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "tests": [
        {
          "setup": "ll = build([])",
          "call": "ll.count(3)",
          "label": "empty list gives 0"
        },
        {
          "setup": "ll = build([3, 5, 3, 7, 3])",
          "call": "ll.count(3)",
          "label": "three occurrences"
        },
        {
          "setup": "ll = build([1, 2, 3])",
          "call": "ll.count(9)",
          "label": "value not present gives 0"
        },
        {
          "setup": "ll = build([6])",
          "call": "ll.count(6)",
          "label": "single node that matches"
        }
      ],
      "hints": [
        "Traverse the whole list: do not stop at the first match.",
        "Add 1 to a counter whenever <code>current.data == value</code>."
      ],
      "markscheme": [
        "Counter initialised and a traversal from the head to the end",
        "Compares <code>current.data</code> with <code>value</code> and increments on a match (does not stop early)",
        "Moves to the next node every time and returns the count"
      ],
      "explain": "Same pattern as length, but only count the matching nodes. The whole list must be visited, so it is O(n) every time."
    },
    {
      "id": "e3",
      "type": "code",
      "marks": 4,
      "q": "<b>Construct</b> the method <code>search(self, value)</code> that <b>returns</b> the position (0 for the head) of the first node holding <code>value</code>, or <code>-1</code> if it is not in the list.",
      "starter": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def search(self, value):\n        # return the position of value, or -1\n        pass\n\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "solution": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def search(self, value):\n        current = self.head\n        position = 0\n        while current is not None:\n            if current.data == value:\n                return position\n            current = current.next\n            position = position + 1\n        return -1\n\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "tests": [
        {
          "setup": "ll = build([])",
          "call": "ll.search(5)",
          "label": "empty list"
        },
        {
          "setup": "ll = build([5, 8, 9])",
          "call": "ll.search(5)",
          "label": "value at the head"
        },
        {
          "setup": "ll = build([5, 8, 9])",
          "call": "ll.search(8)",
          "label": "value in the middle"
        },
        {
          "setup": "ll = build([5, 8, 9])",
          "call": "ll.search(9)",
          "label": "value at the tail"
        },
        {
          "setup": "ll = build([5, 8, 9])",
          "call": "ll.search(4)",
          "label": "value not found"
        },
        {
          "setup": "ll = build([2, 7, 2])",
          "call": "ll.search(2)",
          "label": "duplicate: first occurrence"
        }
      ],
      "hints": [
        "Keep a <code>position</code> counter that starts at 0 and goes up by 1 each time you move to the next node.",
        "Return as soon as <code>current.data == value</code>. Return -1 only <b>after</b> the loop."
      ],
      "markscheme": [
        "Traversal from head with a position counter starting at 0",
        "Compares <code>current.data</code> with <code>value</code> and returns the position when found",
        "Moves <code>current</code> and increments the position each step",
        "Returns -1 after the loop (not found / empty list)"
      ],
      "explain": "Linear search along the pointers. You cannot use binary search on a linked list because there is no direct access to the middle node. Your guide's version returns True/False; this one returns the position so you can see where it was found."
    },
    {
      "id": "e4",
      "type": "code",
      "marks": 2,
      "q": "<b>Construct</b> the method <code>insert_head(self, data)</code> that adds a new node holding <code>data</code> at the <b>front</b> of the list.",
      "starter": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def insert_head(self, data):\n        # add a new node at the front\n        pass\n\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "solution": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def insert_head(self, data):\n        new = Node(data)\n        new.next = self.head\n        self.head = new\n\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "tests": [
        {
          "setup": "ll = build([])",
          "call": "ll.insert_head(1)",
          "after": "ll.to_list()",
          "label": "insert into an empty list"
        },
        {
          "setup": "ll = build([2, 3])",
          "call": "ll.insert_head(1)",
          "after": "ll.to_list()",
          "label": "insert before existing nodes"
        },
        {
          "setup": "ll = build([9])\nll.insert_head(8)",
          "call": "ll.insert_head(7)",
          "after": "ll.to_list()",
          "label": "two inserts in a row"
        }
      ],
      "hints": [
        "Make the new node point at the current first node <b>before</b> you change <code>self.head</code>."
      ],
      "markscheme": [
        "New node created and <code>new.next = self.head</code>",
        "<code>self.head = new</code> (after the previous step)"
      ],
      "explain": "Order: <code>new.next = self.head</code> then <code>self.head = new</code>. Because the order is new.next first, the empty-list case needs no special code: the new node's next is simply None."
    },
    {
      "id": "e5",
      "type": "code",
      "marks": 4,
      "q": "<b>Construct</b> the method <code>insert_tail(self, data)</code> that adds a new node holding <code>data</code> at the <b>end</b> of the list. It must work on an empty list.",
      "starter": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def insert_tail(self, data):\n        # add a new node at the end\n        pass\n\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "solution": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def insert_tail(self, data):\n        new = Node(data)\n        if self.head is None:\n            self.head = new\n            return\n        current = self.head\n        while current.next is not None:\n            current = current.next\n        current.next = new\n\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "tests": [
        {
          "setup": "ll = build([])",
          "call": "ll.insert_tail(1)",
          "after": "ll.to_list()",
          "label": "empty list"
        },
        {
          "setup": "ll = build([1])",
          "call": "ll.insert_tail(2)",
          "after": "ll.to_list()",
          "label": "one node"
        },
        {
          "setup": "ll = build([1, 2, 3])",
          "call": "ll.insert_tail(4)",
          "after": "ll.to_list()",
          "label": "several nodes"
        },
        {
          "setup": "ll = build([5, 5])",
          "call": "ll.insert_tail(5)",
          "after": "ll.to_list()",
          "label": "duplicate values"
        }
      ],
      "hints": [
        "If <code>self.head is None</code> the new node simply becomes the head.",
        "Otherwise walk with <code>while current.next is not None</code> so that you stop <b>on</b> the last node, then set <code>current.next = new</code>."
      ],
      "markscheme": [
        "Creates the new node",
        "Handles the empty list (<code>head = new</code>)",
        "Walks to the last node (stops when <code>current.next is None</code>)",
        "Sets <code>current.next = new</code>"
      ],
      "explain": "Condition <code>current.next is not None</code> (not <code>current is not None</code>) leaves <code>current</code> on the last node. If you loop until <code>current</code> is None you have gone one too far and cannot attach anything. This is O(n); a tail pointer would make it O(1)."
    },
    {
      "id": "e6",
      "type": "trace",
      "marks": 4,
      "q": "<b>Trace</b> this traversal. Record the values after each pass of the loop. When <code>current</code> is <code>None</code>, write <code>None</code> in the current.data column.",
      "code": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\na = Node(4)\nb = Node(7)\nc = Node(2)\na.next = b\nb.next = c\n\ncurrent = a\ntotal = 0\nwhile current is not None:\n    total = total + current.data\n    current = current.next\n    print(total)",
      "columns": [
        "Step",
        "current.data",
        "total",
        "Output"
      ],
      "rows": [
        [
          "Start",
          "4",
          "0",
          ""
        ],
        [
          "Pass 1",
          "7",
          "4",
          "4"
        ],
        [
          "Pass 2",
          "2",
          "11",
          "11"
        ],
        [
          "Pass 3",
          "None",
          "13",
          "13"
        ]
      ],
      "prefill": 1,
      "labelCol": true,
      "explain": "Each pass adds the data of the current node to total, moves to the next node, then prints the total. After pass 3 <code>current</code> is None (the end of the list), so the loop stops. Write <code>None</code> in the last row of the current column."
    },
    {
      "id": "e7",
      "type": "code",
      "marks": 5,
      "q": "<b>Construct</b> the method <code>insert_after(self, target, data)</code> that inserts a new node holding <code>data</code> directly after the first node that holds <code>target</code>. Return <code>True</code> if it was inserted and <code>False</code> if <code>target</code> is not in the list.",
      "starter": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def insert_after(self, target, data):\n        # insert after the first node holding target\n        pass\n\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "solution": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def insert_after(self, target, data):\n        current = self.head\n        while current is not None and current.data != target:\n            current = current.next\n        if current is None:\n            return False\n        new = Node(data)\n        new.next = current.next\n        current.next = new\n        return True\n\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "tests": [
        {
          "setup": "ll = build([])",
          "call": "ll.insert_after(1, 9)",
          "after": "ll.to_list()",
          "label": "empty list: target not found"
        },
        {
          "setup": "ll = build([1, 2, 3])",
          "call": "ll.insert_after(2, 9)",
          "after": "ll.to_list()",
          "label": "insert in the middle"
        },
        {
          "setup": "ll = build([1, 2, 3])",
          "call": "ll.insert_after(3, 9)",
          "after": "ll.to_list()",
          "label": "insert after the last node"
        },
        {
          "setup": "ll = build([1, 2, 3])",
          "call": "ll.insert_after(1, 9)",
          "after": "ll.to_list()",
          "label": "insert after the head"
        },
        {
          "setup": "ll = build([1, 2, 3])",
          "call": "ll.insert_after(7, 9)",
          "after": "ll.to_list()",
          "label": "target not found: list unchanged"
        }
      ],
      "hints": [
        "First find <code>current</code>, the node holding <code>target</code>. Stop if you run off the end (<code>current is None</code>).",
        "Then link: <code>new.next = current.next</code> <b>first</b>, <code>current.next = new</code> second."
      ],
      "markscheme": [
        "Traverses to find the node holding target, testing <code>current is not None</code> before <code>current.data</code>",
        "Returns False if the end of the list is reached (target not found / empty list)",
        "<code>new.next = current.next</code> done first",
        "<code>current.next = new</code> done second",
        "Returns True after inserting"
      ],
      "explain": "Order is the whole point: new.next = current.next, then current.next = new. Inserting after the last node works too, because <code>current.next</code> is None so the new node correctly becomes the tail."
    },
    {
      "id": "e8",
      "type": "code",
      "marks": 3,
      "q": "<b>Identify</b> the bug in this <code>insert_after</code> and <b>fix</b> it. With the bug, inserting 9 after 2 in 1, 2, 3 does not give 1, 2, 9, 3: the new node ends up pointing at itself and the 3 is lost.",
      "starter": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def insert_after(self, target, data):\n        current = self.head\n        while current is not None and current.data != target:\n            current = current.next\n        if current is None:\n            return False\n        new = Node(data)\n        current.next = new           # BUG: these two lines are in the wrong order\n        new.next = current.next\n        return True\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None and len(items) < 50:    # stops after 50 so a broken list cannot freeze the page\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "solution": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def insert_after(self, target, data):\n        current = self.head\n        while current is not None and current.data != target:\n            current = current.next\n        if current is None:\n            return False\n        new = Node(data)\n        new.next = current.next\n        current.next = new\n        return True\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None and len(items) < 50:    # stops after 50 so a broken list cannot freeze the page\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "tests": [
        {
          "setup": "ll = build([1, 2, 3])",
          "call": "ll.insert_after(2, 9)",
          "after": "ll.to_list()",
          "label": "insert in the middle"
        },
        {
          "setup": "ll = build([1, 2, 3])",
          "call": "ll.insert_after(3, 9)",
          "after": "ll.to_list()",
          "label": "insert after the last node"
        },
        {
          "setup": "ll = build([4])",
          "call": "ll.insert_after(4, 5)",
          "after": "ll.to_list()",
          "label": "single-node list"
        },
        {
          "setup": "ll = build([1, 2, 3])",
          "call": "ll.insert_after(8, 9)",
          "after": "ll.to_list()",
          "label": "target not found"
        }
      ],
      "hints": [
        "After <code>current.next = new</code>, what does <code>current.next</code> now refer to? Is the old next node still reachable?",
        "Swap the two pointer lines so the new node is attached to the rest of the list <b>before</b> <code>current</code> is redirected."
      ],
      "markscheme": [
        "Identifies that the pointer changes are in the wrong order (current.next overwritten first, so the link to the rest of the list is lost)",
        "Moves <code>new.next = current.next</code> before <code>current.next = new</code>",
        "All cases (middle, last, only node, not found) now work"
      ],
      "explain": "With the wrong order, <code>current.next = new</code> destroys the only reference to the old next node, then <code>new.next = current.next</code> makes new point to itself. (The helper <code>to_list</code> here stops after 50 items so that you can see the broken list instead of freezing the page.) Correct: new.next = current.next first, then current.next = new."
    },
    {
      "id": "e9",
      "type": "trace",
      "marks": 4,
      "q": "<b>Trace</b> this code, which deletes the value 9 from the list 4, 7, 9, 12.",
      "code": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\na = Node(4)\nb = Node(7)\nc = Node(9)\nd = Node(12)\na.next = b\nb.next = c\nc.next = d\nhead = a\n\nbefore = head\nwhile before.next is not None and before.next.data != 9:\n    before = before.next\nbefore.next = before.next.next\n\nitems = []\ncur = head\nwhile cur is not None:\n    items.append(cur.data)\n    cur = cur.next\nprint(items)",
      "columns": [
        "Step",
        "before.data",
        "before.next.data",
        "Output"
      ],
      "rows": [
        [
          "Start",
          "4",
          "7",
          ""
        ],
        [
          "After loop pass 1",
          "7",
          "9",
          ""
        ],
        [
          "After bypass",
          "7",
          "12",
          "[4, 7, 12]"
        ]
      ],
      "prefill": 1,
      "labelCol": true,
      "explain": "At the start <code>before</code> is the head (4) and the next node holds 7, which is not 9, so the loop moves on. Now <code>before</code> is 7 and <code>before.next.data</code> is 9, so the loop stops. The bypass <code>before.next = before.next.next</code> makes node 7 point to 12, so 9 is no longer in the chain."
    },
    {
      "id": "e10",
      "type": "code",
      "marks": 6,
      "q": "<b>Construct</b> the method <code>delete(self, value)</code> that removes the <b>first</b> node holding <code>value</code> and returns <code>True</code>. If the list is empty or <code>value</code> is not in it, return <code>False</code> and leave the list unchanged.",
      "starter": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def delete(self, value):\n        # remove the first node holding value\n        pass\n\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "solution": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def delete(self, value):\n        if self.head is None:\n            return False\n        if self.head.data == value:\n            self.head = self.head.next\n            return True\n        before = self.head\n        while before.next is not None and before.next.data != value:\n            before = before.next\n        if before.next is None:\n            return False\n        before.next = before.next.next\n        return True\n\n    def to_list(self):\n        items = []\n        current = self.head\n        while current is not None:\n            items.append(current.data)\n            current = current.next\n        return items\n\ndef build(values):\n    ll = LinkedList()\n    tail = None\n    for v in values:\n        n = Node(v)\n        if ll.head is None:\n            ll.head = n\n        else:\n            tail.next = n\n        tail = n\n    return ll\n",
      "tests": [
        {
          "setup": "ll = build([])",
          "call": "ll.delete(1)",
          "after": "ll.to_list()",
          "label": "empty list"
        },
        {
          "setup": "ll = build([5])",
          "call": "ll.delete(5)",
          "after": "ll.to_list()",
          "label": "only node"
        },
        {
          "setup": "ll = build([1, 2, 3])",
          "call": "ll.delete(1)",
          "after": "ll.to_list()",
          "label": "delete the head"
        },
        {
          "setup": "ll = build([1, 2, 3])",
          "call": "ll.delete(2)",
          "after": "ll.to_list()",
          "label": "delete a middle node"
        },
        {
          "setup": "ll = build([1, 2, 3])",
          "call": "ll.delete(3)",
          "after": "ll.to_list()",
          "label": "delete the tail"
        },
        {
          "setup": "ll = build([1, 2, 3])",
          "call": "ll.delete(7)",
          "after": "ll.to_list()",
          "label": "value not found"
        },
        {
          "setup": "ll = build([2, 2, 2])",
          "call": "ll.delete(2)",
          "after": "ll.to_list()",
          "label": "duplicates: only the first is removed"
        }
      ],
      "hints": [
        "Three special cases before the general one: empty list, deleting the head (<code>self.head = self.head.next</code>), and not found.",
        "For the general case walk a <code>before</code> pointer while <code>before.next is not None and before.next.data != value</code>, then bypass with <code>before.next = before.next.next</code>."
      ],
      "markscheme": [
        "Empty list returns False",
        "Head holds the value: <code>self.head = self.head.next</code> and returns True (also covers the only node)",
        "Loop finds the node <b>before</b> the target, testing <code>before.next is not None</code> first",
        "Not found (<code>before.next is None</code>) returns False without changing the list",
        "Bypass: <code>before.next = before.next.next</code> (works for middle and tail)",
        "Returns True after deleting"
      ],
      "explain": "You need the node before the one being deleted, because only its <code>next</code> pointer can be changed. Deleting the tail works because <code>before.next.next</code> is None. If you ran the loop with <code>current</code> instead of <code>before</code>, you could not unlink the node."
    },
    {
      "id": "e11",
      "type": "code",
      "marks": 5,
      "q": "<b>Construct</b> the method <code>delete_node(self, node)</code> for a <b>doubly</b> linked list. <code>node</code> is a reference to a node that is in the list. Unlink it so that both <code>forwards</code> and <code>backwards</code> traversals are correct, updating <code>self.head</code> or <code>self.tail</code> when the node is the first or last.",
      "context": "Helper methods <code>to_list</code> (head to tail) and <code>to_list_back</code> (tail to head) and the function <code>build_d(values)</code> are given.",
      "starter": "class DNode:\n    def __init__(self, data):\n        self.data = data\n        self.prev = None\n        self.next = None\n\nclass DoublyLinkedList:\n    def __init__(self):\n        self.head = None\n        self.tail = None\n    def delete_node(self, node):\n        # unlink node: 2 pointer changes, plus head/tail at the ends\n        pass\n    def to_list(self):\n        items = []\n        cur = self.head\n        while cur is not None:\n            items.append(cur.data)\n            cur = cur.next\n        return items\n    def to_list_back(self):\n        items = []\n        cur = self.tail\n        while cur is not None:\n            items.append(cur.data)\n            cur = cur.prev\n        return items\n\ndef build_d(values):\n    d = DoublyLinkedList()\n    for v in values:\n        n = DNode(v)\n        if d.head is None:\n            d.head = n\n        else:\n            d.tail.next = n\n            n.prev = d.tail\n        d.tail = n\n    return d\n",
      "solution": "class DNode:\n    def __init__(self, data):\n        self.data = data\n        self.prev = None\n        self.next = None\n\nclass DoublyLinkedList:\n    def __init__(self):\n        self.head = None\n        self.tail = None\n    def delete_node(self, node):\n        if node.prev is not None:\n            node.prev.next = node.next\n        else:\n            self.head = node.next\n        if node.next is not None:\n            node.next.prev = node.prev\n        else:\n            self.tail = node.prev\n    def to_list(self):\n        items = []\n        cur = self.head\n        while cur is not None:\n            items.append(cur.data)\n            cur = cur.next\n        return items\n    def to_list_back(self):\n        items = []\n        cur = self.tail\n        while cur is not None:\n            items.append(cur.data)\n            cur = cur.prev\n        return items\n\ndef build_d(values):\n    d = DoublyLinkedList()\n    for v in values:\n        n = DNode(v)\n        if d.head is None:\n            d.head = n\n        else:\n            d.tail.next = n\n            n.prev = d.tail\n        d.tail = n\n    return d\n",
      "tests": [
        {
          "setup": "d = build_d([1, 2, 3, 4])\nn = d.head.next",
          "call": "d.delete_node(n)",
          "after": "[d.to_list(), d.to_list_back()]",
          "label": "delete a middle node"
        },
        {
          "setup": "d = build_d([1, 2, 3, 4])\nn = d.head",
          "call": "d.delete_node(n)",
          "after": "[d.to_list(), d.to_list_back()]",
          "label": "delete the head"
        },
        {
          "setup": "d = build_d([1, 2, 3, 4])\nn = d.tail",
          "call": "d.delete_node(n)",
          "after": "[d.to_list(), d.to_list_back()]",
          "label": "delete the tail"
        },
        {
          "setup": "d = build_d([7])\nn = d.head",
          "call": "d.delete_node(n)",
          "after": "[d.to_list(), d.to_list_back()]",
          "label": "only node: list becomes empty"
        },
        {
          "setup": "d = build_d([1, 2])\nn = d.tail",
          "call": "d.delete_node(n)",
          "after": "[d.to_list(), d.to_list_back()]",
          "label": "two nodes, delete the tail"
        }
      ],
      "hints": [
        "Two jobs: make the node <b>before</b> skip forward, and make the node <b>after</b> skip back.",
        "If <code>node.prev</code> is None the node is the head: move <code>self.head</code> instead. If <code>node.next</code> is None it is the tail: move <code>self.tail</code> instead."
      ],
      "markscheme": [
        "If a previous node exists: <code>node.prev.next = node.next</code>",
        "Otherwise (node is the head): <code>self.head = node.next</code>",
        "If a next node exists: <code>node.next.prev = node.prev</code>",
        "Otherwise (node is the tail): <code>self.tail = node.prev</code>",
        "Handles the only node (head and tail both become None) without error"
      ],
      "explain": "In a doubly linked list no search is needed: the node knows its own predecessor, so the delete is O(1). In a singly linked list you would have to walk from the head to find the node before it."
    },
    {
      "id": "e12",
      "type": "code",
      "marks": 4,
      "q": "<b>Construct</b> the function <code>traverse_circular(head)</code> for a <b>circular</b> singly linked list. It must <b>return</b> a Python list of the data in order, starting at <code>head</code> and stopping when it gets back to <code>head</code>. If <code>head</code> is None (empty list) return an empty list.",
      "context": "The last node's <code>next</code> points back to <code>head</code>, so <code>None</code> is never reached. A function <code>make_circle(values)</code> that builds such a list is given.",
      "starter": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\ndef make_circle(values):\n    head = None\n    last = None\n    for v in values:\n        n = Node(v)\n        if head is None:\n            head = n\n        else:\n            last.next = n\n        last = n\n    if last is not None:\n        last.next = head\n    return head\n\ndef traverse_circular(head):\n    # your code here\n    return []\n",
      "solution": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\ndef make_circle(values):\n    head = None\n    last = None\n    for v in values:\n        n = Node(v)\n        if head is None:\n            head = n\n        else:\n            last.next = n\n        last = n\n    if last is not None:\n        last.next = head\n    return head\n\ndef traverse_circular(head):\n    items = []\n    if head is None:\n        return items\n    current = head\n    while True:\n        items.append(current.data)\n        current = current.next\n        if current is head:\n            break\n    return items\n",
      "tests": [
        {
          "call": "traverse_circular(make_circle([]))",
          "label": "empty list"
        },
        {
          "call": "traverse_circular(make_circle([4]))",
          "label": "one node pointing to itself"
        },
        {
          "call": "traverse_circular(make_circle([5, 10, 15]))",
          "label": "three nodes"
        },
        {
          "call": "traverse_circular(make_circle([1, 2, 3, 4, 5, 6]))",
          "label": "six nodes"
        }
      ],
      "hints": [
        "A <code>while current is not None</code> loop would never end here. Use <code>while True</code> and <code>break</code>.",
        "Process the node, move on, <b>then</b> test whether you are back at <code>head</code>: <code>if current is head: break</code>."
      ],
      "markscheme": [
        "Empty list (<code>head is None</code>) returns an empty list",
        "Starts at head and appends <code>current.data</code> for each node",
        "Moves to <code>current.next</code> each time",
        "Stops (break) when <code>current is head</code> again, so the head is not repeated and the loop is not infinite"
      ],
      "explain": "Use <code>is</code> (same node), not a comparison of data values: two different nodes can hold the same data. For a one-node list <code>head.next</code> is head itself, so the loop runs once and stops."
    }
  ]
});
