"use client";
import AnimateDiv from "@/components/Animation/AnimateDiv";
import { H1 } from "@/components/Typography/Header";
import React from "react";
import PTag from "@/components/Typography/PTag";
import { QuestionFinder } from "@/components/QuestionFinder/QuestionFinder";

const QuestionsPage = () => {
  return (
    <AnimateDiv>
      <H1>Questions</H1>
      <PTag large>What should I ask?</PTag>
      <QuestionFinder showFilters />
    </AnimateDiv>
  );
};

export default QuestionsPage;
