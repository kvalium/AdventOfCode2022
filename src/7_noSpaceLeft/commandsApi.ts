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
  const fsBySubFolderLen = Object.values(fs).sort((a, b) => {
    if (a.subDirs.length <= b.subDirs.length) return -1
    return 0
  })
  fsBySubFolderLen.forEach(dir => {
    dir.totalSize = dir.size
    for (const subdirName of dir.subDirs) {
      dir.totalSize += fs[subdirName].totalSize
    }
  })
  return fs
}

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
  const dirName = cmd.replace('$ cd ', '')
  if (dirName === '..') {
    const p = path.split('/')
    p.pop()
    return p.join('/')
  }
  const newPath = `${path}/${dirName}`
  // already scanned folder
  if (fs[newPath] !== undefined) return
  // create fileSystem entry
  fs[newPath] = {
    name: newPath,
    files: [],
    subDirs: [],
    size: 0,
    totalSize: 0
  }
  return newPath
}
