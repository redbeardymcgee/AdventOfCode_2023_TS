// Imports
// #+NAME: imports

// [[file:solution.org::imports][imports]]
import { readData } from '../utils'
// imports ends here

// Types
// #+NAME: types

// [[file:solution.org::types][types]]

// https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums
const HandType = {
  HighCard: 0,
  OnePair: 1,
  TwoPair: 2,
  ThreeOfAKind: 3,
  FullHouse: 4,
  FourOfAKind: 5,
  FiveOfAKind: 6,
} as const

const Cards = {
  two: 0,
  three: 1,
  four: 2,
  five: 3,
  six: 4,
  seven: 5,
  eight: 6,
  nine: 7,
  ten: 8,
  jack: 9,
  queen: 10,
  king: 11,
  ace: 12,
} as const

const CardStrings = {
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine',
  T: 'ten',
  J: 'jack',
  Q: 'queen',
  K: 'king',
  A: 'ace',
} as const

type Card = keyof typeof CardStrings

type Frequency = { card: Card; frequency: number }

type Hand = {
  cards: Card[]
  bid: number
}

// types ends here

// Sample Inputs
// #+NAME: sample1

// [[file:solution.org::sample1][sample1]]
const sample1: string[] = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`
  .trim()
  .split('\n')
// sample1 ends here

// #+NAME: sample2

// [[file:solution.org::sample2][sample2]]
const sample2: string[] = sample1
// sample2 ends here

// Part 1
// #+NAME: part1

// [[file:solution.org::part1][part1]]

function frequency<T>(element: T, array: T[]): number {
  return array.reduce(
    (frequency, el: T) => (el === element ? frequency + 1 : frequency),
    0,
  )
}

function card(card: Card): number {
  return Cards[CardStrings[card]]
}

function cardFrequencies(cards: Card[]): Frequency[] {
  return [...new Set(cards)].reduce(
    (frequencies, card) => [
      ...frequencies,
      {
        card,
        frequency: frequency(card, cards),
      },
    ],
    [],
  )
}

function parse(input: string[]): Hand[] {
  return input.map(line => {
    const [hand, bid] = line.split(' ')
    const cards = hand.split('') as Card[]
    return {
      cards,
      bid: Number(bid),
    }
  })
}

function score(hand: Hand): number {
  const cards = [...hand.cards].sort((a, b) => card(a) - card(b))

  return (
    cards.at(0) === cards.at(4) ? HandType.FiveOfAKind
    : cards.at(0) === cards.at(3) || cards.at(1) === cards.at(4) ?
      HandType.FourOfAKind
    : (
      (cards.at(0) === cards.at(1) && cards.at(2) === cards.at(4)) ||
      (cards.at(0) === cards.at(2) && cards.at(3) === cards.at(4))
    ) ?
      HandType.FullHouse
    : (
      cards.at(0) === cards.at(2) ||
      cards.at(1) === cards.at(3) ||
      cards.at(2) === cards.at(4)
    ) ?
      HandType.ThreeOfAKind
    : cardFrequencies(cards).length === 3 ? HandType.TwoPair
    : cardFrequencies(cards).length === 4 ? HandType.OnePair
    : HandType.HighCard
  )
}

function scoreSort(a, b): number {
  const first = a.score
  const second = b.score
  const difference = first - second

  if (difference !== 0) {
    return difference
  }

  for (let i = 0; i < a.cards.length; i++) {
    const fst = card(a.cards[i])
    const snd = card(b.cards[i])
    if (fst > snd) return 1
    if (fst < snd) return -1
  }
  return 0
}

function part1(input: string[]): number {
  const hands = parse(input) as Hand[]
  const handsByRank = hands
    .map(hand => ({
      cards: hand.cards,
      bid: hand.bid,
      score: score(hand),
    }))
    .sort(scoreSort)
    .map((hand, idx) => ({
      hand: hand.cards,
      bid: hand.bid,
      score: hand.score,
      rank: idx + 1,
    }))

  handsByRank.map(hand =>
    console.log(`${hand.hand.join('')} IS SCORE ${hand.score}`),
  )
  // console.log(JSON.stringify(handsByRank, null, 2))

  return handsByRank.reduce((sum, hand) => sum + hand.bid * hand.rank, 0)
}
const test = `AAAAK 1
AAAKA 1
AAKAA 1
AKAAA 1
KAAAA 1
KKKKA 1
KKKAK 1
KKAKK 1
KAKKK 1
AKKKK 1`
  .trim()
  .split('\n')
// console.log(part1(sample1))
// console.log(part1(test))
console.log(part1(readData(__dirname)))
// part1 ends here

// Part 2
// #+NAME: part2

// [[file:solution.org::part2][part2]]
function part2(input: string[]): number {
  return 0
}
// part2 ends here

// Tests
// #+NAME: tests

// [[file:solution.org::tests][tests]]
// describe(__dirname, () => {
//   const input = readData(__dirname)

//   test('part 1', () => {
//     expect(part1(sample1)).toBe(6440)
//     expect(part1(input)).toBe(0)
//   })

//   test('part 2', () => {
//     expect(part2(sample2)).toBe(0)
//     expect(part2(input)).toBe(0)
//   })
// })
// tests ends here
