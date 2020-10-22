import { ch, end } from "./Parser";
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
