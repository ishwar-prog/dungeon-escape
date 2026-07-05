// 20 DSA levels, each with prompts, starter code, hints, and solutions
// in Python, Java, and C++. The DSA problem is identical across languages —
// only the syntax changes.


const LEVELS = [
  {
    id: 1,
    concept: "Arrays",
    title: "The Locked Vault",
    xp: 100,
    prompt:
      "A vault opens only for the heaviest coin in the pile. Write a function that returns the maximum value in an array of integers.",
    signature: "int findMax(vector<int>& nums)",
    starter: {
      python: "def find_max(nums):\n    # your code here\n    pass",
      java: "class Solution {\n    public int findMax(int[] nums) {\n        // your code here\n        return 0;\n    }\n}",
      cpp: "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findMax(vector<int>& nums) {\n        // your code here\n        return 0;\n    }\n};",
    },
    tests: [
      { input: "[3,1,9,4]", expected: "9" },
      { input: "[-5,-1,-9]", expected: "-1" },
      { input: "[7]", expected: "7" },
    ],
    hints: [
      "Think about walking through the array once, keeping track of the biggest value seen so far.",
      "Start by assuming the first element is the max, then compare it against every other element.",
      "You only need a single loop and a single variable to track the current maximum.",
    ],
    solution: {
      python:
        "def find_max(nums):\n    best = nums[0]\n    for n in nums:\n        if n > best:\n            best = n\n    return best",
      java:
        "class Solution {\n    public int findMax(int[] nums) {\n        int best = nums[0];\n        for (int n : nums) {\n            if (n > best) best = n;\n        }\n        return best;\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    int findMax(vector<int>& nums) {\n        int best = nums[0];\n        for (int n : nums) {\n            if (n > best) best = n;\n        }\n        return best;\n    }\n};",
    },
    explanation:
      "A single linear scan keeps a running 'best so far' variable, updating it whenever a bigger value appears.",
    complexity: "O(n) time, O(1) space",
  },
  {
    id: 2,
    concept: "Arrays",
    title: "The Mirror Chamber",
    xp: 100,
    prompt:
      "A cursed mirror only breaks when a treasure list is reversed in place, without using any extra array. Reverse the given array in place.",
    signature: "void reverseArray(vector<int>& nums)",
    starter: {
      python: "def reverse_array(nums):\n    # modify nums in place, return it\n    pass",
      java: "class Solution {\n    public void reverseArray(int[] nums) {\n        // modify nums in place\n    }\n}",
      cpp: "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseArray(vector<int>& nums) {\n        // modify nums in place\n    }\n};",
    },
    tests: [
      { input: "[1,2,3,4]", expected: "[4,3,2,1]" },
      { input: "[5]", expected: "[5]" },
      { input: "[1,2]", expected: "[2,1]" },
    ],
    hints: [
      "Two pointers, one starting at each end, moving toward the middle, can swap elements as they go.",
      "Swap the element at the left pointer with the element at the right pointer, then move both pointers inward.",
      "Stop when the two pointers meet or cross each other.",
    ],
    solution: {
      python:
        "def reverse_array(nums):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        nums[left], nums[right] = nums[right], nums[left]\n        left += 1\n        right -= 1\n    return nums",
      java:
        "class Solution {\n    public void reverseArray(int[] nums) {\n        int left = 0, right = nums.length - 1;\n        while (left < right) {\n            int tmp = nums[left];\n            nums[left] = nums[right];\n            nums[right] = tmp;\n            left++;\n            right--;\n        }\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    void reverseArray(vector<int>& nums) {\n        int left = 0, right = nums.size() - 1;\n        while (left < right) {\n            swap(nums[left], nums[right]);\n            left++;\n            right--;\n        }\n    }\n};",
    },
    explanation:
      "The two-pointer technique swaps outer elements inward, reversing the array in O(1) extra space.",
    complexity: "O(n) time, O(1) space",
  },
  {
    id: 3,
    concept: "Searching",
    title: "The Torchlit Hallway",
    xp: 120,
    prompt:
      "Guards patrol a hallway of numbered doors. Find the index of a target value by checking each door one at a time. Return -1 if the target isn't found.",
    signature: "int linearSearch(vector<int>& nums, int target)",
    starter: {
      python: "def linear_search(nums, target):\n    # your code here\n    pass",
      java: "class Solution {\n    public int linearSearch(int[] nums, int target) {\n        // your code here\n        return -1;\n    }\n}",
      cpp: "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int linearSearch(vector<int>& nums, int target) {\n        // your code here\n        return -1;\n    }\n};",
    },
    tests: [
      { input: "[4,2,7,1], target=7", expected: "2" },
      { input: "[4,2,7,1], target=9", expected: "-1" },
      { input: "[1], target=1", expected: "0" },
    ],
    hints: [
      "Check every element one by one from the start of the array.",
      "As soon as an element equals the target, that index is your answer.",
      "If you finish the loop without a match, the answer is -1.",
    ],
    solution: {
      python:
        "def linear_search(nums, target):\n    for i, n in enumerate(nums):\n        if n == target:\n            return i\n    return -1",
      java:
        "class Solution {\n    public int linearSearch(int[] nums, int target) {\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] == target) return i;\n        }\n        return -1;\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    int linearSearch(vector<int>& nums, int target) {\n        for (int i = 0; i < (int)nums.size(); i++) {\n            if (nums[i] == target) return i;\n        }\n        return -1;\n    }\n};",
    },
    explanation:
      "Linear search checks each element in order until it finds a match or exhausts the array.",
    complexity: "O(n) time, O(1) space",
  },
  {
    id: 4,
    concept: "Searching",
    title: "The Split Stair",
    xp: 140,
    prompt:
      "A staircase of sorted gems splits in half at every step. Implement binary search on a sorted array to find the target's index, or -1 if absent.",
    signature: "int binarySearch(vector<int>& nums, int target)",
    starter: {
      python: "def binary_search(nums, target):\n    # your code here\n    pass",
      java: "class Solution {\n    public int binarySearch(int[] nums, int target) {\n        // your code here\n        return -1;\n    }\n}",
      cpp: "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int binarySearch(vector<int>& nums, int target) {\n        // your code here\n        return -1;\n    }\n};",
    },
    tests: [
      { input: "[1,3,5,7,9], target=7", expected: "3" },
      { input: "[1,3,5,7,9], target=2", expected: "-1" },
      { input: "[2], target=2", expected: "0" },
    ],
    hints: [
      "Keep a low and high boundary, and repeatedly look at the middle element.",
      "If the middle is too small, discard the left half; if too big, discard the right half.",
      "Update low or high accordingly and stop when low crosses high.",
    ],
    solution: {
      python:
        "def binary_search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1",
      java:
        "class Solution {\n    public int binarySearch(int[] nums, int target) {\n        int lo = 0, hi = nums.length - 1;\n        while (lo <= hi) {\n            int mid = lo + (hi - lo) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) lo = mid + 1;\n            else hi = mid - 1;\n        }\n        return -1;\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    int binarySearch(vector<int>& nums, int target) {\n        int lo = 0, hi = (int)nums.size() - 1;\n        while (lo <= hi) {\n            int mid = lo + (hi - lo) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) lo = mid + 1;\n            else hi = mid - 1;\n        }\n        return -1;\n    }\n};",
    },
    explanation:
      "By halving the search space each step, binary search finds a target far faster than checking every element.",
    complexity: "O(log n) time, O(1) space",
  },
  {
    id: 5,
    concept: "Sorting",
    title: "The Bubbling Cauldron",
    xp: 150,
    prompt:
      "A cauldron of potions must be arranged from weakest to strongest. Sort the array in ascending order using bubble sort.",
    signature: "void bubbleSort(vector<int>& nums)",
    starter: {
      python: "def bubble_sort(nums):\n    # sort nums in place, return it\n    pass",
      java: "class Solution {\n    public void bubbleSort(int[] nums) {\n        // sort in place\n    }\n}",
      cpp: "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void bubbleSort(vector<int>& nums) {\n        // sort in place\n    }\n};",
    },
    tests: [
      { input: "[5,2,4,1]", expected: "[1,2,4,5]" },
      { input: "[1]", expected: "[1]" },
      { input: "[3,3,1]", expected: "[1,3,3]" },
    ],
    hints: [
      "Repeatedly sweep through the array, comparing each pair of neighbors.",
      "Swap neighbors whenever the left one is bigger than the right one.",
      "Each full pass pushes the largest remaining value to the end, like a bubble rising.",
    ],
    solution: {
      python:
        "def bubble_sort(nums):\n    n = len(nums)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if nums[j] > nums[j + 1]:\n                nums[j], nums[j + 1] = nums[j + 1], nums[j]\n    return nums",
      java:
        "class Solution {\n    public void bubbleSort(int[] nums) {\n        int n = nums.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n - i - 1; j++) {\n                if (nums[j] > nums[j + 1]) {\n                    int tmp = nums[j];\n                    nums[j] = nums[j + 1];\n                    nums[j + 1] = tmp;\n                }\n            }\n        }\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    void bubbleSort(vector<int>& nums) {\n        int n = nums.size();\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n - i - 1; j++) {\n                if (nums[j] > nums[j + 1]) swap(nums[j], nums[j + 1]);\n            }\n        }\n    }\n};",
    },
    explanation:
      "Bubble sort repeatedly swaps adjacent out-of-order elements, bubbling the largest values to the end each pass.",
    complexity: "O(n²) time, O(1) space",
  },
  {
    id: 6,
    concept: "Sorting",
    title: "The Selection Shrine",
    xp: 150,
    prompt:
      "A shrine keeper picks the smallest relic from the remaining pile each round and places it in order. Sort the array using selection sort.",
    signature: "void selectionSort(vector<int>& nums)",
    starter: {
      python: "def selection_sort(nums):\n    # sort nums in place, return it\n    pass",
      java: "class Solution {\n    public void selectionSort(int[] nums) {\n        // sort in place\n    }\n}",
      cpp: "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void selectionSort(vector<int>& nums) {\n        // sort in place\n    }\n};",
    },
    tests: [
      { input: "[64,25,12,22,11]", expected: "[11,12,22,25,64]" },
      { input: "[1]", expected: "[1]" },
      { input: "[2,1]", expected: "[1,2]" },
    ],
    hints: [
      "For each position, find the smallest value in the unsorted remainder of the array.",
      "Swap that smallest value into the current position.",
      "Move to the next position and repeat until the whole array is sorted.",
    ],
    solution: {
      python:
        "def selection_sort(nums):\n    n = len(nums)\n    for i in range(n):\n        min_idx = i\n        for j in range(i + 1, n):\n            if nums[j] < nums[min_idx]:\n                min_idx = j\n        nums[i], nums[min_idx] = nums[min_idx], nums[i]\n    return nums",
      java:
        "class Solution {\n    public void selectionSort(int[] nums) {\n        int n = nums.length;\n        for (int i = 0; i < n; i++) {\n            int minIdx = i;\n            for (int j = i + 1; j < n; j++) {\n                if (nums[j] < nums[minIdx]) minIdx = j;\n            }\n            int tmp = nums[i];\n            nums[i] = nums[minIdx];\n            nums[minIdx] = tmp;\n        }\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    void selectionSort(vector<int>& nums) {\n        int n = nums.size();\n        for (int i = 0; i < n; i++) {\n            int minIdx = i;\n            for (int j = i + 1; j < n; j++) {\n                if (nums[j] < nums[minIdx]) minIdx = j;\n            }\n            swap(nums[i], nums[minIdx]);\n        }\n    }\n};",
    },
    explanation:
      "Selection sort repeatedly selects the minimum of the unsorted portion and swaps it into place.",
    complexity: "O(n²) time, O(1) space",
  },
  {
    id: 7,
    concept: "Strings",
    title: "The Riddle Runes",
    xp: 130,
    prompt:
      "Ancient runes only glow if the inscription reads the same forwards and backwards. Check whether a given string is a palindrome (ignore case).",
    signature: "bool isPalindrome(string s)",
    starter: {
      python: "def is_palindrome(s):\n    # your code here\n    pass",
      java: "class Solution {\n    public boolean isPalindrome(String s) {\n        // your code here\n        return false;\n    }\n}",
      cpp: "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        // your code here\n        return false;\n    }\n};",
    },
    tests: [
      { input: '"racecar"', expected: "true" },
      { input: '"Level"', expected: "true" },
      { input: '"dungeon"', expected: "false" },
    ],
    hints: [
      "Compare characters from both ends of the string, moving inward.",
      "Normalize the case first (e.g. lowercase everything) so 'Level' still matches.",
      "If any pair of mirrored characters differs, it's not a palindrome.",
    ],
    solution: {
      python:
        "def is_palindrome(s):\n    s = s.lower()\n    left, right = 0, len(s) - 1\n    while left < right:\n        if s[left] != s[right]:\n            return False\n        left += 1\n        right -= 1\n    return True",
      java:
        "class Solution {\n    public boolean isPalindrome(String s) {\n        s = s.toLowerCase();\n        int left = 0, right = s.length() - 1;\n        while (left < right) {\n            if (s.charAt(left) != s.charAt(right)) return false;\n            left++;\n            right--;\n        }\n        return true;\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    bool isPalindrome(string s) {\n        for (auto& c : s) c = tolower(c);\n        int left = 0, right = (int)s.size() - 1;\n        while (left < right) {\n            if (s[left] != s[right]) return false;\n            left++;\n            right--;\n        }\n        return true;\n    }\n};",
    },
    explanation:
      "Two pointers compare characters symmetrically from both ends toward the center.",
    complexity: "O(n) time, O(1) extra space",
  },
  {
    id: 8,
    concept: "Strings",
    title: "The Anagram Altar",
    xp: 130,
    prompt:
      "An altar accepts two words only if they're built from exactly the same letters. Determine whether two strings are anagrams of each other.",
    signature: "bool isAnagram(string s, string t)",
    starter: {
      python: "def is_anagram(s, t):\n    # your code here\n    pass",
      java: "class Solution {\n    public boolean isAnagram(String s, String t) {\n        // your code here\n        return false;\n    }\n}",
      cpp: "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        // your code here\n        return false;\n    }\n};",
    },
    tests: [
      { input: '"listen", "silent"', expected: "true" },
      { input: '"rat", "car"', expected: "false" },
      { input: '"a", "a"', expected: "true" },
    ],
    hints: [
      "If the two strings have different lengths, they can't be anagrams.",
      "Count how many times each letter appears in both strings.",
      "The strings are anagrams only if every letter count matches exactly.",
    ],
    solution: {
      python:
        "def is_anagram(s, t):\n    if len(s) != len(t):\n        return False\n    counts = {}\n    for ch in s:\n        counts[ch] = counts.get(ch, 0) + 1\n    for ch in t:\n        if ch not in counts:\n            return False\n        counts[ch] -= 1\n        if counts[ch] < 0:\n            return False\n    return True",
      java:
        "class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] counts = new int[26];\n        for (char c : s.toCharArray()) counts[c - 'a']++;\n        for (char c : t.toCharArray()) counts[c - 'a']--;\n        for (int c : counts) if (c != 0) return false;\n        return true;\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        if (s.size() != t.size()) return false;\n        int counts[26] = {0};\n        for (char c : s) counts[c - 'a']++;\n        for (char c : t) counts[c - 'a']--;\n        for (int c : counts) if (c != 0) return false;\n        return true;\n    }\n};",
    },
    explanation:
      "A frequency count of characters in both strings must match exactly for them to be anagrams.",
    complexity: "O(n) time, O(1) space (fixed alphabet)",
  },
  {
    id: 9,
    concept: "Stacks",
    title: "The Bracket Bridge",
    xp: 160,
    prompt:
      "A rickety bridge only holds if its support brackets are properly nested. Determine whether a string of brackets '()[]{}' is valid.",
    signature: "bool isValid(string s)",
    starter: {
      python: "def is_valid(s):\n    # your code here\n    pass",
      java: "class Solution {\n    public boolean isValid(String s) {\n        // your code here\n        return false;\n    }\n}",
      cpp: "#include <string>\n#include <stack>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // your code here\n        return false;\n    }\n};",
    },
    tests: [
      { input: '"()[]{}"', expected: "true" },
      { input: '"(]"', expected: "false" },
      { input: '"{[()]}"', expected: "true" },
    ],
    hints: [
      "A stack is perfect here: push opening brackets, and check closing ones against the top.",
      "When you see a closing bracket, it must match the most recently opened one.",
      "At the end, the stack must be completely empty for the string to be valid.",
    ],
    solution: {
      python:
        "def is_valid(s):\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for ch in s:\n        if ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n        else:\n            stack.append(ch)\n    return len(stack) == 0",
      java:
        "class Solution {\n    public boolean isValid(String s) {\n        java.util.Deque<Character> stack = new java.util.ArrayDeque<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '[' || c == '{') stack.push(c);\n            else {\n                if (stack.isEmpty()) return false;\n                char top = stack.pop();\n                if (c == ')' && top != '(') return false;\n                if (c == ']' && top != '[') return false;\n                if (c == '}' && top != '{') return false;\n            }\n        }\n        return stack.isEmpty();\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '[' || c == '{') st.push(c);\n            else {\n                if (st.empty()) return false;\n                char top = st.top(); st.pop();\n                if (c == ')' && top != '(') return false;\n                if (c == ']' && top != '[') return false;\n                if (c == '}' && top != '{') return false;\n            }\n        }\n        return st.empty();\n    }\n};",
    },
    explanation:
      "A stack tracks open brackets; each closing bracket must match the most recent unmatched opener.",
    complexity: "O(n) time, O(n) space",
  },
  {
    id: 10,
    concept: "Queues",
    title: "The Twin Basins",
    xp: 170,
    prompt:
      "Two magical basins can only pour water, never scoop it back — yet together they must behave like a single first-in-first-out queue. Implement a queue using two stacks, supporting push(x) and pop() (removes and returns the front element).",
    signature: "class MyQueue { void push(int x); int pop(); }",
    starter: {
      python:
        "class MyQueue:\n    def __init__(self):\n        self.in_stack = []\n        self.out_stack = []\n\n    def push(self, x):\n        # your code here\n        pass\n\n    def pop(self):\n        # your code here\n        pass",
      java:
        "import java.util.*;\nclass MyQueue {\n    Deque<Integer> inStack = new ArrayDeque<>();\n    Deque<Integer> outStack = new ArrayDeque<>();\n\n    public void push(int x) {\n        // your code here\n    }\n\n    public int pop() {\n        // your code here\n        return -1;\n    }\n}",
      cpp:
        "#include <stack>\nusing namespace std;\n\nclass MyQueue {\npublic:\n    stack<int> inStack, outStack;\n\n    void push(int x) {\n        // your code here\n    }\n\n    int pop() {\n        // your code here\n        return -1;\n    }\n};",
    },
    tests: [
      { input: "push(1), push(2), pop()", expected: "1" },
      { input: "push(1), push(2), push(3), pop(), pop()", expected: "1, 2" },
      { input: "push(5), pop()", expected: "5" },
    ],
    hints: [
      "Use one stack purely for incoming pushes, and a second stack for outgoing pops.",
      "When the 'out' stack is empty and you need to pop, dump everything from the 'in' stack into it — this reverses the order.",
      "Once reversed, popping from the 'out' stack gives elements in the original first-in order.",
    ],
    solution: {
      python:
        "class MyQueue:\n    def __init__(self):\n        self.in_stack = []\n        self.out_stack = []\n\n    def push(self, x):\n        self.in_stack.append(x)\n\n    def pop(self):\n        if not self.out_stack:\n            while self.in_stack:\n                self.out_stack.append(self.in_stack.pop())\n        return self.out_stack.pop()",
      java:
        "import java.util.*;\nclass MyQueue {\n    Deque<Integer> inStack = new ArrayDeque<>();\n    Deque<Integer> outStack = new ArrayDeque<>();\n\n    public void push(int x) {\n        inStack.push(x);\n    }\n\n    public int pop() {\n        if (outStack.isEmpty()) {\n            while (!inStack.isEmpty()) outStack.push(inStack.pop());\n        }\n        return outStack.pop();\n    }\n}",
      cpp:
        "class MyQueue {\npublic:\n    stack<int> inStack, outStack;\n\n    void push(int x) {\n        inStack.push(x);\n    }\n\n    int pop() {\n        if (outStack.empty()) {\n            while (!inStack.empty()) {\n                outStack.push(inStack.top());\n                inStack.pop();\n            }\n        }\n        int val = outStack.top();\n        outStack.pop();\n        return val;\n    }\n};",
    },
    explanation:
      "Transferring elements between two stacks reverses their order once, simulating FIFO behavior with LIFO stacks.",
    complexity: "O(1) amortized per operation",
  },
  {
    id: 11,
    concept: "Recursion",
    title: "The Echoing Well",
    xp: 140,
    prompt:
      "A well echoes each call back to itself until it reaches the bottom. Write a recursive function to compute the factorial of n.",
    signature: "long factorial(int n)",
    starter: {
      python: "def factorial(n):\n    # your code here\n    pass",
      java: "class Solution {\n    public long factorial(int n) {\n        // your code here\n        return 0;\n    }\n}",
      cpp: "class Solution {\npublic:\n    long long factorial(int n) {\n        // your code here\n        return 0;\n    }\n};",
    },
    tests: [
      { input: "n=5", expected: "120" },
      { input: "n=0", expected: "1" },
      { input: "n=1", expected: "1" },
    ],
    hints: [
      "Every recursive function needs a base case — what is factorial(0) or factorial(1)?",
      "For the recursive case, express factorial(n) in terms of factorial(n - 1).",
      "n! = n * (n-1)!, and 0! = 1! = 1.",
    ],
    solution: {
      python: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)",
      java:
        "class Solution {\n    public long factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    long long factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n};",
    },
    explanation:
      "The function calls itself with a smaller input until hitting the base case, then multiplies results while unwinding.",
    complexity: "O(n) time, O(n) call stack space",
  },
  {
    id: 12,
    concept: "Recursion",
    title: "The Spiral Steps",
    xp: 150,
    prompt:
      "A spiral staircase's step count follows a magic pattern: each step's height equals the sum of the two before it. Compute the n-th Fibonacci number (0-indexed, fib(0)=0, fib(1)=1).",
    signature: "int fib(int n)",
    starter: {
      python: "def fib(n):\n    # your code here\n    pass",
      java: "class Solution {\n    public int fib(int n) {\n        // your code here\n        return 0;\n    }\n}",
      cpp: "class Solution {\npublic:\n    int fib(int n) {\n        // your code here\n        return 0;\n    }\n};",
    },
    tests: [
      { input: "n=0", expected: "0" },
      { input: "n=1", expected: "1" },
      { input: "n=6", expected: "8" },
    ],
    hints: [
      "The base cases are fib(0) = 0 and fib(1) = 1.",
      "For n >= 2, fib(n) = fib(n-1) + fib(n-2).",
      "Consider memoizing results if you want to avoid recomputing the same values repeatedly.",
    ],
    solution: {
      python:
        "def fib(n, memo={}):\n    if n <= 1:\n        return n\n    if n in memo:\n        return memo[n]\n    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)\n    return memo[n]",
      java:
        "class Solution {\n    public int fib(int n) {\n        if (n <= 1) return n;\n        int[] memo = new int[n + 1];\n        memo[0] = 0; memo[1] = 1;\n        for (int i = 2; i <= n; i++) memo[i] = memo[i-1] + memo[i-2];\n        return memo[n];\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    int fib(int n) {\n        if (n <= 1) return n;\n        vector<int> memo(n + 1);\n        memo[0] = 0; memo[1] = 1;\n        for (int i = 2; i <= n; i++) memo[i] = memo[i-1] + memo[i-2];\n        return memo[n];\n    }\n};",
    },
    explanation:
      "Each Fibonacci number is the sum of the previous two; memoization or bottom-up iteration avoids exponential recomputation.",
    complexity: "O(n) time with memoization, O(n) space",
  },
  {
    id: 13,
    concept: "Linked Lists",
    title: "The Chain of Souls",
    xp: 170,
    prompt:
      "A chain binding wandering souls must be reforged in the opposite direction. Reverse a singly linked list and return its new head.",
    signature: "ListNode* reverseList(ListNode* head)",
    starter: {
      python:
        "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head):\n    # your code here\n    pass",
      java:
        "class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\n\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        // your code here\n        return null;\n    }\n}",
      cpp:
        "struct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // your code here\n        return nullptr;\n    }\n};",
    },
    tests: [
      { input: "1->2->3->4", expected: "4->3->2->1" },
      { input: "1", expected: "1" },
      { input: "1->2", expected: "2->1" },
    ],
    hints: [
      "Keep track of a 'previous' node, starting at null, as you walk through the list.",
      "At each node, save the next node before rewiring the current node's pointer to point backward.",
      "Advance 'previous' and 'current' forward each iteration; return 'previous' once current is null.",
    ],
    solution: {
      python:
        "def reverse_list(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev",
      java:
        "class Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null, curr = head;\n        while (curr != null) {\n            ListNode nxt = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nxt;\n        }\n        return prev;\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while (curr != nullptr) {\n            ListNode* nxt = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = nxt;\n        }\n        return prev;\n    }\n};",
    },
    explanation:
      "Iteratively re-point each node's 'next' backward while walking forward, using a 'prev' pointer to rebuild the chain.",
    complexity: "O(n) time, O(1) space",
  },
  {
    id: 14,
    concept: "Linked Lists",
    title: "The Looping Catacomb",
    xp: 180,
    prompt:
      "A catacomb corridor may loop back on itself, trapping anyone who enters. Detect whether a linked list contains a cycle.",
    signature: "bool hasCycle(ListNode* head)",
    starter: {
      python:
        "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef has_cycle(head):\n    # your code here\n    pass",
      java:
        "class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\n\nclass Solution {\n    public boolean hasCycle(ListNode head) {\n        // your code here\n        return false;\n    }\n}",
      cpp:
        "struct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nclass Solution {\npublic:\n    bool hasCycle(ListNode* head) {\n        // your code here\n        return false;\n    }\n};",
    },
    tests: [
      { input: "1->2->3->(back to 2)", expected: "true" },
      { input: "1->2->3->null", expected: "false" },
      { input: "1->(back to 1)", expected: "true" },
    ],
    hints: [
      "Use two pointers moving at different speeds through the list — a 'slow' one and a 'fast' one.",
      "Move slow by one step and fast by two steps each iteration.",
      "If there's a cycle, the fast pointer will eventually lap the slow pointer and they'll meet.",
    ],
    solution: {
      python:
        "def has_cycle(head):\n    slow, fast = head, head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False",
      java:
        "class Solution {\n    public boolean hasCycle(ListNode head) {\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    bool hasCycle(ListNode* head) {\n        ListNode* slow = head;\n        ListNode* fast = head;\n        while (fast != nullptr && fast->next != nullptr) {\n            slow = slow->next;\n            fast = fast->next->next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n};",
    },
    explanation:
      "Floyd's cycle detection uses slow and fast pointers; if a cycle exists, the fast pointer eventually catches the slow one.",
    complexity: "O(n) time, O(1) space",
  },
  {
    id: 15,
    concept: "Hashing",
    title: "The Coin Counter's Ledger",
    xp: 160,
    prompt:
      "A ledger keeper needs to find two coins whose values add up exactly to a target sum. Return the indices of the two numbers in the array that add up to target.",
    signature: "vector<int> twoSum(vector<int>& nums, int target)",
    starter: {
      python: "def two_sum(nums, target):\n    # your code here\n    pass",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // your code here\n        return new int[]{};\n    }\n}",
      cpp: "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // your code here\n        return {};\n    }\n};",
    },
    tests: [
      { input: "[2,7,11,15], target=9", expected: "[0,1]" },
      { input: "[3,2,4], target=6", expected: "[1,2]" },
      { input: "[3,3], target=6", expected: "[0,1]" },
    ],
    hints: [
      "A hash map lets you check 'have I seen the complement of this number?' in constant time.",
      "For each number, compute target - number, and check if that complement is already in your map.",
      "If it's there, you've found your pair. If not, store the current number and its index, then keep going.",
    ],
    solution: {
      python:
        "def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        complement = target - n\n        if complement in seen:\n            return [seen[complement], i]\n        seen[n] = i\n    return []",
      java:
        "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        java.util.Map<Integer, Integer> seen = new java.util.HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (seen.containsKey(complement)) {\n                return new int[]{seen.get(complement), i};\n            }\n            seen.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < (int)nums.size(); i++) {\n            int complement = target - nums[i];\n            if (seen.count(complement)) {\n                return {seen[complement], i};\n            }\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};",
    },
    explanation:
      "A hash map records each number's index; for every new number, we check if its complement was already seen.",
    complexity: "O(n) time, O(n) space",
  },
  {
    id: 16,
    concept: "Hashing",
    title: "The Whispering Scroll",
    xp: 160,
    prompt:
      "A scroll reveals its secret only through the first letter that appears just once. Find the first non-repeating character in a string and return its index, or -1 if none exists.",
    signature: "int firstUniqChar(string s)",
    starter: {
      python: "def first_uniq_char(s):\n    # your code here\n    pass",
      java: "class Solution {\n    public int firstUniqChar(String s) {\n        // your code here\n        return -1;\n    }\n}",
      cpp: "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int firstUniqChar(string s) {\n        // your code here\n        return -1;\n    }\n};",
    },
    tests: [
      { input: '"leetcode"', expected: "0" },
      { input: '"aabb"', expected: "-1" },
      { input: '"loveleetcode"', expected: "2" },
    ],
    hints: [
      "First, count how many times each character appears across the whole string.",
      "Then walk through the string again, in order, looking for the first character whose count is exactly 1.",
      "Two passes — one to count, one to check — keeps this simple and efficient.",
    ],
    solution: {
      python:
        "def first_uniq_char(s):\n    counts = {}\n    for ch in s:\n        counts[ch] = counts.get(ch, 0) + 1\n    for i, ch in enumerate(s):\n        if counts[ch] == 1:\n            return i\n    return -1",
      java:
        "class Solution {\n    public int firstUniqChar(String s) {\n        int[] counts = new int[26];\n        for (char c : s.toCharArray()) counts[c - 'a']++;\n        for (int i = 0; i < s.length(); i++) {\n            if (counts[s.charAt(i) - 'a'] == 1) return i;\n        }\n        return -1;\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    int firstUniqChar(string s) {\n        int counts[26] = {0};\n        for (char c : s) counts[c - 'a']++;\n        for (int i = 0; i < (int)s.size(); i++) {\n            if (counts[s[i] - 'a'] == 1) return i;\n        }\n        return -1;\n    }\n};",
    },
    explanation:
      "A frequency map built in one pass lets a second pass find the first character with count 1.",
    complexity: "O(n) time, O(1) space (fixed alphabet)",
  },
  {
    id: 17,
    concept: "Trees",
    title: "The Deepest Root",
    xp: 180,
    prompt:
      "Explorers must know how deep the ancient tree's roots run before descending. Compute the maximum depth of a binary tree.",
    signature: "int maxDepth(TreeNode* root)",
    starter: {
      python:
        "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef max_depth(root):\n    # your code here\n    pass",
      java:
        "class TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int val) { this.val = val; }\n}\n\nclass Solution {\n    public int maxDepth(TreeNode root) {\n        // your code here\n        return 0;\n    }\n}",
      cpp:
        "struct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        // your code here\n        return 0;\n    }\n};",
    },
    tests: [
      { input: "[3,9,20,null,null,15,7]", expected: "3" },
      { input: "[]", expected: "0" },
      { input: "[1]", expected: "1" },
    ],
    hints: [
      "The depth of an empty tree (null node) is 0 — that's your base case.",
      "The depth of a node equals 1 plus the larger of its two subtrees' depths.",
      "Recurse into the left and right children, then combine their results.",
    ],
    solution: {
      python:
        "def max_depth(root):\n    if root is None:\n        return 0\n    return 1 + max(max_depth(root.left), max_depth(root.right))",
      java:
        "class Solution {\n    public int maxDepth(TreeNode root) {\n        if (root == null) return 0;\n        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (root == nullptr) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};",
    },
    explanation:
      "Recursively compute the depth of each subtree and take the larger, adding one for the current node.",
    complexity: "O(n) time, O(h) space for recursion (h = tree height)",
  },
  {
    id: 18,
    concept: "Trees",
    title: "The Ordered Sanctum",
    xp: 190,
    prompt:
      "A sanctum's shrines must be arranged so every left offering is smaller and every right offering is larger than the shrine before it. Validate whether a binary tree is a valid binary search tree.",
    signature: "bool isValidBST(TreeNode* root)",
    starter: {
      python:
        "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_valid_bst(root):\n    # your code here\n    pass",
      java:
        "class TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int val) { this.val = val; }\n}\n\nclass Solution {\n    public boolean isValidBST(TreeNode root) {\n        // your code here\n        return false;\n    }\n}",
      cpp:
        "struct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nclass Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        // your code here\n        return false;\n    }\n};",
    },
    tests: [
      { input: "[2,1,3]", expected: "true" },
      { input: "[5,1,4,null,null,3,6]", expected: "false" },
      { input: "[1]", expected: "true" },
    ],
    hints: [
      "It's not enough to compare a node only with its direct children — the whole left subtree must be less than it.",
      "Pass down a valid (min, max) range as you recurse, tightening the bounds for each subtree.",
      "A node is valid only if its value fits within the range passed down from its ancestors.",
    ],
    solution: {
      python:
        "def is_valid_bst(root, low=float('-inf'), high=float('inf')):\n    if root is None:\n        return True\n    if not (low < root.val < high):\n        return False\n    return is_valid_bst(root.left, low, root.val) and is_valid_bst(root.right, root.val, high)",
      java:
        "class Solution {\n    public boolean isValidBST(TreeNode root) {\n        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);\n    }\n    private boolean validate(TreeNode node, long low, long high) {\n        if (node == null) return true;\n        if (!(node.val > low && node.val < high)) return false;\n        return validate(node.left, low, node.val) && validate(node.right, node.val, high);\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        return validate(root, LONG_MIN, LONG_MAX);\n    }\nprivate:\n    bool validate(TreeNode* node, long low, long high) {\n        if (node == nullptr) return true;\n        if (!(node->val > low && node->val < high)) return false;\n        return validate(node->left, low, node->val) && validate(node->right, node->val, high);\n    }\n};",
    },
    explanation:
      "Passing down a shrinking valid range ensures every node — not just direct parent-child pairs — respects BST ordering.",
    complexity: "O(n) time, O(h) space",
  },
  {
    id: 19,
    concept: "Graphs",
    title: "The Ripple Map",
    xp: 190,
    prompt:
      "A cartographer explores the dungeon room by room, ring by ring, like ripples spreading in water. Perform a breadth-first traversal of a graph starting from a given node, returning the visit order.",
    signature: "vector<int> bfs(int start, unordered_map<int, vector<int>>& graph)",
    starter: {
      python: "def bfs(start, graph):\n    # graph is a dict: node -> list of neighbors\n    # your code here\n    pass",
      java:
        "class Solution {\n    public java.util.List<Integer> bfs(int start, java.util.Map<Integer, java.util.List<Integer>> graph) {\n        // your code here\n        return new java.util.ArrayList<>();\n    }\n}",
      cpp:
        "#include <vector>\n#include <unordered_map>\n#include <queue>\n#include <unordered_set>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> bfs(int start, unordered_map<int, vector<int>>& graph) {\n        // your code here\n        return {};\n    }\n};",
    },
    tests: [
      { input: "start=0, graph={0:[1,2],1:[2],2:[0,3],3:[3]}", expected: "[0,1,2,3]" },
      { input: "start=1, graph={0:[],1:[0]}", expected: "[1,0]" },
      { input: "start=5, graph={5:[]}", expected: "[5]" },
    ],
    hints: [
      "A queue naturally models 'explore in the order discovered' — perfect for BFS.",
      "Mark nodes as visited the moment you enqueue them, to avoid processing the same node twice.",
      "Dequeue a node, record it, then enqueue all of its unvisited neighbors.",
    ],
    solution: {
      python:
        "from collections import deque\n\ndef bfs(start, graph):\n    visited = {start}\n    order = []\n    queue = deque([start])\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph.get(node, []):\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    return order",
      java:
        "class Solution {\n    public java.util.List<Integer> bfs(int start, java.util.Map<Integer, java.util.List<Integer>> graph) {\n        java.util.List<Integer> order = new java.util.ArrayList<>();\n        java.util.Set<Integer> visited = new java.util.HashSet<>();\n        java.util.Queue<Integer> queue = new java.util.LinkedList<>();\n        queue.add(start);\n        visited.add(start);\n        while (!queue.isEmpty()) {\n            int node = queue.poll();\n            order.add(node);\n            for (int nb : graph.getOrDefault(node, new java.util.ArrayList<>())) {\n                if (!visited.contains(nb)) {\n                    visited.add(nb);\n                    queue.add(nb);\n                }\n            }\n        }\n        return order;\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    vector<int> bfs(int start, unordered_map<int, vector<int>>& graph) {\n        vector<int> order;\n        unordered_set<int> visited;\n        queue<int> q;\n        q.push(start);\n        visited.insert(start);\n        while (!q.empty()) {\n            int node = q.front(); q.pop();\n            order.push_back(node);\n            for (int nb : graph[node]) {\n                if (!visited.count(nb)) {\n                    visited.insert(nb);\n                    q.push(nb);\n                }\n            }\n        }\n        return order;\n    }\n};",
    },
    explanation:
      "A queue processes nodes level by level, visiting all neighbors of a node before moving further away.",
    complexity: "O(V + E) time, O(V) space",
  },
  {
    id: 20,
    concept: "Dynamic Programming",
    title: "The Final Ascent",
    xp: 220,
    prompt:
      "The final staircase out of the dungeon can be climbed 1 or 2 steps at a time. Count how many distinct ways there are to reach the top of a staircase with n steps.",
    signature: "int climbStairs(int n)",
    starter: {
      python: "def climb_stairs(n):\n    # your code here\n    pass",
      java: "class Solution {\n    public int climbStairs(int n) {\n        // your code here\n        return 0;\n    }\n}",
      cpp: "class Solution {\npublic:\n    int climbStairs(int n) {\n        // your code here\n        return 0;\n    }\n};",
    },
    tests: [
      { input: "n=2", expected: "2" },
      { input: "n=3", expected: "3" },
      { input: "n=5", expected: "8" },
    ],
    hints: [
      "To reach step n, you must have come from step n-1 (one step) or step n-2 (two steps).",
      "That means the number of ways to reach step n is the sum of the ways to reach n-1 and n-2 — this is just Fibonacci in disguise!",
      "Build up from the bottom: ways(1) = 1, ways(2) = 2, and each next value is the sum of the previous two.",
    ],
    solution: {
      python:
        "def climb_stairs(n):\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b",
      java:
        "class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b;\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n}",
      cpp:
        "class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b;\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n};",
    },
    explanation:
      "The number of ways to reach step n depends only on the ways to reach the two previous steps — a classic bottom-up DP pattern.",
    complexity: "O(n) time, O(1) space",
  },
];


export default LEVELS;
