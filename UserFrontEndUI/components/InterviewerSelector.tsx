import useInterviewerStore from "@/app/data/stores/interviewers";
import { motion } from "framer-motion";
import React from "react";
import Button from "./CTAs/Button";
import LinkButton from "./CTAs/LinkButton";
import { H2 } from "./Typography/Header";
import SelectedInterviewerRadioGroup, {
  Interviewer,
} from "./SelectedInterviewerRadioGroup";
import StepParagraph from "./Typography/StepParagraph";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectedInterviewer: Interviewer;
  setSelectedInterviewer: React.Dispatch<React.SetStateAction<Interviewer>>;
}

const InterviewerSelector = ({
  setStep,
  selectedInterviewer,
  setSelectedInterviewer,
}: Props) => {
  const interviewers = useInterviewerStore((state) => state.interviewers);

  console.log(interviewers);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      key="step-2"
      transition={{
        duration: 0.95,
        ease: [0.165, 0.84, 0.44, 1],
      }}
      className="max-w-lg mx-auto px-4 lg:px-0"
    >
      <H2>Select an interviewer</H2>
      <StepParagraph
        paragraphText="Choose whoever makes you feel comfortable. You can always 
        try again with another one."
      />
      <div>
        <SelectedInterviewerRadioGroup
          selectedInterviewer={selectedInterviewer}
          setSelectedInterviewer={setSelectedInterviewer}
          interviewers={interviewers}
        />
      </div>
      <div className="flex gap-[15px] justify-end mt-8">
        <div>
          <LinkButton pageLink="/dashboard/my-interviews" buttonText="Back" />
        </div>
        <div>
          <Button
            onClick={() => setStep(2)}
            buttonText="Continue"
            primary
            rightArrow
          />
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewerSelector;
