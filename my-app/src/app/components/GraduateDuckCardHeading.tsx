"use client";
import React from "react";
import { useTheme } from "../ThemeContext";
import { getRelativeTime } from "../helpers/generalFunctions";
const GraduateDuckCardHeading = ({
  item,
  category,
}: {
  item: any;
  category: string;
}) => {
  const { isDarkMode } = useTheme();
  console.log(item);

  return (
    <section>
      <div className="flex pb-2 pt-2 text-gray-400 text-xs ">
        <hr className="ml-2 mr-2 border-b-[0.5px] border border-gray-400 w-full mt-[0.45rem]" />
        <p className="">
          {category.replace("_", " ").toUpperCase().split(" ")[0]}
        </p>
        <hr className="ml-2 mr-2 border-b-[0.5px] border  border-gray-400 w-full mt-[0.45rem]" />
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
