import useQuestionPlaylistStore from "@/app/data/stores/questionPlaylist";
import { Question } from "@/interfaces/Question";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";

interface QuestionToggleProps {
  question: Question;
}

export const QuestionToggle = ({ question }: QuestionToggleProps) => {
  const addQuestionToQuestionPlaylist = useQuestionPlaylistStore(
    (state) => state.addQuestion
  );
  const removeQuestionToQuestionPlaylist = useQuestionPlaylistStore(
    (state) => state.removeQuestion
  );
  const questionsAdded = useQuestionPlaylistStore((state) => state.questions);

  const toggleQuestion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    question: Question
  ) => {
    e.preventDefault();
    e.stopPropagation();
    questionsAdded.includes(question)
      ? removeQuestionToQuestionPlaylist(question.id)
      : addQuestionToQuestionPlaylist(question);
  };
  const added = questionsAdded.includes(question);

  return (
    <button
      className={`float-right h-fit p-1 text-white rounded-lg flex justify-center align-middle ${
        added ? "bg-primary" : "bg-black"
      }`}
      onClick={(e) => toggleQuestion(e, question)}
    >
      {added ? <CheckIcon /> : <AddIcon />}
    </button>
  );
};
