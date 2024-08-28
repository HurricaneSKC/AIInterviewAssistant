// pages/user/reset-password/[token].tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { H1 } from "@/components/Typography/Header";
import Button from "@/components/CTAs/Button";

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        // Handle error
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isSubmitted) {
    return <p>Your password has been reset. Redirecting to login...</p>;
  }

  return (
    <div>
      <H1>Reset Password</H1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: 8,
          })}
          placeholder="New password"
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Your passwords do no match";
              }
            },
          })}
          placeholder="Confirm new password"
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
        <Button type="submit" buttonText="Reset Password" primary />
      </form>
    </div>
  );
};

export default ResetPassword;
