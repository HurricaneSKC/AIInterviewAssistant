"use client";

import useQuestionPlaylistStore from "@/app/data/stores/questionPlaylist";
import AddIcon from "@mui/icons-material/Add";
import { DisplayQuestion } from "../Question/DisplayQuestion";
import { AddQuestion } from "./AddQuestion";
import Link from "next/link";

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
      <h3 className="font-bold mb-4">Create your interview</h3>
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
              <button
                className="p-2 bg-white rounded-lg flex justify-center align-middle text-2xl"
                onClick={() => toggleQuestionSelector(true)}
              >
                <AddIcon />
              </button>
            </div>
          </div>
          {QuestionPlaylist.map((question) => (
            <div key={question.id} className="mb-4">
              <DisplayQuestion
                id={question.id}
                question={question.question}
                difficulty={question.difficulty}
                tags={question.tags}
              />
            </div>
          ))}

          <div className="mb-8 cursor-pointer">
            <AddQuestion toggleQuestionSelector={toggleQuestionSelector} />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-white text-black rounded-full p-2 px-8 mr-2"
              onClick={() => {
                useQuestionPlaylistStore.persist.clearStorage();
                removeAllQuestions();
              }}
            >
              Clear
            </button>
            <Link
              className="bg-primary text-white rounded-full p-2 px-8"
              href={"/interview"}
            >
              Start interview
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
