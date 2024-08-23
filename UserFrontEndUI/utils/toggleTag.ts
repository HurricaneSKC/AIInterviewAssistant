export const toggleTag = (tag: string, setSelectedTags: (tags: string[]) => void, selectedTags: string[]) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
};