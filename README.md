# Advent of Code in Typescript

This is a simple framework for solving [Advent of Code] (aka [AoC]) puzzles using Typescript. To use it for your
solutions, fork this project on GitHub so that you can share your solutions.

Every day, [AoC] publishes a new puzzle in 2 parts. The second part is only accessible once you solved the first part.
Together with the puzzle, [AoC] provides a user-specific input file for the puzzle. Thus, this repo has a separate
directory for each day which contains both the input file and the solution code. The solution code uses simple unit
tests for executing the code and capturing the expected answer. Thus, to solve a new puzzle, follow the below
instructions by replacing `2023/Day01` with the correct year and day:

1. Copy the `Template` directory to `2023/Day01`
2. Download the input file for the day and store it in `2023/Day01/input`
3. Add your solution for part 1 to `2023/Day01/solution.org`
4. `org-babel-tangle` the file to output `2023/Day01/solution.ts`
4. Submit the correct answer for part 1 to [AoC]
5. Repeat steps 2 through 4 for part 2
6. Enjoy!

## Setup

Make sure to have a recent NodeJs version installed (version 16 or higher), and run `npm i`. Also sign up for
[AoC] to get access to the personalized puzzle inputs.

# Command line execution

Running `npm test` will execute all the existing tests.
