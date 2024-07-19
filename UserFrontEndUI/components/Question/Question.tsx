import AddIcon from "@mui/icons-material/Add";

interface Props {
  background: string;
}

interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => {
  return (
    <p className="bg-gray-300 text-bold rounded-full px-2 py-1 h-fit whitespace-nowrap truncate text-xs">
      {tag}
    </p>
  );
};

export const Question = ({ background }: Props) => {
  return (
    <div
      className={`${
        background === "gray" ? "bg-gray-100" : "bg-white"
      } rounded-lg p-4 flex w-full justify-between items-center flex-wrap`}
    >
      <h3 className="md:mb-0 mb-4">Walk me through this function</h3>

      <div className="flex flex-wrap items-center gap-4">
        <div className="tags flex gap-2 items-center">
          <Tag tag="Software Engineering" />
          <Tag tag="JavaScript" />
        </div>
        <div className="difficulty flex py-4">
          <p className="mr-2 text-sm">Hard</p>
          <div className="flex">
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[2px]"></div>
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[2px]"></div>
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[2px]"></div>
            <div className="h-[20px] w-[10px] bg-gray-300 rounded-sm"></div>
          </div>
        </div>
        <button className="float-right h-fit p-1 bg-black text-white rounded-lg flex justify-center align-middle">
          <AddIcon />
        </button>
      </div>
    </div>
  );
};
