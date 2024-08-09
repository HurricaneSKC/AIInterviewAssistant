"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

type TitleMap = {
  "/dashboard": string;
  "/dashboard/my-interviews": string;
  "/dashboard/questions": string;
  "/dashboard/resources": string;
  "/dashboard/account": string;
};

const titleMap: TitleMap = {
  "/dashboard": "Welcome back",
  "/dashboard/my-interviews": "Let's get practicing",
  "/dashboard/questions": "Questions",
  "/dashboard/resources": "Learn more",
  "/dashboard/account": "Account",
};

const getTitle = (path: keyof TitleMap): string => {
  return titleMap[path];
};

export const Header = () => {
  const pathname = usePathname();
  const session = useSession();
  const title = getTitle(pathname as keyof TitleMap);

  console.log(session);

  return (
    <div className="flex justify-between mb-4 md:mb-12">
      {pathname && <h2 className="text-4xl">{title}</h2>}
      <Link href="/dashboard/account" className="flex items-center">
        <p className="mr-4 hidden md:block h-fit">{session.data?.user?.name}</p>
        <div className="rounded-full w-12 h-12 bg-[url('/placeholder-user.jpg')] bg-cover"></div>
      </Link>
    </div>
  );
};
