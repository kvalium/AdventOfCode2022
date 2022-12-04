import { readFile } from '../utils'
import path from 'path'
import { getTotalScore } from './rpsApi'

const game = readFile(path.resolve(__dirname, './rps'))
console.log('total with shape', getTotalScore(game))
console.log('total with result', getTotalScore(game, false))
