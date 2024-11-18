import React from "react";
import { TopicAnswerData } from "../helpers/interfaces";
import {
  convertToSentence,
  getCategoryPromptInfo,
} from "../helpers/generalFunctions";
import GraduateDuckCircleImage from "./GraduateDuckCircleImage";
import GraduateDuckCardHeading from "./GraduateDuckCardHeading";
import GraduateDuckCardEditBtn from "./GraduateDuckCardEditBtn";
interface DuckCardProps {
  item: TopicAnswerData;
  index: number;
  isDarkMode: boolean;
  indexOfCardBeingEdited: number | null;
  categoryBeingEdited: keyof TopicAnswerData;
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
          : "bg-white text-gray-900 border-gray-300"
      }`}
      style={{
        transition: "all 0.3s ease",
        flexBasis: indexOfCardBeingEdited === index ? "100%" : "auto",
        zIndex: indexOfCardBeingEdited === index ? 1 : 0,
      }}
    >
      <GraduateDuckCircleImage index={index} />
      {/* TOP ROW */}
      <section className="flex justify-between ">
        <GraduateDuckCardHeading item={item} category="topic" title="Topic" />
        <GraduateDuckCardHeading item={item} category="date" title="Date" />
      </section>
      {/* SECOND ROW */}
      <GraduateDuckCardHeading
        item={item}
        category="answer"
        title="Your explanation"
      />
      {/* THIRD ROW */}
      <section className="flex justify-between">
        {/* positives */}
        <div>
          <GraduateDuckCardHeading
            item={item}
            category="positives"
            title="Positives"
          />
          <GraduateDuckCardEditBtn
            index={index}
            category="positives"
            handleToggleEdit={handleToggleEdit}
          />
        </div>
        {/* thingsToImprove */}
        <div>
          <GraduateDuckCardHeading
            item={item}
            category="thingsToImprove"
            title="Improvements "
          />
          <GraduateDuckCardEditBtn
            index={index}
            category="thingsToImprove"
            handleToggleEdit={handleToggleEdit}
          />
        </div>
      </section>

      {/* MODEL ANSWER */}
      <GraduateDuckCardHeading
        item={item}
        category="modelAnswer"
        title="Model answer"
      />
      <GraduateDuckCardEditBtn
        index={index}
        category="modelAnswer"
        handleToggleEdit={handleToggleEdit}
      />
      {/* TAGS */}
      <GraduateDuckCardHeading item={item} category="tag" title="Tags" />
      <GraduateDuckCardEditBtn
        index={index}
        category="tag"
        handleToggleEdit={handleToggleEdit}
      />

      <div className="mt-4 flex flex-col items-center">
        {indexOfCardBeingEdited === index ? (
          <>
            <textarea
              className="w-full p-2 resize-none text-black rounded-md border border-gray-400"
              placeholder={`${getCategoryPromptInfo(categoryBeingEdited)}`}
              value={textBeingEdited}
              onChange={handleTextChange}
              rows={4}
            />
            <button
              onClick={() => handleSaveEdit(index, categoryBeingEdited)}
              className={`p-1 rounded-md bg-emerald-800 hover:bg-emerald-700 text-white}`}
            >
              Save {convertToSentence(categoryBeingEdited)}
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
