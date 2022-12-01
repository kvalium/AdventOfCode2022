import path from 'path'
import { readFile } from '../utils'
import { getMaxCalories } from './caloriesApi'

const elvesCarry = readFile(path.resolve(__dirname, './calories'))

const calories = getMaxCalories(elvesCarry)
console.log('max calories', calories)
console.log(
  'sum',
  calories.reduce((a, c) => a + c, 0)
)
