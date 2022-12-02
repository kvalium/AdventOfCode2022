import { readFile } from '../utils'
import path from 'path'
import { getTotalScore } from './rpsApi'

describe('2 - Rock, Paper, Scissors', () => {
  it('returns the total score', () => {
    const game = readFile(path.resolve(__dirname, './rps.fixtures.txt'))
    expect(getTotalScore(game)).toEqual(15)
  })
})
