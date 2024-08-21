interface GetStylesProps {
    smallStyles: string;
    largeStyles: string;
    normalStyles: string;
    small?: boolean;
    large?: boolean;
    hideMargin?: boolean;
  }
  
export const getStyles = ({
    smallStyles,
    largeStyles,
    normalStyles,
    small,
    large,
    hideMargin,
  }: GetStylesProps) => {
    const margin = hideMargin ? "" : small ? "mb-2" : large ? "mb-20" : "mb-12";
    const sizingStyles = small ? smallStyles : large ? largeStyles : normalStyles;
    return `${margin} ${sizingStyles}`;
  };