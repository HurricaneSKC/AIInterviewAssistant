import React from "react";

interface Props {
  headingText: string;
}

const StepHeading = ({ headingText }: Props) => {
  return <h2 className="text-4xl font-bold text-[#1E2B3A]">{headingText}</h2>;
};

export default StepHeading;
