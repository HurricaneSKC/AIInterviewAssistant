"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserProfileIcon } from "../User/UserProfileIcon";

export const UserProfileButton = () => {
  const session = useSession();
  const name = session.data?.user?.name;
  if (!name) return null;

  return (
    <div className="flex">
      <Link
        href="/dashboard/account"
        className="flex items-center w-full justify-between"
      >
        <p className="mr-4 hidden md:block h-fit text-sm">{name}</p>
        <UserProfileIcon fullName={name} />
      </Link>
    </div>
  );
};
