"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  path: string;
  name: string;
}

export const ClientNavLink = ({ path, name }: NavLinkProps) => {
  const pathname = usePathname();
  return (
    <Link href={path} className={`${pathname === path ? "font-bold" : ""}`}>
      {name}
    </Link>
  );
};
