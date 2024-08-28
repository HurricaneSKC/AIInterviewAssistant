"use client";

import useQuestionPlaylistStore from "@/app/data/stores/questionPlaylist";
import React from "react";
import Button from "./Button";
import { Question } from "@/interfaces/Question";
import { useRouter } from "next/navigation";

interface Props {
  buttonText: string;
  question: Question;
}

const AddQuestionToPlaylistButton = ({ buttonText, question }: Props) => {
  const router = useRouter();
  const addQuestionToQuestionPlaylist = useQuestionPlaylistStore(
    (state) => state.addQuestion
  );

  const handleClick = () => {
    addQuestionToQuestionPlaylist(question);
    router.push("/interview");
  };

  return <Button buttonText={buttonText} onClick={handleClick} rightArrow />;
};

export default AddQuestionToPlaylistButton;
