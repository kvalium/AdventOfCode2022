import { readFile } from '../utils'
import path from 'path'
import { getTotalScore } from './rpsApi'

describe('2 - Rock, Paper, Scissors', () => {
  const game = readFile(path.resolve(__dirname, './rps.fixtures.txt'))

  it('returns the total score - my turn is shape', () => {
    expect(getTotalScore(game)).toEqual(15)
  })

  it('returns the total score - my turn is result', () => {
    expect(getTotalScore(game, false)).toEqual(12)
  })
})
