import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Tag from "./Tag";
import useQuestionPlaylistStore from "../../app/data/stores/questionPlaylist";
import { Question as QuestionInterface } from "@/interfaces/Question";
import { Difficulty } from "./Difficulty";

interface QuestionProps {
  question: QuestionInterface;
  add?: boolean;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

export const Question = ({
  question,
  add,
  selectedTags,
  setSelectedTags,
}: QuestionProps) => {
  const { id, question: questionText, category, difficulty, tags } = question;
  const addQuestionToQuestionPlaylist = useQuestionPlaylistStore(
    (state) => state.addQuestion
  );
  const removeQuestionToQuestionPlaylist = useQuestionPlaylistStore(
    (state) => state.removeQuestion
  );
  const questionsAdded = useQuestionPlaylistStore((state) => state.questions);

  const toggleTag = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  const toggleQuestion = (question: QuestionInterface) => {
    questionsAdded.includes(question)
      ? removeQuestionToQuestionPlaylist(question.id)
      : addQuestionToQuestionPlaylist(question);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 flex w-full justify-between gap-x-1">
      <div className="flex flex-col gap-y-4">
        <h3 className="text-[14px]">{questionText}</h3>

        <div className="flex flex-wrap items-center gap-4">
          <div className="tags flex flex-wrap gap-2 items-center">
            <Difficulty difficulty={difficulty} />
            <Tag key={"category"} tag={category} />
            {tags.map((tag) => (
              <Tag
                key={tag}
                tag={tag}
                selected={selectedTags && selectedTags.includes(tag)}
                toggleTag={() => toggleTag(tag)}
              />
            ))}
          </div>
        </div>
      </div>
      {add && (
        <button
          className="float-right h-fit p-1 bg-black text-white rounded-lg flex justify-center align-middle"
          onClick={() => toggleQuestion(question)}
        >
          {questionsAdded.includes(question) ? <RemoveIcon /> : <AddIcon />}
        </button>
      )}
    </div>
  );
};
