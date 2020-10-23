export type ParseResult<T> = Success<T> | Failure;
export type Success<T> = {
  type: "Success";
  next: string | null;
  result: T;
};
export type Failure = {
  type: "Failure";
  next: string | null;
};

export const success = <T>(result: T, next: string | null): Success<T> => ({
  type: "Success",
  next,
  result,
});

export const failure = (next: string | null): Failure => ({
  type: "Failure",
  next,
});

export const isSuccess = <T>(result: ParseResult<T>): result is Success<T> =>
  result.type === "Success";
export const isFailure = <T>(result: ParseResult<T>): result is Failure =>
  result.type === "Failure";
