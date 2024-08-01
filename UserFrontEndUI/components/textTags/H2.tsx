import React from "react";

interface Props {
  text: string;
}

const H2 = ({ text }: Props) => {
  return <h2 className="text-4xl text-[#1E2B3A]">{text}</h2>;
};

export default H2;
