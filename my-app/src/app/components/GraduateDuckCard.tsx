// components/DuckCard.tsx
import React from "react";
import { TopicAnswerData } from "../helpers/interfaces";
import { getRelativeTime } from "../helpers/generalFunctions";
import GraduateDuckCircleImage from "./GraduateDuckCircleImage";
import GraduateDuckCardHeading from "./GraduateDuckCardHeading";
import GraduateDuckCardEditBtn from "./GraduateDuckCardEditBtn";
interface DuckCardProps {
  item: TopicAnswerData;
  index: number;
  isDarkMode: boolean;
  indexOfCardBeingEdited: number | null;
  categoryBeingEdited: keyof TopicAnswerData | "";
  textBeingEdited: string;
  handleToggleEdit: (index: number, category: keyof TopicAnswerData) => void;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSaveEdit: (index: number, category: keyof TopicAnswerData) => void;
}

const GraduateDuckCard: React.FC<DuckCardProps> = ({
  item,
  index,
  isDarkMode,
  indexOfCardBeingEdited,
  categoryBeingEdited,
  textBeingEdited,
  handleToggleEdit,
  handleTextChange,
  handleSaveEdit,
}) => {
  return (
    <section
      className={`p-4 rounded-lg shadow-md border transition-all ease-in-out ${
        indexOfCardBeingEdited === index
          ? "w-full bg-gray-800 text-white flex-grow"
          : isDarkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-amber-200 text-gray-900 border-gray-300"
      }`}
      style={{
        transition: "all 0.3s ease",
        flexBasis: indexOfCardBeingEdited === index ? "100%" : "auto",
        zIndex: indexOfCardBeingEdited === index ? 1 : 0,
      }}
    >
      <GraduateDuckCircleImage index={index} />
      <section className="grid ">
        <GraduateDuckCardHeading item={item} category="topic" />
        <GraduateDuckCardHeading item={item} category="answer" />
        <GraduateDuckCardHeading item={item} category="date" />
        <GraduateDuckCardHeading item={item} category="model_answer" />
        <GraduateDuckCardEditBtn
          index={index}
          category="model_answer"
          handleToggleEdit={handleToggleEdit}
        />
        <GraduateDuckCardHeading item={item} category="comment" />
        <GraduateDuckCardEditBtn
          index={index}
          category="comment"
          handleToggleEdit={handleToggleEdit}
        />
        <GraduateDuckCardHeading item={item} category="tag" />
        <GraduateDuckCardEditBtn
          index={index}
          category="tag"
          handleToggleEdit={handleToggleEdit}
        />
      </section>

      <div className="mt-4 flex flex-col items-center">
        {indexOfCardBeingEdited === index ? (
          <>
            <textarea
              className="w-full p-2 resize-none text-black rounded-md border border-gray-400"
              placeholder={`Edit your ${categoryBeingEdited.replace(
                "_",
                " "
              )} here`}
              value={textBeingEdited}
              onChange={handleTextChange}
              rows={4}
            />
            <button
              onClick={() => handleSaveEdit(index, categoryBeingEdited)}
              className={`p-1 rounded-md ${
                isDarkMode
                  ? "bg-emerald-800 hover:bg-emerald-700 text-white"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              Save {categoryBeingEdited}
            </button>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
};

export default GraduateDuckCard;
