import { indexFile, indexFileName } from "./index-file/index-file.ts";
import { sliceFile, sliceFileName } from "./slice-file.ts";
import { selectorsFile, selectorsFileName } from "./selectors-file.ts";
import { actionsFile, actionsFileName } from "./actions-file.ts";

export const generateSlice = (dirName: string, ...args: string[]) => {
  const isActions = args.includes("-a");
  const isMalty = args.includes("-m");

  if (!dirName) throw new Error("Не указано имя генерируемого шаблона");
  try {
    Deno.mkdirSync(dirName);
  } catch (e) {
    console.log("Произошла ошибка при создании дирректории");
  }
  Deno.writeTextFileSync(
    indexFileName(dirName),
    isMalty
      ? indexFile(dirName, isActions, ["main"])
      : indexFile(dirName, isActions),
  );
  Deno.writeTextFileSync(
    sliceFileName(isMalty ? "main" : dirName, dirName),
    sliceFile(isMalty ? "main" : dirName),
  );
  Deno.writeTextFileSync(
    selectorsFileName(dirName, dirName),
    selectorsFile(dirName),
  );
  if (isActions) {
    Deno.writeTextFileSync(
      actionsFileName(dirName, dirName),
      actionsFile(dirName),
    );
  }
};
