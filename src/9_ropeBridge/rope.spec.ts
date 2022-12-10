import { readFile } from '../utils'
import path from 'path'
import { countPositions } from './ropeApi'

describe('9 - Rope Bridge', () => {
  const headMovements = readFile(path.resolve(__dirname, './rope.fixtures.txt'))
  const headMovements2 = readFile(
    path.resolve(__dirname, './rope2.fixtures.txt')
  )

  it('returns the number of positions', () => {
    expect(countPositions(headMovements)).toEqual(13)
  })
  it.only('returns the number of positions with rope len of 10', () => {
    expect(countPositions(headMovements, 10)).toEqual(1)
    expect(countPositions(headMovements2, 10)).toEqual(36)
  })
})
