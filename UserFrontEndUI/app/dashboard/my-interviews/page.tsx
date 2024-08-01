"use client";
import { InterviewCreator } from "@/components/InterviewCreator/InterviewCreator";
import QuestionSelector from "@/components/QuestionSelector";
import { useState } from "react";

const InterviewCreatorPage = () => {
  const [questionSelector, toggleQuestionSelector] = useState(false);

  return (
    <>
      <h1 className="text-6xl mb-12">My Interviews</h1>
      <h2 className="text-4xl mb-12">Let&apos;s start practicing</h2>
      <InterviewCreator toggleQuestionSelector={toggleQuestionSelector} />
      {questionSelector && (
        <QuestionSelector toggleQuestionSelector={toggleQuestionSelector} />
      )}
    </>
  );
};

export default InterviewCreatorPage;
