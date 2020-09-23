import { createRequire } from "https://deno.land/std/node/module.ts";
const Lodash = createRequire(import.meta.url)(
  "../node_modules/lodash/index.js",
);
const camelCase = Lodash.camelCase;
const capitalize = (s: string) =>
  Array.from(s).map((e, i) => i === 0 ? e.toUpperCase() : e).join("");
const last = Lodash.last;

export { camelCase, capitalize, last };
