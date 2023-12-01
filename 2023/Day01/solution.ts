// Imports
// #+NAME: imports

// [[file:solution.org::imports][imports]]
import { readData } from '../utils'
// imports ends here

// Sample Inputs
// #+NAME: sample1

// [[file:solution.org::sample1][sample1]]
const sample1: string[] = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`
  .trim()
  .split('\n')
// sample1 ends here



// #+NAME: sample2

// [[file:solution.org::sample2][sample2]]
const sample2: string[] = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`
  .trim()
  .split('\n')
// sample2 ends here

// Part 1
// #+BEGIN_QUOTE
// On each line, the calibration value can be found by combining the first digit
// and the last digit (in that order) to form a single two-digit number.
// #+END_QUOTE

// #+NAME: part1

// [[file:solution.org::part1][part1]]
function part1(input: string[]): number {
  return input.reduce((sum, line) => {
    const digits = line.split('').filter((c) => /\d/.test(c))
    return sum + Number(digits[0] + digits.at(-1))
  }, 0)
}
// part1 ends here

// Part 2
// #+BEGIN_QUOTE
// It looks like some of the digits are actually spelled out with letters: one,
// two, three, four, five, six, seven, eight, and nine also count as valid
// "digits".
// #+END_QUOTE

// The edge case for this input was overlapping words. I chose to take the first
// matched number, and then find the last number by matching in mirrored mode. For
// the given input, this avoids any overlapping words. This would not work in a
// fully generalized case, but it's highly unlikely that any set of desired matches
// would be large enough to include overlap in both directions.

// #+NAME: part2

// [[file:solution.org::part2][part2]]
function part2(input: string[]): number {
  const numbers = new Map([
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9'],
    ['zero', '0'],
  ])
  const forward = /\d|one|two|three|four|five|six|seven|eight|nine|zero/
  const reverse = /\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|orez/

  return input.reduce((sum, line) => {
    const fst = line.match(forward).at(0)
    const snd = line
      .split('')
      .reverse()
      .join('')
      .match(reverse)
      .at(0)
      .split('')
      .reverse()
      .join('')
    const nums = [fst, snd].map((num) => {
      return /\d/.test(num) ? num : numbers.get(num)
    })
    return sum + Number(nums.join(''))
  }, 0)
}
// part2 ends here

// Tests
// #+NAME: tests

// [[file:solution.org::tests][tests]]
describe('Day ', () => {
  const input = readData(__dirname)

  test('part 1', () => {
    expect(part1(sample1)).toBe(142)
    expect(part1(input)).toBe(54159)
  })

  test('part 2', () => {
    expect(part2(sample2)).toBe(281)
    expect(part2(input)).toBe(53866)
  })
})
// tests ends here
