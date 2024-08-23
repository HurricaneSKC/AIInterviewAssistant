import AnimateDiv from "@/components/Animation/AnimateDiv";
import React from "react";
import MockQuestionData from "../../app/data/questionData.json";
import { H1, H2 } from "@/components/Typography/Header";
import PTag from "@/components/Typography/PTag";
import { CustomUser, auth } from "@/auth";
import LinkText from "@/components/CTAs/LinkText";
import { QuestionFinder } from "@/components/QuestionFinder/QuestionFinder";
import { Card } from "@/components/Layout/Card";
import { CtaCard } from "@/components/CTAs/CtaCard";
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
      <Card className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-4 flex-wrap">
        <div className="flex flex-col">
          <p className="text-sm">
            <b>Questions answered</b>
          </p>
          <h2 className="text-4xl">15</h2>
        </div>
      </Card>
      <CtaCard
        mainText="Need some more practice?"
        pageLink="dashboard/my-interviews"
        buttonText="Create an interview"
      />
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
        <QuestionFinder clickable questions={usersQuestions} />
      </div>
    </AnimateDiv>
  );
};

export default DashboardPage;
