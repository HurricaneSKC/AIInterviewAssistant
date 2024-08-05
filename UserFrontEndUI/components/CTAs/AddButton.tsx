import React from "react";
import AddIcon from "@mui/icons-material/Add";

const AddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="p-2 bg-white rounded-lg flex justify-center align-middle text-2xl"
      style={{
        boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
      }}
      onClick={onClick}
    >
      <AddIcon />
    </button>
  );
};

export default AddButton;
