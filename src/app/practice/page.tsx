"use client";
import { useState, useEffect } from "react";
import Timer from "../components/Timer";
import { useTheme } from "../ThemeContext";
import PracticeCircularSlider from "../components/PracticeSlider";
import Link from "next/link";
import { reloadPage } from "../helpers/generalFunctions";

export default function Home() {
  const [showTopic, setShowTopic] = useState<boolean>(true);
  const [answerEmpty, setAnswerEmpty] = useState<boolean>(true);
  const [topic, setTopic] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState<boolean>(true);
  const [answer, setAnswer] = useState<string>("");
  const [topicEmpty, setTopicEmpty] = useState<boolean>(true);

  const [timeOnClock, setTimeOnClock] = useState<number>(3); // Moved timeOnClock state here

  const [timeRequirementComplete, setTimeRequirementComplete] =
    useState<boolean>(false);
  // Get the current theme from the ThemeContext
  const { isDarkMode }: { isDarkMode: boolean } = useTheme();
  function removePunctuationFromEnd(str: string): string {
    if (/[^\w\s]$/.test(str)) {
      return str.slice(0, -1);
    }
    return str;
  }
  // Event handlers

  const handleTopicChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopic(event.target.value);
  };

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswer(event.target.value);
  };

  // Handle the click on the confirm button
  const handleEnteredTopicClick = () => {
    setShowTopic(false);
  };

  useEffect(() => {
    if (topic.length > 0) {
      setTopicEmpty(false);
    } else {
      setTopicEmpty(true);
    }
  }, [topic]);
  useEffect(() => {
    if (answer.length > 0) {
      setAnswerEmpty(false);
    } else {
      setAnswerEmpty(true);
    }
  }, [answer]);

  const handleEnteredAnswer = () => {
    if (answerEmpty) {
      alert("Please enter an answer before submitting.");
      return;
    }
    if (!timeRequirementComplete) {
      const answer = prompt(
        'Are you sure you want to finish early? Type "confirm" to continue'
      );
      if (answer?.toLowerCase() !== "confirm") {
        return;
      }
    }
    setShowAnswer(false);
    pushTopicAndAnswer(topic, answer);
  };

  // Save the topic and answer to localStorage
  const pushTopicAndAnswer = (topic: string, answer: string): void => {
    const data = {
      topic: topic,
      answer: answer,
      date: new Date().toISOString(),
    };

    const existingData: { topic: string; answer: string; date: string }[] =
      JSON.parse(localStorage.getItem("topicAnswerData") || "[]");

    existingData.push(data);

    localStorage.setItem("topicAnswerData", JSON.stringify(existingData));

    console.log("Data saved to localStorage:", existingData);
  };

  // Handle timeOnClock update from the child component
  const handleTimeOnClockSlide = (newTimeOnClock: number) => {
    setTimeOnClock(newTimeOnClock);
  };
  const handleTimeRequirementComplete = () => {
    setTimeRequirementComplete(true);
  };

  return (
    <main
      className={`flex-1 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-sky-200 text-gray-900"
      }`}
    >
      <section className="flex flex-col justify-center items-center">
        <section className="max-w-[1000px] flex flex-col h-full p-4">
          {/* CHOOSE TOPIC */}
          {showTopic ? (
            <div className="flex flex-col h-full">
              <p className="text-center">
                Choose a <strong>topic</strong> and <strong>the time</strong>{" "}
                you want to write for.
              </p>
              {/* TOPIC INPUT */}
              <div className="flex content-center justify-center w-full align-center">
                <textarea
                  id="topicInput"
                  value={topic}
                  onChange={handleTopicChange}
                  placeholder="Enter topic..."
                  className={`w-full h-[7rem] m-8 p-2 first-line:text-center flex justify-center items-center rounded-xl resize-none z-10  hover:bg-opacity-30  ${
                    isDarkMode
                      ? "bg-slate-700 text-gray-300"
                      : "bg-sky-300 placeholder-green-800"
                  }`}
                  rows={3}
                  cols={10}
                />
              </div>
              {/* SLIDER */}
              <div className="flex-1">
                <PracticeCircularSlider
                  handleTimeOnClockSlide={handleTimeOnClockSlide} // Pass down the handleTimeSlide function
                />
                <div className="text-center text-2xl p-4">
                  {" "}
                  {timeOnClock} minutes{" "}
                </div>
              </div>
              <div /* BOTTOM HALF */>
                <section className="w-full flex-1 flex items-center justify-center">
                  <button
                    onClick={handleEnteredTopicClick} // Handle button click to submit answer
                    className={` text-white p-4 m-8 rounded-lg shadow-lg transition-alls ${
                      topicEmpty
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-sky-700 hover:bg-sky-600"
                    }`}
                  >
                    Confirm Topic
                  </button>
                </section>
              </div>
            </div>
          ) : (
            <>
              {/* ENTER ANSWER */}
              {showAnswer ? (
                <section className="flex flex-col h-full items-center justify-center text-center align-center">
                  {/* 1 */}
                  <img
                    src={`/ducks (1).jpg`}
                    alt={"duck"}
                    className={`w-24 h-24 object-contain rounded-full border-4 border-solid ${
                      isDarkMode ? "border-white" : "border-sky-700"
                    }`}
                  />

                  {/* 2 */}
                  <div className="w-[80%] flex justify-between">
                    <label htmlFor="answerInput" className="block text-lg mb-2">
                      Help Ducky Duckerson prepare for an exam on
                      <strong> {removePunctuationFromEnd(topic)} </strong> by
                      explaining the topic.
                    </label>
                  </div>
                  {/* 3 */}
                  <textarea
                    id="answerInput"
                    value={answer}
                    onChange={handleAnswerChange}
                    placeholder="Explain the topic in as much detail as you can."
                    rows={15}
                    className={`flex-1 w-[90%] border p-2 rounded hover:bg-opacity-30 ${
                      isDarkMode
                        ? "bg-slate-700 text-gray-300"
                        : "bg-sky-300 placeholder-green-800"
                    }`}
                  />
                  {/* 3 */}
                  <section className=" w-full flex items-center justify-center">
                    <button
                      onClick={handleEnteredAnswer} // Handle button click to submit answer
                      className={` text-white p-4 m-4 rounded-lg shadow-lg transition-alls ${
                        timeRequirementComplete && !answerEmpty
                          ? "bg-sky-700 hover:bg-sky-600"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      Confirm Answer
                      <Timer
                        timeOnClock={timeOnClock}
                        handleTimeRequirementComplete={
                          handleTimeRequirementComplete
                        }
                      />
                    </button>
                  </section>
                </section>
              ) : (
                <div className="text-center flex flex-col justify-center flex-wrap">
                  <div className="p-8">Nice work.</div>

                  <div className="w-full grid sm:w-[200px] justify-center text-white gap-8 p-4">
                    <button
                      className="px-6 py-3 rounded-lg bg-sky-900 hover:bg-sky-700 transition-all"
                      onClick={reloadPage}
                    >
                      Let&apos;s go again!
                    </button>
                    <Link href="/graduates">
                      <button className="px-6 py-3 rounded-lg bg-sky-900 hover:bg-sky-700 transition-all">
                        See graduates
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </section>
    </main>
  );
}
