import { ch, end, regex, seq } from "./Parser";
import { failure, success } from "./ParseResult";

describe("ch", () => {
  const okParser = ch("ok");

  test("Parse success", () => {
    expect(okParser("ok rest")).toEqual(success("ok", " rest"));
  });

  test("Parse failure", () => {
    expect(okParser("not ok")).toEqual(failure("not ok"));
  });
});

describe("end", () => {
  test("Parse success", () => {
    expect(end("")).toEqual(success("", null));
  });

  test("Parse failure", () => {
    expect(end("rest")).toEqual(failure("rest"));
  });
});

describe("regex", () => {
  const wordsParser = regex(/[a-z]+/);

  test("Parse success", () => {
    expect(wordsParser("foo rest.")).toEqual(success("foo", " rest."));
    expect(wordsParser("foo2bar")).toEqual(success("foo", "2bar"));
    expect(wordsParser("a!")).toEqual(success("a", "!"));
  });

  test("Parse failure", () => {
    expect(wordsParser(";a")).toEqual(failure(";a"));
    expect(wordsParser("0a")).toEqual(failure("0a"));
  });
});

describe("seq", () => {
  const wordsParser = regex(/[a-z]+/);
  const whitespacesParser = regex(/\s+/);
  const numbersParser = regex(/\d+/);
  const parser = seq([wordsParser, whitespacesParser, numbersParser]);

  test("Parse success", () => {
    expect(parser("foo 0123 rest")).toEqual(
      success(
        [
          success("foo", " 0123 rest"),
          success(" ", "0123 rest"),
          success("0123", " rest"),
        ],
        " rest"
      )
    );
  });

  test("Parse failure (sudden death)", () => {
    expect(parser("0 a")).toEqual(failure("0 a"));
    expect(parser(" a")).toEqual(failure(" a"));
    expect(parser("!a")).toEqual(failure("!a"));
  });

  test("Parse failure (halfway death)", () => {
    expect(parser("foo  !!")).toEqual(failure("foo  !!"));
  });
});
