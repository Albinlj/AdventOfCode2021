import { string } from "fp-ts";
import { head, map, pipe, reduce, reduceRight, split, sum, tail } from "ramda";
import { match } from "ts-pattern";
import { getInput, getExample } from "../utils/getInput";

const input = getInput(__dirname);
const example = getExample(__dirname);

const part1 = pipe(
  split("\n"),
  map<string[]>(Array.from),
  map(findCorruptingCharacter),
  map(characterToScore),
  sum
);

type charmap = {
  a: number;
  b: number;
  c: number;
  d: number;
};

type stuff = "{" | "}" | "(" | ")" | "[" | "]" | "<" | ">";

const findCorruptingCharacter = (
  chs: string[],
  map: charmap = { a: 0, b: 0, c: 0, d: 0 }
) => {
  console.log(head(chs));
  console.log(chs.length);
  return match(head(chs) as stuff)
    .with("(", () =>
      findCorruptingCharacter(tail(chs), { ...map, a: map.a + 1 })
    )
    .with("[", () =>
      findCorruptingCharacter(tail(chs), { ...map, b: map.b + 1 })
    )
    .with("{", () =>
      findCorruptingCharacter(tail(chs), { ...map, c: map.c + 1 })
    )
    .with("<", () =>
      findCorruptingCharacter(tail(chs), { ...map, d: map.d + 1 })
    )
    .with(")", (e) =>
      a === 0 ? e : findCorruptingCharacter(tail(chs), { a: a - 1, b, c, d })
    )
    .with("]", (e) =>
      b === 0 ? e : findCorruptingCharacter(tail(chs), { a, b: b - 1, c, d })
    )
    .with("}", (e) =>
      c === 0 ? e : findCorruptingCharacter(tail(chs), { a, b, c: c - 1, d })
    )
    .with(">", (e) =>
      d === 0 ? e : findCorruptingCharacter(tail(chs), { a, b, c, d: d - 1 })
    )
    .exhaustive();
};

const characterToScore = (line: string) => {};

test("part1", () => {
  expect(
    findCorruptingCharacter(Array.from("{([(<{}[<>[]}>{[]{[(<()>"))
  ).toEqual("}");
  // expect(part1(example)).toEqual(15);
  // expect(part1(input)).toEqual(448);
});
