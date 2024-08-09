"use client";
import AnimateDiv from "@/components/AnimateDiv";
import { InterviewCreator } from "@/components/InterviewCreator/InterviewCreator";
import QuestionSelector from "@/components/QuestionSelector";
import { useState } from "react";

const InterviewCreatorPage = () => {
  const [questionSelector, toggleQuestionSelector] = useState(false);

  return (
    <AnimateDiv>
      <InterviewCreator toggleQuestionSelector={toggleQuestionSelector} />
      {questionSelector && (
        <QuestionSelector toggleQuestionSelector={toggleQuestionSelector} />
      )}
    </AnimateDiv>
  );
};

export default InterviewCreatorPage;
