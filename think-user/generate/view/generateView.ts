import { tsViewTemplate } from "./tsViewTemplate.ts";
import { scssViewTemplate } from "./scssViewTemplate.ts";
import { tsContainerTemplate } from "./tsContainerTemplate.ts";

export const generateView = (dirName: string, ...params: string[]) => {
  const isContainer = params.includes("-c");
  const isBem = params.includes("-b");

  if (!dirName) throw new Error("Не указано имя генерируемого шаблона");
  try {
    Deno.mkdirSync(dirName);
  } catch (e) {
    console.log(
      "Произошла ошибка при создании дирректории, если дирректория уже существовала, данные в ней будут переписаны",
    );
  }

  if (isContainer) {
    const tsContainerFileName = `${dirName}View.tsx`;
    const tsViewFileName = `${dirName}.tsx`;
    const viewComponentName = `${dirName}View`;
    const scssFileName = `${viewComponentName}.scss`;
    Deno.writeTextFileSync(
      `${dirName}/${tsContainerFileName}`,
      tsViewTemplate(viewComponentName, isBem),
    );
    Deno.writeTextFileSync(
      `${dirName}/${tsViewFileName}`,
      tsContainerTemplate(dirName, viewComponentName),
    );
    Deno.writeTextFileSync(
      `${dirName}/${scssFileName}`,
      scssViewTemplate(viewComponentName),
    );
  } else {
    const tsFileName = `${dirName}.tsx`;
    const scssFileName = `${dirName}.scss`;
    Deno.writeTextFileSync(`${dirName}/${tsFileName}`, tsViewTemplate(dirName, isBem));
    Deno.writeTextFileSync(
      `${dirName}/${scssFileName}`,
      scssViewTemplate(dirName),
    );
  }
};
