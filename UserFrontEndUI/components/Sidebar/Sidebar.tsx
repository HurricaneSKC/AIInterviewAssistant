"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="md:flex bg-gray-100 w-[300px] p-10 hidden flex-col text-[20px]">
      <div className="w-full h-[100px] bg-white mb-12"></div>
      <Link
        href="/dashboard"
        className={`mb-4 ${pathname === "/dashboard" ? "font-bold" : ""}`}
      >
        Dashboard
      </Link>
      <Link
        href="/dashboard/my-interviews"
        className={pathname === "/dashboard/my-interviews" ? "font-bold" : ""}
      >
        My Interviews
      </Link>
    </div>
  );
};
