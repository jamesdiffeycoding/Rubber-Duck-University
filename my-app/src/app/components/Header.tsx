"use client";
import Link from "next/link";
import HeaderLink from "./HeaderLink";
import { useTheme } from "../ThemeContext"; // Make sure to import the useTheme hook
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme(); // Get theme state and toggle function from context

  return (
    <>
      <header
        className={`p-6 ${
          isDarkMode ? "bg-black text-white" : "bg-emerald-800 text-white"
        }`}
      >
        <section className="flex">
          <div className="flex-1 flex">
            <h1 className="text-3xl font-semibold">
              <div>
                <Link href="/">
                  <button className="font-bold text-xl">
                    Rubber Duck University
                  </button>
                </Link>
              </div>
            </h1>
            <img
              src={`/rubberduckgraduation.png`}
              alt="Rubber Ducky"
              className="w-8 h-8 object-contain"
              style={{
                borderColor: isDarkMode ? "#ffffff" : "#1F2937",
              }}
            />
          </div>
          <div className="ml-auto">
            <div className="flex space-x-4">
              <HeaderLink pageFolder="/graduates" pageName="Graduates" />
              <HeaderLink pageFolder="/practice" pageName="Practice" />
              {/* <HeaderLink pageFolder="/login" pageName="Login" /> */}
              <ThemeToggle />
            </div>
          </div>
        </section>
      </header>
      <hr />
    </>
  );
}
