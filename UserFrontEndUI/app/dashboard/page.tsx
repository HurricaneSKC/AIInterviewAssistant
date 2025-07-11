import AnimateDiv from "@/components/Animation/AnimateDiv";
import React, { cache } from "react";
import MockQuestionData from "../../app/data/questionData.json";
import { H1, H2 } from "@/components/Typography/Header";
import PTag from "@/components/Typography/PTag";
import { CustomUser, auth } from "@/auth";
import LinkText from "@/components/CTAs/LinkText";
import { QuestionFinder } from "@/components/QuestionFinder/QuestionFinder";
import { Card } from "@/components/Layout/Card";
import { CtaCard } from "@/components/CTAs/CtaCard";
import { QuestionAnswered } from "../data/stores/user";
import LinkButton from "@/components/CTAs/LinkButton";
import { cookies } from "next/headers";
import { fetchQuestionsAnswered } from "@/utils/fetchQuestionAnswered";

const DashboardPage = async () => {
  const questions = Object.values(MockQuestionData);
  const session = await auth();
  const user = session?.user as CustomUser;

  const userName = user.name?.split(" ")[0];

  let questionsAnswered: QuestionAnswered[] = [];
  try {
    // Fetch questions answered from the API
    console.log("fetchQuestionsAnswered");

    const data = await fetchQuestionsAnswered();
    console.log("Data:", data);
    questionsAnswered = data.questionsAnswered || [];
  } catch (error) {
    console.error("Error fetching questions answered:", error);
    // You might want to set an error state here or handle it differently
  }

  console.log("questionsAnswered", questionsAnswered.length);

  const usersQuestions = questions.filter((question) => {
    return questionsAnswered.some(
      (userQuestion: QuestionAnswered) =>
        userQuestion && userQuestion.QuestionId === question.id
    );
  });

  return (
    <AnimateDiv>
      <H1>Dashboard</H1>
      <PTag large>Welcome Back{userName ? `, ${userName}` : ""}</PTag>
      <H2 small>Your progress</H2>
      <Card className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-4 flex-wrap">
        <div className="flex flex-col">
          <h3 className="text-sm">
            <b>Questions answered</b>
          </h3>
          <p className="text-4xl">{questionsAnswered.length}</p>
        </div>
      </Card>
      <CtaCard mainText="Need some more practice?">
        <LinkButton
          pageLink="dashboard/my-interviews"
          buttonText="Create an interview"
          rightArrow
        />
      </CtaCard>
      <div className="flex mt-8 pb-8 flex-col">
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
