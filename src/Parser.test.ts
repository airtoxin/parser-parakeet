import { ch } from "./Parser";
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
