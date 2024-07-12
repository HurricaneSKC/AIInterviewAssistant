"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

export const MobileNav = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="md:hidden bg-gray-100 w-full p-2 flex justify-around">
      <Link
        href="/dashboard"
        className={`flex flex-col items-center justify-center ${
          pathname === "/dashboard" ? "font-bold" : ""
        }`}
      >
        <SpaceDashboardIcon />
        Dashboard
      </Link>
      <Link
        href="/dashboard/my-interviews"
        className={`flex flex-col items-center justify-center ${
          pathname === "/dashboard/my-interviews" ? "font-bold" : ""
        }`}
      >
        <BusinessCenterIcon />
        My Interviews
      </Link>
    </div>
  );
};
