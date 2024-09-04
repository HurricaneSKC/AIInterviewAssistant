"use client";

import React from "react";
import Button from "../CTAs/Button";
import { useRouter } from "next/navigation";

interface Props {
  lastQuestion: boolean;
  handleQuestionAnswered: () => Promise<void>;
  handleNextQuestion: () => void;
}

const InterviewContinueCTA = ({
  lastQuestion,
  handleNextQuestion,
  handleQuestionAnswered,
}: Props) => {
  const router = useRouter();
  const handleContinue = () => {
    handleQuestionAnswered();
    if (lastQuestion) {
      router.push("/dashboard");
    } else {
      handleNextQuestion();
    }
  };

  return (
    <Button
      onClick={handleContinue}
      buttonText={lastQuestion ? "Finish Session" : "Continue"}
      primary
      rightArrow
    />
  );
};

export default InterviewContinueCTA;
