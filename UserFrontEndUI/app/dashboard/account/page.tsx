"use client";
import useQuestionPlaylistStore from "@/app/data/stores/questionPlaylist";
import Button from "@/components/CTAs/Button";
import { H1, H2 } from "@/components/Typography/Header";
import { UserProfileIcon } from "@/components/User/UserProfileIcon";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Account = () => {
  const session = useSession();

  useEffect(() => {
    session.status === "unauthenticated" && redirect("/user/login");
  }, [session]);

  const handleSignOut = () => {
    useQuestionPlaylistStore.persist.clearStorage();
    signOut();
  };

  return (
    <>
      <H1>Account Settings</H1>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center">
          <UserProfileIcon
            fullName={session?.data?.user?.name}
            sizeMultiplier={3}
          />
          <p className="text-xl font-semibold mt-4">
            {session?.data?.user?.name}
          </p>
          <p className="text-gray-600">{session?.data?.user?.email}</p>
        </div>
        <div>
          <H2 small>Account Management</H2>
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 mb-4">
            <Button
              primary
              buttonText="Sign Out"
              onClick={() => handleSignOut()}
            />
            <Button buttonText="Delete Account" onClick={() => {}} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
