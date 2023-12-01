import { readData } from '../utils'

const sample: string[] = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`
  .trim()
  .split('\n')

function part1(input: string[]): number {
  return input.reduce((acc, line) => {
    const digits = line.split('').filter((c) => /\d/.test(c))
    return acc + Number(digits[0] + digits[digits.length - 1])
  }, 0)
}

function part2(input: string[]): number {
  return 0
}

describe('Day ', () => {
  const input = readData(__dirname)

  test('part 1', () => {
    expect(part1(sample)).toBe(142)
    expect(part1(input)).toBe(54159)
  })

  test('part 2', () => {
    expect(part2(sample)).toBe(0)
    expect(part2(input)).toBe(0)
  })
})
