import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../ThemeContext";
interface PracticeCircularSliderProps {
  handleTimeOnClockSlide: (newTime: number) => void;
}

const PracticeCircularSlider: React.FC<PracticeCircularSliderProps> = ({
  handleTimeOnClockSlide,
}) => {
  const [angle, setAngle] = useState(-90); // Start from top
  const [isDragging, setIsDragging] = useState(false);
  const radius = 93;
  const circleRef = useRef<HTMLDivElement>(null);

  // Handle mouse down event to start dragging and calculate angle on click
  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (circleRef.current) {
      const rect = circleRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const angleRad = Math.atan2(dy, dx);
      const angleDeg = (angleRad * 180) / Math.PI;

      const normalizedAngle = (angleDeg + 360) % 360;
      setAngle(normalizedAngle);
    }
    setIsDragging(true);
    e.preventDefault();
  }
  const { isDarkMode }: { isDarkMode: boolean } = useTheme();

  useEffect(() => {
    const angleWith0AtTop = Math.floor((angle + 90) % 360);
    const newTimeOnClock = convertAngleToTime(angleWith0AtTop);
    handleTimeOnClockSlide(newTimeOnClock); // Pass the new time to the parent
  }, [angle, handleTimeOnClockSlide]);

  function convertAngleToTime(angle: number) {
    const minValue = 3;
    const maxValue = 60;
    const time = Math.floor((angle / 360) * (maxValue - minValue) + minValue);
    return time;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging || !circleRef.current) return;

    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = (angleRad * 180) / Math.PI;

    setAngle(() => {
      const normalizedAngle = (angleDeg + 360) % 360;
      return normalizedAngle;
    });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  const x = radius * Math.cos((angle * Math.PI) / 180);
  const y = radius * Math.sin((angle * Math.PI) / 180);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Determine the fill percentage for the circle
  const fillPercentage = (angle + 90) % 360;

  return (
    <div className="w-full flex justify-center items-center">
      <div
        className="w-48 h-48 rounded-full flex justify-center items-center relative"
        ref={circleRef}
        onMouseDown={handleMouseDown}
        style={{
          background: `conic-gradient(#689f38 ${fillPercentage}deg, #FFA500 0deg)`,
        }}
      >
        <div
          className="absolute w-6 h-6 bg-lime-700 rounded-full z-10"
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.05s, top 0.05s",
          }}
        />
        <div
          className={`w-[11rem] h-[11rem] rounded-full absolute flex items-center justify-center ${
            isDarkMode ? "bg-gray-600" : "bg-yellow-200"
          }`}
        >
          <img
            src={`/ducks (1).png`}
            alt="Rubber Ducky"
            className="w-3/4 h-3/4 object-center p-2 relative rounded-full" // Removed scale and translation
          />
        </div>
      </div>
    </div>
  );
};

export default PracticeCircularSlider;
