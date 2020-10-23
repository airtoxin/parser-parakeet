import { calculator } from "./index";
import { success } from "./ParseResult";

test("calculator", () => {
  expect(calculator("1+2")).toEqual(success(3, null));
});
