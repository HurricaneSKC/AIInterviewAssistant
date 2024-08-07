import React from "react";

interface Props {
  children: React.ReactNode;
  small?: boolean;
  large?: boolean;
}

const H2 = ({ children, small, large }: Props) => {
  const classNamesbySize = (): string => {
    if (small) {
      return "text-xl font-bold";
    } else if (large) {
      return "text-6xl";
    } else {
      return "text-4xl";
    }
  };

  return <h1 className={`mb-12 ${classNamesbySize()}`}>{children}</h1>;
};

export default H2;
