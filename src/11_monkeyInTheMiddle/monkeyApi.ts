type Item = number

interface Monkey {
  id: number
  items: Item[]
  inspect: (item: Item) => Item
  divider: number
  monkeyIfTrue: Monkey['id']
  monkeyIfFalse: Monkey['id']
}

type MonkeyDic = Record<Monkey['id'], Monkey>

export const parseMonkeys = (input: string[]): MonkeyDic => {
  const monkeys: MonkeyDic = {}
  let currentMonkey: Partial<Monkey> = {}
  let monkeyId = 0

  for (const line of input) {
    // ADD MONKEY TO ARRAY
    if (line === '') {
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
        monkeyIfFalse: currentMonkey.monkeyIfFalse
      }

      monkeyId++
      currentMonkey = {}
      continue
    }
    // STARTING ITEMS
    if (line.startsWith('  Starting items: ')) {
      const [, itemsTxt] = line.split('  Starting items: ')
      currentMonkey.items = itemsTxt.split(', ').map(i => parseInt(i))
      continue
    }
    // OPERATION
    if (line.startsWith('  Operation: new = old ')) {
      const [, operationTxt] = line.split('  Operation: new = old ')
      const [operator, valTxt] = operationTxt.split(' ')
      const op = operator === '+' ? add : mult
      if (valTxt === 'old') {
        currentMonkey.inspect = (i: number) => op(i, i)
        continue
      }
      const value = parseInt(valTxt)
      currentMonkey.inspect = (i: number) => becomeBoredByItem(op(i, value))
      continue
    }
    // TEST
    if (line.startsWith('  Test: divisible by ')) {
      const [, testDiviserTxt] = line.split('  Test: divisible by ')
      console.log(line)
      currentMonkey.divider = +testDiviserTxt
      continue
    }
    // TEST: IF TRUE
    if (line.startsWith('    If true: throw to monkey ')) {
      const [, monkeyIdTxt] = line.split('    If true: throw to monkey ')
      currentMonkey.monkeyIfTrue = +monkeyIdTxt
      continue
    }
    // TEST: IF FALSE
    if (line.startsWith('    If false: throw to monkey ')) {
      const [, monkeyIdTxt] = line.split('    If false: throw to monkey ')
      currentMonkey.monkeyIfFalse = +monkeyIdTxt
      continue
    }
  }
  return monkeys
}

const BORE_LEVEL = 3
const becomeBoredByItem = (i: Item): number => Math.floor(i / BORE_LEVEL)

const add = (a: number, b: number): number => a + b
const mult = (a: number, b: number): number => a * b

export const getReceiver = (i: Item, monkey: Monkey): Monkey['id'] =>
  i % monkey.divider === 0 ? monkey.monkeyIfTrue : monkey.monkeyIfFalse
