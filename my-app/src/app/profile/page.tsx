"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { getData } from "../helpers/databaseFunctions";
import { TopicAnswerData } from "../helpers/interfaces";

const DisplayStoredData = () => {
  const { isDarkMode } = useTheme();
  const [storedData, setStoredData] = useState<TopicAnswerData[]>([]);

  // Use Effect for getting stored data
  useEffect(() => {
    setStoredData(getData);
  }, []);

  const numberOfDucks = storedData.length;

  // Helper function to find division for a given range
  function findDivisionForRankByLowerAndUpperBound(
    ducks: number,
    lower: number,
    upper: number
  ): string {
    const divisionSize = (upper - lower) / 5;
    const division = Math.floor((ducks - lower) / divisionSize) + 1;
    return Math.min(division, 5).toString(); // Ensure the division doesn't exceed 5
  }

  // Array with ranks and their corresponding ranges
  const rankData = [
    { rank: "Teaching Assistant", range: [1, 19] },
    { rank: "Seminar Leader", range: [20, 99] },
    { rank: "Lecturer", range: [100, 299] },
    { rank: "Assistant Professor", range: [300, 699] },
    { rank: "Tenured Professor", range: [700, 999] },
    { rank: "Provost", range: [1000, 1500] },
  ];

  // Function to find the rank and division based on the number of ducks
  function convertDucksToRankAndDivision(ducks: number): [string, string] {
    for (const { rank, range } of rankData) {
      const [lower, upper] = range;
      if (ducks >= lower && ducks <= upper) {
        // Calculate division for the rank based on ducks count and range
        const division = findDivisionForRankByLowerAndUpperBound(
          ducks,
          lower,
          upper
        );
        return [rank, division];
      }
    }
    // If ducks are out of range
    return ["Rank not found", "0"];
  }
  const ranksOneThroughFiveArray = [1, 2, 3, 4, 5];

  const rankAndDvision = convertDucksToRankAndDivision(numberOfDucks);

  return (
    <section
      className={`flex-1 h-screen flex flex-col justify-center items-center p-8 ${
        isDarkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-emerald-200 text-gray-900 border-gray-300"
      }`}
    >
      <section className="max-w-[700px]">
        {/* Profile Card */}
        <div className="bg-opacity-50 bg-yellow-500 rounded-xl shadow-2xl flex justify-between">
          {/* First div: This will take only the space it needs horizontally */}
          <div className="flex-none  p-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              {/* Profile Name */} Your Profile
            </h3>
            <p className="text-lg mb-4">
              You have helped {numberOfDucks} ducks.
            </p>

            <div>
              <div className="text-xl sm:text-2xl md:text-3xl  mb-2">
                Rank | <strong>{rankAndDvision[0]}</strong>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl mb-4">
                Division | <strong>{rankAndDvision[1]}</strong>
              </div>
            </div>
          </div>

          {/* Second div: Will fill the remaining vertical height of the parent */}
          <div className="flex flex-col justify-between text-center text-white bg-amber-800 p-6 rounded-r-xl rounded-tr-xl">
            <div className="flex-1 flex flex-col justify-between">
              {ranksOneThroughFiveArray.map((number, index) => {
                return (
                  <div key={index} className="">
                    {number}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <br />

        <h2 className="text-2xl font-semibold mb-4">
          Progress through the ranks
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {rankData.map(({ rank, range }) => {
            return (
              <div
                key={rank}
                className={`bg-emerald-700 text-white p-6 rounded-lg shadow-lg flex flex-col text-center items-center justify-between`}
              >
                <h3 className="text-xl font-semibold m-0 p-0">{rank}</h3>
                <div className="mt-4 text-sm">{range[0]} ducks</div>
              </div>
            );
          })}
        </div>

        <br />
        <h2 className="text-2xl font-semibold mb-4">Graph (coming soon)</h2>
      </section>
    </section>
  );
};

export default DisplayStoredData;
