import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Dashboard from "../components/Dashboard";

const questionTypes = {
  behaviour: `Tell me about yourself. Why don${`’`}t you walk me through your resume?`,
  programming: "Can you explain the four principles of OOP with examples?",
  product:
    "One of our e-commerce clients is looking to expand its product line. Talk me through how you would approach this problem.",
  other:
    "You have a 3-gallon jug and 5-gallon jug, how do you measure out exactly 4 gallons?",
};

const selectedInterviewer = {
  id: "Lucy",
  name: "Lucy",
  description: "Software Engineering",
  level: "L3",
};

const selected = {
  id: 1,
  name: "Behavioral",
  description: "General interview questions",
  difficulty: "Easy",
};

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <figure
        className="absolute grid h-full w-full overflow-hidden"
        style={{
          grid: "100%/repeat(1,calc(10px * 28)) 1fr",
        }}
      >
        <Dashboard
          step={1}
          selected={selected}
          selectedInterviewer={selectedInterviewer}
          questionTypes={questionTypes}
        />
      </figure>
    </>
  );
};

export default DashboardPage;
