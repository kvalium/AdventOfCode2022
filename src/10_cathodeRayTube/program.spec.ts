import { readFile } from '../utils'
import { buildProgramHistory, getRegistryValueAtCycle } from './programApi'
import path from 'path'

const fakeProgram = readFile(path.resolve(__dirname, './program.fixtures.txt'))

describe('10 - Cathode Ray Tube', () => {
  const programHistory = buildProgramHistory(fakeProgram)
  it('returns expected X value at 20th cycle', () => {
    expect(getRegistryValueAtCycle(programHistory, 20)).toEqual(21 * 20)
  })
  it('returns expected X  value at  60th cycle', () => {
    expect(getRegistryValueAtCycle(programHistory, 60)).toEqual(60 * 19)
  })
  it('returns expected X  value at  100th cycle', () => {
    expect(getRegistryValueAtCycle(programHistory, 100)).toEqual(100 * 18)
  })
  it('returns expected X  value at  140th cycle', () => {
    expect(getRegistryValueAtCycle(programHistory, 140)).toEqual(140 * 21)
  })
  it('returns expected X  value at  180th cycle', () => {
    expect(getRegistryValueAtCycle(programHistory, 180)).toEqual(180 * 16)
  })
  it('returns expected X  value at  220th cycle', () => {
    expect(getRegistryValueAtCycle(programHistory, 220)).toEqual(220 * 18)
  })
})
