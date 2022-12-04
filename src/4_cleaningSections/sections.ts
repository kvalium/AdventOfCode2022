import { readFile } from '../utils'
import path from 'path'
import { countFullyOverlappingSections } from './sectionsApi'

const sections = readFile(path.resolve(__dirname, './sections'))
console.log(
  '# of fully overlapping sections',
  countFullyOverlappingSections(sections)
)
