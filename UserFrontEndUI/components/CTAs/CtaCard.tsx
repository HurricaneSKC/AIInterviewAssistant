"use client";
import { Children } from "react";
import Button from "./Button";
import LinkButton from "./LinkButton";

interface Props {
  mainText: string;
  children?: React.ReactNode;
}

export const CtaCard = ({ mainText, children }: Props) => {
  return (
    <div className="bg-primary rounded mb-2 p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 flex-wrap justify-between items-center">
      <p className="text-white">{mainText}</p>
      <div className="md:flex justify-end">
        {/* <LinkButton pageLink={pageLink} buttonText={buttonText} rightArrow /> */}
        {children}
      </div>
    </div>
  );
};
