import { toInt } from "./../utils/toInt";
import { getExample, getInput } from "../utils/getInput";
import { span } from "../utils/span";

const input = getInput(__dirname);
const example = getExample(__dirname);

const simulate = (fish: number[], days: number) => {
  return span(1, days).reduce((acc, curr) => {
    return simulateDay(acc);
  }, fish);
};

const simulateDay = (fishes: number[]) => {
  return fishes.flatMap((f) => (f === 0 ? [6, 8] : [f - 1]));
};

test("simulate day", () => {
  expect(simulateDay([0])).toEqual([6, 8]);
});

test("part 1", () => {
  const fish = example.split(",").map(toInt);
  expect(simulate(fish, 18).length).toEqual(26);
  expect(simulate(fish, 80).length).toEqual(5934);

  const inputFish = input.split(",").map(toInt);
  expect(simulate(inputFish, 80).length).toEqual(386536);
});

test("part 2", () => {
  const fish = example.split(",").map(toInt);
  expect(simulate(fish, 256).length).toEqual(26984457539);

  // const inputFish = input.split(",").map(toInt);
  // expect(simulate(inputFish, 80).length).toEqual(386536);
});
