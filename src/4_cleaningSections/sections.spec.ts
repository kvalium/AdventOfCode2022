import { readFile } from '../utils'
import path from 'path'
import { countFullyOverlappingSections } from './sectionsApi'

describe('4 - cleaning sections', () => {
  const sections = readFile(path.resolve(__dirname, './sections.fixtures.txt'))
  it('returns the count of fully overlapping sections', () => {
    expect(countFullyOverlappingSections(sections)).toEqual(2)
  })
})
