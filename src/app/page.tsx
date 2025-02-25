"use client";
import Link from "next/link";
import { useTheme } from "./ThemeContext"; // Import useTheme hook
import Rankings from "./components/Rankings";
import ThreeSteps from "./components/3Steps";
// Home component
export default function Home() {
  const { isDarkMode } = useTheme(); // Get dark mode status

  return (
    <main
      className={`flex-1 flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-sky-200 text-gray-900"
      }`}
    >
      <section className="flex flex-col justify-center items-center">
        <section className="max-w-[900px]">
          <section className="w-full p-4 text-center flex justify-center">
            <div className="flex flex-col justify-center pl-8">
              <div className="text-xl">
                <strong className="text-2xl">Want to learn faster? </strong>
                <p>Articulate your learning for rapid results.</p>
              </div>
            </div>
          </section>

          {/* 3 STEP PROCESS */}
          <ThreeSteps />
          {/* BANNER */}
          <br />

          {/* HOW IT WORKS */}
          <section className="flex justify-center ">
            <div className="p-4">
              <p className="text-lg">
                Rubber Duck University forces you to engage in active recall and
                verbalization -{" "}
                <strong>building your neural connections</strong> for faster
                knowledge retrieval and helping you identify your knowledge
                gaps.
              </p>
              <br />
              <p className="text-lg">
                It is a simple technique that can feel like{" "}
                <strong>hard work</strong> - but that&apos;s where the growth
                is.
              </p>
            </div>
          </section>

          <br></br>
          {/* PROGRESS THROUGH THE DUCK UNIVERSITY RANKS */}
          <Rankings />
          {/* GET STARTED */}
          <section className="w-full flex-1 flex items-center justify-center">
            <Link href="/practice">
              <button
                className={`p-4 m-8 rounded-lg shadow-lg transition-all ${
                  isDarkMode
                    ? "bg-sky-800 hover:bg-sky-700 text-white"
                    : "bg-sky-600 hover:bg-sky-700 text-white"
                }`}
              >
                Click here to get started
              </button>
            </Link>
          </section>
        </section>
      </section>
    </main>
  );
}
