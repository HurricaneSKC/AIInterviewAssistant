import Link from "next/link";
import { ReactNode } from "react";

interface ConditionalLinkProps {
  condition: boolean;
  href: string;
  children: ReactNode;
}

export const ConditionalLink = ({
  condition,
  href,
  children,
}: ConditionalLinkProps) =>
  condition ? <Link href={href}>{children}</Link> : <>{children}</>;
