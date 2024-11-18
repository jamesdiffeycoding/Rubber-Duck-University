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

  // Reusable function for calculating angle based on mouse/touch position
  const calculateAngle = (clientX: number, clientY: number) => {
    if (!circleRef.current) return 0;
    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = (angleRad * 180) / Math.PI;

    return (angleDeg + 360) % 360; // Normalize the angle
  };

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

  function handleStart(
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) {
    e.preventDefault();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    setAngle(calculateAngle(clientX, clientY));
    setIsDragging(true);
  }

  function handleMove(e: MouseEvent | TouchEvent) {
    if (!isDragging || !circleRef.current) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    setAngle(calculateAngle(clientX, clientY));
  }

  function handleEnd() {
    setIsDragging(false);
  }

  const x = radius * Math.cos((angle * Math.PI) / 180);
  const y = radius * Math.sin((angle * Math.PI) / 180);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleEnd);
    } else {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  // Determine the fill percentage for the circle
  const fillPercentage = (angle + 90) % 360;

  return (
    <div className="w-full flex justify-center items-center">
      <div
        className="w-48 h-48 rounded-full flex justify-center items-center relative"
        ref={circleRef}
        onMouseDown={handleStart}
        onTouchStart={handleStart} // Add touch event for mobile
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
            className="w-3/4 h-3/4 object-center p-2 relative rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PracticeCircularSlider;
