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
  const copy = [...grid]

  const findStart = ([x, y]) => {
    const line = copy.at(y)
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
      // console.log(`=========`)
      // console.log(line)
      // console.log(`This line is: [${line.join(',')}]`)
      // const foobar = line.slice(0, x) + `[${char}]` + line.slice(x)
      // console.log(`'${coord}' === [${[x, y]}] is ${char} in ${foobar}`)
      let num = ``
      for (let i = x; i < line.slice(x).length + x; i++) {
        const c = line[i]
        if (!/\d/.test(c)) {
          // console.log(`NOT DIGIT is ${c} AT POS [${i}, ${y}]`)
          break
        }
        // console.log(`DIGIT is ${c} AT POS [${i}, ${y}]`)
        num += `${c}`
      }
      // console.log(`=========`)
      // console.log(num)
      // console.log(`---------`)
      numbers.push(Number(num))
    }
  }
  // console.log(`Collected Part Numbers vvv`)
  // numbers.map(n => console.log(n))
  // console.log(`Collected Part Numbers ^^^`)
  // console.log(`length of collection === ${numbers.length}`)
  return numbers.reduce((sum, n) => sum + n, 0)
}

// console.log(`Sample 1 Answer should be 4361 === ${part1(sample1)}`)
console.log(`Input 1 Answer should be ???? === ${part1(readData(__dirname))}`)

// Part 1:1 ends here

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
//     expect(part1(sample1)).toBe(4361)
//     expect(part1(input)).toBe(0)
// })

//   test('part 2', () => {
//     expect(part2(sample2)).toBe(0)
//     expect(part2(input)).toBe(0)
//   })
// })
// tests ends here
