export const getMaxCalories = (
  elvesCalories: string[]
): [number, number, number] => {
  let top1 = 0
  let top2 = 0
  let top3 = 0
  let currentElfCarry = 0

  elvesCalories.forEach((elfCalories, i) => {
    if (elvesCalories[i] === '') {
      currentElfCarry = 0
      return
    }

    currentElfCarry += parseInt(elfCalories)

    if (elvesCalories[i + 1] === '' || i + 1 === elvesCalories.length) {
      const btop1 = Math.max(top1, currentElfCarry)
      const btop2 = btop1 > top1 ? top1 : Math.max(top2, currentElfCarry)
      top3 = btop2 > top2 ? top2 : Math.max(top3, currentElfCarry)

      top1 = btop1
      top2 = btop2
    }
  })

  return [top1, top2, top3]
}
