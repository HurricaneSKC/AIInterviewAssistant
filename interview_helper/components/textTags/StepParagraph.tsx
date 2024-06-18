import React from "react";

interface Props {
  paragraphText: string;
}

const StepParagraph = ({ paragraphText }: Props) => {
  return (
    <p className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal my-4">
      {paragraphText}
    </p>
  );
};

export default StepParagraph;
