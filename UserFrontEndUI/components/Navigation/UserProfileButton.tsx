"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AvatarComponent } from "avatar-initials";
import { UserProfileIcon } from "../User/UserIcon";

export const UserProfileButton = () => {
  const session = useSession();
  const name = session.data?.user?.name;

  return (
    <div className="flex">
      <Link href="/dashboard/account" className="flex items-center">
        <p className="mr-4 hidden md:block h-fit">
          {session?.data?.user?.name}
        </p>
        <UserProfileIcon fullName={name} />
      </Link>
    </div>
  );
};
