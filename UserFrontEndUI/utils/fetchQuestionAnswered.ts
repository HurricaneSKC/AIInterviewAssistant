import { QuestionAnswered } from "@/app/data/stores/user";
import { cookies } from "next/headers";

export async function fetchQuestionsAnswered() {
  console.log("VERCEL_URL", process.env.VERCEL_URL);
  const cookieStore = cookies();
  console.log("cookieStore", cookieStore.toString());

  const URL =
    process.env.VERCEL_ENV === "development"
      ? `http://${process.env.VERCEL_URL}/api/user/question-answered`
      : process.env.VERCEL_ENV === "production"
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/user/question-answered`
      : `https://${process.env.VERCEL_URL}/api/user/question-answered`;

  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.log("response", response);

    if (response.status === 401) {
      console.error("Unauthorized: User not authenticated");
      return { questionsAnswered: [] };
    }
    throw new Error(
      `Failed to fetch questions answered: ${response.statusText}`
    );
  }

  const data = await response.json();
  console.log("API Response:", data);

  // Filter out null values and ensure it's an array
  const filteredQuestions = Array.isArray(data.questionsAnswered)
    ? data.questionsAnswered.filter(
        (question: QuestionAnswered) => question !== null
      )
    : [];

  return { questionsAnswered: filteredQuestions };
}