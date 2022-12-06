import { getFirstPosition } from './tuningApi'

const inputs = [
  'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
  'bvwbjplbgvbhsrlpgdmjqwftvncz',
  'nppdvjthqldpwncqszvftbrmjlhg',
  'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
  'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'
]

describe('6 - tuning trouble', () => {
  it('returns first marker positions', () => {
    expect(inputs.map(i => getFirstPosition(i, 4))).toEqual([7, 5, 6, 10, 11])
  })
  it('returns first message positions', () => {
    expect(inputs.map(i => getFirstPosition(i, 14))).toEqual([
      19, 23, 23, 29, 26
    ])
  })
})
