"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserProfileButton } from "./UserProfileButton";

interface NavLinkProps {
  path: string;
  name: string;
}

interface SidebarProps {
  children: React.ReactNode;
}

export const NavLink = ({ path, name }: NavLinkProps) => {
  const pathname = usePathname();
  return (
    <Link href={path} className={`${pathname === path ? "font-bold" : ""}`}>
      {name}
    </Link>
  );
};
export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <nav className="md:flex bg-gray-100 w-[300px] p-10 hidden flex-col text-[20px] justify-between">
      <div className="flex flex-col gap-y-6">
        <Link href="/">
          <div className="w-full h-[100px] mb-6 flex items-center">
            <p className="text-6xl text-primary">
              <em className="not-italic text-black">AI</em>IA
            </p>
          </div>
        </Link>
        {children}
      </div>
      <UserProfileButton />
    </nav>
  );
};
