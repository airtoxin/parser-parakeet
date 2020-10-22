export type ParseResult<T> = Success<T> | Failure;
export type Success<T> = {
  type: "Success";
  next: string;
  result: T;
};
export type Failure = {
  type: "Failure";
  next: string;
};

export const success = <T>(result: T, next: string): Success<T> => ({
  type: "Success",
  next,
  result,
});

export const failure = (next: string): Failure => ({ type: "Failure", next });
