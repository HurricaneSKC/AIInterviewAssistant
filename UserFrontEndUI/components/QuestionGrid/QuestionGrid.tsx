import { QuestionListItem } from "../Question/QuestionListItem";

interface Props {
  questions: any;
}

export const QuestionGrid = ({ questions }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap">
      {questions.map((question: any) => (
        <QuestionListItem question={question} key={question.id} />
      ))}
    </div>
  );
};
