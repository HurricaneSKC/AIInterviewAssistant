"use client";

import React from "react";
import Button from "../CTAs/Button";
import { useRouter } from "next/navigation";
import useQuestionPlaylistStore from "@/app/data/stores/questionPlaylist";

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
  const removeAllQuestions = useQuestionPlaylistStore(
    (state) => state.removeAllQuestions
  );
  const handleContinue = () => {
    handleQuestionAnswered();
    if (lastQuestion) {
      router.push("/dashboard");
      useQuestionPlaylistStore.persist.clearStorage();
      removeAllQuestions();
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
