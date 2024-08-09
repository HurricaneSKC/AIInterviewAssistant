import Tag from "./Tag";

interface Props {
  q: any;
}

export const QuestionListItem = ({ q }: Props) => {
  const { question, tags } = q;
  return (
    <div className="question bg-gray-100 rounded flex flex-col justify-between p-4">
      <p>{question}</p>
      <div className="tags flex flex-wrap gap-2 items-center mt-4">
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
};
