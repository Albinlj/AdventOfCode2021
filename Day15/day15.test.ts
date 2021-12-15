import {
  curry,
  equals,
  findIndex,
  findLastIndex,
  insert,
  last,
  not,
} from "ramda";
import { getInput, getExample } from "../utils/getInput";
import { Coord } from "../utils/grid";

const input = getInput(__dirname);
const example = getExample(__dirname);

type Node = {
  coord: Coord;
  risk: number;
  // prev: Coord;
  total: number;
  neighbors: Coord[];
};

const parse = (input: string) => {
  const width = input.indexOf("\n");
  const cleaned = input.replace(/\s/g, "");
  const height = cleaned.length / width;
  console.log(width);
  console.log(height);

  return Array.from(cleaned).map((risk, i) => {
    const x = i % width;
    const y = Math.floor(i / width);
    return {
      coord: [x, y],
      risk: parseInt(risk),
      total: i === 0 ? 0 : Infinity,
      neighbors: [
        x !== 0 ? [x - 1, y] : undefined,
        x !== width - 1 ? [x + 1, y] : undefined,
        y !== 0 ? [x, y - 1] : undefined,
        y !== height - 1 ? [x, y + 1] : undefined,
      ].filter((n) => n !== undefined),
    } as Node;
  });
};

const getNode = curry((nodes: Node[], x: number, y: number) => {
  nodes.find(({ coord: [a, b] }) => a === x && b === y);
});

const part1 = (input: string, goal: Coord) => {
  const nodes = parse(input);
  let prio = [nodes[0]];
  const visited = [nodes[0].coord.join(",")];

  const get = ([x, y]: Coord) =>
    nodes.find(({ coord: [a, b] }) => a === x && b === y);

  while (get(goal).total === Infinity) {
    const { neighbors, total, coord } = prio.shift();

    for (let nc of neighbors.filter((n) => !visited.includes(n.join(",")))) {
      const neighbor = get(nc);
      neighbor.total = total + neighbor.risk;
      const index = findLastIndex((a) => a.total < neighbor.total, prio);
      prio = insert(index + 1, neighbor, prio);
      visited.push(nc.join(","));
    }
  }

  return get(goal).total;
};

test("part1", () => {
  // expect(part1(example, [9, 9])).toEqual(40);
  expect(part1(input, [99, 99])).toEqual(40);
});

test("partse", () => {
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
