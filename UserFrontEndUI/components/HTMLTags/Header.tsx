import React from "react";

interface Props {
  children: React.ReactNode;
  small?: boolean;
  large?: boolean;
  hideMargin?: boolean;
}

interface GetStylesProps {
  smallStyles: string;
  largeStyles: string;
  normalStyles: string;
  small?: boolean;
  large?: boolean;
  hideMargin?: boolean;
}

const getStyles = ({
  smallStyles,
  largeStyles,
  normalStyles,
  small,
  large,
  hideMargin,
}: GetStylesProps) => {
  const margin = hideMargin ? "" : small ? "mb-2" : large ? "mb-20" : "mb-12";
  const sizingStyles = small ? smallStyles : large ? largeStyles : normalStyles;
  return `${margin} ${sizingStyles}`;
};

export const H1 = ({ children, small, large, hideMargin }: Props) => {
  const styles = getStyles({
    smallStyles: "text-4xl",
    largeStyles: "text-[16vw]",
    normalStyles: "text-6xl",
    small,
    large,
    hideMargin,
  });

  return <h1 className={styles}>{children}</h1>;
};

export const H2 = ({ children, small, large, hideMargin }: Props) => {
  const styles = getStyles({
    smallStyles: "font-bold",
    largeStyles: "text-6xl",
    normalStyles: "text-4xl",
    small,
    large,
    hideMargin,
  });

  return <h2 className={styles}>{children}</h2>;
};
