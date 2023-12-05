// Imports
// #+NAME: imports

// [[file:solution.org::imports][imports]]
import { readData } from '../utils'
// imports ends here

// Types
// #+NAME: types

// [[file:solution.org::types][types]]

// types ends here

// Sample Inputs
// #+NAME: sample1

// [[file:solution.org::sample1][sample1]]
const sample1: string[] = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
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
function part1(input: string[]): number {
  const cards = input.map(line => line.trim())
  return cards.reduce((sum, card) => {
    const [_, hand] = card.split(':').map(parts => parts.trim())
    const [winners, mine] = hand
      .split('|')
      .map(nums => nums.trim())
      .map(nums => nums.split(' ').filter(num => num !== ''))
    const baz = mine.filter(v => winners.includes(v))
    return baz.length > 0 ? sum + 2 ** (baz.length - 1) : sum
  }, 0)
}
// console.log(part1(sample1))
// console.log(part1(readData(__dirname)))
// part1 ends here

// Part 2
// #+NAME: part2

// [[file:solution.org::part2][part2]]
function part2(input: string[]): number {
  const cards = input.map(line => line.trim())
  let stupid = {}
  for (let i = 0; i < cards.length; i++) {
    stupid = { ...stupid, [i]: 1 }
  }
  const foo = cards.reduce((acc, card, idx) => {
    const [_, hand] = card.split(':').map(parts => parts.trim())
    const [winners, mine] = hand
      .split('|')
      .map(nums => nums.trim())
      .map(nums => nums.split(' ').filter(num => num !== ''))
    const matches = mine.filter(v => winners.includes(v))

    for (let baz = 0; baz < acc[idx] ?? 1; baz++) {
      for (let i = 1; i <= matches.length; i++) {
        const val = acc[idx + i] ?? 1
        acc[idx + i] = val + 1
      }
    }

    return acc
  }, stupid)
  console.log(foo)
  const result = Object.values(foo).reduce(
    (sum: number, val: number) => sum + val,
    0,
  ) as number
  return result
}

console.log(part2(sample2))
console.log(part2(readData(__dirname)))
// part2 ends here

// Tests
// #+NAME: tests

// [[file:solution.org::tests][tests]]
// describe(__dirname, () => {
//   const input = readData(__dirname)

//   test('part 1', () => {
//     expect(part1(sample1)).toBe(13)
//     expect(part1(input)).toBe(20855)
//   })

//   test('part 2', () => {
//     expect(part2(sample2)).toBe(30)
//     expect(part2(input)).toBe(5489600)
//   })
// })
// tests ends here
