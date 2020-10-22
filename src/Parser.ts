import { failure, ParseResult, success } from "./ParseResult";

export type Parser<T> = (input: string) => ParseResult<T>;

export const ch: (ch: string) => Parser<string> = (ch) => (input) => {
  return input.startsWith(ch)
    ? success(ch, input.slice(ch.length))
    : failure(input);
};
