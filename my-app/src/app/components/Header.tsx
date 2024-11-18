"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import HeaderLink from "./HeaderLink";
import { useTheme } from "../ThemeContext";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { isDarkMode } = useTheme(); // Get theme state and toggle function from context
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu open state (for small screens)
  const [isLargeScreen, setIsLargeScreen] = useState(false); // Track screen size

  // Check screen width on initial load and when the window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint (1024px)
        setIsLargeScreen(true);
        setIsMenuOpen(false); // Menu should be open by default on large screens
      } else {
        setIsLargeScreen(false);
        setIsMenuOpen(false); // Menu should be closed by default on small screens
      }
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle menu visibility on small screens
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header
        className={` ${
          isDarkMode ? "bg-black text-white" : "bg-emerald-800 text-white"
        }`}
      >
        <section className="flex justify-between items-center relative p-6">
          <div className="flex-1 flex items-center">
            <h1 className="text-3xl font-semibold">
              <Link href="/">
                <button className="font-bold text-xl">
                  Rubber Duck University
                </button>
              </Link>
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

          {/* Burger Icon for small screens */}
          <button
            onClick={toggleMenu}
            className="block lg:hidden p-2 rounded-md focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <div
            className={`${
              isLargeScreen ? "block" : "hidden"
            } lg:flex lg:space-x-4 ml-auto`}
          >
            <HeaderLink pageFolder="/graduates" pageName="Graduates" />
            <HeaderLink pageFolder="/practice" pageName="Practice" />
            <HeaderLink pageFolder="/profile" pageName="Profile" />
            {/* <HeaderLink pageFolder="/login" pageName="Login" /> */}
            <ThemeToggle />
          </div>

          {/* Dropdown Menu for Small Screens */}
        </section>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } max-w[20rem] text-white shadow-lg rounded-b-md p-4 lg:hidden ${
            isDarkMode ? "bg-black" : "bg-emerald-800"
          }`}
          onClick={toggleMenu}
        >
          <div className="flex justify-between z-10">
            <HeaderLink pageFolder="/graduates" pageName="Graduates" />
            <HeaderLink pageFolder="/practice" pageName="Practice" />
            <HeaderLink pageFolder="/profile" pageName="Profile" />
            {/* <HeaderLink pageFolder="/login" pageName="Login" /> */}
            <div className="text-right">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <hr />
    </>
  );
}
