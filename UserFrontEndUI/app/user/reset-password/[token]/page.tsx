"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { H1 } from "@/components/Typography/Header";
import Button from "@/components/CTAs/Button";

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {
  const router = useRouter();
  const { token } = params;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => router.push("/user/signin"), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred");
    }
  };

  if (isSubmitted) {
    return <p>Your password has been reset. Redirecting to login...</p>;
  }

  return (
    <div>
      <H1>Reset Password</H1>
      <div className="bg-gray-100 rounded-xl w-full flex flex-col p-8">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            placeholder="New password"
            className="p-2 rounded-xl"
          />
          {errors.password && <span>{errors.password.message}</span>}
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Your passwords do not match";
                }
              },
            })}
            className="p-2 rounded-xl"
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
          <Button type="submit" buttonText="Reset Password" primary />
        </form>
      </div>
    </div>
  );
}
