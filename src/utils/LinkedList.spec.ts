import { LinkedList } from './LinkedList'

describe('utils - linked list', () => {
  it('creates empty list', () => {
    const l = new LinkedList()
    l.pop() // should have no effect
    expect(l.length).toEqual(0)
    expect(l.head).toBeNull()
    expect(l.tail).toBeNull()
  })
  it('creates list with one item', () => {
    const l = new LinkedList()
    l.push('A')
    expect(l.length).toEqual(1)
    expect(l.head?.node).toEqual('A')
    expect(l.tail?.node).toEqual('A')
    expect(l.print()).toEqual('A')
  })
  it('remove last item', () => {
    const l = new LinkedList()
    l.push('A')
    l.pop()
    expect(l.length).toEqual(0)
    expect(l.head).toBeNull()
    expect(l.tail).toBeNull()
    expect(l.print()).toEqual('empty list')
  })
  it('creates list with multiple item', () => {
    const l = new LinkedList()
    l.push('A')
    l.push('B')
    l.push('X')
    l.pop()
    l.push('C')
    l.push('Y')
    l.pop()
    expect(l.length).toEqual(3)
    expect(l.head?.node).toEqual('A')
    expect(l.tail?.node).toEqual('C')
    expect(l.print()).toEqual(['A', 'B', 'C'].join(' -> '))
  })
  it('move last item to list', () => {
    const l1 = new LinkedList()
    const l2 = new LinkedList()

    l1.push('A')
    l1.push('B')
    l1.push('C')
    l1.moveTailToList(l2)
    expect(l1.print()).toEqual(['A', 'B'].join(' -> '))
    expect(l2.print()).toEqual('C')
  })
})
