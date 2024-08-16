import React from "react";

interface Props {
  children: React.ReactNode;
  small?: boolean;
  large?: boolean;
  className?: string;
}

const PTag = ({ children, small, large, className }: Props) => {
  const classNamesbySize = small ? "text-sm" : large ? "text-4xl mb-12" : "";

  return <p className={`${classNamesbySize} ${className}`}>{children}</p>;
};

export default PTag;
