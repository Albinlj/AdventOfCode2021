import { equals, last, not } from "ramda";
import { getInput, getExample } from "../utils/getInput";
import { Coord } from "../utils/grid";

const input = getInput(__dirname);
const example = getExample(__dirname);

type Node = {
  coord: Coord;
  risk: number;
  prev: Coord;
  total: number;
  neighbors: Coord[];
};

const parse = (input: string) => {
  const width = input.indexOf("\n");
  const cleaned = input.replace(/\s/g, "");
  const height = cleaned.length / width;

  return Array.from(cleaned).map((risk, i) => {
    const x = i % width;
    const y = Math.floor(i / width);
    return {
      coord: [x, y],
      risk: parseInt(risk),
      prev: undefined,
      total: i === 0 ? 0 : Infinity,
      neighbors: [
        x !== 0 ? [x - 1, y] : undefined,
        x !== width - 1 ? [x + 1, y] : undefined,
        x !== 0 ? [x, y - 1] : undefined,
        x !== height - 1 ? [x, y + 1] : undefined,
      ].filter((n) => n !== undefined),
    };
  });
};

const Djikstra = () => {};

test("part1", () => {
  expect(parse(example)[0]).toEqual({
    coord: [0, 0],
    neighbors: [
      [1, 0],
      [0, 1],
    ],
    prev: undefined,
    risk: 1,
    total: 0, //start node
  });
  expect(last(parse(example))).toEqual({
    coord: [9, 9],
    neighbors: [
      [8, 9],
      [9, 8],
    ],
    prev: undefined,
    risk: 1,
    total: Infinity,
  });
});
