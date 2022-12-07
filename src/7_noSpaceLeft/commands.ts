import { readFile } from '../utils'
import path from 'path'
import {
  buildFileSystem,
  getDirsWithSizeAtMost100000,
  getSmallestDirSize
} from './commandsApi'

const cmdInput = readFile(path.resolve(__dirname, './commands'))
const fs = buildFileSystem(cmdInput)

console.log(
  'Total size of folders with size at most 100 000',
  getDirsWithSizeAtMost100000(fs)
)
console.log(
  'Smallest dir size to enable update to install',
  getSmallestDirSize(fs)
)
