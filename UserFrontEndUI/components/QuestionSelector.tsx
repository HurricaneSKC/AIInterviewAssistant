import React from "react";
import { QuestionToAdd } from "./Question/QuestionToAdd";
import MockQuestionData from "../app/data/questionData.json";

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
          onClick={(e) => e.stopPropagation()}
          className="flex p-8 flex-col overflow-y-auto fixed top-0 right-0 bottom-0 lg:w-[40vw] w-full bg-white"
        >
          <div className="flex justify-between">
            <h3>Add a question</h3>
            <a>View question bank</a>
          </div>
          <div className="flex-grow w-full grid grid-cols-1 gap-2">
            {questions.map((question) => (
              <QuestionToAdd
                key={question.id}
                id={question.id}
                question={question.question}
                answer={question.answer}
                category={question.category}
                difficulty={question.difficulty}
                tags={question.tags}
              />
            ))}
            {/* <QuestionToAdd />
            <QuestionToAdd />
            <QuestionToAdd /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionSelector;
