import { getInput, getExample } from "../utils/getInput";
import {
  add,
  aperture,
  concat,
  countBy,
  head,
  last,
  mergeWith,
  splitEvery,
  sum,
} from "ramda";
import { string } from "fp-ts";

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

  const counts = countBy((s) => s as any, final as any);
  let ordered = Object.values(counts);
  ordered.sort((a, b) => b - a);

  return head(ordered) - last(ordered);
};

const part2 = (input: string, times: number = 10) => {
  const [polymer, rules] = parse(input);
  const final = applyRulesGetCounts(polymer, rules, times);

  let ordered = Object.values(final);
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

const applyRulesGetCounts = (
  polymer: string,
  rules: Rules,
  times: number = 1,
  count: number = 10000
): { [index: string]: number } => {
  const pairs = aperture(2, Array.from(polymer));
  const merge =
    polymer[0] + pairs.map(([a, b]) => rules.get(a + b) + b).join("");
  return times === 1
    ? letterCount(merge)
    : splitEvery(count, merge)
        .map((part, i, arr) => part + arr[i][count - 1])
        .reduce(
          (acc, curr) =>
            mergeWith(
              (a, b) => a + b,
              acc,
              applyRulesGetCounts(curr, rules, times - 1)
            ),
          {}
        );
};

const sumObjectStuffs = (a: object, b: object): object => mergeWith(add, a, b);

const letterCount = (polymer: string) => {
  return countBy<string>((s) => s, polymer as any);
};

test("part2", () => {
  expect(part2(example, 10)).toEqual(1588);
  expect(part2(input, 10)).toEqual(4517);
  // expect(part2(input, 20)).toEqual(4495149);
  // expect(part2(input, 40)).toEqual(4517);
});

test("part1", () => {
  const [polymer, rules] = parse(example);
  expect(applyRules(polymer, rules, 1)).toEqual("NCNBCHB");
  expect(applyRules(polymer, rules, 2)).toEqual("NBCCNBBBCBHCB");
  expect(applyRules(polymer, rules, 3)).toEqual("NBBBCNCCNBBNBNBBCHBHHBCHB");
  expect(applyRules(polymer, rules, 4)).toEqual(
    "NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB"
  );
  expect(part1(example, 10)).toEqual(1588);
  expect(part1(input, 10)).toEqual(4517);
});
