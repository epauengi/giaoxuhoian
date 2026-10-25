import type { Locale } from "../config";
import en from "./en";
import vi from "./vi";

type DeepString<T> = T extends readonly (readonly [infer A, string])[]
  ? readonly (readonly [A, string])[]
  : T extends string
  ? string
  : T extends object
  ? { readonly [K in keyof T]: DeepString<T[K]> }
  : T;

export const dictionaries = { vi, en } as const;
export type Dictionary = DeepString<typeof vi>;

export function getDictionary(locale: Locale | string = "vi"): Dictionary {
  return locale === "en" ? en : vi;
}
