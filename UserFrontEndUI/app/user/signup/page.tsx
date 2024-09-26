"use client";

import AnimateDiv from "@/components/Animation/AnimateDiv";
import Button from "@/components/CTAs/Button";
import { useRouter } from "next/navigation";
import { H1, H2 } from "@/components/Typography/Header";
import PTag from "@/components/Typography/PTag";
import Link from "next/link";
import { useForm, SubmitHandler, set } from "react-hook-form";

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
    setError,
  } = useForm<SignUpFormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    console.log("Form data:", data);

    try {
      const res = await fetch("/api/user/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();

      if (res.ok) {
        console.log("User created successfully:", responseData);
        router.push("/user/signin");
      } else if (res.status === 409) {
        console.error("User already exists:", responseData);
        setError("email", { message: "User already exists" });
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
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}

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
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

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
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <Button buttonText="Sign Up" type="submit" primary />
        </form>
        <PTag className="my-2 block md:hidden" small>
          Already registered? Click to{" "}
          <Link className="underline" href={"/user/signin"}>
            sign in!
          </Link>
        </PTag>
      </div>
    </AnimateDiv>
  );
}
