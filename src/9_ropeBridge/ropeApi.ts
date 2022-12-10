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
  const headMvts = parseMovements(rawHeadMovements)

  const knots = [...Array(nbKnots).fill({ x: 0, y: 0 })].map(k => ({
    x: 0,
    y: 0
  }))
  const prevKnots = [...Array(nbKnots).fill(1)].map(k => ({ x: 0, y: 0 }))

  const tailHistory = new Set()
  tailHistory.add('0;0')

  for (const mvt of headMvts) {
    console.log(`== ${mvt.dir}${mvt.nb} ==`)
    const moveHead = headMovementLookup[mvt.dir]

    for (let i = 0; i < mvt.nb; i++) {
      console.log('***** NEXT')
      knots.forEach((knot, kindex) => {
        prevKnots[kindex] = { x: knot.x, y: knot.y }

        if (kindex === 0) {
          moveHead(knot)
          console.log(
            `Knot#1: move from ${displayKnot(
              prevKnots[kindex]
            )} to ${displayKnot(knot)}`
          )

          return
        }

        const aheadKnot = knots[kindex - 1]
        const adjacent = isAdjacent(aheadKnot, knot)

        console.log(
          `Knot#${kindex + 1}: ${displayKnot(aheadKnot)} adj. to ${displayKnot(
            knot
          )}? `,
          adjacent
        )

        if (!adjacent) {
          knots[kindex] = {
            x: prevKnots[kindex - 1].x,
            y: prevKnots[kindex - 1].y
          }
          if (kindex === knots.length - 1) {
            tailHistory.add(displayKnot(knots[kindex]))
          }
        }
      })
    }
  }

  console.log({ prevKnots, knots })

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
