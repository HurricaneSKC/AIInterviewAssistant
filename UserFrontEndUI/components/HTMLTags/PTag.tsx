import React from "react";

interface Props {
  children: React.ReactNode;
  small?: boolean;
  large?: boolean;
}

const PTag = ({ children, small, large }: Props) => {
  const classNamesbySize = small ? "text-sm" : large ? "text-4xl mb-12" : "";

  return <p className={`${classNamesbySize}`}>{children}</p>;
};

export default PTag;
