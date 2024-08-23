"use client";

import { signOut } from "next-auth/react";
import Button from "@/components/CTAs/Button";
import useQuestionPlaylistStore from "@/app/data/stores/questionPlaylist";

const SignOutButton = () => {
  const handleSignOut = () => {
    useQuestionPlaylistStore.persist.clearStorage();
    signOut();
  };

  return (
    <Button primary buttonText="Sign Out" onClick={() => handleSignOut()} />
  );
};

export default SignOutButton;
