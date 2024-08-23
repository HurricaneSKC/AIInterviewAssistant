import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
export const Card = ({ children, className }: Props) => {
  return (
    <div className={`bg-gray-100 rounded-lg p-4 ${className}`}>{children}</div>
  );
};
