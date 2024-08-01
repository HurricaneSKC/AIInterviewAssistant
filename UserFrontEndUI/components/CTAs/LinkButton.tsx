import Link from "next/link";
import React, { Children } from "react";
import RightArrowBlackSVG from "./RightArrowBlackSVG";
import RightArrowWhiteSVG from "../SVGs/RightArrowWhiteSVG";

interface Props {
  pageLink: string;
  buttonText: string;
  rightArrow?: boolean;
  primary?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const LinkButton = ({
  pageLink,
  buttonText,
  rightArrow,
  primary,
  onClick,
  children,
}: Props) => {
  const PrimaryButtonStyle =
    "group rounded-full px-4 py-2 font-semibold transition-all flex items-center justify-center bg-primary text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75";
  const WhiteButtonStyle =
    "group rounded-full px-4 py-2 font-semibold transition-all flex items-center justify-center bg-white text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75";
  return (
    <Link
      href={pageLink}
      onClick={onClick}
      className={primary ? PrimaryButtonStyle : WhiteButtonStyle}
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
    </Link>
  );
};

export default LinkButton;
