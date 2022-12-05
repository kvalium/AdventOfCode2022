import { readFile } from '../utils'
import path from 'path'
import {
  getInstructions,
  getLists,
  getTopCratesMessage,
  moveCrates9000,
  moveCrates9001
} from './cratesApi'

const crateInput = readFile(path.resolve(__dirname, './crates.fixtures.txt'))

describe('5 - crates', () => {
  it('returns expected lists', () => {
    expect(getLists(crateInput).map(l => l.print())).toEqual([
      'Z -> N',
      'M -> C -> D',
      'P'
    ])
  })
  it('returns expected instructions', () => {
    expect(getInstructions(crateInput)).toEqual([
      { from: 1, nb: 1, to: 0 },
      { from: 0, nb: 3, to: 2 },
      { from: 1, nb: 2, to: 0 },
      { from: 0, nb: 1, to: 1 }
    ])
  })
  it('moves crates 9000', () => {
    expect(moveCrates9000(crateInput).map(l => l.print())).toEqual([
      'C',
      'M',
      'P -> D -> N -> Z'
    ])
  })
  it('returns top crates message 9000', () => {
    expect(getTopCratesMessage(moveCrates9000(crateInput))).toEqual('CMZ')
  })
  it('moves crates 9001', () => {
    expect(moveCrates9001(crateInput).map(l => l.print())).toEqual([
      'M',
      'C',
      'P -> Z -> N -> D'
    ])
  })
  it('returns top crates message 9001', () => {
    expect(getTopCratesMessage(moveCrates9001(crateInput))).toEqual('MCD')
  })
})
