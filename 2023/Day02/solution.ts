// Imports
// #+NAME: imports

// [[file:solution.org::imports][imports]]
import { readData } from '../utils'
// imports ends here

// Types
// #+NAME: types

// [[file:solution.org::types][types]]
type Hand = { blue: number; red: number; green: number }
// types ends here

// Sample Inputs
// #+NAME: sample1

// [[file:solution.org::sample1][sample1]]
const sample1: string[] =
  `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`
    .trim()
    .split('\n')
// sample1 ends here

// Part 1
// #+BEGIN_QUOTE
// As you walk, the Elf shows you a small bag and some cubes which are either red,
// green, or blue. Each time you play this game, he will hide a secret number of
// cubes of each color in the bag, and your goal is to figure out information about
// the number of cubes.

// To get information, once a bag has been loaded with cubes, the Elf will reach
// into the bag, grab a handful of random cubes, show them to you, and then put
// them back in the bag. He'll do this a few times per game.

// You play several games and record the information from each game (your puzzle
// input). Each game is listed with its ID number (like the 11 in Game 11: ...)
// followed by a semicolon-separated list of subsets of cubes that were revealed
// from the bag (like 3 red, 5 green, 4 blue).

// In the example above, games 1, 2, and 5 would have been possible if the bag had
// been loaded with that configuration. However, game 3 would have been impossible
// because at one point the Elf showed you 20 red cubes at once similarly, game 4
// would also have been impossible because the Elf showed you 15 blue cubes at
// once. If you add up the IDs of the games that would have been possible, you
// get 8.
// #+END_QUOTE

// I spent an embarrassing amount of time morping this input from lines to an
// object, where each Game ID is a key whose value is an array of rounds keyed by
// the cube colors.

// Traverse the Games object. In each Game, check for valid hands by comparing the
// amount of each color against the amount of in `validCubes`. If all colors have
// fewer cubes in the hand than the amount of cubes in `validCubes`, the hand is
// valid. Accumulate the sum of Game IDs where all hands are valid.

// #+NAME: part1

// [[file:solution.org::part1][part1]]
const validCubes = {
  red: 12,
  green: 13,
  blue: 14,
}

function parse(input: string[]) {
  return input
    .map(game => {
      const [gameId, match] = game.split(':')
      const rounds = match.split(';').map(round =>
        round
          .trim()
          .split(',')
          .map(cube => cube.trim().split(' '))
          .reduce(
            (acc, [amount, color]) => ({ ...acc, [color]: Number(amount) }),
            { blue: 0, red: 0, green: 0 },
          ),
      )
      return [gameId.split(' ').at(1), rounds]
    })
    .reduce((acc, val) => ({ ...acc, [val.at(0) as string]: val.at(1) }), {})
}

function part1(input: string[]): number {
  return Object.entries(parse(input)).reduce((acc, val) => {
    const id = Number(val.at(0))
    const hands: any = val.at(1)
    const valid = hands.filter((hand: any) => {
      return [
        hand.red <= validCubes.red,
        hand.blue <= validCubes.blue,
        hand.green <= validCubes.green,
      ].every(Boolean)
    })
    return hands.length === valid.length ? acc + id : acc
  }, 0)
}

// console.log(`output sample1 should be 8 === ${part1(sample1)}`)
// console.log(`output sample1 should be 2617 === ${part1(readData(__dirname))}`)
// part1 ends here

// Part 2
// #+NAME: sample2

// [[file:solution.org::sample2][sample2]]
const sample2: string[] = sample1
// sample2 ends here

// #+NAME: part2

// [[file:solution.org::part2][part2]]
function part2(input: string[]): number {
  const totals = Object.values(parse(input)).map(game =>
    (game as []).reduce(
      (acc, hand: Hand) => {
        return {
          blue: Math.max(acc.blue, hand.blue),
          red: Math.max(acc.red, hand.red),
          green: Math.max(acc.green, hand.green),
        }
      },
      { blue: 0, red: 0, green: 0 },
    ),
  )
  return [...totals].reduce(
    (acc, val) => acc + val.blue * val.red * val.green,
    0,
  )
}

// console.log(`sample input part 2 should be 2286 ===`, part2(sample2))
// console.log(`real input part 2 should be 59795 ===`, part2(readData(__dirname)))
// part2 ends here

// Tests
// #+NAME: tests

// [[file:solution.org::tests][tests]]
describe('Day 2', () => {
  const input = readData(__dirname)

  test('part 1', () => {
    expect(part1(sample1)).toBe(8)
    expect(part1(input)).toBe(2617)
  })
})

describe('Day 2', () => {
  const input = readData(__dirname)

  test('part 2', () => {
    expect(part2(sample2)).toBe(2286)
    expect(part2(input)).toBe(59795)
  })
})
// tests ends here
