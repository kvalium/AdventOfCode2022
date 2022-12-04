export const countFullyOverlappingSections = (sections: string[]): number => {
  let total = 0
  for (const section of sections) {
    const [e1, e2] = parseSections(section)
    if (isOverlap(e1, e2) || isOverlap(e2, e1)) {
      total++
    }
  }
  return total
}

const isOverlap = (a: number[], b: number[]): boolean =>
  a[0] <= b[0] && a[1] >= b[1]

type ElfSection = number[]

const parseSections = (section: string): [ElfSection, ElfSection] => {
  const [e1, e2] = section.split(',')
  const splitAndCast = (e: string): number[] => e.split('-').map(i => +i)
  return [splitAndCast(e1), splitAndCast(e2)]
}
