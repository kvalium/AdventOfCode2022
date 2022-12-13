type Item = number

interface Monkey {
  id: number
  items: Item[]
  inspect: (item: Item) => Item
  divider: number
  monkeyIfTrue: Monkey['id']
  monkeyIfFalse: Monkey['id']
  nbInspectedItems: number
}

type MonkeyDic = Record<Monkey['id'], Monkey>

export const runMonkeyBusiness = (
  monkeys: MonkeyDic,
  nbRounds = 20
): MonkeyDic => {
  for (let round = 0; round < nbRounds; round++) {
    for (const monkeyId in monkeys) {
      const monkey = monkeys[monkeyId]
      for (const item of monkey.items) {
        const updatedItemWorry = monkey.inspect(item)
        monkey.nbInspectedItems++
        removeFirstItem(monkey)
        const nextMonkeyId = getReceiver(updatedItemWorry, monkey)
        monkeys[nextMonkeyId].items.push(updatedItemWorry)
      }
    }
  }
  // console.log(displayMonkeys(monkeys))
  return monkeys
}

export const getTop2MonkeysScore = (monkeys: MonkeyDic): number => {
  let top1 = 0
  let top2 = 0
  for (const m in monkeys) {
    const monkey = monkeys[m]
    const oldTop1 = top1
    top1 = Math.max(top1, monkey.nbInspectedItems)
    top2 = oldTop1 !== top1 ? oldTop1 : top2
  }
  return top1 * top2
}

export const parseMonkeys = (input: string[]): MonkeyDic => {
  const monkeys: MonkeyDic = {}
  let currentMonkey: Partial<Monkey> = {}
  let monkeyId = 0

  input.forEach((line, i) => {
    // ADD MONKEY TO ARRAY
    if (line === '' || i === input.length - 1) {
      if (
        currentMonkey?.inspect === undefined ||
        currentMonkey?.divider === undefined ||
        currentMonkey?.monkeyIfTrue === undefined ||
        currentMonkey?.monkeyIfFalse === undefined ||
        currentMonkey?.items === undefined
      ) {
        throw new Error('no monkey op')
      }

      monkeys[monkeyId] = {
        id: monkeyId,
        items: currentMonkey.items,
        inspect: currentMonkey.inspect,
        divider: currentMonkey.divider,
        monkeyIfTrue: currentMonkey.monkeyIfTrue,
        monkeyIfFalse: currentMonkey.monkeyIfFalse,
        nbInspectedItems: 0
      }

      monkeyId++
      currentMonkey = {}
      return
    }
    // STARTING ITEMS
    if (line.startsWith('  Starting items: ')) {
      const [, itemsTxt] = line.split('  Starting items: ')
      currentMonkey.items = itemsTxt.split(', ').map(i => parseInt(i))
      return
    }
    // OPERATION
    if (line.startsWith('  Operation: new = old ')) {
      const [, operationTxt] = line.split('  Operation: new = old ')
      const [operator, valTxt] = operationTxt.split(' ')
      const op = operator === '+' ? add : mult
      if (valTxt === 'old') {
        currentMonkey.inspect = (i: number) => becomeBoredByItem(op(i, i))
        return
      }
      const value = parseInt(valTxt)
      currentMonkey.inspect = (i: number) => becomeBoredByItem(op(i, value))
      return
    }
    // TEST
    if (line.startsWith('  Test: divisible by ')) {
      const [, testDiviserTxt] = line.split('  Test: divisible by ')
      currentMonkey.divider = +testDiviserTxt
      return
    }
    // TEST: IF TRUE
    if (line.startsWith('    If true: throw to monkey ')) {
      const [, monkeyIdTxt] = line.split('    If true: throw to monkey ')
      currentMonkey.monkeyIfTrue = +monkeyIdTxt
      return
    }
    // TEST: IF FALSE
    if (line.startsWith('    If false: throw to monkey ')) {
      const [, monkeyIdTxt] = line.split('    If false: throw to monkey ')
      currentMonkey.monkeyIfFalse = +monkeyIdTxt
    }
  })
  // console.log(displayMonkeys(monkeys))
  return monkeys
}

const BORE_LEVEL = 3
const becomeBoredByItem = (i: Item): number => Math.floor(i / BORE_LEVEL)

const add = (a: number, b: number): number => a + b
const mult = (a: number, b: number): number => a * b

export const getReceiver = (i: Item, monkey: Monkey): Monkey['id'] =>
  i % monkey.divider === 0 ? monkey.monkeyIfTrue : monkey.monkeyIfFalse

const removeFirstItem = (m: Monkey): void => {
  const [, ...items] = m.items
  m.items = items
}

export const displayMonkeys = (monkeys: MonkeyDic): any => {
  const monkR = []
  for (const monkeyId in monkeys) {
    const monkey = monkeys[monkeyId]
    monkR.push({
      id: monkey.id,
      items: monkey.items
    })
  }
  return monkR
}
