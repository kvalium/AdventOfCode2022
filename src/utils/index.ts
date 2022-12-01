import { readFileSync } from 'fs'

export const readFile = (filePath: string): string[] =>
  readFileSync(filePath).toString().split('\n')
