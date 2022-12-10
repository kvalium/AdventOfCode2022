import { readFile } from '../utils'
import path from 'path'
import { buildProgramHistory, getRegistryValueAtCycle } from './programApi'

const program = readFile(path.resolve(__dirname, './program'))

const programHistory = buildProgramHistory(program)

const cyclesToCheck = [20, 60, 100, 140, 180, 220]

let sum = 0
for (const cycleToCheck of cyclesToCheck) {
  const val = getRegistryValueAtCycle(programHistory, cycleToCheck)
  sum += val

  console.log(
    `cycle #${cycleToCheck} => `,
    getRegistryValueAtCycle(programHistory, cycleToCheck)
  )
}

console.log('TOTAL = ', sum)
