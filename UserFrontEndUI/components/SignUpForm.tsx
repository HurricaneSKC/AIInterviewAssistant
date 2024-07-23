import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Input from "./Input";
import Button from "./Button";

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        router.push("/login");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
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
        autoComplete="new-password"
      />
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      <Button type="submit">Sign Up</Button>
      <div className="flex justify-end text-[#1E2B3A]-500 text-sm font-medium mt-2">
        <Link href="/login">Login instead</Link>
      </div>
    </form>
  );
};

export default SignUpForm;
