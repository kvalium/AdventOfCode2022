interface Movement {
  nb: number
  dir: string
}

interface Knot {
  x: number
  y: number
}

export const countPositions = (rawHeadMovements: string[]): number => {
  const headMvts = parseMovements(rawHeadMovements)

  const head: Knot = { x: 0, y: 0 }
  let tail: Knot = { x: 0, y: 0 }

  const tailHistory = new Set()
  tailHistory.add('0;0')

  for (const mvt of headMvts) {
    const moveHead = headMovementLookup[mvt.dir]

    for (let i = 0; i < mvt.nb; i++) {
      const previousHead: Knot = { x: head.x, y: head.y }
      moveHead(head)
      const adjacent = isAdjacent(head, tail)
      if (adjacent) continue
      tail = previousHead
      // moveTail(tail, head)
      tailHistory.add(displayKnot(tail))
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
  U: head => head.y++,
  R: head => head.x++,
  D: head => head.y--,
  L: head => head.x--
}

const parseMovements = (mvts: string[]): Movement[] =>
  mvts.map(m => {
    const [dir, nb] = m.split(' ')
    return {
      nb: +nb,
      dir
    }
  })
