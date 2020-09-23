export const tsContainerTemplate = (NAME: string, COMPONENT: string) =>
  `import React from 'react';
import { ${COMPONENT} } from './${COMPONENT}';

export interface ${NAME}Props {
    className?:string
}

export const ${NAME}: React.FC<${NAME}Props> = ({className}) => {
  return <${COMPONENT} className={className} />
}`;
