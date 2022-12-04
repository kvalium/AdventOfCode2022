enum alphabet {
  'a' = 1,
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
}

export const getItemInDouble = (rucksacks: string[]): number => {
  let total = 0
  for (const sack of rucksacks) {
    total += +alphabet[getDouble(sack) as any]
  }
  return total
}

const getDouble = (rucksack: string): string => {
  const [firstComp, secondComp] = splitRucksack(rucksack)
  const secondContains = new Set(secondComp)

  for (const i of firstComp) {
    if (secondContains.has(i)) return i
  }
  throw new Error('no double found')
}

const splitRucksack = (rucksack: string): [string, string] => {
  const half = Math.ceil(rucksack.length / 2)

  const firstComp = rucksack.slice(0, half)
  const secondComp = rucksack.slice(half)

  return [firstComp, secondComp]
}

export const getGroupBadgePriorities = (rucksacks: string[]): number => {
  let total = 0
  for (const [r1, r2, r3] of groupSackBy(rucksacks)) {
    total += +alphabet[getGroupBadge([r1, r2, r3]) as any]
  }
  return total
}

const groupSackBy = (rucksacks: string[], by = 3): string[][] => {
  const groupedSacks: string[][] = []
  let currentGroup: string[] = []
  for (let i = 0; i <= rucksacks.length; i++) {
    if (i > 0 && i % 3 === 0) {
      groupedSacks.push(currentGroup)
      currentGroup = []
    }
    currentGroup.push(rucksacks[i])
  }
  return groupedSacks
}

const getGroupBadge = ([r1, r2, r3]: [string, string, string]): string => {
  const r1Contains = new Set(r1)
  const r2Contains = new Set<string>()
  for (const i of r2) {
    r1Contains.has(i) && r2Contains.add(i)
  }
  for (const i of r3) {
    if (r2Contains.has(i)) return i
  }
  throw new Error('no badge found')
}
