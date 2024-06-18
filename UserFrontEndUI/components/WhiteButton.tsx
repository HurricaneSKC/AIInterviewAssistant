import React from "react";

interface Props {
  onClick: () => void;
  buttonText: string;
}

const WhiteButton = ({ onClick, buttonText }: Props) => {
  return (
    <button
      onClick={onClick}
      className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
      style={{
        boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
      }}
    >
      {buttonText}
    </button>
  );
};

export default WhiteButton;
