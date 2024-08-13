import Tag from "./Tag";

interface Props {
  question: {
    question: string;
    tags: string[];
  };
}

export const QuestionListItem = ({ question }: Props) => {
  const { question: questionText, tags } = question;
  return (
    <div className="question bg-gray-100 rounded flex flex-col justify-between p-4">
      <p>{questionText}</p>
      <div className="tags flex flex-wrap gap-2 items-center mt-4">
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
};
