import React from "react";
import RightArrowWhiteSVG from "../SVGs/RightArrowWhiteSVG";

interface Props {
  onClick: () => void;
  buttonText: string;
}

const RightArrowButton = ({ onClick, buttonText }: Props) => {
  return (
    <button
      onClick={onClick}
      className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-primary text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2 active:scale-95 scale-100 duration-75"
      style={{
        boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
      }}
    >
      <span> {buttonText} </span>
      <RightArrowWhiteSVG />
    </button>
  );
};

export default RightArrowButton;
