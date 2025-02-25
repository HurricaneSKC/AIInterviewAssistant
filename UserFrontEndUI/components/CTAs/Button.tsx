"use client";

import Link from "next/link";
import React, { Children } from "react";
import RightArrowBlackSVG from "../SVGs/RightArrowBlackSVG";
import RightArrowWhiteSVG from "../SVGs/RightArrowWhiteSVG";

interface Props {
  buttonText: string;
  rightArrow?: boolean;
  primary?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  buttonText,
  rightArrow,
  primary,
  onClick,
  children,
  className,
  type = "button",
}: Props) => {
  const baseStyles =
    "group rounded-full px-4 py-2 font-semibold transition-all flex items-center justify-center no-underline active:scale-95 scale-100 duration-75";
  const PrimaryButtonStyle =
    "bg-primary text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] gap-x-2";
  const WhiteButtonStyle = "bg-[#f5f7f9] text-[#1E2B3A]";
  const styles = `${baseStyles} ${
    primary ? PrimaryButtonStyle : WhiteButtonStyle
  } ${className}`;
  return (
    <button
      onClick={onClick}
      className={styles}
      type={type}
      style={{
        boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
      }}
    >
      {primary && rightArrow ? (
        <>
          <span className="mr-2">{buttonText}</span>
          <RightArrowWhiteSVG />
        </>
      ) : rightArrow ? (
        <>
          <span className="mr-2">{buttonText}</span>
          <RightArrowBlackSVG />
        </>
      ) : (
        <span>{buttonText}</span>
      )}
      {children}
    </button>
  );
};

export default Button;
