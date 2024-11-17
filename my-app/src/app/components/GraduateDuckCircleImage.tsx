"use client";
import React, { useEffect, useState } from "react";
import { getData } from "../helpers/databaseFunctions";
import { useTheme } from "../ThemeContext";

const GraduateDuckCircleImage = ({ index }: { index: number }) => {
  const { isDarkMode } = useTheme();
  return (
    <div className="flex flex-col items-center mb-4">
      <img
        src={`/ducks (${index + 1}).jpg`}
        alt="Rubber Ducky"
        className="w-24 h-24 object-contain rounded-full border-4 border-solid"
        style={{
          borderColor: isDarkMode ? "#ffffff" : "#1F2937",
        }}
      />
    </div>
  );
};

export default GraduateDuckCircleImage;
