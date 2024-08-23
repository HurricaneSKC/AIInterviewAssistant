import LinkButton from "./LinkButton";

interface Props {
  mainText: string;
  pageLink: string;
  buttonText: string;
}

export const CtaCard = ({ mainText, pageLink, buttonText }: Props) => {
  return (
    <div className="bg-primary rounded mb-2 p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 flex-wrap justify-between items-center">
      <p className="text-white">{mainText}</p>
      <div className="md:flex justify-end">
        <LinkButton pageLink={pageLink} buttonText={buttonText} rightArrow />
      </div>
    </div>
  );
};
