"use client";
import RubberDucky from "../components/RubberDucky";
import RubberDuckyWords from "../components/RubberDuckyWords";
import { useState, useEffect } from "react";

export default function Home() {
  const [stage, setStage] = useState(0);
  const [showTopic, setShowTopic] = useState(true);
  const [topic, setTopic] = useState("");

  const [showAnswer, setShowAnswer] = useState(true);
  const [answer, setAnswer] = useState("");

  const [showReflection, setShowReflection] = useState(true);
  const [reflection, setReflection] = useState("");

  const [duckHeading, setDuckHeading] = useState(
    "Tell me what you want to learn more about."
  );
  const [duckParagraph, setDuckParagraph] = useState(
    "Answer my questions without external support to truly deepen your learning."
  );
  const handleTopicChange = (event) => {
    setTopic(event.target.value); // Update the state with the new input value
  };
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value); // Update the state with the new input value
  };
  const handleReflectionChange = (event) => {
    setAnswer(event.target.value); // Update the state with the new input value
  };

  const handleEnteredTopic = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || "button" in event) {
      setDuckHeading(`Tell me about ${topic}`);
      setDuckParagraph(`Do the best you can.`);
      setShowTopic(false);
    }
  };
  const handleEnteredAnswer = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if ("button" in event) {
      setShowAnswer(false);
      setDuckHeading(`Nice work. Now assess your answer.`);
      setDuckParagraph(
        `Write down something you did well and something you'd like to improve on your answer. You can use the internet`
      );
    }
  };
  const handleEnteredReflection = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if ("button" in event) {
      setShowReflection(false);
      setDuckHeading(`Well done.`);
      setDuckParagraph(`I'm proud of you.`);
    }
  };

  return (
    <>
      <main className="bg-gray-100 p-8">
        <section className="flex">
          <RubberDucky />
          <RubberDuckyWords heading={duckHeading} paragraph={duckParagraph} />
        </section>

        <hr></hr>
        {showTopic ? (
          <section className="text-black">
            <label htmlFor="topicInput" className="block text-lg mb-2">
              Enter Text:
            </label>
            <input
              type="text"
              id="topicInput"
              value={topic}
              onChange={handleTopicChange}
              onKeyDown={handleEnteredTopic}
              placeholder="Type something..."
              className="border p-2 rounded"
            />
            <button className="bg-green-500" onClick={handleEnteredTopic}>
              Enter Topic
            </button>
          </section>
        ) : (
          <>
            {showAnswer ? (
              <div>
                <section className="text-black">
                  <label htmlFor="answerInput" className="block text-lg mb-2">
                    Enter asd:
                  </label>
                  <textarea
                    id="answerInput"
                    value={answer}
                    onChange={handleAnswerChange}
                    placeholder="Type something..."
                    rows={4} // Sets the number of rows (lines) visible
                    cols={50} // Sets the width (number of columns) of the textarea
                    className="border p-2 rounded w-full"
                  />
                  <button
                    className="bg-green-500"
                    onClick={handleEnteredAnswer}
                  >
                    Enter Answer
                  </button>
                </section>
              </div>
            ) : (
              <>
                {showReflection ? (
                  <div>
                    <section className="text-black">
                      <label
                        htmlFor="reflectionInput"
                        className="block text-lg mb-2"
                      >
                        Enter reflection:
                      </label>
                      <textarea
                        id="reflectionInput"
                        value={reflection}
                        onChange={handleReflectionChange}
                        placeholder="Type something..."
                        rows={4} // Sets the number of rows (lines) visible
                        cols={50} // Sets the width (number of columns) of the textarea
                        className="border p-2 rounded w-full"
                      />
                      <button
                        className="bg-green-500"
                        onClick={handleEnteredReflection}
                      >
                        Enter reflectionss
                      </button>
                    </section>
                  </div>
                ) : (
                  <div>Congrats</div>
                )}
              </>
            )}
          </>
        )}

        <hr></hr>
      </main>
    </>
  );
}
