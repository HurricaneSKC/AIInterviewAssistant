import { redirect, useParams } from "next/navigation";
import MockQuestionData from "@/app/data/questionData.json";
import AnimateDiv from "@/components/Animation/AnimateDiv";
import { H1, H2, H3, H4 } from "@/components/Typography/Header";
import PTag from "@/components/Typography/PTag";
import { Difficulty } from "@/components/Question/Difficulty";
import Tag from "@/components/Question/Tag";
import { Card } from "@/components/Layout/Card";
import { TagGrid } from "@/components/Layout/TagGrid";
import { CtaCard } from "@/components/CTAs/CtaCard";
import { auth } from "@/auth";
import LinkButton from "@/components/CTAs/LinkButton";

const QuestionPage = async ({ params }: { params: { questionId: string } }) => {
  const { questionId } = params;
  const questions = Object.values(MockQuestionData);
  const session = await auth();
  console.log(session);

  const question = questions.find(
    (question) => question.id === parseInt(questionId)
  );

  if (!question) {
    redirect("/dashboard");
  }

  const completed = false;

  const transcript =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dicta nemo perspiciatis? Dolorem, neque vitae. Est non distinctio optio numquam nihil dolorum magni? Sed, nulla quidem. Ea adipisci laudantium suscipit!";
  const feedback =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dicta nemo perspiciatis? Dolorem, neque vitae. Est non distinctio optio numquam nihil dolorum magni? Sed, nulla quidem. Ea adipisci laudantium suscipit!";

  return (
    <AnimateDiv>
      <H1>Question {question.id}</H1>
      <H2>{question.question}</H2>

      <H2 small>Question Details</H2>
      <Card className="mb-4">
        <TagGrid>
          <Difficulty difficulty={question.difficulty} />
          <Tag key={"category"} tag={question.category} />
          {question.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </TagGrid>
      </Card>
      <CtaCard
        mainText="Need some more practice?"
        pageLink="/interview"
        buttonText={completed ? "Retry this question" : "Try this question"}
      />
      <H2 small>My Answer</H2>

      {completed ? (
        <Card>
          <H3 small>Answer Transcript</H3>
          <PTag small showMargin>
            {transcript}
          </PTag>
          <H3 small>Feedback</H3>
          <PTag small>{feedback}</PTag>
        </Card>
      ) : (
        <Card className="flex flex-col justify-center items-center">
          <PTag small showMargin className="w-fit">
            You haven&apos;t answered this question yet.
          </PTag>
        </Card>
      )}
    </AnimateDiv>
  );
};

export default QuestionPage;
