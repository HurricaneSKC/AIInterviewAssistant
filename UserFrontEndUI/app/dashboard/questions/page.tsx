"use client";
import AnimateDiv from "@/components/Animation/AnimateDiv";
import { H1 } from "@/components/Typography/Header";
import React from "react";
import PTag from "@/components/Typography/PTag";
import { QuestionFinder } from "@/components/QuestionFinder/QuestionFinder";
import MockQuestionData from "@/app/data/questionData.json";
import { Question } from "@/interfaces/Question";

const QuestionsPage = () => {
  const questions: Question[] = Object.values(MockQuestionData);
  return (
    <AnimateDiv>
      <H1>Questions</H1>
      <PTag large>What should I ask?</PTag>
      <QuestionFinder showFilters questions={questions} />
    </AnimateDiv>
  );
};

export default QuestionsPage;
