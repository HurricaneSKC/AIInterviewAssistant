"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
};

export default function TestEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [result, setResult] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setResult(result.message);
    } catch (error) {
      setResult("Error: " + (error as Error).message);
    }
  };

  return (
    <div>
      <h1>Test Email Sending</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Enter test email"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <button type="submit">Send Test Email</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}
