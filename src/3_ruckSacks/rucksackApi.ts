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
