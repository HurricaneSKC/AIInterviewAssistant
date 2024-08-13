"use client";
import { H1 } from "@/components/HTMLTags/Header";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Account = () => {
  const session = useSession();

  console.log(session);

  useEffect(() => {
    session.status === "unauthenticated" && redirect("/user/login");
  }, [session]);

  return (
    <>
      <H1>Account Settings</H1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center">
          <div className="rounded-full w-24 h-24 bg-[url(/placeholder-user.jpg)] bg-cover mb-4"></div>
          <p className="text-xl font-semibold">{session?.data?.user?.name}</p>
          <p className="text-gray-600">{session?.data?.user?.email}</p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Account Management</h2>
          <button
            onClick={() => signOut()}
            className="w-full bg-primary text-white py-2 px-4 rounded mb-4"
          >
            Sign Out
          </button>
          <button className="w-full bg-red-500 text-white py-2 px-4 rounded">
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;
