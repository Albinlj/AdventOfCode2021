import { toInt } from "../utils/toInt";
import * as fs from "fs";

import { getInput, getExample } from "../utils/getInput";
import { aperture, countBy, head, identity, last, range } from "ramda";
import { orderBy } from "lodash";
import { string } from "fp-ts";
import { string } from "fp-ts-std";

const input = getInput(__dirname);
const example = getExample(__dirname);

type Rules = Map<string, string>;

const parse = (input: string): [string, Rules] => {
  const [polymer, rules] = input.split("\n\n");
  const parsedRules = rules
    .split("\n")
    .map((line) => line.split(" -> ") as [string, string]);
  return [polymer, new Map(parsedRules) as Rules];
};

const part1 = (input: string, times: number = 10) => {
  const [polymer, rules] = parse(input);
  const final = applyRules(polymer, rules, times);

  const counts = countBy((s) => s, final);
  let ordered = Object.values(counts);
  ordered.sort((a, b) => b - a);

  return head(ordered) - last(ordered);
};

const applyRules = (
  polymer: string,
  rules: Rules,
  times: number = 1
): string => {
  const pairs = aperture(2, Array.from(polymer));
  const ne = polymer[0] + pairs.map(([a, b]) => rules.get(a + b) + b).join("");
  return times === 1 ? ne : applyRules(ne, rules, times - 1);
};

test("part2", () => {
  expect(part2(example)).toEqual(2188189693529);
});

test("part1", () => {
  const [polymer, rules] = parse(example);
  expect(applyRules(polymer, rules, 1)).toEqual("NCNBCHB");
  expect(applyRules(polymer, rules, 2)).toEqual("NBCCNBBBCBHCB");
  expect(applyRules(polymer, rules, 3)).toEqual("NBBBCNCCNBBNBNBBCHBHHBCHB");
  expect(applyRules(polymer, rules, 4)).toEqual(
    "NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB"
  );
  expect(part1(example)).toEqual(1588);
  expect(part1(input)).toEqual(1588);
});
