import AddIcon from "@mui/icons-material/Add";

export const AddQuestion = () => {
  return (
    <div className="border border-black rounded-lg p-4 flex w-full justify-between items-center">
      <h3 className="h-fit">Add another question</h3>
      <button className="p-2 bg-white rounded-lg flex justify-center align-middle text-2xl">
        <AddIcon />
      </button>
    </div>
  );
};
