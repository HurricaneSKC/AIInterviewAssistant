"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface ReactivateUserButtonProps {
  email: string;
}

const ReactivateUserButton: React.FC<ReactivateUserButtonProps> = ({
  email,
}) => {
  const router = useRouter();

  const handleReactivateUser = async () => {
    if (confirm("Are you sure you want to reactivate your account?")) {
      try {
        const response = await fetch("/api/user/reactivate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          alert("Your account has been reactivated. Please log in.");
          router.push("/login");
        } else {
          console.error("Failed to reactivate user");
        }
      } catch (error) {
        console.error("Error reactivating user:", error);
      }
    }
  };

  return (
    <button
      onClick={handleReactivateUser}
      className="bg-green-500 text-white group rounded-full px-4 py-2 font-semibold transition-all flex items-center justify-center hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
    >
      Reactivate Account
    </button>
  );
};

export default ReactivateUserButton;
