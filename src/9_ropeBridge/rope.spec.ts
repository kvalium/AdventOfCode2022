import { readFile } from '../utils'
import path from 'path'
import { countPositions } from './ropeApi'

describe('9 - Rope Bridge', () => {
  const headMovements = readFile(path.resolve(__dirname, './rope.fixtures.txt'))

  it('returns the number of positions', () => {
    expect(countPositions(headMovements)).toEqual(13)
  })
})
