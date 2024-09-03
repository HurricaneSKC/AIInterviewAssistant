import AnimateDiv from "@/components/Animation/AnimateDiv";
import { H1 } from "@/components/Typography/Header";
import Link from "next/link";
import React from "react";
import topicData from "../../data/mockData/topicsData.json";

const Resources = Object.keys(topicData);

const ResourcesPage = () => {
  return (
    <AnimateDiv>
      <H1>Resources</H1>
      <ul className="grid grid-cols-4 gap-x-2 gap-y-3 pb-8">
        {Resources.map((resource, index) => (
          <li
            key={index}
            className="bg-primary hover:bg-gray-300 text-white rounded-full"
          >
            {/* // Add a link to the resource */}
            <Link
              className="h-full w-full flex items-center justify-center p-1"
              href={`resources/${resource}`}
            >
              {resource}
            </Link>
          </li>
        ))}
      </ul>
    </AnimateDiv>
  );
};

export default ResourcesPage;
