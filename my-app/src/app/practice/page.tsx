"use client";
import { useState, useEffect } from "react";
import Timer from "../components/Timer";
import { useTheme } from "../ThemeContext";
import HeaderLink from "../components/HeaderLink";
import PracticeCircularSlider from "../components/PracticeSlider";
import { useRouter } from "next/router";
import Link from "next/link";
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
  const reloadPage = () => {
    window.location.reload();
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
        isDarkMode ? "bg-gray-900 text-white" : "bg-emerald-200 text-gray-900"
      }`}
    >
      <section className="flex flex-col h-full p-8">
        {/* CHOOSE TOPIC */}
        {showTopic ? (
          <div className="flex flex-col h-full">
            <p className="text-center">
              Choose a <strong>topic</strong> and <strong>the time</strong> you
              want to talk about it for.
            </p>
            {/* TOPIC INPUT */}
            <div className="flex content-center justify-center w-full align-center">
              <textarea
                id="topicInput"
                value={topic}
                onChange={handleTopicChange}
                placeholder="Enter topic..."
                className={`w-full h-[7rem] m-8 p-2 first-line:text-center flex justify-center items-center rounded-xl resize-none z-10  hover:bg-green-900 hover:bg-opacity-50 hover:text-white hover:placeholder-white ${
                  isDarkMode
                    ? "bg-gray-800 placeholder-white"
                    : "bg-emerald-300 placeholder-black"
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
              <div className="text-center text-2xl p-4"> {timeOnClock}:00</div>
            </div>
            <div /* BOTTOM HALF */>
              <section className="w-full flex-1 flex items-center justify-center">
                <button
                  onClick={handleEnteredTopicClick} // Handle button click to submit answer
                  className={` text-white p-4 m-8 rounded-lg shadow-lg transition-alls ${
                    topicEmpty
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-emerald-700 hover:bg-emerald-600"
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
                    isDarkMode ? "border-white" : "border-emerald-700"
                  }`}
                />

                {/* 2 */}
                <div className="w-[80%] flex justify-between">
                  <label htmlFor="answerInput" className="block text-lg mb-2">
                    Help Ducky Duckerson prepare for an exam on
                    <strong> {topic} </strong> by explaining the topic.
                  </label>
                </div>
                {/* 3 */}
                <textarea
                  id="answerInput"
                  value={answer}
                  onChange={handleAnswerChange}
                  placeholder="Explain the topic in as much detail as you can."
                  rows={15}
                  className={`flex-1 w-[90%] border p-2 rounded resize hover:bg-green-900 hover:bg-opacity-50 hover:text-white hover:placeholder-white ${
                    isDarkMode
                      ? "border-white text-white bg-gray-800"
                      : "border-gray-700 text-gray-900 bg-emerald-300"
                  }`}
                />
                {/* 3 */}
                <section className=" w-full flex items-center justify-center">
                  <button
                    onClick={handleEnteredAnswer} // Handle button click to submit answer
                    className={` text-white p-4 m-4 rounded-lg shadow-lg transition-alls ${
                      timeRequirementComplete && !answerEmpty
                        ? "bg-emerald-700 hover:bg-emerald-600"
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
              <div className="text-center flex justify-center flex-wrap">
                <div className="flex flex-col items-center">
                  {" "}
                  {/* Allow items to stack */}
                  <p>Nice work.</p>
                  <img
                    src={`/rubberduckgraduation.jpg`}
                    alt={"duckgraduate"}
                    className={`w-24 h-24 object-contain rounded-full border-4 border-solid ${
                      isDarkMode ? "border-white" : "border-emerald-700"
                    }`}
                  />
                </div>

                <div className="w-full grid sm:w-[200px] justify-center text-white gap-8 p-4">
                  <button
                    className="px-6 py-3 rounded-lg bg-emerald-900 hover:bg-emerald-700 transition-all"
                    onClick={reloadPage}
                  >
                    Let's go again!
                  </button>
                  <Link href="/graduates">
                    <button className="px-6 py-3 rounded-lg bg-emerald-900 hover:bg-emerald-700 transition-all">
                      See graduates
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
