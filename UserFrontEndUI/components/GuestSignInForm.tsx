import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "./Button";
import { useRouter } from "next/router";

const GuestSignInForm = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRequestToken = async () => {
    try {
      const response = await fetch("/api/auth/guest-signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.guestToken) {
        console.log(
          "Calls singIn with guest-authorizer and token: ",
          data.guestToken
        );
        setToken(data.guestToken);
      }
    } catch (err) {
      setError("Failed to request guest token. Please try again.");
    }
  };

  const handleSignin = async (token: string) => {
    const result = await signIn("guest-authorizer", {
      redirect: false,
      guestToken: token,
      callbackUrl: `${window.location.origin}/demo`,
    });
    console.log({ result });
    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
    }
  };

  const showButton = () => {
    if (token) {
      return (
        <>
          <Button onClick={() => handleSignin(token)}>Sign In</Button>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </>
      );
    } else {
      return (
        <>
          <Button onClick={handleRequestToken}>Request Guest Token</Button>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </>
      );
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg px-6 pt-4 pb-6 mb-4  flex items-center justify-center">
      {showButton()}
    </div>
  );
};

export default GuestSignInForm;
