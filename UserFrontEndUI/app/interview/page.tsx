import { auth, CustomUser } from "@/auth";
import Interview from "@/components/Interview";
import React from "react";

const InterviewPage = async () => {
  const session = await auth();
  const user = session?.user as CustomUser;
  const email = user ? user.email : null;

  return <Interview userEmail={email} />;
};

export default InterviewPage;
