import { Question as QuestionInterface } from "@/interfaces/Question";
import { Question } from "../Question/Question";

interface Props {
  questions: QuestionInterface[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  add?: boolean;
  list?: boolean;
}

export const QuestionGrid = ({
  questions,
  selectedTags,
  setSelectedTags,
  add,
  list,
}: Props) => {
  const grid = list ? "" : "md:grid-cols-2";
  return (
    <div className={`grid grid-cols-1 ${grid} gap-4 flex-wrap`}>
      {questions.map((question: QuestionInterface) => (
        <Question
          question={question}
          key={question.id}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          add={add}
        />
      ))}
    </div>
  );
};
