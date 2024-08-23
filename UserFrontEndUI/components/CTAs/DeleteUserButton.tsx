"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import useQuestionPlaylistStore from "@/app/data/stores/questionPlaylist";

interface DeleteUserButtonProps {
  email: string;
  softDelete?: boolean;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  email,
  softDelete = false,
}) => {
  const router = useRouter();

  const handleDeleteUser = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch("/api/user/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, softDelete }),
        });

        if (response.ok) {
          await signOut({ redirect: false });
          useQuestionPlaylistStore.persist.clearStorage();
          router.push("/");
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <button
      onClick={handleDeleteUser}
      className="bg-red-500 text-white group rounded-full px-4 py-2 font-semibold transition-all flex items-center justify-center hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
    >
      {softDelete ? "Deactivate Account" : "Delete Account"}
    </button>
  );
};

export default DeleteUserButton;
