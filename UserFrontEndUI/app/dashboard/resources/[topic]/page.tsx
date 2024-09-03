import React from "react";
import data from "../../../data/mockData/topicsData.json";
import parse from "html-react-parser";
import { H1, H2 } from "@/components/Typography/Header";

// Define the type for your data structure
type TopicData = {
  slug: string;
  description: string;
  "minimum-500-worded-deepdive-for-learning": string;
  "minimum-500-description-explained-like-a-child": string;
  "real-world-example": string;
  principles: string[];
};

// Define the type for the entire dataset
type TopicsData = {
  [key: string]: TopicData;
};

const Page = ({ params }: { params: { topic: string } }) => {
  const { topic } = params;
  console.log("topic", topic);

  const decodedTopic = decodeURIComponent(topic);
  const normalizedTopic = decodedTopic.toLowerCase().replace(/\s+/g, "-");
  const normalizedData: TopicsData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key.toLowerCase().replace(/\s+/g, "-"),
      value,
    ])
  );

  const topicData = normalizedData[normalizedTopic];

  if (!topicData) {
    return <div>Topic not found</div>;
  }

  function formatContent(text: string) {
    const paragraphs = text.split("\n\n");
    return paragraphs
      .map((paragraph) => {
        if (paragraph.match(/^\d+\./)) {
          const listItems = paragraph
            .split("\n")
            .map((item) => {
              return `<p>${item.replace(/^\d+\.\s*/, "")}</p>`;
            })
            .join("");
          return `<li className="list-none">${listItems}</li>`;
        } else {
          return `<p>${paragraph}</p>`;
        }
      })
      .join("");
  }

  const sections = [
    { title: "Description", content: topicData.description },
    {
      title: "Deepdive",
      content: topicData["minimum-500-worded-deepdive-for-learning"],
    },
    {
      title: "Explained to a child",
      content: topicData["minimum-500-description-explained-like-a-child"],
    },
    { title: "Real World Examples", content: topicData["real-world-example"] },
  ];

  return (
    <>
      <H1>{decodedTopic}</H1>
      <main className="flex flex-col gap-1 mt-2 pb-10">
        {sections.map((section, index) => (
          <section key={index} className="flex flex-col gap-2 my-2">
            <h2 className="text-4xl my-4">{section.title}</h2>
            {parse(formatContent(section.content))}
          </section>
        ))}
        <section className="flex flex-col gap-2 my-2">
          <h2 className="text-4xl my-4">Principles</h2>
          <ul>
            {topicData.principles.map((principle, index) => (
              <li key={index}>{principle}</li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Page;
