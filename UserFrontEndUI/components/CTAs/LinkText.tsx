import Link from "next/link";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
  pageLink: string;
  linkText: string;
  rightArrow?: boolean;
  primary?: boolean;
}

const LinkText = ({ pageLink, linkText, rightArrow, primary }: Props) => {
  return (
    <Link
      className={`${primary ? "text-primary" : "text-black"} flex items-center`}
      href={pageLink}
    >
      {linkText} {rightArrow && <ChevronRightIcon />}
    </Link>
  );
};

export default LinkText;
