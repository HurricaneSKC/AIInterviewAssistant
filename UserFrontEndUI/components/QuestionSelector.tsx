import React from "react";
import { QuestionToAdd } from "./Question/QuestionToAdd";
import MockQuestionData from "../app/data/questionData.json";
import Link from "next/link";
import H2 from "./textTags/H2";

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
        <div className="flex p-8 flex-col overflow-y-auto fixed top-0 right-0 bottom-0 lg:w-[50vw] w-full bg-white">
          <div className="flex justify-between mb-2">
            <H2 text="Add a question" />
            <Link href={"/dashboard/questions"}>Question Bank</Link>
          </div>

          {/*filter questions by category, difficulty or tag with search inputs suggested dropdown with preselects */}

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
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionSelector;
