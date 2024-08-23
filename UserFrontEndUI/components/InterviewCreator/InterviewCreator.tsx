"use client";

import useQuestionPlaylistStore from "@/app/data/stores/questionPlaylist";
import AddButton from "../CTAs/AddButton";
import Button from "../CTAs/Button";
import LinkButton from "../CTAs/LinkButton";
import { InterviewCreatorQuestion } from "../Question/InterviewCreatorQuestion";
import { AddQuestion } from "./AddQuestion";
import { H2 } from "../Typography/Header";

interface Props {
  toggleQuestionSelector: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InterviewCreator = ({ toggleQuestionSelector }: Props) => {
  const QuestionPlaylist = useQuestionPlaylistStore((state) => state.questions);
  const removeAllQuestions = useQuestionPlaylistStore(
    (state) => state.removeAllQuestions
  );
  console.log("QP", QuestionPlaylist);

  return (
    <>
      <H2 small>Create your interview</H2>
      <div className="bg-gray-100 rounded-xl w-full flex flex-col">
        <div className="flex justify-between items-center pl-6 pr-6 pt-8 pb-8 border-b-gray-300 border-b-[1px] ">
          <h3 className="text-xl h-fit">New Interview</h3>
          <div className="flex items-center"></div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold h-fit">Select your questions</h3>
            <div className="flex items-center">
              <p className="h-fit mr-4">Add a question</p>
              <AddButton onClick={() => toggleQuestionSelector(true)} />
            </div>
          </div>
          {QuestionPlaylist.map((question) => (
            <div key={question.id} className="mb-4">
              <InterviewCreatorQuestion
                id={question.id}
                question={question.question}
              />
            </div>
          ))}

          <div className="mb-8 cursor-pointer">
            <AddQuestion toggleQuestionSelector={toggleQuestionSelector} />
          </div>
          <div className="flex justify-end">
            <div className="mr-2">
              <Button
                onClick={() => {
                  useQuestionPlaylistStore.persist.clearStorage();
                  removeAllQuestions();
                }}
                buttonText="Clear"
              />
            </div>
            <LinkButton
              pageLink={"/interview"}
              buttonText="Start interview"
              primary
              rightArrow
            />
          </div>
        </div>
      </div>
    </>
  );
};
