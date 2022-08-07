import { range, reduceWhile } from "ramda";

type Snail = string;

const add = (a: Snail, b: Snail) => {
  const sum = `[${a},${b}]`;
  return reduce(sum);
};

const reduce = (s: Snail): Snail => {
  const exploded = explode(s);
  if (exploded !== false) return reduce(exploded);

  const splitted = split(s);
  if (splitted !== false) return reduce(splitted);

  return s;
};

const explode = (s: Snail): Snail | false => {
  let depth = 0;

  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === "[") depth++;
    if (s.charAt(i) === "]") depth--;
    if (depth === 4) {
      const closingIndex = s.slice(i).indexOf("]");
      const [a, b] = s
        .slice(i + 1, closingIndex)
        .split(",")
        .map((a) => parseInt(a));

      //continue. Find numbers to add to.
      // Array.from(s.slice(0, i)).find ((a) => a !== "[" && a !== "]");

      let regexp = /(\d)+/g;
      let matches = [...s.matchAll(regexp)];

      console.log(s);
      matches.forEach((match) => {
        console.log(match.index);
      });
    }
  }
  return false;
};

const split = (s: Snail): Snail | false => {
  const toSplit = s.match(/(\d+)/g).find((a) => a.length > 1);
  if (toSplit) {
    const num = parseInt(toSplit);
    const index = s.indexOf(toSplit);

    return reduce(
      s.slice(0, index) +
        "[" +
        Math.floor(num / 2) +
        "," +
        Math.ceil(num / 2) +
        "]" +
        s.slice(index + toSplit.length)
    );
  }
};

test("explode", () => {
  expect(explode("[[[[[9,8],1],2],3],4]")).toBe("[[[[0,9],2],3],4]");
});
