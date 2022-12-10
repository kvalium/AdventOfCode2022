import { readFile } from '../utils'
import path from 'path'
import { countPositions } from './ropeApi'

const headMovements = readFile(path.resolve(__dirname, './rope'))

console.log('# positions visited by tail:', countPositions(headMovements))
console.log(
  '# positions visited by tail, rope len = 10:',
  countPositions(headMovements, 10)
)
