import React from "react";
import cn from "classnames";
import "./TestViewView.scss";

export interface TestViewViewProps {
  className?: string;
}

export const TestViewView: React.FC<TestViewViewProps> = ({
  children,
  className,
}) => {
  const blockClassName = cn(className, "TestViewView");
  return <div className={blockClassName}>{children}</div>;
};
