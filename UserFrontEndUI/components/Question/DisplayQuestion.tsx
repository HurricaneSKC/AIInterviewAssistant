import AddIcon from "@mui/icons-material/Add";
import Tag from "./Tag";

interface Props {
  question: string;
  difficulty: string;
  tags: string[];
}

export const DisplayQuestion = ({ question, difficulty, tags }: Props) => {
  return (
    <div className="bg-white rounded-lg p-4 flex w-full justify-between items-center flex-wrap">
      <h3 className="md:mb-0 mb-4">{question}</h3>

      <div className="flex flex-wrap items-center gap-4">
        <div className="tags flex gap-2 items-center">
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
        <div className="difficulty flex py-4">
          <p className="mr-2 text-sm">{difficulty}</p>
          <div className="flex">
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[2px]"></div>
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[2px]"></div>
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[2px]"></div>
            <div className="h-[20px] w-[10px] bg-gray-300 rounded-sm"></div>
          </div>
        </div>
        {/* <button className="float-right h-fit p-1 bg-black text-white rounded-lg flex justify-center align-middle">
          <AddIcon />
        </button> */}
      </div>
    </div>
  );
};
