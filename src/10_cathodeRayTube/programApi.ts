type ProgramHistory = Record<number, number>

export const getRegistryValueAtCycle = (
  programHistory: ProgramHistory,
  instructionNum = 1
): number => {
  return (
    (programHistory[instructionNum - 1] ?? programHistory[instructionNum - 2]) *
    instructionNum
  )
}

export const buildProgramHistory = (program: string[]): ProgramHistory => {
  let x = 1
  let timer = 0

  const instructionHistory: ProgramHistory = {}

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
