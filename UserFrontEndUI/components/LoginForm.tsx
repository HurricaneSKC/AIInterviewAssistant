import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Input from "./Input";
import Button from "./Button";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials-authorizer", {
      redirect: false,
      email,
      password,
    });
    console.log({ result });
    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg px-6 pt-4 pb-8 mb-4"
    >
      <Input
        label="Email"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <Input
        label="Password"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="complete-password"
      />
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      <Button type="submit">Log In</Button>
      <div className="flex justify-between text-[#1E2B3A]-500 text-sm font-medium mt-2">
        <Link href="/signup">Sign Up</Link>
        <Link href="/forgot-password">Forgot Password?</Link>
      </div>
    </form>
  );
};

export default LoginForm;
