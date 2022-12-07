import { readFile } from '../utils'
import path from 'path'
import { buildFileSystem, getDirsWithSizeAtMost100000 } from './commandsApi'

const cmdInput = readFile(path.resolve(__dirname, './commands.fixtures.txt'))
const fs = buildFileSystem(cmdInput)

console.log({ fs })
describe('7 - No space left', () => {
  it('returns total size of dirs with more than 100000', () => {
    expect(getDirsWithSizeAtMost100000(fs)).toEqual(95437)
  })
})
