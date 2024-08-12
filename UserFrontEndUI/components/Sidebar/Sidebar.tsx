"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserProfile } from "../UserProfile/UserProfile";
import { useSession } from "next-auth/react";

interface NavLinkProps {
  path: string;
  name: string;
}

const NavLink = ({ path, name }: NavLinkProps) => {
  const pathname = usePathname();
  return (
    <Link href={path} className={`${pathname === path ? "font-bold" : ""}`}>
      {name}
    </Link>
  );
};
export const Sidebar = () => {
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
        <NavLink path="/dashboard" name="Dashboard" />
        <NavLink path="/dashboard/my-interviews" name="My Interviews" />
        <NavLink path="/dashboard/questions" name="Questions" />
        <NavLink path="/dashboard/resources" name="Resources" />
      </div>
      <UserProfile />
    </nav>
  );
};
