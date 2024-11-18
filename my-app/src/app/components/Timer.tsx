import { useState, useEffect } from "react";
export default function Timer({
  timeOnClock,
  handleTimeRequirementComplete,
}: {
  timeOnClock: number;
  handleTimeRequirementComplete: () => void;
}) {
  const [timeRemaining, setTimeRemaining] = useState(timeOnClock * 60);

  useEffect(() => {
    if (timeRemaining <= 0) return; // Stop when timeRemainingr reaches 0

    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
    }, 1000);

    if (timeRemaining <= 0) {
      handleTimeRequirementComplete();
    }

    return () => clearInterval(interval); // Cleanup interval on unmount or timeRemaining change
  }, [timeRemaining]);

  return (
    <section className="opacity-50 text-white">
      <div className="text-xs">
        {Math.floor(timeRemaining / 60) > 0
          ? `${Math.floor(timeRemaining / 60)} : ${timeRemaining % 60}`
          : timeRemaining > 0
          ? `${timeRemaining % 60} seconds`
          : "Timer complete"}
      </div>
    </section>
  );
}
