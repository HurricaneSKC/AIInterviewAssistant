import { getStyles } from "@/utils/getStyles";
import React from "react";

interface Props {
  children: React.ReactNode;
  small?: boolean;
  large?: boolean;
  className?: string;
  showMargin?: boolean;
}

const PTag = ({
  children,
  small,
  large,
  className,
  showMargin = false,
}: Props) => {
  const styles = getStyles({
    smallStyles: "text-sm",
    largeStyles: "text-4xl mb-12",
    normalStyles: "",
    small,
    large,
    hideMargin: !showMargin,
  });

  return <p className={`${styles} ${className}`}>{children}</p>;
};

export default PTag;
