import {
  failure,
  isFailure,
  isSuccess,
  ParseResult,
  success,
} from "./ParseResult";

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

export const seq: (
  parsers: Parser<unknown>[]
) => Parser<ParseResult<unknown>[]> = (parsers) => (input) => {
  let next: string | null = input;
  const results: ParseResult<unknown>[] = [];

  for (const parser of parsers) {
    if (next == null) throw new Error("Expect string input but got null.");
    const result = parser(next);
    results.push(result);
    next = result.next;
    if (isFailure(result)) break;
  }

  return results.length !== 0 && results.every((r) => isSuccess(r))
    ? success(results, next)
    : failure(input);
};

export const alt: (parsers: Parser<unknown>[]) => Parser<unknown> = (
  parsers
) => (input) => {
  for (const parser of parsers) {
    const result = parser(input);
    if (isSuccess(result)) return result;
  }
  return failure(input);
};
