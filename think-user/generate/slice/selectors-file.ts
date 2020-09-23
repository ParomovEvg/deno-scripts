import { camelCase, capitalize } from "../../lodash.ts";

export const selectorsFile = (name: string) =>
  `export const select${
    capitalize(camelCase(name))
  } = (state: RootState) => state.${camelCase(name)}
`;
export const selectorsFileName = (name: string, dir?: string) =>
  dir ? `${dir}/${name}.selectors.ts` : `${name}.selectors.ts`;
