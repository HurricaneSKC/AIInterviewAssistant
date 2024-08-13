"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const UserProfile = () => {
  const session = useSession();
  return (
    <div className="flex">
      <Link href="/dashboard/account" className="flex items-center">
        <p className="mr-4 hidden md:block h-fit">
          {session?.data?.user?.name}
        </p>
        <div className="rounded-full w-12 h-12 bg-[url('/placeholder-user.jpg')] bg-cover"></div>
      </Link>
    </div>
  );
};
