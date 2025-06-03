export type SearchFast = {
  types: Array<string>;
  locate: string;
};
export function SearchFast(): SearchFast {
  return {
    types: [""],
    locate: "",
  };
}

export function SearchFastLleno(
  typesI: Array<string>,
  locateI: string,
): SearchFast {
  return {
    types: typesI,
    locate: locateI,
  };
}
