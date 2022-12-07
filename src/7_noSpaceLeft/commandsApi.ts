interface File {
  name: string
  size: number
}

interface Directory {
  name: string
  files: File[]
  subDirs: Array<Directory['name']>
  size: number
  totalSize: number
  depth: number
}

type FileSystem = Record<Directory['name'], Directory>

export const buildFileSystem = (commands: string[]): any => {
  const fs: FileSystem = {}

  let path: Directory['name'] = ''
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i]

    if (isCdCommand(cmd)) {
      path = cd(fs, cmd, path) ?? path
      continue
    }
    if (isLsCommand(cmd)) continue

    // dir content
    if (isDir(cmd)) {
      fs[path].subDirs.push(`${path}/${getDirName(cmd)}`)
      continue
    }

    // file content
    const file = getFile(cmd)
    fs[path].files.push(file)
    fs[path].size += file.size
  }
  return addTotalSize(fs)
}

export const getDirsWithSizeAtMost100000 = (fs: FileSystem): number => {
  let total = 0
  for (const dir of Object.values(fs)) {
    if (dir.totalSize <= 100000) {
      total += dir.totalSize
    }
  }

  return total
}

const addTotalSize = (fs: FileSystem): FileSystem => {
  // sort directories by # of subfolders
  sortByDepth(fs).forEach(dir => {
    dir.totalSize = dir.size // sum of files sizes
    for (const subdirName of dir.subDirs) {
      // add total size of all subdirs
      dir.totalSize += fs[subdirName].totalSize
    }
  })
  return fs
}

const sortByDepth = (fs: FileSystem): Directory[] =>
  Object.values(fs).sort((a, b) => {
    if (a.depth < b.depth) return 1
    if (a.depth > b.depth) return -1
    return 0
  })

const isCdCommand = (cmd: string): boolean => cmd.startsWith('$ cd ')
const isLsCommand = (cmd: string): boolean => cmd === '$ ls'
const isDir = (cmd: string): boolean => cmd.startsWith('dir ')
const getDirName = (cmd: string): string => cmd.replace('dir ', '')
const getFile = (cmd: string): File => {
  const [size, name] = cmd.split(' ')
  return {
    size: +size,
    name
  }
}

const cd = (
  fs: FileSystem,
  cmd: string,
  path: string
): Directory['name'] | undefined => {
  let dirName = cmd.replace('$ cd ', '')
  if (dirName === '/') dirName = 'ROOT'
  if (dirName === '..') {
    const p = path.split('/')
    p.pop()
    return p.join('/')
  }
  const newPath = path !== '' ? `${path}/${dirName}` : dirName
  // already scanned folder
  if (fs[newPath] !== undefined) return
  // create fileSystem entry
  fs[newPath] = {
    name: newPath,
    depth: newPath === 'ROOT' ? 0 : newPath.split('/').length,
    files: [],
    subDirs: [],
    size: 0,
    totalSize: 0
  }
  return newPath
}

const TOTAL_SIZE = 70_000_000
const UPDATE_NEEDED_SPACE = 30_000_000

export const getSmallestDirSize = (fs: FileSystem): Directory['totalSize'] => {
  const rootSize = fs.ROOT.totalSize
  const unusedSpace = TOTAL_SIZE - rootSize
  const neededSpace = UPDATE_NEEDED_SPACE - unusedSpace

  let smallestDirSize = rootSize
  for (const d of Object.values(fs)) {
    if (d.totalSize <= neededSpace) continue
    smallestDirSize = Math.min(d.totalSize, smallestDirSize)
  }
  return smallestDirSize
}
