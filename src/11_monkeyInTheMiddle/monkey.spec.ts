import { readFile } from '../utils'
import {
  getReceiver,
  getTop2MonkeysScore,
  parseMonkeys,
  runMonkeyBusiness
} from './monkeyApi'
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
  it('returns monkeys after 1 round', () => {
    const updatedMonkeys = runMonkeyBusiness(parseMonkeys(input), 1)
    expect(updatedMonkeys[0].items).toEqual([20, 23, 27, 26])
    expect(updatedMonkeys[1].items).toEqual([2080, 25, 167, 207, 401, 1046])
  })
  it('returns monkeys after 20 round', () => {
    const updatedMonkeys = runMonkeyBusiness(parseMonkeys(input), 20)
    expect(updatedMonkeys[0].items).toEqual([10, 12, 14, 26, 34])
    expect(updatedMonkeys[1].items).toEqual([245, 93, 53, 199, 115])
  })
  it('returns expected number of inspected items', () => {
    const updatedMonkeys = runMonkeyBusiness(parseMonkeys(input), 20)
    expect(updatedMonkeys[0].nbInspectedItems).toEqual(101)
    expect(updatedMonkeys[1].nbInspectedItems).toEqual(95)
    expect(updatedMonkeys[2].nbInspectedItems).toEqual(7)
    expect(updatedMonkeys[3].nbInspectedItems).toEqual(105)
  })
  it('returns top 2 monkeys score', () => {
    const updatedMonkeys = runMonkeyBusiness(parseMonkeys(input), 20)
    expect(getTop2MonkeysScore(updatedMonkeys)).toEqual(10605)
  })
})
