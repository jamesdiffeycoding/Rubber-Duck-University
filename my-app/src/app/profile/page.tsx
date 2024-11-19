"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { getData } from "../helpers/databaseFunctions";
import { TopicAnswerData } from "../helpers/interfaces";
import Rankings from "../components/Rankings";
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
  ): number {
    const divisionSize = (upper - lower) / 5;
    const division = Math.floor((ducks - lower) / divisionSize) + 1;
    return Math.min(division, 5); // Ensure the division doesn't exceed 5
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
  function convertDucksToRankAndDivision(
    ducks: number
  ): [string, number, number] {
    for (const { rank, range } of rankData) {
      const [lower, upper] = range;
      if (ducks >= lower && ducks <= upper) {
        // Calculate division for the rank based on ducks count and range
        const division = findDivisionForRankByLowerAndUpperBound(
          ducks,
          lower,
          upper
        );

        // Calculate how many ducks are needed to reach the next division
        const nextDivisionThreshold = upper + 1; // Assuming the next division is the next number above the upper bound
        const ducksNeededForNextDivision = nextDivisionThreshold - ducks;

        // Return the rank, division, and the ducks required to reach the next division
        return [rank, division, ducksNeededForNextDivision];
      }
    }

    // If ducks are out of range
    return ["Unranked", 0, 1];
  }

  const ranksOneThroughFiveArray = [1, 2, 3, 4, 5];

  const rankAndDvision = convertDucksToRankAndDivision(numberOfDucks);

  return (
    <section
      className={`flex-1 h-screen flex flex-col  items-center p-4 ${
        isDarkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-sky-200 text-gray-900 border-gray-300"
      }`}
    >
      <section className="max-w-[900px]">
        {/* Profile Card */}
        <div className="bg-opacity-50 bg-green-500 rounded-xl shadow-2xl flex justify-between">
          {/* First div: This will take only the space it needs horizontally */}
          <div className="flex-none  p-4">
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
              <p className="text-lg mb-4">
                {rankAndDvision[2]} more to the next level.
              </p>
            </div>
          </div>

          {/* Second div: Will fill the remaining vertical height of the parent */}
          <div className="flex flex-col justify-between text-center text-white bg-green-800 p-4 rounded-r-xl rounded-tr-xl">
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

        <Rankings></Rankings>

        <br />
        <h2 className="text-2xl font-semibold mb-4">Graph</h2>
        <p>Help more ducks to see a graph representation of your activity.</p>
      </section>
    </section>
  );
};

export default DisplayStoredData;
