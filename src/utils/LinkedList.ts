class LinkedNode {
  next: LinkedNode | null

  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  constructor(readonly node: string) {
    this.next = null
  }
}

export class LinkedList {
  head: LinkedNode | null
  tail: LinkedNode | null
  length: number

  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  print = (): string => {
    if (this.head === null) return 'empty list'
    let current: LinkedNode | null = this.head
    const display = []
    if (this.length === 1) return `${current.node}`
    while (current !== null) {
      display.push(current.node)
      current = current.next
    }
    return display.join(' -> ')
  }

  push = (value: string): LinkedList => {
    const n = new LinkedNode(value)
    if (this.head === null) {
      this.head = n
      this.tail = n
    } else {
      if (this.tail !== null) this.tail.next = n
      this.tail = n
    }
    this.length++
    return this
  }

  pop = (): LinkedNode | null => {
    if (this.head === null) return null
    if (this.length === 1) {
      const current = this.head
      this.head = null
      this.tail = null
      this.length = 0
      return current
    }

    let current: LinkedNode | null = this.head
    let newTail = null
    while (current !== null) {
      if (current.next !== null) {
        newTail = current
      }
      current = current.next
    }

    const deletedNode = this.tail
    this.tail = newTail
    if (this.tail !== null) this.tail.next = null
    this.length--
    return deletedNode
  }

  moveTailToList = (l: LinkedList): void => {
    const node = this.pop()
    if (node !== null) l.push(node.node)
  }
}
