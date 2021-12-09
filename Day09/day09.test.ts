import { toInt } from "./../utils/toInt";
import { identity, pipe } from "fp-ts/lib/function";
import { getInput, getExample } from "../utils/getInput";
import { reduce, sum } from "ramda";
import { number } from "fp-ts";

const input = getInput(__dirname);
const example = getExample(__dirname);

type Coord = [number, number];

const findLowSpots = (grid: number[][]) =>
  grid.reduce(
    (spots, row, y, grid) => [
      ...spots,
      ...row.reduce(
        (spots, height, x) =>
          (x == 0 || row[x - 1] > height) &&
          (x == row.length - 1 || row[x + 1] > height) &&
          (y == 0 || grid[y - 1][x] > height) &&
          (y == grid.length - 1 || grid[y + 1][x] > height)
            ? [...spots, [y, x] as Coord]
            : spots,
        []
      ),
    ],
    []
  );

const parseGrid = (input: string) =>
  input.split("\n").map((row) => Array.from(row).map(toInt));

const part1 = (input: string) => {
  const grid: number[][] = parseGrid(input);

  const w = grid[0].length;
  const h = grid.length;

  return sum(findLowSpots(grid).map(([y, x]) => 1 + grid[y][x]));
};

const findBasinSize = (coord: Coord, grid: number[][]) => {};

test("part1", () => {
  expect(part1(example)).toEqual(15);
  expect(part1(input)).toEqual(448);
});

test("findBasinSize", () => {
  const grid = parseGrid(example);
  expect(findBasinSize([0, 1], grid)).toBe(3);
  expect(findBasinSize([0, 9], grid)).toBe(9);
  expect(findBasinSize([2, 3], grid)).toBe(14);
  expect(findBasinSize([4, 6], grid)).toBe(9);
});

const part2 = (input: string) => {
  const grid = parseGrid(input);
  const lowspots = findLowSpots(grid);
  // return findBasinSize();
};

test("part1", () => {
  expect(part2(example)).toEqual(1134);
  // expect(part1(input)).toEqual(448);
});
