import AddButton from "../CTAs/AddButton";

interface Props {
  toggleQuestionSelector: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddQuestion = ({ toggleQuestionSelector }: Props) => {
  return (
    <div className="border border-black rounded-lg p-4 flex w-full justify-between items-center">
      <p className="h-fit">Add another question</p>
      <AddButton onClick={() => toggleQuestionSelector(true)} />
    </div>
  );
};
