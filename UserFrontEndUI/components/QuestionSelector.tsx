import React from "react";
import MockQuestionData from "../app/data/questionData.json";
import Link from "next/link";
import { H2 } from "./Typography/Header";
import { QuestionFinder } from "./QuestionFinder/QuestionFinder";

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
        <div
          className="flex p-8 flex-col overflow-y-auto fixed top-0 right-0 bottom-0 lg:w-[50vw] w-full bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between mb-2">
            <H2>Add a question</H2>
            <Link href={"/dashboard/questions"}>Question Bank</Link>
          </div>

          <QuestionFinder questions={questions} showFilters add />
        </div>
      </div>
    </>
  );
};

export default QuestionSelector;
