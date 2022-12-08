import { readFile } from '../utils'
import path from 'path'
import { analyzeForest } from './treeTopApi'

const trees = readFile(path.resolve(__dirname, './trees'))

console.log('nb visible trees', analyzeForest(trees))
