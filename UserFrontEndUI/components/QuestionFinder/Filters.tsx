import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { H2 } from "../Typography/Header";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  tags: string[];
}

export const Filters = ({
  searchTerm,
  setSearchTerm,
  selectedTags,
  setSelectedTags,
  tags,
}: Props) => {
  const removeTag = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };
  return (
    <>
      <H2 small>Filters</H2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-100 p-4 rounded mb-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 flex-grow rounded"
          placeholder="Search"
        ></input>
        <div className="">
          <Listbox value={selectedTags} onChange={setSelectedTags} multiple>
            <ListboxButton className="flex flex-wrap gap-1 bg-gray-100 px-4 py-2 rounded-md border border-gray-300 w-full">
              {selectedTags.length === 0 ? (
                <span className="text-gray-500">Select tags...</span>
              ) : (
                selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center bg-primary text-white px-3 py-1 rounded-full"
                  >
                    {tag}
                    <button onClick={(e) => removeTag(e, tag)} className="ml-2">
                      <CloseIcon />
                    </button>
                  </span>
                ))
              )}
            </ListboxButton>
            <ListboxOptions
              anchor="bottom end"
              className="flex flex-wrap gap-2 p-2 absolute right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-[var(--button-width)]"
            >
              {tags.map((tag) => (
                <ListboxOption
                  key={tag}
                  value={tag}
                  className={`flex justify-center items-center px-4 py-2 rounded-full cursor-pointer ${
                    selectedTags.includes(tag)
                      ? "bg-primary text-white"
                      : "bg-gray-300 hover:bg-blue-100"
                  }`}
                  onClick={() => setSelectedTags([...selectedTags, tag])}
                >
                  {tag}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>
      </div>
      <H2 small>Questions</H2>
    </>
  );
};
