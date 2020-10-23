import { ch, end, regex, seq, map, alt, Parser } from "./Parser";
import { Success } from "./ParseResult";

const integers = map(regex(/\d+/), (num) => Number.parseInt(num, 10));

const ops = map<any, number>(
  seq([integers, alt([ch("+"), ch("-"), ch("*"), ch("/")]), integers]),
  ([left, op, right]: [
    Success<number>,
    Success<"+" | "-" | "*" | "/">,
    Success<number>
  ]) => {
    switch (op.result) {
      case "+":
        return left.result + right.result;
      case "-":
        return left.result - right.result;
      case "*":
        return left.result * right.result;
      case "/":
        return left.result / right.result;
    }
  }
);

export const calculator = map<any, number>(
  seq([ops, end]),
  (results: [Success<number>, unknown]) => results[0].result
);
