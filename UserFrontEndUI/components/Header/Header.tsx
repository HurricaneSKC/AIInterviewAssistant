"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

const titleMap = {
  "/dashboard": "Welcome back",
  "/dashboard/my-interviews": "Let's get practicing",
  "/dashboard/questions": "Questions",
  "/dashboard/resources": "Learn more",
  "/dashboard/account": "Account",
};

export const Header = () => {
  const pathname = usePathname();
  const session = useSession();

  console.log(session);

  return (
    <div className="flex justify-between mb-4 md:mb-12">
      {pathname && <h2 className="text-4xl">{titleMap[pathname]}</h2>}
      <Link href="/dashboard/account" className="flex items-center">
        <p className="mr-4 hidden md:block h-fit">{session.data?.user?.name}</p>
        <div className="rounded-full w-12 h-12 bg-[url('/placeholder-user.jpg')] bg-cover"></div>
      </Link>
    </div>
  );
};
