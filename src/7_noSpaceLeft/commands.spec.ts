import { readFile } from '../utils'
import path from 'path'
import {
  buildFileSystem,
  getDirsWithSizeAtMost100000,
  getSmallestDirSize
} from './commandsApi'

const fs = buildFileSystem(
  readFile(path.resolve(__dirname, './commands.fixtures.txt'))
)

describe('7 - No space left', () => {
  it('returns total size of dirs with more than 100000', () => {
    expect(getDirsWithSizeAtMost100000(fs)).toEqual(95437)
  })
  it('returns the smallest directory to enable update', () => {
    expect(getSmallestDirSize(fs)).toEqual(24933642)
  })
})
