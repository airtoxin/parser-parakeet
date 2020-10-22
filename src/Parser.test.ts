import { ch, end, regex } from "./Parser";
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
  const wordsParser = regex(/\w+/);

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
