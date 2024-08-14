"use client";
import AnimateDiv from "@/components/Animation/AnimateDiv";
import { H1 } from "@/components/Typography/Header";
import PTag from "@/components/Typography/PTag";
import { InterviewCreator } from "@/components/InterviewCreator/InterviewCreator";
import QuestionSelector from "@/components/QuestionSelector";
import { useState } from "react";

const InterviewCreatorPage = () => {
  const [questionSelector, toggleQuestionSelector] = useState(false);

  return (
    <AnimateDiv>
      <H1>My Interviews</H1>
      <PTag large>Let&apos;s get practicing</PTag>
      <InterviewCreator toggleQuestionSelector={toggleQuestionSelector} />
      {questionSelector && (
        <QuestionSelector toggleQuestionSelector={toggleQuestionSelector} />
      )}
    </AnimateDiv>
  );
};

export default InterviewCreatorPage;
