import React from "react";
import Head from "next/head";
import GuestSignInForm from "../components/GuestSignInForm";

const GuestSignIn: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Guest Sign In</title>
      </Head>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in as Guest
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <GuestSignInForm />
      </div>
    </div>
  );
};

export default GuestSignIn;
