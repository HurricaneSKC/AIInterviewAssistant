"use client";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <button
      onClick={() => signIn("credentials", { callbackUrl: "/dashboard" })}
    >
      Sign In
    </button>
  );
};

export default SignIn;
