"use client";

import AnimateDiv from "@/components/Animation/AnimateDiv";
import Button from "@/components/CTAs/Button";
import { useRouter } from "next/navigation";
import { H1, H2 } from "@/components/Typography/Header";
import PTag from "@/components/Typography/PTag";
import Link from "next/link";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { useState } from "react";

type ForgotPasswordFormData = {
  email: string;
};

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isSubmitted) {
    return (
      <p>
        If an account exists for that email, we&apos;ve sent password reset
        instructions.
      </p>
    );
  }

  return (
    <AnimateDiv>
      <H1>Forgot Password</H1>
      <div className="bg-gray-100 rounded-xl w-full flex flex-col p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
            })}
            className="p-2 rounded-xl"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

          <Button buttonText="Sign Up" type="submit" primary />
        </form>
      </div>
    </AnimateDiv>
  );
}
