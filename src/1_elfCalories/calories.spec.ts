import path from 'path'
import { readFile } from '../utils'
import { getMaxCalories } from './caloriesApi'

describe('1 - Elf Calories', () => {
  it('returns max elf calories', () => {
    const elvesCarry = readFile(
      path.resolve(__dirname, './calories.fixtures.txt')
    )
    expect(getMaxCalories(elvesCarry)).toEqual([24000, 11000, 10000])
  })
})
