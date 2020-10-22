import { failure, ParseResult, success } from "./ParseResult";

export type Parser<T> = (input: string) => ParseResult<T>;

export const ch: (ch: string) => Parser<string> = (ch) => (input) =>
  input.startsWith(ch) ? success(ch, input.slice(ch.length)) : failure(input);

export const end: Parser<string> = (input) =>
  input === "" ? success(input, null) : failure(input);