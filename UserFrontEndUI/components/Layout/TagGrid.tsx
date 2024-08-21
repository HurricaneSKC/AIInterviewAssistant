import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export const TagGrid = ({ children }: Props) => {
  return (
    <div className="tags flex flex-wrap gap-2 items-center">{children}</div>
  );
};
