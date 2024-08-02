import AddIcon from "@mui/icons-material/Add";
import Tag from "./Tag";
import useQuestionPlaylistStore, {
  Question,
} from "../../app/data/stores/questionPlaylist";

export const QuestionToAdd = ({
  id,
  question,
  difficulty,
  tags,
  category,
  answer,
}: Question) => {
  const addQuestionToQuestionPlaylist = useQuestionPlaylistStore(
    (state) => state.addQuestion
  );

  console.log("QuestionToAdd", id, question, difficulty, tags);

  return (
    <div className="bg-gray-100 rounded-lg p-4 flex w-full justify-between gap-x-1">
      <div className="flex flex-col gap-y-4">
        <h3 className="text-[14px]">{question}</h3>
        {/* <p className="text-sm">{category}</p> */}
        <div className="difficulty flex">
          <p className="mr-2 text-sm">{difficulty}</p>
          <div className="flex">
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[2px]"></div>
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[2px]"></div>
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[2px]"></div>
            <div className="h-[20px] w-[10px] bg-gray-300 rounded-sm"></div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="tags flex flex-wrap gap-2 items-center">
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>
      <button
        className="float-right h-fit p-1 bg-black text-white rounded-lg flex justify-center align-middle"
        onClick={() =>
          addQuestionToQuestionPlaylist({
            id,
            question,
            answer,
            category,
            difficulty,
            tags,
          } as Question)
        }
      >
        <AddIcon />
      </button>
    </div>
  );
};
