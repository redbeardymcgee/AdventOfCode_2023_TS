import { readData } from '../utils'

const sample1: string[] = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`
  .trim()
  .split('\n')

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

function part1(input: string[]): number {
  return input.reduce((sum, line) => {
    const digits = line.split('').filter((c) => /\d/.test(c))
    return sum + Number(digits[0] + digits.at(-1))
  }, 0)
}

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
