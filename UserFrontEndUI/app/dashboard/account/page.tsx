"use client";
import H1 from "@/components/HTMLTags/H1";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";

const Account = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col">
      <H1>Account</H1>
      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      <button
        onClick={() => signOut()}
        className="group rounded-full px-4 py-2 font-semibold transition-all flex items-center justify-center bg-primary text-white no-underline active:scale-95 scale-100 duration-75"
        style={{
          boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
        }}
      >
        <span className="whitespace-nowrap">Sign Out</span>
      </button>
    </div>
  );
};

export default Account;
