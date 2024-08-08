import AnimateDiv from "@/components/AnimateDiv";
import H1 from "@/components/HTMLTags/H1";
import H2 from "@/components/HTMLTags/H2";
import React from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import LinkButton from "@/components/CTAs/LinkButton";
import Link from "next/link";

const DashboardPage = async () => {
  const session = await auth();

  console.log(session);

  if (!session) {
    redirect("/login");
  }

  return (
    <AnimateDiv>
      <H1>Welcome back</H1>
      <h3>Your progress</h3>
      <div className="bg-gray-200 rounded my-2 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 flex-wrap">
        <div className="flex flex-col">
          <p className="text-sm"><b>Questions answered</b></p>
          <h2 className="text-4xl">15</h2>
        </div>
        <div className="flex flex-col">
        <p className="text-sm"><b>Interviews conducted</b></p>
          <h2 className="text-4xl">6</h2>
        </div>
        <div className="flex flex-col">
        <p className="text-sm"><b>Overview</b></p>
          <p>
            Overall, you have shown a nig improvement with the clarity and
            detail in your responses.
          </p>
        </div>
      </div>
      <div className="bg-primary rounded mb-2 p-4 flex flex-wrap justify-between items-center">
        <p className="text-white">Need some more practice?</p>
        <LinkButton pageLink="/interview" buttonText="Start an interview" />
      </div>
      <div className="flex my-8 flex-col">
        <div className="flex justify-between">
          <p className="mb-2">My Questions</p>
          <Link href="/dashboard/questions">Go to questions ></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-wrap">
          <div className="question bg-gray-200 rounded flex flex-col p-2">
            <p>Walk me through this function</p>
            <p>Subtitle</p>
            <p>Category</p>
          </div>
          <div className="question bg-gray-200 rounded flex flex-col p-2">
            <p>Walk me through this function</p>
            <p>Subtitle</p>
            <p>Category</p>
          </div>
          <div className="question bg-gray-200 rounded flex flex-col p-2">
            <p>Walk me through this function</p>
            <p>Subtitle</p>
            <p>Category</p>
          </div>
          <div className="question bg-gray-200 rounded flex flex-col p-2">
            <p>Walk me through this function</p>
            <p>Subtitle</p>
            <p>Category</p>
          </div>
        </div>
      </div>
      
    </AnimateDiv>
  );
};

export default DashboardPage;
