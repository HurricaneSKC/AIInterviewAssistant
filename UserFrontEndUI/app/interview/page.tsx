import { auth, CustomUser } from "@/auth";
import LinkButton from "@/components/CTAs/LinkButton";
import Interview from "@/components/Interview";
import { checkUsageLimit } from "@/utils/fetchUsageLimit";
import { redirect } from "next/navigation";
import React from "react";

const InterviewPage = async () => {
  const session = await auth();
  const user = session?.user as CustomUser;
  const email = user ? user.email : null;

  const isLimitReached = await checkUsageLimit();
  console.log("Is limit reached:", isLimitReached);

  if (isLimitReached) {
    // Redirect to the dashboard page
    return (
      <div>
        <h1>Usage Limit Reached</h1>
        <p>You have reached your usage limit for today.</p>
        <p>Upgrade your account to continue practicing.</p>
        <LinkButton
          buttonText="Go to Dashboard"
          pageLink="/dashboard"
        ></LinkButton>
      </div>
    );
  }

  return <Interview userEmail={email} />;
};

export default InterviewPage;
