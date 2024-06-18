import React from "react";
import RightArrowWhiteSVG from "./RightArrowWhiteSVG";

interface Props {
  onClick: () => void;
  buttonText: string;
}

const RightArrowButton = ({ onClick, buttonText }: Props) => {
  return (
    <button
      onClick={onClick}
      className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
      style={{
        boxShadow:
          "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
      }}
    >
      <span> {buttonText} </span>
      <RightArrowWhiteSVG />
    </button>
  );
};

export default RightArrowButton;
