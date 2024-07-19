"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SettingsIcon from "@mui/icons-material/Settings";
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
      className={`flex flex-col items-center justify-center ${
        pathname === path ? "font-bold" : ""
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
        Dashboard
      </MobileLink>
      <MobileLink path="/dashboard/my-interviews">
        <BusinessCenterIcon />
        My Interviews
      </MobileLink>
      <MobileLink path="/dashboard/questions">
        <QuestionMarkIcon />
        Questions
      </MobileLink>
      <MobileLink path="/dashboard/settings">
        <SettingsIcon />
        Settings
      </MobileLink>
    </div>
  );
};
