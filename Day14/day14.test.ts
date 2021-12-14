import { toInt } from "../utils/toInt";
import * as fs from "fs";

import { getInput, getExample } from "../utils/getInput";
import { aperture, range } from "ramda";

const input = getInput(__dirname);
const example = getExample(__dirname);

type Polymer = string;
type Rules = Map<string, string>;

const parse = (input: string): [Polymer, Rules] => {
  const [polymer, rules] = input.split("\n\n");
  const parsedRules = rules.split("\n").map((line) => line.split(" -> "));
  return [polymer as Polymer, new Map(parsedRules) as Rules];
};

const part1 = (input: string) => {
  const [polymer, rules] = parse(input);

  const final = range(1, 10).reduce(
    (poly, i) => applyRules(poly, rules),
    polymer
  );

  return final;
};

const applyRules = (polymer: Polymer, rules: Rules) => {
  const pairs = aperture(2, polymer);
  const ne = polymer[0] + pairs.map(([a, b]) => rules.get(a + b) + b).join("");

  return ne;
};

// test("parsing", () => {
//   expect(parse(example)).toEqual();
// });

test("part1", () => {
  const [polymer, rules] = parse(example);
  expect(applyRules(polymer, rules)).toEqual("NCNBCHB");
  expect(part1(example)).toEqual("NCNBCHB");
});
