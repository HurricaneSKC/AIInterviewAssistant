import AnimateDiv from "@/components/AnimateDiv";
import React from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import LinkButton from "@/components/CTAs/LinkButton";
import Link from "next/link";
import MockQuestionData from "../../app/data/questionData.json";
import { QuestionListItem } from "@/components/Question/QuestionListItem";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const DashboardPage = async () => {
  const session = await auth();

  console.log(session);

  if (!session) {
    redirect("/user/login");
  }
  const questions = Object.values(MockQuestionData);
  return (
    <AnimateDiv>
      <b>Your progress</b>
      <div className="bg-gray-100 rounded my-2 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 flex-wrap">
        <div className="flex flex-col">
          <p className="text-sm">
            <b>Questions answered</b>
          </p>
          <h2 className="text-4xl">15</h2>
        </div>
        <div className="flex flex-col">
          <p className="text-sm">
            <b>Interviews conducted</b>
          </p>
          <h2 className="text-4xl">6</h2>
        </div>
        <div className="flex flex-col">
          <p className="text-sm">
            <b>Overview</b>
          </p>
          <p>
            Overall, you have shown a big improvement with the clarity and
            detail in your responses.
          </p>
        </div>
      </div>
      <div className="bg-primary rounded mb-2 p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 flex-wrap justify-between items-center">
        <p className="text-white">Need some more practice?</p>
        <div className="md:flex justify-end">
          <LinkButton
            pageLink="/dashboard/my-interviews"
            buttonText="Create an interview"
          />
        </div>
      </div>
      <div className="flex my-8 flex-col">
        <div className="flex justify-between mb-2">
          <b>My Questions</b>
          <Link
            className="text-primary flex items-center"
            href="/dashboard/questions"
          >
            Go to questions <ChevronRightIcon />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap">
          {questions.map((q) => (
            <QuestionListItem q={q} key={q.id} />
          ))}
        </div>
      </div>
    </AnimateDiv>
  );
};

export default DashboardPage;
