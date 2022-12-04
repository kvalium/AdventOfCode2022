import { readFile } from '../utils'
import path from 'path'
import { getItemInDouble } from './rucksackApi'

describe('3 - Rucksacks', () => {
  const rucksacks = readFile(
    path.resolve(__dirname, './rucksacks.fixtures.txt')
  )

  it('returns the total priority of items in double', () => {
    expect(getItemInDouble(rucksacks)).toEqual(157)
  })
})
