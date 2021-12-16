import { range } from "fp-ts/lib/ReadonlyNonEmptyArray";
import {
  curry,
  equals,
  findIndex,
  findLastIndex,
  insert,
  last,
  mathMod,
  not,
  splitEvery,
} from "ramda";
import { getInput, getExample, getTextFile } from "../utils/getInput";
import { Coord } from "../utils/grid";

const input = getInput(__dirname);
const example = getExample(__dirname);

const parseHex = (hex: string) => {
  Array.from(hex).map((ch) => {});
};

test("parsing", () => {});
