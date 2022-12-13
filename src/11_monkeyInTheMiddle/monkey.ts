import { readFile } from '../utils'
import {
  getTop2MonkeysScore,
  parseMonkeys,
  runMonkeyBusiness
} from './monkeyApi'
import path from 'path'

const input = readFile(path.resolve(__dirname, './monkeys'))

const monkeys = runMonkeyBusiness(parseMonkeys(input), 20)

console.log('Top 2 monkeys inpected items: ', getTop2MonkeysScore(monkeys))
