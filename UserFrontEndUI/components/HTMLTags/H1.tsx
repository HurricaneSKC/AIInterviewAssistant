import React from "react";

interface Props {
  children: React.ReactNode;
  small?: boolean;
  large?: boolean;
}

const H1 = ({ children, small, large }: Props) => {
  const classNamesbySize = (): string => {
    if (small) {
      return "text-4xl";
    } else if (large) {
      return "text-[16vw]";
    } else {
      return "text-6xl";
    }
  };

  return <h1 className={`mb-12 ${classNamesbySize()}`}>{children}</h1>;
};

export default H1;
