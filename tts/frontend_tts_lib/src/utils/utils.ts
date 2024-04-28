import { AxiosError } from "axios";

export type PromiseResult<T, E> = [T, null] | [null, E];

export function clean_await<T, S = unknown>(
  promise: Promise<T>
): Promise<PromiseResult<T, S>> {
  //@ts-expect-error error has any type
  return promise.then((data) => [data, null]).catch((e) => [null, e]);
}

export function format_axios_error(e: AxiosError): string {
  return JSON.stringify(e.toJSON(), null, 2);
}
