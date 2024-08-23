// components/Navigation/Sidebar.tsx
import Link from "next/link";
import { UserProfileButton } from "./UserProfileButton";
import { ClientNavLink } from "./ClientNavLink";

interface NavLinkProps {
  path: string;
  name: string;
}

interface SidebarProps {
  children: React.ReactNode;
  userName?: string;
}

export const NavLink = ({ path, name }: NavLinkProps) => {
  return <ClientNavLink path={path} name={name} />;
};

export const Sidebar = ({ children, userName = "" }: SidebarProps) => {
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
      <UserProfileButton userName={userName} />
    </nav>
  );
};
