export const tsViewTemplate = (NAME: string, bem: boolean) =>
  bem
    ? `import React from 'react';
import cn from 'classnames';
import './${NAME}.scss';
import { bem } from 'utils/bem';

export interface ${NAME}Props {
  className?: string;
}

export const ${NAME}: React.FC<${NAME}Props> = ({
  children,
  className
}) => {
  const b = bem('${NAME}')	
  const blockClassName = cn(className, b());
  return <div className={blockClassName}>{children}</div>;
};`
    : `import React from 'react';
import cn from 'classnames';
import './${NAME}.scss';

export interface ${NAME}Props {
  className?: string;
}

export const ${NAME}: React.FC<${NAME}Props> = ({
  children,
  className
}) => {
  const blockClassName = cn(className, '${NAME}');
  return <div className={blockClassName}>{children}</div>;
};`;
