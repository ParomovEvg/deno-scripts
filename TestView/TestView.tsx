import React from "react";
import { TestViewView } from "TestViewView";

export interface TestViewProps {
  className?: string;
}

export const TestView: React.FC<TestViewProps> = ({ className }) => {
  return <TestViewView className={className} />;
};
