interface Rows {
  h: Record<number, number[]>
  v: Record<number, number[]>
}

interface ForestAnalysis {
  visibles: number
  bestScenic: number
}

export const analyzeForest = (treesInput: string[]): ForestAnalysis => {
  let visibles = 0
  let bestScenic = 0
  const directions = buildTreeZone(treesInput)

  const colLen = treesInput.length
  const lineLen = treesInput[0].length

  for (let y = 0; y < colLen; y++) {
    const row = directions.h[y]
    for (let x = 0; x < lineLen; x++) {
      const val = +treesInput[y].charAt(x)
      const col = directions.v[x]

      const left = [...row].splice(0, x).reverse()
      const right = [...row].splice(x + 1)
      const top = [...col].splice(0, y).reverse()
      const bottom = [...col].splice(y + 1)

      const isVisible = [left, right, top, bottom].some(
        d => Math.max(...d) < val
      )

      bestScenic = Math.max(
        bestScenic,
        getScenicScore(val, [top, left, right, bottom])
      )

      if (isVisible) {
        visibles++
      }
    }
  }
  return { visibles, bestScenic }
}

const buildTreeZone = (trees: string[]): Rows => {
  const lineLen = trees[0].length
  const rows: Rows = { h: {}, v: {} }

  for (let y = 0; y < trees.length; y++) {
    rows.h[y] = trees[y].split('').map(c => parseInt(c))
    for (let x = 0; x < lineLen; x++) {
      const v = +trees[y].charAt(x)
      if (rows.v[x] === undefined) {
        rows.v[x] = [v]
      } else {
        rows.v[x].push(v)
      }
    }
  }
  return rows
}

const getScenicScore = (val: number, directions: number[][]): number => {
  let scenicScore = 0

  for (const d of directions) {
    if (d.length === 0) return 0
    let score = 0
    for (const t of d) {
      if (val > t) {
        score++
      } else {
        score++
        break
      }
    }

    if (scenicScore === 0) {
      scenicScore = score
      continue
    }

    scenicScore *= score
  }
  return scenicScore
}
