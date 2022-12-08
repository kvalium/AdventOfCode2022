import { readFile } from '../utils'
import { analyzeForest } from './treeTopApi'
import path from 'path'

const trees = readFile(path.resolve(__dirname, './trees.fixtures.txt'))

describe('8 - treetop tree house', () => {
  it('returns number of visible trees', () => {
    expect(analyzeForest(trees).visibles).toEqual(21)
  })
  it.only('returns the best scenic score', () => {
    expect(analyzeForest(trees).bestScenic).toEqual(8)
  })
})
