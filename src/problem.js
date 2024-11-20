const obj = [
  {
    c: [
      {
        d: 5
      }
    ]
  },

  '5',
  {
    f: 7
  },
  {
    e: {
      c: [9, { d: 9 }]
    },
    g: {
      c: [9, { d: 9 }]
    }
  },
  [{ k: 1 }, ['highLevel', 'marketing']]
]

const some_set = new Set()

const getAllUniqueKeys = (obj) => {
  if (typeof obj === 'object') {
    Object.entries(obj).forEach(([key, value]) => {
      if (!Array.isArray(obj)) some_set.add(key)
      return getAllUniqueKeys(obj[key])
    })
  }
}

// some_set.clear();
// getAllUniqueKeys(obj)
// console.log({ output: some_set })

const merge_sort = (arr) => {
  if (arr.length <= 1) return arr

  const mid = Math.floor(arr.length / 2)
  const leftArr = arr.slice(0, mid)
  const rightArr = arr.slice(mid, arr.length)

  return merge(merge_sort(leftArr), merge_sort(rightArr))
}

//nums1 and nums2 are sorted
const merge = (nums1, nums2) => {
  const m = nums1.length
  const n = nums2.length
  const new_arr = []
  let i = 0
  let j = 0
  while (i < m && j < n) {
    if (nums1[i] < nums2[j]) {
      new_arr.push(nums1[i])
      i++
    } else {
      new_arr.push(nums2[j])
      j++
    }
  }

  while (i < m) {
    new_arr.push(nums1[i])
    i++
  }

  while (j < n) {
    new_arr.push(nums2[j])
    j++
  }

  return new_arr
}

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }

  getValue() {
    return this.value
  }
}

const node1 = new Node(1)
node1.next = new Node(2)
node1.next.next = new Node(3)
node1.next.next.next = new Node(4)

let temp = node1
let out_str = ''
while (temp.next) {
  out_str = out_str + temp.value + '-> '
  temp = temp.next
}

// console.log({linked_list : out_str})

// implement queue using two stacks;

class Queue {
  constructor(arr = []) {
    this.stack1 = [...arr] //enqueue mein bhi stack1 will be pushed so.
    this.stack2 = []
  }

  enqueue(value) {
    this.stack1.push(value)
  }

  dequeue() {
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop())
    }
    let return_val = this.stack2.pop()
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop())
    }
    return return_val
  }

  peek() {
    // stupid to think but anyways
    return this.stack1[0]
  }

  isEmpty() {
    return !this.stack1.length
  }

  size() {
    return this.stack1.length
  }
}

const q = new Queue()
const arr_to_insert = [1, 2, 3, 4, 5]
arr_to_insert.forEach((el) => q.enqueue(el))

console.log({ peek: q.peek() })

while (!q.isEmpty()) {
  console.log({ dq: q.dequeue() })
}

console.log({ peek: q.peek() })

//const a stack using two queues
class Stack {
  constructor(arr) {
    this.q1 = new Queue(arr)
    this.q2 = new Queue()
  }

  push(el) {
    this.q1.enqueue(el)
  }

  pop() {
    if (this.q1.isEmpty()) return

    while (this.q1.size() > 1) {
      //breaks when size is 1
      this.q2.enqueue(this.q1.dequeue())
    }

    let return_val = this.q1.dequeue()

    while (!this.q2.isEmpty()) {
      //breaks when size is 1
      this.q1.enqueue(this.q2.dequeue())
    }

    return return_val
  }

  isEmpty() {
    return this.q1.isEmpty()
  }

  size() {
    return this.q1.size()
  }

  top() {
    if (this.q1.isEmpty()) return

    while (this.q1.size() > 1) {
      //breaks when size is 1
      this.q2.enqueue(this.q1.dequeue())
    }

    let top_val = this.q1.dequeue()
    this.q2.enqueue(top_val)
    while (!this.q2.isEmpty()) {
      //breaks when size is 1
      this.q1.enqueue(this.q2.dequeue())
    }

    return top_val
  }
}

const st = new Stack()
arr_to_insert.forEach((el) => st.push(el))

console.log({ top: st.top() })

while (!st.isEmpty()) {
  console.log({ pop: st.pop() })
}

console.log({ top: st.top(), st })

//bfs and dfs . using nested object for iteration.
const graph = {
  A: ['B'],
  B: ['A', 'C', 'H'],
  C: ['B', 'D'],
  D: ['C', 'E', 'G'],
  E: ['D', 'F'],
  F: ['E'],
  G: ['D'],
  H: ['B', 'I', 'J', 'M'],
  I: ['H'],
  J: ['H', 'K'],
  K: ['J', 'L'],
  L: ['K'],
  M: ['H']
}

const bfs = (graph, root) => {
  const q = new Queue([root])
  const visited = new Set()

  while (!q.isEmpty()) {
    //traversed

    const traversedEl = q.dequeue()
    if (visited.has(traversedEl)) continue
    // console.log(traversedEl )
    process.stdout.write(traversedEl + ' -> ')
    visited.add(traversedEl)
    const neighbours = graph[traversedEl]
    neighbours.forEach((neighbour) => q.enqueue(neighbour))
  }
}

console.log({ graph })
// bfs(graph, 'A')

//recursive dfs

const dfs_r = (graph, start_point) => {
  const visited = new Set()
  const dfs = (graph, root) => {
    if (visited.has(root)) return
    process.stdout.write(root + ' -> ')
    visited.add(root)
    if (Array.isArray(graph[root])) {
      graph[root].forEach((neigh) => dfs(graph, neigh))
    }
  }

  dfs(graph, start_point)
}

// dfs_r(graph, 'A')

const dfs = (graph, root) => {
  const st = new Stack([root])
  const visited = new Set()

  while (!st.isEmpty()) {
    //traversed

    const traversedEl = st.pop()
    if (visited.has(traversedEl)) continue
    // console.log(traversedEl )
    process.stdout.write(traversedEl + ' -> ')
    visited.add(traversedEl)
    const neighbours = graph[traversedEl]
    neighbours.forEach((neighbour) => st.push(neighbour))
  }
}

dfs(graph, 'A')

// check finding paths between start and end dfs and bfs
// https://jaketae.github.io/study/bfs-dfs/
