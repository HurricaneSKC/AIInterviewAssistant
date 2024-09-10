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
import { CustomUser, auth } from "@/auth";
import AddQuestionToPLaylistButton from "@/components/CTAs/AddQuestionToPlaylistButton";
import { cookies } from "next/headers";
import { QuestionAnswered } from "@/app/data/stores/user";
import { fetchQuestionsAnswered } from "@/utils/fetchQuestionAnswered";

const QuestionPage = async ({ params }: { params: { questionId: string } }) => {
  const { questionId } = params;
  const questions = Object.values(MockQuestionData);
  const session = await auth();
  const user = session?.user as CustomUser;

  let questionsAnswered: QuestionAnswered[] = [];
  try {
    // Fetch questions answered from the API
    const data = await fetchQuestionsAnswered();
    console.log("Data:", data);

    if (!data) {
      throw new Error("Failed to fetch questions answered");
    }
    questionsAnswered = data.questionsAnswered || [];
  } catch (error) {
    console.error("Error fetching questions answered:", error);
    // You might want to set an error state here or handle it differently
  }

  let transcript: string = "You haven't answered this question yet.";
  let evaluation: string = "You haven't answered this question yet.";
  let completed: boolean = false;

  questionsAnswered.forEach((question) => {
    if (question.QuestionId.toString() === questionId) {
      completed = true;
      evaluation = question.evaluation;
      transcript = question.transcript;
    }
  });

  const question = questions.find(
    (question) => question.id === parseInt(questionId)
  );

  if (!question) {
    redirect("/dashboard");
  }

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
      <CtaCard mainText="Need some more practice?">
        <AddQuestionToPLaylistButton
          buttonText={completed ? "Retry this question" : "Try this question"}
          question={question}
        />
      </CtaCard>
      <H2 small>My Answer</H2>

      {completed ? (
        <Card>
          <H3 small>Answer Transcript</H3>
          <PTag small showMargin>
            {transcript}
          </PTag>
          <H3 small>Feedback</H3>
          <PTag small>{evaluation}</PTag>
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
