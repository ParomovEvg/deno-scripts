import { generateView } from "./view/generateView.ts";
import { generateSlice } from "./slice/generateSlice.ts";
import { generateAddSlice } from "./add-slice/addSlice.ts";
export type ViewGenerator = (...args: string[]) => void;

const variants: Record<string, ViewGenerator | undefined> = {
  view: generateView,
  slice: generateSlice,
  addSlice: generateAddSlice,
};

export const generate = (variant: string, ...args: string[]) => {
  const fn = variants[variant];
  if (fn) {
    try {
      fn(...args);
    } catch (e) {
      console.log(
        `Произошла ошибка при генерации шаблона ${variant}`,
        e?.message ?? "",
      );
    }
  } else {
    console.log(templateNotFound(variant, Object.keys(variants)));
  }
};

function templateNotFound(variant: string, variants: string[]) {
  return `
Шаблон генерации с именем не найден ${variant}
Все доступные варианты
${JSON.stringify(variants, null, 2)}`;
}
