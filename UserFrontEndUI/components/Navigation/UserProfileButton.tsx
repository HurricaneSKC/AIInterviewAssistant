"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserProfileIcon } from "../User/UserIcon";

export const UserProfileButton = () => {
  const session = useSession();
  if (!session?.data?.user) return null;
  const name = session.data?.user?.name;

  return (
    <div className="flex">
      <Link
        href="/dashboard/account"
        className="flex items-center w-full justify-between"
      >
        <p className="mr-4 hidden md:block h-fit text-sm">
          {session?.data?.user?.name}
        </p>
        <UserProfileIcon fullName={name} />
      </Link>
    </div>
  );
};
