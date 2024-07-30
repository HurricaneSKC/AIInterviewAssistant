import { AddQuestion } from "../AddQuestion/AddQuestion";
import { Question } from "../Question/Question";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  setEditingQuestionPlaylist: (x: Boolean) => void;
}
export const InterviewCreator = ({ setEditingQuestionPlaylist }: Props) => {
  return (
    <>
      <h3 className="font-bold mb-4">Create your interview</h3>
      <div className="bg-gray-100 rounded-xl w-full flex flex-col">
        <div className="flex justify-between items-center pl-6 pr-6 pt-8 pb-8 border-b-gray-300 border-b-[1px] ">
          <h2 className="text-xl h-fit">New Interview</h2>
          <div className="flex items-center"></div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold h-fit">Select your questions</h3>
            <div
              onClick={() => setEditingQuestionPlaylist(true)}
              className="flex items-center cursor-pointer"
            >
              <p className="h-fit mr-4">Add a question</p>
              <button className="p-2 bg-white rounded-lg flex justify-center align-middle text-2xl">
                <AddIcon />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <Question />
          </div>
          <div className="mb-4">
            <Question />
          </div>
          <div className="mb-4">
            <Question />
          </div>
          <div
            onClick={() => setEditingQuestionPlaylist(true)}
            className="mb-8 cursor-pointer"
          >
            <AddQuestion />
          </div>
          <div className="flex justify-end">
            <button className="bg-teal-400 text-white rounded-full p-2 px-8">
              Start interview
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
