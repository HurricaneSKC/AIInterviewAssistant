"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface MobileLinkProps {
  children: ReactNode;
  path: string;
}

interface MobileNavProps {
  children: ReactNode;
}

export const MobileLink = ({ children, path }: MobileLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={`flex flex-col min-h-[50px] items-center justify-center ${
        pathname === path ? "font-bold text-primary" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export const MobileLinkText = ({ text }: { text: string }) => {
  return <p className="hidden sm:block">{text}</p>;
};
export const MobileNav = ({ children }: MobileNavProps) => {
  return (
    <div className="md:hidden bg-gray-200 w-full p-2 flex justify-around text-sm">
      {children}
    </div>
  );
};
