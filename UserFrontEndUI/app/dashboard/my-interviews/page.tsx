"use client";
import AnimateDiv from "@/components/AnimateDiv";
import H1 from "@/components/HTMLTags/H1";
import PTag from "@/components/HTMLTags/PTag";
import { InterviewCreator } from "@/components/InterviewCreator/InterviewCreator";
import QuestionSelector from "@/components/QuestionSelector";
import { motion } from "framer-motion";
import { useState } from "react";

const InterviewCreatorPage = () => {
  const [questionSelector, toggleQuestionSelector] = useState(false);

  return (
    <AnimateDiv>
      <PTag large>Let&apos;s start practicing</PTag>
      <InterviewCreator toggleQuestionSelector={toggleQuestionSelector} />
      {questionSelector && (
        <QuestionSelector toggleQuestionSelector={toggleQuestionSelector} />
      )}
    </AnimateDiv>
  );
};

export default InterviewCreatorPage;
