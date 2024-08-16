import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useQuestionPlaylistStore from "@/app/data/stores/questionPlaylist";

interface Props {
  question: string;
  id: number;
}

export const InterviewCreatorQuestion = ({ question, id }: Props) => {
  const removeQuestionFromQuestionPlaylist = useQuestionPlaylistStore(
    (state) => state.removeQuestion
  );
  return (
    <div className="bg-white rounded-lg p-4 flex w-full justify-between items-center flex-wrap">
      <h3 className="md:mb-0 mb-4">{question}</h3>
      <IconButton
        size="small"
        onClick={() => {
          removeQuestionFromQuestionPlaylist(id);
        }}
      >
        <DeleteIcon />
      </IconButton>
      <div className="flex flex-wrap items-center gap-4 justify-between w-full"></div>
    </div>
  );
};
