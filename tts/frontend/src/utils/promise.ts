export type PromiseResult<T, E> = [T, null] | [null, E];

export function clean_await<T>(
  promise: Promise<T>
): Promise<PromiseResult<T, unknown>> {
    //@ts-expect-error error has any type
  return promise.then((data) => [data, null]).catch((e) => [null, e]);
}
