import { readFile } from '../utils'
import path from 'path'
import {
  getTopCratesMessage,
  moveCrates9000,
  moveCrates9001
} from './cratesApi'

const crateInput = readFile(path.resolve(__dirname, './crates'))

console.log(
  'top crates message - moveCrater9000',
  getTopCratesMessage(moveCrates9000(crateInput))
)

console.log(
  'top crates message - moveCrater9001',
  getTopCratesMessage(moveCrates9001(crateInput))
)
