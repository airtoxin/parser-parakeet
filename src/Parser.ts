import { failure, ParseResult, success } from "./ParseResult";

export type Parser<T> = (input: string) => ParseResult<T>;

export const ch: (expected: string) => Parser<string> = (expected) => (input) =>
  input.startsWith(expected)
    ? success(expected, input.slice(expected.length))
    : failure(input);

export const end: Parser<string> = (input) =>
  input === "" ? success(input, null) : failure(input);

export const regex: (expected: RegExp) => Parser<string> = (expected) => (
  input
) => {
  const match = expected.exec(input);

  return match != null && match.index === 0
    ? success(match[0], input.slice(match[0].length))
    : failure(input);
};
