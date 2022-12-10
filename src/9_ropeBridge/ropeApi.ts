interface Movement {
  nb: number
  dir: string
}

interface Knot {
  x: number
  y: number
}

export const countPositions = (
  rawHeadMovements: string[],
  nbKnots = 2
): number => {
  const directions = parseMovements(rawHeadMovements)

  const rope = [...Array(nbKnots).fill({ x: 0, y: 0 })].map(_k => ({
    x: 0,
    y: 0
  }))
  const prevKnots = [...Array(nbKnots).fill(1)].map(_k => ({ x: 0, y: 0 }))

  const tailHistory = new Set()
  tailHistory.add('0;0')

  for (const direction of directions) {
    const moveHead = headMovementLookup[direction.dir]

    for (let i = 0; i < direction.nb; i++) {
      rope.forEach((knot, j) => {
        prevKnots[j] = { x: rope[j].x, y: rope[j].y }

        if (j === 0) {
          prevKnots[j] = { x: rope[j].x, y: rope[j].y }
          moveHead(knot)
          return
        }

        const aheadKnot = rope[j - 1]
        const adjacent = isAdjacent(aheadKnot, knot)

        if (!adjacent) {
          rope[j] = {
            x: prevKnots[j - 1].x,
            y: prevKnots[j - 1].y
          }
          if (j === rope.length - 1) {
            tailHistory.add(displayKnot(rope[j]))
          }
        }
      })
    }
  }
  return tailHistory.size
}

const isAdjacent = (h: Knot, t: Knot): boolean => {
  const ajdPositions = [
    [h.x - 1, h.y - 1], // TOP ROW
    [h.x, h.y - 1],
    [h.x + 1, h.y - 1],
    [h.x - 1, h.y], // CENTER ROW
    [h.x, h.y],
    [h.x + 1, h.y],
    [h.x - 1, h.y + 1], // BOTTOM ROW
    [h.x, h.y + 1],
    [h.x + 1, h.y + 1]
  ]
  return ajdPositions.map(pos => pos.join(';')).includes(displayKnot(t))
}

const displayKnot = (k: Knot): string => `${k.x};${k.y}`

const headMovementLookup: Record<string, (k: Knot) => void> = {
  U: k => k.y++,
  R: k => k.x++,
  D: k => k.y--,
  L: k => k.x--
}

const parseMovements = (mvts: string[]): Movement[] =>
  mvts.map(m => {
    const [dir, nb] = m.split(' ')
    return {
      nb: +nb,
      dir
    }
  })
