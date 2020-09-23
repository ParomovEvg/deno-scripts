import { camelCase } from "../../lodash.ts";

export const sliceFile = (n: string) => {
  const name = camelCase(n);
  return `import {createSlice} from "@reduxjs/toolkit";

const initialState: {} = {};

export const ${name}Slice = createSlice({
    name: "${name}",
    initialState,
    reducers: {},
});
`;
};
export const sliceFileName = (name: string, dir?: string) =>
  dir ? `${dir}/${name}.slice.ts` : `${name}.slice.ts`;
