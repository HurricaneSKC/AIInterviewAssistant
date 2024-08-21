import React from "react";
import MockQuestionData from "../app/data/questionData.json";
import { H2 } from "./Typography/Header";
import { QuestionFinder } from "./QuestionFinder/QuestionFinder";
import Button from "./CTAs/Button";

interface Props {
  toggleQuestionSelector: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionSelector = ({ toggleQuestionSelector }: Props) => {
  // get questions from the database
  // use react-query to get questions
  // const { data, isLoading, isError } = useQuery("questions", fetchQuestions);
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error</div>;
  // const questions = data;
  const questions = Object.values(MockQuestionData);

  console.log(questions);

  return (
    <>
      <div
        onClick={() => toggleQuestionSelector(false)}
        className="fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)]"
      >
        <div className="flex flex-col p-8 md:w-[55vw] w-full bg-white fixed top-0 right-0 bottom-0">
          <div
            className="flex flex-col overflow-y-auto mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-2">
              <H2>Add a question</H2>
            </div>

            <QuestionFinder questions={questions} showFilters add />
          </div>
          <Button
            primary
            buttonText="Close"
            className="md:hidden"
            onClick={() => toggleQuestionSelector(false)}
          />
        </div>
      </div>
    </>
  );
};

export default QuestionSelector;
