"use client";

import AnimateDiv from "@/components/Animation/AnimateDiv";
import Button from "@/components/CTAs/Button";
import { H1, H2 } from "@/components/Typography/Header";
import { useForm, SubmitHandler } from "react-hook-form";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    console.log("Form data:", data);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();

      if (res.ok) {
        console.log("User created successfully:", responseData);
      } else {
        console.error("Error creating user:", responseData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AnimateDiv>
      <H1>Sign Up</H1>
      <H2>Welcome</H2>
      <div className="bg-gray-100 rounded-xl w-full flex flex-col p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <label className="sr-only" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="p-2 rounded-xl"
          />
          {errors.name && <span>{errors.name.message}</span>}

          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Enter a valid email",
              },
            })}
            className="p-2 rounded-xl"
          />
          {errors.email && <span>{errors.email.message}</span>}

          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className="p-2 rounded-xl"
          />
          {errors.password && <span>{errors.password.message}</span>}

          <Button buttonText="Sign Up" type="submit" primary />
        </form>
      </div>
    </AnimateDiv>
  );
}
