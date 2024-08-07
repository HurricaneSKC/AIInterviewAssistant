import AnimateDiv from "@/components/AnimateDiv";
import H1 from "@/components/HTMLTags/H1";
import H2 from "@/components/HTMLTags/H2";
import React from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  console.log(session);

  if (!session) {
    redirect("/login");
  }

  return (
    <AnimateDiv>
      <H1>Dashboard</H1>
      <H2>Welcome back</H2>
      <form
        action={async (formData) => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>{" "}
      </form>
    </AnimateDiv>
  );
};

export default DashboardPage;
