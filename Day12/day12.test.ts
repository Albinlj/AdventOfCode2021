import {
  chain,
  groupBy,
  length,
  map,
  nth,
  pipe,
  reduceBy,
  reverse,
  split,
} from "ramda";
import { getInput, getExample } from "../utils/getInput";

const input = getInput(__dirname);
const example = getExample(__dirname);

type Size = "large" | "small";
type Cave = { name: string; size: Size; exits: string[] };

const parseCaveSystem = pipe(
  split("\n"),
  map(split("-")),
  chain((arr) => [arr, reverse(arr)]),
  reduceBy((exits, [_, exit]) => exits.concat(exit), [], nth(0)),
  Object.entries,
  map(([name, exits]) => ({
    name,
    size: name === name.toUpperCase() ? "large" : "small",
    exits,
  }))
);

const findPaths = () => [];

const part1 = pipe(parseCaveSystem, findPaths, length);

test("part1", () => {
  expect(parseCaveSystem(example)).toEqual([
    { exits: ["A", "b"], name: "start", size: "small" },
    { exits: ["start", "c", "b", "end"], name: "A", size: "large" },
    { exits: ["start", "A", "d", "end"], name: "b", size: "small" },
    { exits: ["A"], name: "c", size: "small" },
    { exits: ["b"], name: "d", size: "small" },
    { exits: ["A", "b"], name: "end", size: "small" },
  ]);
  // expect(part1(example)).toEqual(1656);
  // expect(part1(input)).toEqual(1647);
});
