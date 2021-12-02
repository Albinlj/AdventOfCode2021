import { getExample } from "../utils/getInput";
import { map } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/function";
import { match } from "ts-pattern";
import { getInput } from "../utils/getInput";
const input = getInput(__dirname).split("\n");
const example = getExample(__dirname).split("\n");

//parsing input
type Direction = "forward" | "down" | "up";
type Amount = number;
export type Command = [Direction, Amount];

export const parseCommand = (str: string) => {
  const [command, direction] = str.split(" ");
  return [command, parseInt(direction)] as Command;
};

test("parse", () => {
  expect(pipe(["forward 5", "down 8", "up 2"], map(parseCommand))).toEqual([
    ["forward", 5],
    ["down", 8],
    ["up", 2],
  ]);
});

//part 1
type Depth = number;
type Horizontal = number;
export type Position = [Depth, Horizontal];

const executeCommands = (commands: Command[]) =>
  commands.reduce(
    ([depth, horizontal], [direction, length]) =>
      match(direction)
        .with("down", () => [depth + length, horizontal])
        .with("up", () => [depth - length, horizontal])
        .with("forward", () => [depth, horizontal + length])
        .exhaustive(),
    [0, 0] as Position
  );

const part1 = (input: string[]) => {
  const [depth, horizontal] = pipe(input, map(parseCommand), executeCommands);
  return depth * horizontal;
};

test("part1", () => {
  expect(part1(example)).toEqual(150);
  expect(part1(input)).toEqual(2150351);
});
