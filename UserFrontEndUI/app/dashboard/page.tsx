import AnimateDiv from "@/components/Animation/AnimateDiv";
import React from "react";
import LinkButton from "@/components/CTAs/LinkButton";
import MockQuestionData from "../../app/data/questionData.json";
import { H1, H2 } from "@/components/Typography/Header";
import PTag from "@/components/Typography/PTag";
import { CustomUser, auth } from "@/auth";
import LinkText from "@/components/CTAs/LinkText";
import { QuestionAnswered } from "../data/stores/user";

const DashboardPage = async () => {
  const questions = Object.values(MockQuestionData);
  const session = await auth();
  const user = session?.user as CustomUser;

  const userName = user.name?.split(" ")[0];

  const usersQuestions = questions.filter((question) => {
    return user.questionsAnswered.some(
      (userQuestion: QuestionAnswered) =>
        userQuestion.QuestionId === question.id
    );
  });

  return (
    <AnimateDiv>
      <H1>Dashboard</H1>
      <PTag large>Welcome Back{userName ? `, ${userName}` : ""}</PTag>
      <H2 small>Your progress</H2>
      <div className="bg-gray-100 rounded mb-2 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 flex-wrap">
        <div className="flex flex-col">
          <p className="text-sm">
            <b>Questions answered</b>
          </p>
          <h2 className="text-4xl">15</h2>
        </div>
        {/* <div className="flex flex-col">
          <p className="text-sm">
            <b>Overview</b>
          </p>
          <p>
            Overall, you have shown a big improvement with the clarity and
            detail in your responses.
          </p>
        </div> */}
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
          <H2 small hideMargin>
            My Questions
          </H2>
          <LinkText
            linkText="Go to questions"
            pageLink="/dashboard/questions"
            primary
            rightArrow
          />
        </div>
        {usersQuestions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {usersQuestions.map((question) => (
              <div
                key={question.id}
                className="bg-gray-100 rounded p-4 flex flex-col"
              >
                <p>
                  <b>Question:</b> {question.question}
                </p>
                <p>
                  <b>Category:</b> {question.category}
                </p>
                <p>
                  <b>Difficulty:</b> {question.difficulty}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <PTag>No questions answered yet</PTag>
        )}
      </div>
    </AnimateDiv>
  );
};

export default DashboardPage;
