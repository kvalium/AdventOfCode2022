import { readFile } from '../utils'
import path from 'path'
import {
  countFullyOverlappingSections,
  countOverlappingSections
} from './sectionsApi'

describe('4 - cleaning sections', () => {
  const sections = readFile(path.resolve(__dirname, './sections.fixtures.txt'))
  it('returns the count of fully overlapping sections', () => {
    expect(countFullyOverlappingSections(sections)).toEqual(2)
  })
  it('returns the count of overlapping sections', () => {
    expect(countOverlappingSections(sections)).toEqual(4)
  })
})
