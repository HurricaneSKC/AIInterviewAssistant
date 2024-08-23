import Tag from "./Tag";
import { Question as QuestionInterface } from "@/interfaces/Question";
import { Difficulty } from "./Difficulty";
import { TagGrid } from "../Layout/TagGrid";
import { Card } from "../Layout/Card";
import { ConditionalLink } from "../CTAs/ConditionalLink";
import { QuestionToggle } from "./QuestionToggle";

interface QuestionProps {
  question: QuestionInterface;
  add?: boolean;
  clickable?: boolean;
  selectedTags?: string[];
  setSelectedTags?: (tags: string[]) => void;
}

export const Question = ({
  question,
  add,
  clickable,
  selectedTags,
  setSelectedTags,
}: QuestionProps) => {
  const { id, question: questionText, category, difficulty, tags } = question;

  return (
    <ConditionalLink condition={clickable} href={`/dashboard/question/${id}`}>
      <Card className="h-full flex flex-col w-full justify-between gap-y-4">
        <div className="flex justify-between w-full">
          <h3 className="text-[16px] mr-2">{questionText}</h3>
          {add && <QuestionToggle question={question} />}
        </div>

        <TagGrid>
          <Difficulty difficulty={difficulty} />
          <Tag
            key={"category"}
            tag={category}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
          {tags.map((tag) => (
            <Tag
              key={tag}
              tag={tag}
              setSelectedTags={setSelectedTags}
              selectedTags={selectedTags}
            />
          ))}
        </TagGrid>
      </Card>
    </ConditionalLink>
  );
};
