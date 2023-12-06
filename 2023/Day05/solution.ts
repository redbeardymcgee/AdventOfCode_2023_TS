// Imports
// #+NAME: imports

// [[file:solution.org::imports][imports]]
import { readData } from '../utils'
// imports ends here

// Types
// #+NAME: types

type InstructionLine = {
  destination: number
  source: number
  length: number
}
type Instructions = {
  name: string
  instructionLines: InstructionLine[]
}

type Seed = number

type Almanac = {
  seeds: Seed[]
  instructionMaps: Instructions[]
}

// [[file:solution.org::types][types]]

// types ends here

// Sample Inputs
// #+NAME: sample1

// [[file:solution.org::sample1][sample1]]
const sample1: string[] = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`
  .trim()
  .split('\n\n')
// sample1 ends here

// #+NAME: sample2

// [[file:solution.org::sample2][sample2]]
const sample2: string[] = ``.trim().split('\n\n')
// sample2 ends here

// Part 1
// #+NAME: part1

// [[file:solution.org::part1][part1]]

function parse(input: string[]): Almanac {
  const blocks = input.map(block => block.trim().split('\n'))
  const seeds = blocks[0][0]
    .split(':')
    .map(parts => parts.trim())
    .slice(1)
    .at(0)
    .split(' ')
    .map(seed => Number(seed.trim()))

  const instructionMaps: Instructions[] = blocks.slice(1).map(block => {
    const name = block.at(0).substring(0, block.at(0).length - 5)
    const instructionLines = block.slice(1).map(instruction => {
      const [destination, source, length] = instruction
        .split(' ')
        .map(n => Number(n))

      return {
        destination,
        source,
        length,
      }
    })

    return {
      name,
      instructionLines,
    }
  })

  return {
    seeds,
    instructionMaps,
  }
}

function part1a(input: string[]) {
  const almanac = Object.values(parse(input))
  const seeds = almanac.at(0) as Seed[]
  const maps = almanac.slice(1).at(0) as Instructions[]
  const collection = []
  for (let j = 0; j < seeds.length; j++) {
    let soilNumber = seeds[j]
    mapLoop: for (const map of maps) {
      const instructions = map.instructionLines

      for (let i = 0; i < instructions.length; i++) {
        const src = instructions[i].source
        const dst = instructions[i].destination
        const len = instructions[i].length

        if (soilNumber >= src && soilNumber <= src + len) {
          const delta = soilNumber - src
          const position = dst + delta
          soilNumber = position
          continue mapLoop
        }
      }
    }
    collection.push(soilNumber)
  }
  return Math.min(...collection)
}

console.log(part1a(sample1))
// console.log(part1a(sample2))

function part1b(input: string[]): number {
  const almanac = Object.values(parse(input))
  const seeds = almanac.at(0) as Seed[]
  const maps = almanac.slice(1).at(0) as Instructions[]
  const allPositions = seeds.map(seed => {
    let foobar = 0
    let breakout = false
    for (const map of maps) {
      foobar = map.instructionLines.reduce((pos, val, idx) => {
        if (breakout) return pos
        const src = val.source
        const dst = val.destination
        const len = val.length

        if (pos >= src && pos <= src + len) {
          const delta = pos - src
          const position = dst + delta
          breakout = true
          return position
        } else {
          return pos
        }
      }, seed)
      seed = foobar
      breakout = false
    }
    return foobar
  })
  return Math.min(...allPositions)
}

console.log(part1b(sample1))
// console.log(part1b(sample2))

// part1 ends here

// Part 2
// #+NAME: part2

// [[file:solution.org::part2][part2]]
function part2(input: string[]): number {
  const almanac = Object.values(parse(input))
  const seeds = almanac.at(0) as Seed[]
  const maps = almanac.slice(1).at(0) as Instructions[]
  let lowest = Number.MAX_SAFE_INTEGER
  for (let foo = 0; foo < seeds.length; foo += 2) {
    const start = seeds[foo]
    const range = seeds[foo + 1]

    for (let j = start; j < start + range; j++) {
      let soilPatch = seeds[foo]
      const patches = [j]
      for (const map of maps) {
        const instructions = map.instructionLines

        for (let i = 0; i < instructions.length; i++) {
          const dst = instructions[i].destination
          const src = instructions[i].source
          const len = instructions[i].length + src

          if (soilPatch >= src && soilPatch < len) {
            const delta = soilPatch - src
            const position = dst + delta
            soilPatch = position
            break
          }
        }
        patches.push(soilPatch)
      }
      const lowestPatch = Math.min(...patches)
      lowest = lowest > lowestPatch ? lowestPatch : lowest
    }
  }
  return lowest
}
console.log(`${part2(sample1)} should be 46`)
// console.log(`${part2(sample2)} should be 46`)
// part2 ends here

// Tests
// #+NAME: tests

// [[file:solution.org::tests][tests]]
// describe(__dirname, () => {
//   const input = readData(__dirname)

//   test('part 1', () => {
//     expect(part1(sample1)).toBe(35)
//     expect(part1(input)).toBe(0)
//   })

//   test('part 2', () => {
//     expect(part2(sample2)).toBe(0)
//     expect(part2(input)).toBe(0)
//   })
// })
// tests ends here
