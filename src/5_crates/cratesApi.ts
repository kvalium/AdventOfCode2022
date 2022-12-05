import { LinkedList } from '../utils/LinkedList'

export const getLists = (input: string[]): LinkedList[] => {
  const lines = input.slice(0, getStartLine(input)).reverse()

  const linkedLists = Array(getNbLists(input))
    .fill(1)
    .map(x => new LinkedList())

  let st = 1
  let currList = 0
  for (const line of lines) {
    while (st < line.length) {
      const char = line.charAt(st)
      if (char !== ' ') {
        linkedLists[currList].push(char)
      }

      currList++
      st += 4
    }
    st = 1
    currList = 0
    continue
  }

  return linkedLists
}

const getStartLine = (input: string[]): number => {
  let nb = 0
  for (const l of input) {
    if (l.charAt(1) === '1') {
      return nb
    }
    nb++
  }
  return nb
}

const getNbLists = (input: string[]): number =>
  Math.floor((input[0].length + 2) / 4)

interface Instruction {
  nb: number
  from: number
  to: number
}

export const getInstructions = (input: string[]): Instruction[] => {
  const instructions = input.slice(getStartLine(input) + 2)
  const listIns: Instruction[] = []
  for (let ins of instructions) {
    ins = ins.replace('move ', '')
    const [nb, from, to] = ins
      .replace(/ from | to /g, ',')
      .split(',')
      .map(i => parseInt(i))
    listIns.push({
      nb,
      from: from - 1,
      to: to - 1
    })
  }
  return listIns
}

export const moveCrates9000 = (input: string[]): LinkedList[] => {
  const cratesLists = getLists(input)
  const instructions = getInstructions(input)

  for (const ins of instructions) {
    for (let i = 1; i <= ins.nb; i++) {
      cratesLists[ins.from].moveTailToList(cratesLists[ins.to])
    }
  }
  return cratesLists
}

export const moveCrates9001 = (input: string[]): LinkedList[] => {
  const cratesLists = getLists(input)
  const instructions = getInstructions(input)

  for (const ins of instructions) {
    const poppedNodes = []
    for (let i = 1; i <= ins.nb; i++) {
      const popped = cratesLists[ins.from].pop()?.node
      if (popped !== undefined) {
        poppedNodes.push(popped)
      }
    }
    for (const toIns of poppedNodes.reverse()) {
      cratesLists[ins.to].push(toIns)
    }
  }
  return cratesLists
}

export const getTopCratesMessage = (crateList: LinkedList[]): string =>
  crateList.map(l => l.tail?.node).join('')
