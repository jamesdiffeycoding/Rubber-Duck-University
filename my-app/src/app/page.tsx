"use client";
import Link from "next/link";
import { useTheme } from "./ThemeContext"; // Import useTheme hook
import RubberDucky from "./components/RubberDucky";
import Rankings from "./components/Rankings";
import ThreeSteps from "./components/3Steps";
// Define the types for the BannerSection props
interface BannerSectionProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  className?: string;
}

// BannerSection component
const BannerSection = ({
  children,
  isDarkMode,
  className,
}: BannerSectionProps) => (
  <section
    className={`${className} ${
      isDarkMode
        ? "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800"
        : "bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300"
    }`}
  >
    <div
      className="text-2xl text-center p-4"
      style={{ textShadow: "1px 1px 1px rgba(1, 1, 1, 0.4)" }}
    >
      {children}
    </div>
  </section>
);

// Define the types for CircleImageAndText props
interface CircleImageAndTextProps {
  imageSrc: string;
  altText: string;
  description: string;
  isDarkMode: boolean;
}

// CircleImageAndText component
const CircleImageAndText = ({
  imageSrc,
  altText,
  description,
  isDarkMode,
}: CircleImageAndTextProps) => (
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
                <p>Articulate your understanding for rapid results.</p>
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
