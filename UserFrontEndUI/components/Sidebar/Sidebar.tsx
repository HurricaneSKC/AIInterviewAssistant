"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  path: string;
  name: string;
}

const NavLink = ({ path, name }: NavLinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={path}
      className={`mb-4 ${pathname === path ? "font-bold" : ""}`}
    >
      {name}
    </Link>
  );
};
export const Sidebar = () => {
  return (
    <div className="md:flex bg-gray-100 w-[300px] p-10 hidden flex-col text-[20px]">
      <div className="w-full h-[100px] mb-12 flex items-center">
        <p className="text-6xl text-primary">
          <em className="not-italic text-black">AI</em>IA
        </p>
      </div>
      <NavLink path="/dashboard" name="Dashboard" />
      <NavLink path="/dashboard/my-interviews" name="My Interviews" />
      <NavLink path="/dashboard/questions" name="Questions" />
      <NavLink path="/dashboard/resources" name="Resources" />
      <NavLink path="/dashboard/settings" name="Settings" />
    </div>
  );
};
