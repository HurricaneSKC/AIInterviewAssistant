import { getStyles } from "@/utils/getStyles";
import React from "react";

interface Props {
  children: React.ReactNode;
  small?: boolean;
  large?: boolean;
  hideMargin?: boolean;
}

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

export const H3 = ({ children, small, large, hideMargin }: Props) => {
  const styles = getStyles({
    smallStyles: "font-bold",
    largeStyles: "text-4xl",
    normalStyles: "text-2xl",
    small,
    large,
    hideMargin,
  });

  return <h3 className={styles}>{children}</h3>;
};

export const H4 = ({ children, small, large, hideMargin }: Props) => {
  const styles = getStyles({
    smallStyles: "font-bold",
    largeStyles: "text-2xl",
    normalStyles: "text-xl",
    small,
    large,
    hideMargin,
  });

  return <h4 className={styles}>{children}</h4>;
};
