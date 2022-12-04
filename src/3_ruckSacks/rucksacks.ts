import { readFile } from '../utils'
import { getGroupBadgePriorities, getItemInDouble } from './rucksackApi'
import path from 'path'

const rucksacks = readFile(path.resolve(__dirname, './rucksacks'))
console.log('total priority of items in double', getItemInDouble(rucksacks))
console.log(
  'total priority of group badges',
  getGroupBadgePriorities(rucksacks)
)
