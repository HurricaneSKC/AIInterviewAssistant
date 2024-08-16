import { Question as QuestionInterface } from "@/interfaces/Question";
import { Question } from "../Question/Question";

interface Props {
  questions: QuestionInterface[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  add?: boolean;
}

export const QuestionGrid = ({
  questions,
  selectedTags,
  setSelectedTags,
  add,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-wrap">
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
