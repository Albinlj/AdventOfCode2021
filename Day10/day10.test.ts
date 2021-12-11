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
  "(": number;
  ")": number;
  "[": number;
  "]": number;
  "{": number;
  "}": number;
  "<": number;
  ">": number;
};

type stuff = "{" | "}" | "(" | ")" | "[" | "]" | "<" | ">";

const asciTen = { 4: ")", 6: "]", 9: "}", 12: ">" };

const findCorruptingCharacter = (
  str: string,
  map: {
    4: 0;
    6: 0;
    9: 0;
    12: 0;
  }
) => {
  const tenner = Math.floor(str[0] / 10);

  return findCorruptingCharacter(str.slice(1));
};

const characterToScore = (line: string) => {};

test("part1", () => {
  expect(findCorruptingCharacter("{([(<{}[<>[]}>{[]{[(<()>")).toEqual("}");
  // expect(part1(example)).toEqual(15);
  // expect(part1(input)).toEqual(448);
});
