import { readFile } from '../utils'
import path from 'path'
import { buildFileSystem, getDirsWithSizeAtMost100000 } from './commandsApi'

const cmdInput = readFile(path.resolve(__dirname, './commands'))
console.log('- build fs...')
const fs = buildFileSystem(cmdInput)
console.log('- fs builded!')

console.log({ fs })

console.log(fs.wrmm)

console.log(
  'Total size of folders with size at most 100 000',
  getDirsWithSizeAtMost100000(fs)
)
