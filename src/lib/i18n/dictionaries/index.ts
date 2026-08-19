import vi from "./vi";

export const dictionaries = { vi } as const;
export type Dictionary = typeof vi;
export const getDictionary = (_locale: "vi" = "vi"): Dictionary => vi;
