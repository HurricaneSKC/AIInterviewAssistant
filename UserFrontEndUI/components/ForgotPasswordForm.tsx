import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setMessage("Password reset email sent. Please check your inbox.");
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
      />
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      {message && (
        <p className="text-green-500 text-xs italic mb-4">{message}</p>
      )}
      <Button type="submit">Reset Password</Button>
    </form>
  );
};

export default ForgotPasswordForm;
