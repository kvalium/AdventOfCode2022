type ProgramHistory = Record<number, number>

export const getSignalStrAtCycle = (
  programHistory: ProgramHistory,
  instructionNum = 1
): number => getRegistryAtCycle(programHistory, instructionNum) * instructionNum

const getRegistryAtCycle = (
  programHistory: ProgramHistory,
  instructionNum = 1
): number => {
  if (instructionNum <= 0) return 0
  return (
    programHistory[instructionNum - 1] ?? programHistory[instructionNum - 2]
  )
}

export const buildProgramHistory = (program: string[]): ProgramHistory => {
  let x = 1
  let timer = 0

  const instructionHistory: ProgramHistory = { 0: 0 }

  for (const instruction of program) {
    if (instruction.startsWith('noop')) {
      timer++
      instructionHistory[timer] = x
      continue
    }
    const [, v] = instruction.split(' ')
    const val = parseInt(v)
    timer = timer + 2
    x += val
    instructionHistory[timer] = x
  }
  return instructionHistory
}

export const drawCRT = (programHistory: ProgramHistory): string => {
  const CRTRows = []
  let currentRow = []
  for (let cycle = 1; cycle <= 240; cycle++) {
    const beamPosition: number = cycle - CRTRows.length * 40
    const registryValue = getRegistryAtCycle(programHistory, cycle)

    const isLit =
      registryValue === beamPosition - 2 ||
      registryValue === beamPosition - 1 ||
      registryValue === beamPosition

    currentRow.push(isLit ? '#' : '.')

    if (cycle % 40 === 0) {
      CRTRows.push(currentRow.join(''))
      currentRow = []
    }
  }
  return CRTRows.join('\n')
}
