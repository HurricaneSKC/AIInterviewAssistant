"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import FolderIcon from "@mui/icons-material/Folder";
import { ReactNode } from "react";

interface MobileLinkProps {
  children: ReactNode;
  path: string;
}
const MobileLink = ({ children, path }: MobileLinkProps) => {
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
export const MobileNav = () => {
  return (
    <div className="md:hidden bg-gray-100 w-full p-2 flex justify-around text-sm">
      <MobileLink path="/dashboard">
        <SpaceDashboardIcon />
        <p className="hidden sm:block">Dashboard</p>
      </MobileLink>
      <MobileLink path="/dashboard/my-interviews">
        <BusinessCenterIcon />
        <p className="hidden sm:block">My Interviews</p>
      </MobileLink>
      <MobileLink path="/dashboard/questions">
        <QuestionMarkIcon />
        <p className="hidden sm:block">Questions</p>
      </MobileLink>
      <MobileLink path="/dashboard/resources">
        <FolderIcon />
        <p className="hidden sm:block">Resources</p>
      </MobileLink>
    </div>
  );
};
