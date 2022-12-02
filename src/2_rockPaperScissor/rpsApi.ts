type Opponent = 'A' | 'B' | 'C'
type Me = 'X' | 'Y' | 'Z'

const win = 6
const draw = 3
const loss = 0

export const scores: Record<Opponent, Record<Me, number>> = {
  A: {
    Y: win,
    X: draw,
    Z: loss
  },
  B: {
    Y: draw,
    X: loss,
    Z: win
  },
  C: {
    Y: loss,
    X: win,
    Z: draw
  }
}

const myShapeScore: Record<Me, number> = {
  X: 1,
  Y: 2,
  Z: 3
}

export const getTotalScore = (game: string[]): number => {
  let total = 0
  for (const line of game) {
    const [opponent, me] = line.split(' ')
    total += scores[opponent as Opponent][me as Me] + myShapeScore[me as Me]
  }
  return total
}
