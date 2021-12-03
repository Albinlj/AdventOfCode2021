import { toBitString } from "./../utils/bitStrings";
import { getExample } from "../utils/getInput";
import { getInput } from "../utils/getInput";
const input = getInput(__dirname).split("\n");
const example = getExample(__dirname).split("\n");

const doStuff = (input) => {
  const gammaRate = getGammaRate(input);
  const epsilonRate = flipBits(gammaRate);
  return gammaRate * epsilonRate;
};

const flipBits = (gammaRate: number) =>
  ~gammaRate & parseInt("1".repeat(gammaRate.toString(2).length), 2);

test("getEpsilonRate", () => {
  expect(toBitString(22)).toEqual("10110");
  expect(flipBits(22)).toEqual(9);

  expect((22).toString(2).length).toEqual(5);
});

const getGammaRate = (input: string[]) => {
  const bitsPerRow = input[0].length;

  const columnOneCounts = input.reduce((acc, curr) => {
    return acc.map((count, i) => count + +curr[i]);
  }, new Array(bitsPerRow - 1).fill(0) as number[]);

  console.log(columnOneCounts);

  const bitArray = columnOneCounts
    .map((sum) => (sum > input.length / 2 ? "1" : "0"))
    .join("");

  return parseInt(bitArray, 2);
};

test("flips", () => {
  expect(toBitString(22)).toEqual("10110");
  expect(flipBits(22)).toEqual(9);
});

test("part 1", () => {
  const gamma = getGammaRate(example);
  const expectedGamma = 22;
  expect(gamma).toEqual(expectedGamma);

  const epsilon = flipBits(gamma);
  const expectedEpsilon = 9;
  expect(epsilon).toEqual(expectedEpsilon);

  expect(doStuff(example)).toEqual(198);
  expect(doStuff(input)).toEqual(3847100);
});
