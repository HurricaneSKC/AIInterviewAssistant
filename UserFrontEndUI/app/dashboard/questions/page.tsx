"use client";
import AnimateDiv from "@/components/AnimateDiv";
import { H1, H2 } from "@/components/HTMLTags/Header";
import React from "react";
import PTag from "@/components/HTMLTags/PTag";
import { Question } from "@/interfaces/Question";
import { QuestionFinder } from "@/components/QuestionGrid/QuestionFinder";

const QuestionsPage = () => {
  return (
    <AnimateDiv>
      <H1>Questions</H1>
      <PTag large>What should I ask?</PTag>
      <H2 small>Filters</H2>
      <QuestionFinder showFilters />
    </AnimateDiv>
  );
};

export default QuestionsPage;
