"use client";
import React from "react";
import { TopicAnswerData } from "../helpers/interfaces";
const GraduateDuckCardEditBtn = ({
  index,
  category,
  handleToggleEdit,
}: {
  index: number;
  category: keyof TopicAnswerData;
  handleToggleEdit: (index: number, category: keyof TopicAnswerData) => void;
}) => {
  return (
    <section className="flex justify-center">
      <button
        onClick={() => handleToggleEdit(index, category)}
        className="w-10 ml-4 pl-1 pr-1 rounded-sm hover:bg-emerald-600 bg-emerald-800 text-white"
      >
        Edit
      </button>
    </section>
  );
};

export default GraduateDuckCardEditBtn;
