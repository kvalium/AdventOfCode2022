export const getFirstPosition = (input: string, nbChars = 14): number => {
  const letters = Array(nbChars)
    .fill(1)
    .map((_, i) => input.charAt(i))

  if (areDifferent(letters)) return nbChars

  for (let i = nbChars; i <= input.length; i++) {
    for (let j = 0; j < letters.length; j++) {
      letters[j] = letters[j + 1]
    }
    letters[letters.length - 1] = input.charAt(i)
    if (areDifferent(letters)) return i + 1
  }
  return -1
}

const areDifferent = ([...s]: string[]): boolean => {
  const set = new Set<string>()
  for (const x of s) {
    if (set.has(x)) return false
    set.add(x)
  }
  return true
}
