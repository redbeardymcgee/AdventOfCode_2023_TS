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
const sample1: string[] = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
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

// #+BEGIN_QUOTE
// If you can add up all the part numbers in the engine schematic, it should be
// easy to work out which part is missing.

// The engine schematic (your puzzle input) consists of a visual representation of
// the engine. There are lots of numbers and symbols you don't really understand,
// but apparently any number adjacent to a symbol, even diagonally, is a "part
// number" and should be included in your sum. (Periods (.) do not count as a
// symbol.)
// #+END_QUOTE

// My initial thought is to look for the symbols, then check the 8 coordinates
// surrounding the symbol.  Any of the surrounding coordinates are recorded when
// they are a numeric digit from 0-9. After collecting all of these coordinates, I
// will have the position of at least 1 digit in a number.

// I will have to search across the x axis for the rest of the digits in these
// numbers. If x-1 or x+1 is a numeric digit, continue to search in the same
// direction (negative or positive). Once I have found all the digits in a number,
// record the start position (or end position?) and the full number in a Set to
// guarantee uniqueness. I believe the input is already well-formed in such a way
// to prevent duplication, but I really can't be bothered to look at it that
// closely.

// Finally, sum the values in the Set together.

// Typescript was horrifying through this effort because ~[0,0] !== [0,0]~. I'm not
// sure any language is particularly good at equality in this sense because of how
// complex it becomes as the types of the elements may be difficult to compare.

// In the case of two arrays ~[0,1] ++ [0,1]~, each is a different and unique array
// which happens to hold identical values in the same order. But the first zero is not
// the second zero. That's two different zeroes. Equality is impossible to establish
// based on the values. How do I explain that properly?


// [[file:solution.org::*Part 1][Part 1:1]]
const NEIGHBORS = [
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
]

function part1(input: string[]): number {
  const grid = input.map(l => l.split(''))

  const findStart = ([x, y]) => {
    const line = grid.at(y)
    let leftCoord = [x, y]

    for (let i = x; i >= 0; i--) {
      const char = line.at(i)
      if (!/\d/.test(char)) {
        break
      }
      leftCoord = [i, y]
    }
    return leftCoord
  }

  const findPositions = (x, y) => {
    const positions = new Set()
    NEIGHBORS.forEach(([x1, y1]) => {
      const posX = x + x1
      const posY = y + y1
      if (posX < 0 || posX >= grid[0].length) return
      if (posY < 0 || posY >= grid.length) return
      const line = grid.at(posY).join('')
      const char = line.at(posX)
      if (/\d/.test(char)) {
        const startPos = findStart([posX, posY])
        positions.add(JSON.stringify(startPos))
      }
    })
    return positions
  }

  let coords = []
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      let line = grid[y]
      let char = line[x]
      if (!/\d|\./.test(char)) {
        coords.push(findPositions(x, y))
      }
    }
  }

  let numbers = []
  for (let i = 0; i < coords.length; i++) {
    let set = coords[i].values()
    for (let coord of set) {
      let [x, y] = JSON.parse(coord)
      const line = grid[y]
      const char = line[x]
      let num = ``
      for (let i = x; i < line.slice(x).length + x; i++) {
        const c = line[i]
        if (!/\d/.test(c)) {
          break
        }
        num += `${c}`
      }
      numbers.push(Number(num))
    }
  }
  return numbers.reduce((sum, n) => sum + n, 0)
}
// Part 1:1 ends here

// Part 2
// #+NAME: part2

// Part 2 built very easily off of part 1, requiring very little change to the
// approach.  The issue that Typescript gave me was that I kept ending up with
// empty collections when the `*` character did not have 2 neighboring numbers. Or
// maybe when it had zero neighbor numbers? Doesn't matter, Typescript was not
// helpful in making that stop.  I ended up with manual checks trying to discard or
// override the bad data.

// Surely there must be a better approach for this, but I spent a lot of time
// trying to collect my data into some structure to use for debugging intermediate
// values. This has represented many hours of work on my end, while the actual
// algorithmic or problem-solving steps have been radically less time-consuming.
// In both cases, I knew how to solve the puzzle input from a high level but
// struggled trying to coerce Typescript to give me the data I wanted to extract.

// I also tried to approach this more "simply" with basic c-style for loops instead
// of using maps and reduces and other syntax sugar for iterating over my inputs.
// The result of this was that I spent as much or more time trying to track and map
// my indices to data I wanted as I usually spend on map/reduce stuff. I don't think
// manual indexing is very simple or friendly.


// [[file:solution.org::*Part 2][Part 2:1]]
function part2(input: string[]): number {
  const grid = input.map(l => l.split(''))

  const findStart = ([x, y]) => {
    const line = grid.at(y)
    let leftCoord = [x, y]

    for (let i = x; i >= 0; i--) {
      const char = line.at(i)
      if (!/\d/.test(char)) {
        break
      }
      leftCoord = [i, y]
    }
    return leftCoord
  }

  const findPositions = (x, y) => {
    const positions = new Set()
    NEIGHBORS.forEach(([x1, y1]) => {
      const posX = x + x1
      const posY = y + y1
      if (posX < 0 || posX >= grid[0].length) return
      if (posY < 0 || posY >= grid.length) return
      const line = grid.at(posY).join('')
      const char = line.at(posX)
      if (/\d/.test(char)) {
        const startPos = findStart([posX, posY])
        positions.add(JSON.stringify(startPos))
      }
    })
    const thing = []
    for (let pos of positions.values()) {
      thing.push(pos)
    }
    if (thing.length === 2) return thing
  }

  let coords = []
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      let line = grid[y]
      let char = line[x]
      if (char === '*') {
        const foobar = findPositions(x, y) ?? []
        foobar.forEach(x => coords.push(x))
      }
    }
  }

  const products = []
  const numbers = []
  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i]
    let [x, y] = JSON.parse(coord)
    const line = grid[y]
    const char = line[x]
    // const foobar = `${line.slice(0, x)} [${char}] ${line.slice(x)}`
    const numPos = []
    for (let i = x; i < line.slice(x).length + x; i++) {
      const c = line[i]
      if (!/\d/.test(c)) {
        break
      }
      numPos.push(i)
    }
    const num = line.slice(numPos.at(0), numPos.at(-1) + 1).join('')
    numbers.push(num)
  }
  for (let i = 0; i < numbers.length; i += 2) {
    const first = Number(numbers[i])
    const second = Number(numbers[i+1])
    const product = first * second
    products.push(product)
  }
  return products.reduce((sum, n) => sum + n, 0)
}
// Part 2:1 ends here

// Tests
// #+NAME: tests

// [[file:solution.org::tests][tests]]
describe(__dirname, () => {
  const input = readData(__dirname)

  test('part 1', () => {
    expect(part1(sample1)).toBe(4361)
    expect(part1(input)).toBe(514969)
  })

  test('part 2', () => {
    expect(part2(sample2)).toBe(467835)
    expect(part2(input)).toBe(78915902)
  })
})
// tests ends here
