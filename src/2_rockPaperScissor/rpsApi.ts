type Opponent = 'A' | 'B' | 'C'
type Me = 'X' | 'Y' | 'Z'

const win = 6
const draw = 3
const loss = 0

export const scoresByShape: Record<Opponent, Record<Me, number>> = {
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
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3 // Scissors
}

/**
 * X means you need to lose
 * Y means you need to end the round in a draw
 * Z means you need to win
 */
const scoresByResult: Record<Opponent, Record<Me, number>> = {
  A: {
    // ROCK
    X: loss + myShapeScore.Z,
    Y: draw + myShapeScore.X,
    Z: win + myShapeScore.Y
  },
  B: {
    // PAPER
    X: loss + myShapeScore.X,
    Y: draw + myShapeScore.Y,
    Z: win + myShapeScore.Z
  },
  C: {
    // SCISSORS
    X: loss + myShapeScore.Y,
    Y: draw + myShapeScore.Z,
    Z: win + myShapeScore.X
  }
}

export const getTotalScore = (game: string[], byShape = true): number => {
  const scores = byShape ? scoresByShape : scoresByResult
  let total = 0
  for (const line of game) {
    const [opponent, me] = line.split(' ')
    total += scores[opponent as Opponent][me as Me]
    if (byShape) total += myShapeScore[me as Me]
  }
  return total
}
