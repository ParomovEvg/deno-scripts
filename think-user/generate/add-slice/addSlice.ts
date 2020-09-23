import * as path from "https://deno.land/std/path/mod.ts";
import { last, camelCase } from "../../lodash.ts";
import {
  indexFile,
  indexFileParseSliceList,
  reducerCodeGenerator,
} from "../slice/index-file/index-file.ts";
import { sliceFile, sliceFileName } from "../slice/slice-file.ts";

export const generateAddSlice = (sliceName: string) => {
  if (!sliceName) return console.log("Введите название создаваемого слайса");
  try {
    const p = path.SEP;
    const text = Deno.readTextFileSync("index.ts");
    const name = camelCase(last(Deno.cwd().split(p)));
    const sliceList = indexFileParseSliceList(text);
    Deno.writeTextFileSync(
      "index.ts",
      indexFile(name, true, Array.from(new Set(sliceList).add(sliceName))),
    );
    Deno.writeTextFileSync(sliceFileName(sliceName), sliceFile(sliceName));
    console.log(sliceList);
  } catch (e) {
    console.log("не удалось найти файл index.ts для записи");
  }
};
