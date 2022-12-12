import { readFile } from '../utils'
import { getReceiver, parseMonkeys } from './monkeyApi'
import path from 'path'

const input = readFile(path.resolve(__dirname, './monkeys.fixtures.txt'))
const monkeys = parseMonkeys(input)
const firstMonkey = monkeys[0]

describe('10 - Monkey in the middle', () => {
  it('inspect item', () => {
    const [firstItem, secondItem] = firstMonkey.items

    expect(firstMonkey.inspect(firstItem)).toEqual(500)
    expect(firstMonkey.inspect(secondItem)).toEqual(620)
  })
  it('throws item to expected monkey', () => {
    const [firstItem, secondItem] = firstMonkey.items
    const itemWorryLevel = firstMonkey.inspect(firstItem)
    const nextMonkey = getReceiver(itemWorryLevel, firstMonkey)
    expect(nextMonkey).toEqual(3)
    const itemWorryLevel2 = firstMonkey.inspect(secondItem)
    const nextMonkey2 = getReceiver(itemWorryLevel2, firstMonkey)
    expect(nextMonkey2).toEqual(3)
  })
})
