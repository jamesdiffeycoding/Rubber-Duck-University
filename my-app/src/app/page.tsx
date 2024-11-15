"use client";
import Link from "next/link";
import { useTheme } from "./ThemeContext"; // Import useTheme hook
import RubberDucky from "./components/RubberDucky";

const BannerSection = ({ children, isDarkMode, className }) => (
  <section
    className={`${className} ${
      isDarkMode
        ? "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800"
        : "bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300"
    }`}
  >
    <div
      className="text-2xl text-center p-8"
      style={{ textShadow: "1px 1px 1px rgba(1, 1, 1, 0.4)" }}
    >
      {children}
    </div>
  </section>
);

const CircleImageAndText = ({ imageSrc, altText, description, isDarkMode }) => (
  <div className="flex flex-col items-center text-center">
    <div
      className="mx-auto mb-4 rounded-full"
      style={{
        backgroundColor: isDarkMode
          ? "rgba(0, 0, 0, 0.4)"
          : "rgba(0, 255, 0, 0.2)",
      }}
    >
      <img
        src={imageSrc}
        alt={altText}
        className="w-24 h-24 object-contain rounded-full border-4 border-solid"
        style={{ borderColor: isDarkMode ? "#ffffff" : "#1F2937" }}
      />
    </div>
    <p>{description}</p>
  </div>
);

export default function Home() {
  const { isDarkMode } = useTheme(); // Get dark mode status

  return (
    <section
      className={`flex-1 flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-emerald-200 text-gray-900"
      }`}
    >
      <section className="w-full p-8 text-center flex justify-center">
        <div className="pr-8">
          <RubberDucky />
        </div>
        <div className="flex flex-col justify-center pl-8">
          <div className="text-xl mb-4">
            <strong className="text-2xl">Want to be a better dev? </strong>
            <p>Articulate your learnings for rapid results.</p>
          </div>
        </div>
      </section>
      <hr />

      {/* BANNER */}
      <BannerSection isDarkMode={isDarkMode}>
        <h2 className="text-xl mb-4">Active recall research shows that...</h2>
        <p>
          Articulating your learning improves student results by over 50%
          compared to passive learning methods.
        </p>
        <p className="text-xs">- Stanford Business Review</p>
      </BannerSection>
      <hr />

      {/* HOW IT WORKS */}
      <section className="flex justify-center text-center">
        <div className="p-8 max-w-[1200px]">
          <p className="text-lg">
            Rubber Duck University forces you to engage in active recall and
            verbalization - <strong>building your neural connections</strong>{" "}
            for faster knowledge retrieval and helping you identify your
            knowledge gaps.
          </p>
          <br />
          <p className="text-lg">
            It is a simple technique that can feel like{" "}
            <strong>hard work</strong> - but that's where the growth is.
          </p>
        </div>
      </section>
      <hr />

      {/* 3 STEP PROCESS */}
      <section
        className={`flex justify-center text-white ${
          isDarkMode
            ? "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800"
            : "bg-gradient-to-r from-blue-400 via-blue-800 to-blue-400"
        }`}
      >
        <div className="p-8 max-w-[900px]">
          <h2 className="text-2xl font-bold mb-4 text-center">
            A simple 3-step process for faster learning
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <CircleImageAndText
              imageSrc="/sign.png"
              altText="Step 1: Choose a topic"
              description="Choose a topic to talk about."
              isDarkMode={isDarkMode}
            />
            <CircleImageAndText
              imageSrc="/rubberducky.png"
              altText="Step 2: Teach a duck"
              description="Teach a duck all you know about that topic in 5 minutes."
              isDarkMode={isDarkMode}
            />
            <CircleImageAndText
              imageSrc="/duckgroupsigns.png"
              altText="Step 3: Grade your response"
              description="View and grade your previous responses."
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>
      <hr />

      {/* PROGRESS THROUGH THE DUCK UNIVERSITY RANKS */}
      <section
        className={`w-full flex justify-center text-white ${
          isDarkMode
            ? "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800"
            : "bg-gradient-to-r from-emerald-500 via-emerald-700 to-emerald-500"
        }`}
      >
        <div className="p-8 max-w-[1200px]">
          <h2 className="text-2xl font-bold text-center mb-4">
            Progress through the Duck University ranks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-8">
            <CircleImageAndText
              imageSrc="/ducks (3).jpg"
              altText="Teaching Assistant"
              description="Teaching Assistant"
              isDarkMode={isDarkMode}
            />
            <CircleImageAndText
              imageSrc="/ducks (5).jpg"
              altText="Seminar Leader"
              description="Seminar Leader"
              isDarkMode={isDarkMode}
            />
            <CircleImageAndText
              imageSrc="/ducks (6).jpg"
              altText="Lecturer"
              description="Lecturer"
              isDarkMode={isDarkMode}
            />
            <CircleImageAndText
              imageSrc="/ducks (1).jpg"
              altText="Assistant Professor"
              description="Assistant Professor"
              isDarkMode={isDarkMode}
            />
            <CircleImageAndText
              imageSrc="/duckwithnotebook.jpg"
              altText="Tenured Professor"
              description="Tenured Professor"
              isDarkMode={isDarkMode}
            />
            <CircleImageAndText
              imageSrc="/duckprofessor.jpg"
              altText="Provost"
              description="Provost"
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>
      <hr />

      {/* GET STARTED */}
      <section className="w-full flex-1 flex items-center justify-center">
        <Link href="/practice">
          <button
            className={`p-8 m-8 rounded-lg shadow-lg transition-all ${
              isDarkMode
                ? "bg-emerald-800 hover:bg-emerald-700 text-white"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            Click here to get started
          </button>
        </Link>
      </section>
    </section>
  );
}
