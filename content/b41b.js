// B4.1.4 Binary search trees and B4.1.5 Sets (HL). Maps / hash tables are not on the test.
B2.topics.push({
  id: "b4-1-4",
  code: "B4.1.4",
  section: "B4.1 Abstract data types",
  title: "Binary search trees",
  summary: "Build a binary search tree from a sequence, search it, traverse it in three orders, delete a node, and judge balanced versus degenerate trees.",
  minutes: 60,
  lesson: [
    { p: "A <b>binary search tree (BST)</b> keeps data <b>sorted and organised</b> so that searching is fast, like binary search, but it can still grow and shrink as you insert and delete. Each item is a <b>node</b>. Each node has at most <b>two children</b>: a left one and a right one." },
    { h: "Terminology" },
    { p: "Learn the words with a picture. This tree was built by inserting <code>10, 5, 12, 3, 8, 6, 9, 16, 15</code> (the example in your learning guide)." },
    { code: `print("            10            <- root")
print("          /    \\\\")
print("         5      12")
print("        / \\\\       \\\\")
print("       3   8       16")
print("          / \\\\     /")
print("         6   9   15      <- 3, 6, 9, 15 are leaves")` },
    { table: { head: ["Term", "Meaning in the tree above"], rows: [
      ["<b>Root</b>", "The top node, with no parent: 10"],
      ["<b>Parent / child</b>", "5 is the parent of 3 and 8. 3 and 8 are children of 5."],
      ["<b>Leaf</b>", "A node with no children: 3, 6, 9, 15"],
      ["<b>Subtree</b>", "A node plus all its descendants. The left subtree of 10 is 5, 3, 8, 6, 9."],
      ["<b>Height</b>", "The number of levels (counting nodes on the longest path from the root). Above: 10, 5, 8, 6 gives height 4."]
    ] } },
    { h: "The BST property" },
    { p: "For every node: <b>everything in its left subtree is smaller</b>, and <b>everything in its right subtree is larger</b> (left subtree &lt; node &lt; right subtree). This holds for <b>every</b> node, not just the root. Check 5: left side 3 is smaller, right side 8, 6, 9 are larger. Duplicates are usually ignored." },
    { h: "Inserting and searching" },
    { p: "Both follow the same path. Start at the root. If the new value is <b>smaller</b>, go <b>left</b>. If it is <b>larger</b>, go <b>right</b>. Searching stops when you find the value or fall off the tree (<code>None</code>). Inserting puts a new <b>leaf</b> at the empty place where you fell off." },
    { tip: "To construct a BST, insert the keys <b>in the order given</b>. The first key is the root. Changing the order changes the shape." },
    { p: "The notes write this recursively, with an empty subtree (<code>None</code>) as the base case:" },
    { code: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root

def search(root, target):
    if root is None or root.key == target:
        return root
    if target < root.key:
        return search(root.left, target)
    return search(root.right, target)

root = None
for k in [10, 5, 12, 3, 8, 6, 9, 16, 15]:
    root = insert(root, k)
print(search(root, 8) is not None)
print(search(root, 7) is not None)` },
    { p: "You can also do it with a <b>loop</b>, which is easier to trace. This is the version you will write in the exercises, inside a <code>BST</code> class that keeps the <code>root</code>:" },
    { code: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, key):
        new = Node(key)
        if self.root is None:
            self.root = new
            return
        current = self.root
        while True:
            if key < current.key:
                if current.left is None:
                    current.left = new
                    return
                current = current.left
            elif key > current.key:
                if current.right is None:
                    current.right = new
                    return
                current = current.right
            else:
                return              # duplicate: ignore

    def search(self, target):
        current = self.root
        while current is not None:
            if target == current.key:
                return True
            elif target < current.key:
                current = current.left
            else:
                current = current.right
        return False

t = BST()
for k in [10, 5, 12, 3, 8]:
    t.insert(k)
print(t.search(8), t.search(7))` },
    { h: "Traversal: visiting every node" },
    { p: "There are three standard orders. The name says <b>when the node itself is visited</b>. Left is always before right." },
    { table: { head: ["Traversal", "Order", "On the tree above", "Use"], rows: [
      ["<b>In-order</b>", "left, <b>node</b>, right", "3 5 6 8 9 10 12 15 16", "Gives <b>sorted</b> output"],
      ["<b>Pre-order</b>", "<b>node</b>, left, right", "10 5 3 8 6 9 12 16 15", "Copying a tree"],
      ["<b>Post-order</b>", "left, right, <b>node</b>", "3 6 9 8 5 15 16 12 10", "Deleting a tree (children before parents)"]
    ] } },
    { code: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root

def in_order(root):
    if root:
        in_order(root.left)
        print(root.key, end=" ")
        in_order(root.right)

def pre_order(root):
    if root:
        print(root.key, end=" ")
        pre_order(root.left)
        pre_order(root.right)

def post_order(root):
    if root:
        post_order(root.left)
        post_order(root.right)
        print(root.key, end=" ")

root = None
for k in [10, 5, 12, 3, 8, 6, 9, 16, 15]:
    root = insert(root, k)
in_order(root)
print()
pre_order(root)
print()
post_order(root)
print()` },
    { tip: "Do the traversal in words: for <b>in-order</b>, keep going left as far as possible, write that node, then go right. Do the left subtree <b>completely</b> before the node." },
    { h: "Sketching a BST (the exam skill)" },
    { p: "Insert the values <b>one at a time, in order</b>, and redraw only when the tree changes. Sequence <code>8, 3, 10, 1, 6, 14</code>:" },
    { list: [
      "<b>8</b>: empty tree, so 8 is the root.",
      "<b>3</b>: 3 &lt; 8, go left. Empty, so 3 is the left child of 8.",
      "<b>10</b>: 10 &gt; 8, go right. 10 is the right child of 8.",
      "<b>1</b>: 1 &lt; 8 left, 1 &lt; 3 left. 1 is the left child of 3.",
      "<b>6</b>: 6 &lt; 8 left, 6 &gt; 3 right. 6 is the right child of 3.",
      "<b>14</b>: 14 &gt; 8 right, 14 &gt; 10 right. 14 is the right child of 10."
    ] },
    { code: `print("        8")
print("      /   \\\\")
print("     3     10")
print("    / \\\\      \\\\")
print("   1   6      14")` },
    { tip: "In a sketch, label every node, draw the left child down-left and the right child down-right, and check that the BST property holds at every node." },
    { h: "Deleting a node: three cases" },
    { table: { head: ["Case", "What to do"], rows: [
      ["<b>Leaf</b>", "Remove it. The parent's pointer becomes <code>None</code>."],
      ["<b>One child</b>", "Replace the node with its child (the parent now points to the child)."],
      ["<b>Two children</b>", "Find the <b>in-order successor</b> (the smallest value in the right subtree: go right once, then left as far as possible). Copy its value into the node. Then delete the successor from the right subtree (it is a leaf or has one child). The <b>in-order predecessor</b> (largest in the left subtree) also works."]
    ] } },
    { p: "Example: delete <b>10</b> (the root, two children) from the tree above. Right subtree is 12, 16, 15. Go right to 12, then left: 12 has no left child, so the successor is <b>12</b>. Put 12 in the root position. Then remove the old 12 node, which has one child (16), so 16 takes its place." },
    { code: `print("   BEFORE delete 10         AFTER")
print("")
print("        10                     12")
print("      /    \\\\                 /    \\\\")
print("     5      12               5      16")
print("    / \\\\       \\\\             / \\\\     /")
print("   3   8       16           3   8   15")
print("      / \\\\     /                / \\\\")
print("     6   9   15               6   9")` },
    { p: "In code, finding the successor is a short loop:" },
    { code: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def find_min(node):
    while node.left is not None:
        node = node.left
    return node

right_subtree = Node(12)
right_subtree.right = Node(16)
right_subtree.right.left = Node(15)
print("successor of 10 is", find_min(right_subtree).key)` },
    { h: "Efficiency: balanced vs degenerate" },
    { p: "Each step down the tree throws away one side. If the tree is <b>balanced</b> (left and right about equal height), that is about half the nodes each time: <b>O(log N)</b>. The insertion <b>order</b> decides the shape. Insert already <b>sorted</b> data (1, 2, 3, 4) and every node goes to the right: the tree is a chain, a <b>degenerate</b> tree, so search is <b>O(N)</b>, no better than a linked list." },
    { code: `print("Sorted insertion 1,2,3,4        Mixed insertion 3,1,4,2")
print("")
print("  1                                 3")
print("   \\\\                               / \\\\")
print("    2                             1   4")
print("     \\\\                             \\\\")
print("      3                             2")
print("       \\\\")
print("        4")
print("height 4, search O(N)              height 3, search O(log N)")` },
    { table: { head: ["Operation", "Balanced BST", "Degenerate BST"], rows: [
      ["Search / insert / delete", "O(log N)", "O(N)"],
      ["Traversal (every node)", "O(N)", "O(N)"]
    ] } },
    { trap: "Traversing the whole tree is always O(N), because every node is visited once. The log N advantage is only for <b>search, insert and delete</b>, and only when the tree is balanced." }
  ],
  mustKnow: [
    "BST property: <b>left subtree &lt; node &lt; right subtree</b>, for every node. At most two children per node.",
    "Terms: <b>root, parent, child, leaf, subtree, height</b>.",
    "Insert and search: smaller goes <b>left</b>, larger goes <b>right</b>. A new key becomes a <b>leaf</b>. Insert keys in the order given.",
    "<b>In-order</b> (left, node, right) gives sorted output. Pre-order is node, left, right. Post-order is left, right, node.",
    "Deleting: <b>leaf</b> (remove), <b>one child</b> (replace with the child), <b>two children</b> (replace with the in-order successor, then delete the successor).",
    "<b>Balanced</b> BST: search, insert, delete O(log N). <b>Degenerate</b> (e.g. sorted input): O(N). Traversal is O(N)."
  ],
  terms: [
    { term: "Binary search tree (BST)", def: "A tree in which each node has at most two children and, for every node, all keys in the left subtree are smaller and all keys in the right subtree are larger." },
    { term: "Root", def: "The top node of a tree, which has no parent." },
    { term: "Leaf", def: "A node with no children." },
    { term: "Subtree", def: "A node together with all of its descendants." },
    { term: "In-order traversal", def: "Visit the left subtree, then the node, then the right subtree; on a BST this gives the keys in sorted order." },
    { term: "In-order successor", def: "The smallest key in a node's right subtree; it replaces a deleted node that has two children." },
    { term: "Balanced BST", def: "A BST whose left and right sides have roughly equal height, so search, insert and delete take O(log N)." },
    { term: "Degenerate BST", def: "A BST in which every node has one child, so it is effectively a linked list and operations take O(N); caused by inserting sorted data." }
  ],
  exercises: [
    {
      id: "e1", type: "mcq", marks: 1,
      q: "<b>Identify</b> the statement that is true for every node in a binary search tree.",
      options: [
        "All keys in the left subtree are smaller than the node and all keys in the right subtree are larger.",
        "Both children of the node are larger than the node.",
        "The left child is smaller than the node and the right child is larger, but deeper nodes can be anything.",
        "The node has exactly two children."
      ],
      answer: 0,
      explain: "The ordering rule applies to the whole left and right <b>subtrees</b>, not just the direct children (option 3 is the common mistake). Nodes can have 0, 1 or 2 children."
    },
    {
      id: "e2", type: "mcq", marks: 1,
      q: "The values 1, 2, 3, 4, 5, 6, 7 are inserted <b>in that order</b> into an empty BST. <b>Identify</b> the time complexity of searching this tree for the value 7.",
      options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
      answer: 2,
      explain: "Sorted insertion puts every node to the right of the previous one, giving a degenerate tree (a chain). To reach 7 you pass through all 7 nodes: O(N)."
    },
    {
      id: "e3", type: "output", marks: 3,
      q: "<b>State</b> the output of this program. The keys are inserted in the order given. It prints the in-order, pre-order and post-order lists.",
      code: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root

def in_order(r):
    return in_order(r.left) + [r.key] + in_order(r.right) if r else []

def pre_order(r):
    return [r.key] + pre_order(r.left) + pre_order(r.right) if r else []

def post_order(r):
    return post_order(r.left) + post_order(r.right) + [r.key] if r else []

root = None
for k in [50, 30, 70, 20, 40, 60, 80, 35]:
    root = insert(root, k)
print(in_order(root))
print(pre_order(root))
print(post_order(root))`,
      explain: "The tree: root 50; left child 30 (children 20 and 40; 40 has left child 35); right child 70 (children 60 and 80). In-order is sorted. Pre-order writes each node before its subtrees. Post-order writes each node after both subtrees, so the root 50 is last."
    },
    {
      strict: true,
      id: "e4", type: "trace", marks: 6,
      q: "<b>Trace</b> the insertion of the values below into an empty BST. For each value give the <b>path</b> (the nodes compared with, in order, separated by spaces), the <b>parent</b> it is attached to and the <b>side</b> (<code>left</code> or <code>right</code>). The first row (the root) is filled in.",
      code: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

root = None
for v in [40, 25, 60, 10, 30, 55, 28]:
    new = Node(v)
    if root is None:
        root = new
        print(v, "root")
    else:
        current = root
        path = []
        while True:
            path.append(current.key)
            if v < current.key:
                if current.left is None:
                    current.left = new
                    print(v, path, "parent", current.key, "left")
                    break
                current = current.left
            else:
                if current.right is None:
                    current.right = new
                    print(v, path, "parent", current.key, "right")
                    break
                current = current.right`,
      columns: ["Value", "Path", "Parent", "Side"],
      rows: [
        ["40", "", "", "root"],
        ["25", "40", "40", "left"],
        ["60", "40", "40", "right"],
        ["10", "40 25", "25", "left"],
        ["30", "40 25", "25", "right"],
        ["55", "40 60", "60", "left"],
        ["28", "40 25 30", "30", "left"]
      ],
      prefill: 1, labelCol: true,
      explain: "55: 55 &gt; 40 go right to 60, 55 &lt; 60 go left, empty, so left child of 60. 28: 28 &lt; 40 left to 25, 28 &gt; 25 right to 30, 28 &lt; 30 left, empty, so left child of 30. The final tree has height 4."
    },
    {
      id: "e5", type: "trace", marks: 4,
      q: "<b>Trace</b> a search for <code>35</code> in the BST built by inserting 50, 30, 70, 20, 40, 60, 80, 35 (in that order). For each step give the node visited, whether <code>target == current.key</code>, whether <code>target &lt; current.key</code> (leave blank if it is not evaluated) and the move (<code>left</code>, <code>right</code> or <code>found</code>). The first row is filled in.",
      code: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root

root = None
for k in [50, 30, 70, 20, 40, 60, 80, 35]:
    root = insert(root, k)

target = 35
current = root
while current is not None:
    if target == current.key:
        print("found")
        break
    elif target < current.key:
        current = current.left
    else:
        current = current.right`,
      columns: ["Step", "current.key", "target == current.key", "target < current.key", "Move"],
      rows: [
        ["1", "50", "False", "True", "left"],
        ["2", "30", "False", "False", "right"],
        ["3", "40", "False", "True", "left"],
        ["4", "35", "True", "", "found"]
      ],
      prefill: 1, labelCol: true,
      explain: "35 &lt; 50 left to 30. 35 &gt; 30 right to 40. 35 &lt; 40 left to 35. Found after 4 visits. In a balanced tree of N nodes you would need about log N visits at most."
    },
    {
      id: "e6", type: "mcq", marks: 1,
      q: "<b>Identify</b> the traversal that outputs the keys of a BST in ascending order.",
      options: ["Pre-order (node, left, right)", "In-order (left, node, right)", "Post-order (left, right, node)", "Level by level from the root"],
      answer: 1,
      explain: "In-order visits everything smaller (left subtree), then the node, then everything larger (right subtree), at every node, so the output is sorted."
    },
    {
      id: "e7", type: "code", marks: 4,
      q: "<b>Construct</b> the <code>insert</code> method of this BST class. A smaller key goes left, a larger key goes right. A key already in the tree is ignored. The method returns nothing. Use a loop (not recursion). <code>preorder</code> is provided so the shape can be checked.",
      starter: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, key):
        # your code here
        pass

    def preorder(self):
        result = []
        def visit(node):
            if node is not None:
                result.append(node.key)
                visit(node.left)
                visit(node.right)
        visit(self.root)
        return result
`,
      solution: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, key):
        new = Node(key)
        if self.root is None:
            self.root = new
            return
        current = self.root
        while True:
            if key < current.key:
                if current.left is None:
                    current.left = new
                    return
                current = current.left
            elif key > current.key:
                if current.right is None:
                    current.right = new
                    return
                current = current.right
            else:
                return

    def preorder(self):
        result = []
        def visit(node):
            if node is not None:
                result.append(node.key)
                visit(node.left)
                visit(node.right)
        visit(self.root)
        return result
`,
      tests: [
        { label: "insert into an empty tree", setup: "t = BST()\nt.insert(5)", call: "t.preorder()" },
        { label: "mixed order gives the right shape", setup: "t = BST()\nfor v in [8, 3, 10, 1, 6, 14]:\n    t.insert(v)", call: "t.preorder()" },
        { label: "duplicates are ignored", setup: "t = BST()\nfor v in [4, 2, 4, 6, 2, 6]:\n    t.insert(v)", call: "t.preorder()" },
        { label: "sorted input gives a chain", setup: "t = BST()\nfor v in [1, 2, 3, 4]:\n    t.insert(v)", call: "t.preorder()" },
        { label: "insert returns None", setup: "t = BST()", call: "t.insert(7)" }
      ],
      hints: [
        "If <code>self.root</code> is <code>None</code>, the new node becomes the root.",
        "Otherwise start with <code>current = self.root</code> and loop: if <code>key &lt; current.key</code> go left, but if <code>current.left</code> is <code>None</code> attach the new node there.",
        "Do the same on the right for <code>key &gt; current.key</code>. If neither is true the key is a duplicate: return."
      ],
      markscheme: [
        "Creates a new node and handles the empty tree (root = new node)",
        "Loop starts at the root and moves down the tree",
        "Goes left when key is smaller and right when key is larger",
        "Attaches the new node where the child is None, and ignores duplicates"
      ],
      explain: "Insertion always ends by adding a new <b>leaf</b> where the search path falls off the tree."
    },
    {
      id: "e8", type: "code", marks: 3,
      q: "<b>Construct</b> the <code>search</code> method. It returns <code>True</code> if <code>target</code> is in the tree and <code>False</code> otherwise (including an empty tree). Use a loop that follows one path down the tree.",
      starter: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, key):
        new = Node(key)
        if self.root is None:
            self.root = new
            return
        current = self.root
        while True:
            if key < current.key:
                if current.left is None:
                    current.left = new
                    return
                current = current.left
            elif key > current.key:
                if current.right is None:
                    current.right = new
                    return
                current = current.right
            else:
                return

    def search(self, target):
        # your code here
        pass
`,
      solution: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, key):
        new = Node(key)
        if self.root is None:
            self.root = new
            return
        current = self.root
        while True:
            if key < current.key:
                if current.left is None:
                    current.left = new
                    return
                current = current.left
            elif key > current.key:
                if current.right is None:
                    current.right = new
                    return
                current = current.right
            else:
                return

    def search(self, target):
        current = self.root
        while current is not None:
            if target == current.key:
                return True
            elif target < current.key:
                current = current.left
            else:
                current = current.right
        return False
`,
      tests: [
        { label: "value present (a leaf)", setup: "t = BST()\nfor v in [8, 3, 10, 1, 6]:\n    t.insert(v)", call: "t.search(6)" },
        { label: "value present (the root)", setup: "t = BST()\nfor v in [8, 3, 10, 1, 6]:\n    t.insert(v)", call: "t.search(8)" },
        { label: "value not present", setup: "t = BST()\nfor v in [8, 3, 10, 1, 6]:\n    t.insert(v)", call: "t.search(7)" },
        { label: "empty tree", setup: "t = BST()", call: "t.search(5)" },
        { label: "single node", setup: "t = BST()\nt.insert(5)", call: "t.search(5)" },
        { label: "smaller than everything", setup: "t = BST()\nfor v in [8, 3, 10]:\n    t.insert(v)", call: "t.search(0)" }
      ],
      hints: [
        "Start with <code>current = self.root</code> and loop while <code>current is not None</code>.",
        "If the target equals <code>current.key</code> return <code>True</code>. If smaller, move to <code>current.left</code>, otherwise to <code>current.right</code>.",
        "If the loop ends, you fell off the tree: return <code>False</code> after the loop."
      ],
      markscheme: [
        "Starts at the root and loops while the current node is not None",
        "Returns True when the key matches",
        "Moves left if the target is smaller and right if larger; returns False after the loop"
      ],
      explain: "Each comparison discards one whole subtree, which is why a balanced tree needs only about log N steps."
    },
    {
      id: "e9", type: "code", marks: 3,
      q: "<b>Construct</b> the <code>find_min</code> method: return the <b>smallest</b> key in the tree, or <code>None</code> if the tree is empty. Do not use <code>min(</code> or <code>sorted(</code>: walk down the tree with a loop. (This is the loop used to find the in-order successor when deleting.)",
      starter: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, key):
        new = Node(key)
        if self.root is None:
            self.root = new
            return
        current = self.root
        while True:
            if key < current.key:
                if current.left is None:
                    current.left = new
                    return
                current = current.left
            elif key > current.key:
                if current.right is None:
                    current.right = new
                    return
                current = current.right
            else:
                return

    def find_min(self):
        # your code here
        pass
`,
      solution: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, key):
        new = Node(key)
        if self.root is None:
            self.root = new
            return
        current = self.root
        while True:
            if key < current.key:
                if current.left is None:
                    current.left = new
                    return
                current = current.left
            elif key > current.key:
                if current.right is None:
                    current.right = new
                    return
                current = current.right
            else:
                return

    def find_min(self):
        if self.root is None:
            return None
        current = self.root
        while current.left is not None:
            current = current.left
        return current.key
`,
      forbid: ["sorted(", " min(", "=min(", "(min("],
      tests: [
        { label: "mixed tree", setup: "t = BST()\nfor v in [8, 3, 10, 1, 6, 14]:\n    t.insert(v)", call: "t.find_min()" },
        { label: "empty tree", setup: "t = BST()", call: "t.find_min()" },
        { label: "single node", setup: "t = BST()\nt.insert(42)", call: "t.find_min()" },
        { label: "root has no left child", setup: "t = BST()\nfor v in [1, 2, 3, 4]:\n    t.insert(v)", call: "t.find_min()" },
        { label: "minimum is deep on the left", setup: "t = BST()\nfor v in [9, 7, 5, 3, 1, 12]:\n    t.insert(v)", call: "t.find_min()" }
      ],
      hints: [
        "The smallest key is found by always going <b>left</b>.",
        "Handle the empty tree first, then loop: <code>while current.left is not None: current = current.left</code>."
      ],
      markscheme: [
        "Returns None for an empty tree",
        "Loops moving to the left child while there is one",
        "Returns the key of the last node reached (the leftmost node)"
      ],
      explain: "The minimum is the leftmost node, the maximum is the rightmost. The in-order successor of a node with two children is the minimum of its right subtree."
    },
    {
      id: "e10", type: "code", marks: 4,
      q: "<b>Construct</b> the recursive function <code>in_order(root)</code> that returns a <b>list</b> of the keys in <b>in-order</b> (left subtree, node, right subtree). An empty tree (<code>None</code>) returns an empty list. <code>insert</code> and <code>build</code> are provided.",
      starter: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root

def build(values):
    root = None
    for v in values:
        root = insert(root, v)
    return root

def in_order(root):
    # your code here
    pass
`,
      solution: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root

def build(values):
    root = None
    for v in values:
        root = insert(root, v)
    return root

def in_order(root):
    if root is None:
        return []
    return in_order(root.left) + [root.key] + in_order(root.right)
`,
      forbid: ["sorted(", ".sort("],
      tests: [
        { label: "mixed tree", call: "in_order(build([10, 5, 12, 3, 8, 6, 9, 16, 15]))" },
        { label: "empty tree", call: "in_order(None)" },
        { label: "single node", call: "in_order(build([7]))" },
        { label: "chain (sorted input)", call: "in_order(build([1, 2, 3, 4]))" },
        { label: "duplicates ignored, reverse order", call: "in_order(build([5, 4, 3, 5, 2, 1]))" }
      ],
      hints: [
        "Base case: an empty subtree (<code>None</code>) gives <code>[]</code>.",
        "Otherwise join three lists: the left subtree's list, <code>[root.key]</code>, and the right subtree's list.",
        "You do not need to sort: in-order is already sorted."
      ],
      markscheme: [
        "Base case: returns an empty list for None",
        "Recursive call on the left subtree",
        "Includes the node's own key between the two subtrees",
        "Recursive call on the right subtree and returns the joined list"
      ],
      explain: "Pre-order would put <code>[root.key]</code> first and post-order last. Only the position of the node changes."
    },
    {
      id: "e11", type: "written", marks: 3,
      q: "<b>Explain</b> how a node with <b>two children</b> is deleted from a binary search tree, using the in-order successor.",
      markscheme: [
        "Find the in-order successor: the smallest value in the node's right subtree (go right once, then left as far as possible) (1)",
        "Copy the successor's value into the node being deleted (1)",
        "Delete the successor node from the right subtree; it has at most one child, so it is a leaf (remove) or has one child (replace with its child) (1)",
        "The BST ordering rule (left &lt; node &lt; right) is still true, because the successor is larger than everything on the left and smaller than everything else on the right (1)",
        "Alternative accepted: use the in-order predecessor (largest in the left subtree) in the same way (1)"
      ],
      model: "Find the <b>in-order successor</b>: go to the right child, then keep going left until there is no left child. This is the smallest value larger than the node. <b>Copy</b> that value into the node being deleted. Then <b>delete the original successor</b> node: it has no left child, so it is a leaf (remove it) or has only a right child (replace it by that child). The ordering rule still holds because the successor is bigger than everything in the left subtree and smaller than everything else in the right subtree. (The in-order predecessor, the largest value in the left subtree, works the same way.)"
    },
    {
      id: "e12", type: "written", marks: 4,
      q: "The values <code>5, 10, 15, 20, 25</code> are inserted, in that order, into an empty BST. <b>Describe</b> the shape of the tree and <b>explain</b> the effect on the time taken to search it.",
      markscheme: [
        "Each new value is larger than all values already in the tree, so it is always inserted as the right child (1)",
        "The tree is a chain / degenerate / unbalanced: every node has one child, height 5 (1)",
        "Searching must visit up to every node, so the time complexity is O(N) (1)",
        "A balanced tree would be O(log N) because each comparison halves the remaining nodes; inserting in a different order (e.g. 15, 10, 20, 5, 25) gives a balanced tree (1)"
      ],
      model: "<p>Each value is larger than every value already in the tree, so it always goes to the <b>right</b>. The tree is a <b>degenerate</b> (unbalanced) tree, a chain of height 5:</p><pre>5\n \\\n  10\n    \\\n     15\n       \\\n        20\n          \\\n           25</pre><p>Searching for 25 compares with all 5 nodes, so search takes <b>O(N)</b>, no better than a linked list. A balanced tree takes O(log N), because each comparison discards about half the nodes. Inserting the same values in the order 15, 10, 20, 5, 25 would give a balanced tree of height 3.</p>"
    }
  ]
},
{
  id: "b4-1-5",
  code: "B4.1.5",
  section: "B4.1 Abstract data types",
  title: "Sets",
  summary: "Construct and use sets in Python: unique unordered items, union, intersection, difference, membership, subset and superset, and apply them to problems.",
  minutes: 40,
  lesson: [
    { p: "A <b>set</b> is an ADT: an <b>unordered</b> collection of <b>unique</b> elements. Think of a guest list: it only matters who is on it, not the order, and nobody is listed twice. A set is <b>mutable</b>: you can add and remove elements. It is usually implemented as a <b>hash table</b>, which is why checking membership is fast." },
    { h: "Creating sets" },
    { code: `ids = {101, 102, 105, 108}           # curly braces with items
nums = set([1, 2, 3, 3, 4, 2])        # set() from a list: duplicates vanish
empty = set()                         # an EMPTY set must be set()

print(sorted(nums))
print(len(nums))
print(type(empty), type({}))` },
    { trap: "<code>{}</code> is an empty <b>dictionary</b>, not an empty set. Use <code>set()</code>. Also sets have <b>no order and no index</b>: <code>my_set[0]</code> is an error, and <code>print(my_set)</code> may show the items in any order, so use <code>sorted(my_set)</code> when you need a predictable display." },
    { h: "Add, remove, membership" },
    { code: `visited = set()
visited.add("Tokyo")
visited.add("Nairobi")
visited.add("Tokyo")                  # duplicate: ignored
print(len(visited))                   # 2
print("Nairobi" in visited)           # membership test: True

visited.remove("Tokyo")               # KeyError if absent
visited.discard("Paris")              # no error if absent
print(sorted(visited))

try:
    visited.remove("Paris")
except KeyError:
    print("remove raised a KeyError")` },
    { table: { head: ["Method", "If the element is in the set", "If it is NOT in the set"], rows: [
      ["<code>add(x)</code>", "No change", "x is added"],
      ["<code>remove(x)</code>", "x is removed", "<b>KeyError</b>"],
      ["<code>discard(x)</code>", "x is removed", "Nothing happens (safe)"]
    ] } },
    { h: "Set maths" },
    { p: "Take <code>A = {1, 2, 3, 4}</code> and <code>B = {3, 4, 5, 6}</code>." },
    { table: { head: ["Operation", "Meaning", "Python", "Result"], rows: [
      ["<b>Union</b>", "In A <b>or</b> B", "<code>A | B</code>", "{1, 2, 3, 4, 5, 6}"],
      ["<b>Intersection</b>", "In A <b>and</b> B", "<code>A &amp; B</code>", "{3, 4}"],
      ["<b>Difference</b>", "In A but <b>not</b> B", "<code>A - B</code>", "{1, 2}"],
      ["<b>Subset</b>", "All of one set is inside the other", "<code>{3, 4} &lt;= A</code>", "True"],
      ["<b>Superset</b>", "Contains all of the other", "<code>A &gt;= {3, 4}</code>", "True"]
    ] } },
    { code: `A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(sorted(A | B))          # union
print(sorted(A & B))          # intersection
print(sorted(A - B))          # difference
print(sorted(B - A))          # difference is NOT symmetric
print({3, 4} <= A)            # subset
print(A >= {3, 4})            # superset
print({3, 4}.issubset(A), A.issuperset({3, 4}))` },
    { tip: "Difference depends on the order: <code>A - B</code> and <code>B - A</code> are different. The methods <code>union()</code>, <code>intersection()</code>, <code>difference()</code> do the same as the operators." },
    { h: "Using sets to solve problems" },
    { list: [
      "<b>Remove duplicates:</b> <code>set(my_list)</code>, then <code>sorted(...)</code> if you need a list back.",
      "<b>Common items:</b> <code>A &amp; B</code> (students who take both subjects).",
      "<b>In one but not the other:</b> <code>A - B</code> (in club A but not club B).",
      "<b>Permissions check:</b> <code>required &lt;= granted</code> is True when the user has every permission needed. <code>required - granted</code> shows what is missing."
    ] },
    { code: `chess = {"Ana", "Ben", "Chi", "Dev"}
drama = {"Chi", "Dev", "Eli"}

print("both:", sorted(chess & drama))
print("chess only:", sorted(chess - drama))
print("either:", sorted(chess | drama))

required = {"read", "write"}
granted = {"read", "write", "delete"}
print("allowed:", required <= granted)
print("missing:", sorted(required - {"read"}))` },
    { h: "Why use a set? Efficiency" },
    { p: "Looking for an item in a <b>list</b> means checking items one by one: <b>O(N)</b>. A set uses a <b>hash table</b>: the item's hash gives the position directly, so membership is <b>O(1) on average</b> (O(N) in the worst case when many items collide). Duplicates are removed automatically." },
    { table: { head: ["Advantages", "Disadvantages"], rows: [
      ["Fast membership test (hashing)", "Unordered: no indexing or sorting"],
      ["Duplicates removed automatically", "Elements must be hashable (immutable)"],
      ["Direct set maths: union, intersection", "Extra memory for the hash table"]
    ] } }
  ],
  mustKnow: [
    "A set is an <b>unordered</b> collection of <b>unique</b> elements, and is <b>mutable</b>. No index, no duplicates.",
    "Empty set is <code>set()</code>, not <code>{}</code> (that is an empty dict).",
    "<code>add(x)</code> adds. <code>remove(x)</code> raises KeyError if x is absent; <code>discard(x)</code> does not.",
    "Union <code>A | B</code>, intersection <code>A &amp; B</code>, difference <code>A - B</code> (order matters), subset <code>&lt;=</code>, superset <code>&gt;=</code>.",
    "Membership (<code>x in s</code>) is <b>O(1) on average</b>, against O(N) for a list. Use <code>sorted(s)</code> for predictable output.",
    "Applications: remove duplicates, find common items, find what is missing, check permissions."
  ],
  terms: [
    { term: "Set", def: "An unordered, mutable collection of unique elements, usually implemented as a hash table." },
    { term: "Union", def: "The set of elements that are in either set or in both (A | B)." },
    { term: "Intersection", def: "The set of elements that are in both sets (A & B)." },
    { term: "Difference", def: "The set of elements that are in the first set but not in the second (A - B)." },
    { term: "Subset", def: "A set whose elements are all contained in another set (A <= B)." },
    { term: "Superset", def: "A set that contains every element of another set (A >= B)." },
    { term: "discard", def: "The set method that removes an element if it is present and does nothing if it is absent, unlike remove, which raises a KeyError." }
  ],
  exercises: [
    {
      id: "e1", type: "mcq", marks: 1,
      q: "<b>Identify</b> the correct statement about a set in Python.",
      options: [
        "It stores elements in the order they were added and allows duplicates.",
        "It is unordered and every element is unique.",
        "Elements are accessed with an index such as <code>s[0]</code>.",
        "It is immutable, so elements cannot be added once it is created."
      ],
      answer: 1,
      explain: "A set is unordered with unique elements. It has no index (<code>s[0]</code> is a TypeError) and it is mutable: <code>add</code> and <code>remove</code> work."
    },
    {
      id: "e2", type: "mcq", marks: 1,
      q: "<b>Identify</b> the statement that creates an <b>empty set</b>.",
      options: ["<code>s = {}</code>", "<code>s = []</code>", "<code>s = set()</code>", "<code>s = set({})</code> is the only way"],
      answer: 2,
      explain: "<code>{}</code> creates an empty <b>dictionary</b>. <code>set()</code> creates an empty set. (<code>set({})</code> also happens to give an empty set, but it is not the only way.)"
    },
    {
      id: "e3", type: "output", marks: 4,
      q: "<b>State</b> the output of this program.",
      code: `A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(sorted(A | B))
print(sorted(A & B))
print(sorted(A - B))
print(sorted(B - A))`,
      explain: "Union: everything in either set. Intersection: only 3 and 4. A - B: in A but not B, so 1 and 2. B - A: in B but not A, so 5 and 6. Difference depends on the order."
    },
    {
      id: "e4", type: "output", marks: 3,
      q: "<b>State</b> the output of this program.",
      code: `visited = set()
visited.add("Tokyo")
visited.add("Nairobi")
visited.add("Tokyo")
print(len(visited))
print("Nairobi" in visited)
data = [4, 7, 4, 4, 9, 7]
print(len(set(data)))`,
      explain: "Adding Tokyo twice keeps one copy, so there are 2 items. Nairobi is in the set. The list has 3 different values (4, 7, 9), so its set has length 3."
    },
    {
      id: "e5", type: "output", marks: 3,
      q: "<b>State</b> the output of this program.",
      code: `s = {10, 20, 30}
s.discard(99)
print(len(s))
try:
    s.remove(99)
    print("removed")
except KeyError:
    print("KeyError")
s.remove(20)
print(sorted(s))
print({10, 30} <= s, s >= {10, 30, 40})`,
      explain: "<code>discard(99)</code> does nothing, so the length stays 3. <code>remove(99)</code> raises a KeyError, so the except branch runs. Removing 20 leaves 10 and 30. {10, 30} is a subset of s (True), but s is not a superset of {10, 30, 40} because 40 is missing (False)."
    },
    {
      id: "e6", type: "code", marks: 2,
      q: "<b>Construct</b> a function <code>unique_sorted(items)</code> that takes a list possibly containing duplicates and returns a new list of the <b>distinct</b> values in ascending order. Use a set.",
      starter: `def unique_sorted(items):
    # your code here
    pass
`,
      solution: `def unique_sorted(items):
    s = set(items)
    return sorted(s)
`,
      tests: [
        { label: "duplicates", call: "unique_sorted([4, 7, 4, 4, 9, 7])" },
        { label: "empty list", call: "unique_sorted([])" },
        { label: "already unique", call: "unique_sorted([3, 1, 2])" },
        { label: "all the same", call: "unique_sorted([5, 5, 5])" },
        { label: "strings", call: "unique_sorted(['b', 'a', 'b'])" }
      ],
      hints: ["<code>set(items)</code> removes duplicates, but a set has no order.", "<code>sorted(...)</code> returns a list."],
      markscheme: ["Converts the list to a set to remove duplicates", "Returns a sorted list (not a set)"],
      explain: "The set removes duplicates, <code>sorted</code> restores a list in ascending order."
    },
    {
      id: "e7", type: "code", marks: 2,
      q: "<b>Construct</b> a function <code>common(a, b)</code> that takes two lists and returns a <b>sorted list</b> of the values that appear in <b>both</b>, with no repeats.",
      starter: `def common(a, b):
    # your code here
    pass
`,
      solution: `def common(a, b):
    both = set(a) & set(b)
    return sorted(both)
`,
      tests: [
        { label: "some in common", call: "common([1, 2, 3, 4], [3, 4, 5, 6])" },
        { label: "duplicates in the input", call: "common([1, 1, 2, 2, 3], [2, 2, 3, 3])" },
        { label: "nothing in common", call: "common([1, 2], [3, 4])" },
        { label: "one list empty", call: "common([], [1, 2])" },
        { label: "identical lists", call: "common([2, 1], [1, 2])" }
      ],
      hints: ["Turn both lists into sets, then use the intersection operator.", "Return <code>sorted(...)</code> of the result."],
      markscheme: ["Converts both lists to sets and finds the intersection", "Returns the result as a sorted list"],
      explain: "Intersection (<code>&amp;</code>) keeps only elements in both sets."
    },
    {
      id: "e8", type: "code", marks: 2,
      q: "<b>Construct</b> a function <code>only_in_a(club_a, club_b)</code>. Each argument is a list of student names. Return a sorted list of students who are in club A <b>but not</b> in club B.",
      starter: `def only_in_a(club_a, club_b):
    # your code here
    pass
`,
      solution: `def only_in_a(club_a, club_b):
    result = set(club_a) - set(club_b)
    return sorted(result)
`,
      tests: [
        { label: "overlap", call: "only_in_a(['Ana', 'Ben', 'Chi'], ['Chi', 'Dev'])" },
        { label: "order matters", call: "only_in_a(['Chi', 'Dev'], ['Ana', 'Ben', 'Chi'])" },
        { label: "club B empty", call: "only_in_a(['Zed', 'Amy'], [])" },
        { label: "club A empty", call: "only_in_a([], ['Amy'])" },
        { label: "same members", call: "only_in_a(['Amy', 'Bo'], ['Bo', 'Amy'])" }
      ],
      hints: ["Difference: <code>A - B</code> keeps what is in A and not in B.", "Convert both lists to sets first, and sort the final answer."],
      markscheme: ["Converts the lists to sets and uses difference in the correct order", "Returns a sorted list"],
      explain: "Difference is not symmetric: <code>A - B</code> is not <code>B - A</code>."
    },
    {
      id: "e9", type: "code", marks: 3,
      q: "<b>Construct</b> a function <code>is_subset(small, big)</code> that returns <code>True</code> if <b>every</b> element of the set <code>small</code> is in the set <code>big</code>, and <code>False</code> otherwise. Use a loop and the <code>in</code> operator. Do not use <code>issubset</code> or <code>&lt;=</code>. The empty set is a subset of every set.",
      starter: `def is_subset(small, big):
    # your code here
    pass
`,
      solution: `def is_subset(small, big):
    for x in small:
        if x not in big:
            return False
    return True
`,
      forbid: ["issubset", "<=", ">=", "issuperset"],
      tests: [
        { label: "is a subset", call: "is_subset({3, 4}, {1, 2, 3, 4})" },
        { label: "one element missing", call: "is_subset({3, 9}, {1, 2, 3, 4})" },
        { label: "empty set is a subset", call: "is_subset(set(), {1, 2})" },
        { label: "equal sets", call: "is_subset({1, 2}, {1, 2})" },
        { label: "bigger than the other", call: "is_subset({1, 2, 3}, {1, 2})" },
        { label: "both empty", call: "is_subset(set(), set())" }
      ],
      hints: ["Check each element of <code>small</code>. As soon as one is not in <code>big</code>, the answer is False.", "Return <code>True</code> only <b>after</b> the loop, not inside it."],
      markscheme: ["Loops through every element of small", "Returns False when an element is not in big", "Returns True after the loop (also for the empty set)"],
      explain: "This is the same idea as a flag: start by assuming True and look for a counter-example. Returning True inside the loop would be wrong."
    },
    {
      id: "e10", type: "code", marks: 3,
      q: "<b>Construct</b> a function <code>missing_permissions(required, granted)</code> for an access system. Both arguments are lists of permission names. Return a <b>sorted list</b> of the required permissions the user has <b>not</b> been granted. An empty list means access is allowed.",
      context: "A file system lets a user open a file only if they hold every permission the file requires, such as <code>read</code> or <code>write</code>.",
      starter: `def missing_permissions(required, granted):
    # your code here
    pass
`,
      solution: `def missing_permissions(required, granted):
    needed = set(required)
    have = set(granted)
    return sorted(needed - have)
`,
      tests: [
        { label: "some missing", call: "missing_permissions(['read', 'write', 'delete'], ['read'])" },
        { label: "all granted", call: "missing_permissions(['read', 'write'], ['write', 'read', 'admin'])" },
        { label: "nothing granted", call: "missing_permissions(['write', 'read'], [])" },
        { label: "nothing required", call: "missing_permissions([], ['read'])" },
        { label: "duplicates in the required list", call: "missing_permissions(['read', 'read', 'write'], ['write'])" }
      ],
      hints: ["The missing ones are in <code>required</code> but not in <code>granted</code>: difference.", "Duplicates in the input should not repeat in the answer: a set handles that."],
      markscheme: ["Converts both lists to sets", "Uses difference required - granted (correct order)", "Returns a sorted list"],
      explain: "If <code>required &lt;= granted</code> is True then <code>required - granted</code> is empty."
    },
    {
      id: "e11", type: "written", marks: 3,
      q: "A program must check, thousands of times, whether a username is already taken among 100 000 stored usernames. <b>Explain</b> why storing the usernames in a set is more efficient than storing them in a list.",
      markscheme: [
        "Checking a list means searching item by item, so it takes O(N) time (up to 100 000 comparisons) (1)",
        "A set is implemented as a hash table: the hash of the username gives its position directly (1)",
        "So a membership check is O(1) on average, however many usernames are stored (1)",
        "A set also stops duplicate usernames being stored automatically (1)",
        "Worst case O(N) if many items collide, but this is rare (1)"
      ],
      model: "In a <b>list</b>, <code>name in users</code> compares the name with the items one by one, so it takes <b>O(N)</b> time: up to 100 000 comparisons each time. A <b>set</b> is implemented as a <b>hash table</b>. The hash of the name gives the position where it would be stored, so the program goes straight to it. A membership check is therefore <b>O(1) on average</b>, however many names are stored. A set also automatically rejects duplicate usernames. (The worst case is O(N) if many names collide, but this is rare.)"
    }
  ]
});
