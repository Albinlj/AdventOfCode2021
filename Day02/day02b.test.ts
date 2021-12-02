import { getExample } from "../utils/getInput";
import { map } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/function";
import { match } from "ts-pattern";
import { getInput } from "../utils/getInput";
import { Command, parseCommand, Position } from "./day02a.test";
const input = getInput(__dirname).split("\n");
const example = getExample(__dirname).split("\n");

type Aim = number;
type PositionAndAim = [...Position, Aim];

const executeCommands = (commands: Command[]) =>
  commands.reduce(
    ([depth, horizontal, aim], [direction, length]) =>
      match(direction)
        .with("down", () => [depth, horizontal, aim + length])
        .with("up", () => [depth, horizontal, aim - length])
        .with("forward", () => [depth + aim * length, horizontal + length, aim])
        .exhaustive(),
    [0, 0, 0] as PositionAndAim
  );

const part2 = (input: string[]) => {
  const [depth, horizontal, aim] = pipe(
    input,
    map(parseCommand),
    executeCommands
  );
  return depth * horizontal;
};

test("part 2", () => {
  expect(part2(example)).toEqual(900);
  expect(part2(input)).toEqual(1842742223);
});
