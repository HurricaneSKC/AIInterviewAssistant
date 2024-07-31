"use client";

import { InterviewCreator } from "@/components/InterviewCreator/InterviewCreator";
import QuestionSelector from "@/components/QuestionSelector";
import { useState } from "react";

const DashboardPage = () => {
  const [questionSelector, toggleQuestionSelector] = useState(false);

  return (
    <>
      <h1 className="text-4xl mb-12">Let&apos;s start practicing</h1>
      <InterviewCreator toggleQuestionSelector={toggleQuestionSelector} />
      {questionSelector && (
        <QuestionSelector toggleQuestionSelector={toggleQuestionSelector} />
      )}
    </>
  );
};

export default DashboardPage;
