import { camelCase } from "../../../lodash.ts";

export const reducerCodeGenerator = (name: string, sliceList?: string[]) => {
  const generate = (n: string) => `${n}: ${n}Slice.reducer,`;
  return sliceList
    ? `\
export const ${name}Reducer = combineReducers({
  ${sliceList.map(generate).join("\n    ")}
});`
    : `\
export const ${name}Reducer = ${name}Slice.reducer
`;
};

const importCodeGenerator = (
  n: string,
  isActions: boolean,
  sliceList?: string[],
) => {
  const defaultImports = sliceList
    ? `\
import { combineReducers } from 'redux';`
    : ``;
  sliceList = sliceList ?? [n];
  const getSliceImport = (name: string) =>
    `import { ${name}Slice } from './${name}.slice';`;
  const res = `\
${sliceList.map(getSliceImport).join("\n")}
import * as selectors from "./${n}.selectors";
`;
  return isActions
    ? `${res}
import * as actions from "./${n}.actions";
${defaultImports}`
    : `${res}
${defaultImports}`;
};

const actionsCodeGenerator = (
  n: string,
  isActions: boolean,
  sliceList?: string[],
) => {
  return sliceList
    ? `\
export const ${n}Actions = {
    ${sliceList.map((n) => `${n}: ${n}Slice.actions,`).join("\n    ")}
    ${isActions ? "...actions," : ""}
};`
    : `\
export const ${n}Actions = {
    ...${n}Slice.actions,
    ${isActions ? "...actions," : ""}
};`;
};

export const indexFile = (
  n: string,
  isActions: boolean,
  sliceList?: string[],
) => {
  const name = camelCase(n);
  const imports = importCodeGenerator(n, isActions, sliceList);
  const actions = actionsCodeGenerator(n, isActions, sliceList);
  const selectors = `\
export const ${name}Selectors = {
    ...selectors,
};`;
  const end = `/****/`;
  const reducer = reducerCodeGenerator(name, sliceList);
  return [imports, actions, selectors, reducer, end].join("\n\n");
};

export const indexFileParseSliceList = (string: string) => {
  return Array.from(
    string.matchAll(/import {\s*(.*)Slice\s*} from ('|")(.*).slice('|")/g),
  ).map((res) => res[1]);
};

export const indexFileName = (dir?: string) =>
  dir ? `${dir}/index.ts` : `index.ts`;
