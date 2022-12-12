import { readFile } from '../utils'
import path from 'path'
import { buildProgramHistory, drawCRT, getSignalStrAtCycle } from './programApi'

const program = readFile(path.resolve(__dirname, './program'))

const programHistory = buildProgramHistory(program)

const cyclesToCheck = [20, 60, 100, 140, 180, 220]

let sum = 0
for (const cycleToCheck of cyclesToCheck) {
  const val = getSignalStrAtCycle(programHistory, cycleToCheck)
  sum += val

  console.log(
    `cycle #${cycleToCheck} => `,
    getSignalStrAtCycle(programHistory, cycleToCheck)
  )
}

console.log('TOTAL = ', sum)
console.log('CRTRender ')
console.log(drawCRT(programHistory))
