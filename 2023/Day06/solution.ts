// Imports
// #+NAME: imports

// [[file:solution.org::imports][imports]]
import { readData } from '../utils'
// imports ends here

// Types
// #+NAME: types

// [[file:solution.org::types][types]]
type Race = {
  time: number
  distance: number
}
// types ends here

// Sample Inputs
// #+NAME: sample1

// [[file:solution.org::sample1][sample1]]
const sample1: string[] = `Time:      7  15   30
Distance:  9  40  200
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
function parse(input: string[]): Race[] {
  const races = input.map(line => line.split(':').map(part => part.trim()))
  const times = races[0][1]
    .split(' ')
    .filter(Boolean)
    .map(time => Number(time.trim()))
  const dist = races[1][1]
    .split(' ')
    .filter(Boolean)
    .map(dist => Number(dist.trim()))
  return times.map((time, idx) => ({ time, distance: dist[idx] }))
}

function runRace(race: Race): number[] {
  const time = race.time
  const recordToBeat = race.distance

  let distances = []
  for (let holdTime = 1; holdTime < time; holdTime++) {
    const travel = (time - holdTime) * holdTime
    if (travel > recordToBeat) distances.push(travel)
  }

  return distances
}

function part1(input: string[]): number {
  const races = parse(input)
  const travelTimes = races.map(race => runRace(race))
  const totalWins = travelTimes.map(time => time.length)

  return totalWins.reduce((product, winsAmount) => product * winsAmount, 1)
}

// console.log(part1(sample1))
// console.log(part1(readData(__dirname)))
// part1 ends here

// Part 2
// #+NAME: part2

// [[file:solution.org::part2][part2]]
function part2(input: string[]): number {
  const races = parse(input)
  const time = Number(races.map(race => race.time).join(''))
  const distance = Number(races.map(race => race.distance).join(''))
  return runRace({ time, distance }).length

}
// console.log(part2(sample2))
// console.log(part2(readData(__dirname)))
// part2 ends here

// Tests
// #+NAME: tests

// [[file:solution.org::tests][tests]]
describe(__dirname, () => {
  const input = readData(__dirname)

  test('part 1', () => {
    expect(part1(sample1)).toBe(288)
    expect(part1(input)).toBe(219849)
  })

  test('part 2', () => {
    expect(part2(sample2)).toBe(71503)
    expect(part2(input)).toBe(29432455)
  })
})
// tests ends here
