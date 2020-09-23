import { generate } from "./generate/generate.ts";

const [actionType, ...args] = Deno.args;

type ActionHandler = (...args: string[]) => void;

const actions: Record<string, ActionHandler | undefined> = {
  g: generate,
  generate: generate,
};

const action = actions[actionType];

if (action) {
  action(...args);
} else {
  console.log(actionNotFoundError(actionType, Object.keys(actions)));
}

function actionNotFoundError(actionName: string, actions: string[]) {
  return `
Не найдено действие с именем ${actionName}    
Все действия
${JSON.stringify(actions, null, 2)}
`;
}
