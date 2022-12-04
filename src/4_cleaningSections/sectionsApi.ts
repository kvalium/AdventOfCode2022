export const countFullyOverlappingSections = (sections: string[]): number => {
  let total = 0
  for (const section of sections) {
    const [e1, e2] = parseSections(section)
    if (isFullyOverlap(e1, e2) || isFullyOverlap(e2, e1)) {
      total++
    }
  }
  return total
}

export const countOverlappingSections = (sections: string[]): number => {
  let total = 0
  for (const section of sections) {
    const [e1, e2] = parseSections(section)
    if (hasOverlap(e1, e2)) {
      total++
    }
  }
  return total
}

const hasOverlap = (a: number[], b: number[]): boolean => {
  const s2 = buildSectionSet(b)
  for (const n of buildSectionSet(a)) {
    if (s2.has(n)) return true
  }
  return false
}

const isFullyOverlap = (a: number[], b: number[]): boolean =>
  a[0] <= b[0] && a[1] >= b[1]

type ElfSection = number[]

const parseSections = (section: string): [ElfSection, ElfSection] => {
  const [e1, e2] = section.split(',')
  const splitAndCast = (e: string): number[] => e.split('-').map(i => +i)
  return [splitAndCast(e1), splitAndCast(e2)]
}

const buildSectionSet = (section: ElfSection): Set<number> => {
  const set = new Set<number>()
  for (let i = section[0]; i <= section[1]; i++) {
    set.add(i)
  }
  return set
}
