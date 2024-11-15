"use client";
import { useState } from "react";
import Timer from "../components/Timer";
import { useTheme } from "../ThemeContext";
import HeaderLink from "../components/HeaderLink";

export default function Home() {
  const [showTopic, setShowTopic] = useState<boolean>(true);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState<boolean>(true);
  const [answer, setAnswer] = useState<string>("");

  // Get the current theme from the ThemeContext
  const { isDarkMode }: { isDarkMode: boolean } = useTheme();

  // Event handlers
  const handleShowTips = () => {
    setShowTips(!showTips);
  };

  const handleTopicChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopic(event.target.value);
  };

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswer(event.target.value);
  };

  // Handle the Enter key press inside the textarea to submit the topic
  const handleEnteredTopic = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      setShowTopic(false);
    }
  };

  // Handle the click on the confirm button
  const handleEnteredTopicClick = () => {
    setShowTopic(false);
  };
  const handleEnteredAnswer = () => {
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

  return (
    <main
      className={`flex-1 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-emerald-200 text-gray-900"
      }`}
    >
      {showTips && (
        <div
          className={`absolute rounded-2xl p-[5%] m-[5%] w-[90%] ${
            isDarkMode
              ? "bg-black text-white border-white border"
              : "bg-emerald-800 text-white"
          }`}
        >
          <div className={`flex justify-between`}>
            <h2 className="text-2xl pb-4">Tips:</h2>
            <div className="flex justify-center items-center">
              <button
                className={`rounded-xl p-2 hover:bg-emerald-600 text-red-500 ${
                  isDarkMode ? "bg-gray-800" : ""
                }`}
                onClick={handleShowTips}
              >
                X
              </button>
            </div>
          </div>
          <ul className="list-disc list-inside">
            <li>Don't use the internet</li>
            <li>Express things in your own words</li>
            <li>Stay focused on the most important details</li>
            <li>Focus on clarity of your expression</li>
          </ul>
        </div>
      )}

      {/* PAGE CONTAINER */}
      <section className="flex flex-col h-full p-8">
        {/* CHOOSE TOPIC */}
        {showTopic ? (
          <div className="flex flex-col h-full">
            <div
              /* TOP HALF*/
              className="flex-1 flex content-center justify-center w-full align-center relative "
            >
              <img
                src={`/sign.png`}
                alt="Rubber Ducky"
                className="w-3/4 h-3/4 object-contain  p-2 absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2"
              />
              {/* Input Box Over the Image */}
              <textarea
                id="topicInput"
                value={topic}
                onChange={handleTopicChange}
                onKeyDown={handleEnteredTopic} // Handle Enter key press to submit topic
                placeholder="Enter a topic..."
                className="text-2xl text-center justify-center border-none rounded-xl resize-none z-10 placeholder-white bg-transparent hover:bg-green-900 hover:bg-opacity-50 text-white h-[45%]  aspect-square p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                rows={4}
                cols={50}
              />
            </div>

            <div /* BOTTOM HALF */>
              <section className="w-full flex-1 flex items-center justify-center">
                <button
                  onClick={handleEnteredTopicClick} // Handle button click to submit answer
                  className="bg-emerald-700 hover:bg-emerald-600 text-white p-8 m-8 rounded-lg shadow-lg transition-alls"
                >
                  Confirm
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
                <div className="w-[80%] flex justify-between">
                  <div>
                    <button
                      onClick={handleShowTips}
                      className="rounded-2xl bg-emerald-500 hover:bg-emerald-700 roudned-xl p-2 m-2"
                    >
                      {showTips ? "hide tips" : "show tips"}
                    </button>
                  </div>
                  <img
                    src={`/ducks (1).jpg`}
                    alt={"duck"}
                    className={`w-24 h-24 object-contain rounded-full border-4 border-solid ${
                      isDarkMode ? "border-white" : "border-emerald-700"
                    }`}
                  />

                  <label htmlFor="answerInput" className="block text-lg mb-2">
                    Hi! I have a presentation on <strong>{topic}</strong>.
                    Please tell me all you know about it.
                  </label>
                  <Timer />
                </div>
                {/* 3 */}
                <textarea
                  id="answerInput"
                  value={answer}
                  onChange={handleAnswerChange}
                  placeholder="Type something..."
                  rows={4}
                  className={`flex-1 w-[80%] border p-2 rounded ${
                    isDarkMode
                      ? "border-white text-white bg-gray-800"
                      : "border-gray-700 text-gray-900 bg-emerald-300"
                  }`}
                />
                {/* 3 */}
                <section className=" w-full flex items-center justify-center">
                  <button
                    onClick={handleEnteredAnswer} // Handle button click to submit answer
                    className="bg-emerald-700 hover:bg-emerald-600 text-white p-8 m-8 rounded-lg shadow-lg transition-alls"
                  >
                    Confirm
                  </button>
                </section>
              </section>
            ) : (
              <div className="text-center">
                {/* FINISHED */}
                <p className={`${isDarkMode ? "text-white" : "text-black"}`}>
                  Congrats!
                </p>
                <div className="flex justify-center">
                  <div className="w-[400px] bg-emerald-900 rounded-xl text-white">
                    <HeaderLink
                      pageFolder="/graduates"
                      pageName="See the ducks you've helped graduate"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
