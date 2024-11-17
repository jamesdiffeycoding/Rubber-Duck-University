"use client";
import React from "react";
import { useTheme } from "../ThemeContext";
import { TopicAnswerData } from "../helpers/interfaces";
import { getRelativeTime } from "../helpers/generalFunctions";
const GraduateDuckCardHeading = ({
  item,
  category,
  title,
}: {
  item: TopicAnswerData;
  category: keyof TopicAnswerData;
  title: string;
}) => {
  return (
    <section>
      <div className="flex items-center pb-2 pt-2 text-gray-400 text-xs min-w-[6rem]">
        <hr className="flex-grow border-b-[0.5px] border border-gray-400" />
        <p className="mx-2">{title}</p>{" "}
        <hr className="flex-grow border-b-[0.5px] border border-gray-400" />
      </div>
      {category !== "date" ? (
        <p>{item[category]}</p>
      ) : (
        <p>{getRelativeTime(item[category])}</p>
      )}
    </section>
  );
};

export default GraduateDuckCardHeading;
