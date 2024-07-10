import { AddQuestion } from "../AddQuestion/AddQuestion";
import { Question } from "../Question/Question";

export const InterviewCreator = () => {
  return (
    <>
      <h3 className="font-bold mb-4">Create your interview</h3>
      <div className="bg-gray-100 rounded-xl w-full flex flex-col">
        <div className="flex pl-6 pr-6 mt-8 border-b-gray-300 border-b-[1px] ">
          <h2 className="text-xl mb-8">New Interview</h2>
        </div>
        <div className="p-6">
          <h3 className="font-bold mb-6">Select your questions</h3>
          <div className="mb-4">
            <Question />
          </div>
          <div className="mb-4">
            <Question />
          </div>
          <div className="mb-4">
            <Question />
          </div>
          <div className="mb-8">
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
