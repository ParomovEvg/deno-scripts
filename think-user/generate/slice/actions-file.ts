import { camelCase, capitalize } from "../../lodash.ts";

export const actionsFile = (n: string) => {
  const name = camelCase(n);
  return `const n = nameCreatorFactory("${name}");
export const action${capitalize(name)}Create = createAction(n("${
    capitalize(name)
  }Create"));
`;
};
export const actionsFileName = (name: string, dir?: string) =>
  dir ? `${dir}/${name}.actions.ts` : `${name}.actions.ts`;
