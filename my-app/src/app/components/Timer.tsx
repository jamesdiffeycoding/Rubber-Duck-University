import { useState, useEffect } from "react";
export default function Timer() {
  const [time, setTime] = useState(300);

  useEffect(() => {
    if (time <= 0) return; // Stop when timer reaches 0

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount or time change
  }, [time]);

  return (
    <section className="flex justify-end items-center text-right w-full">
      <div className="bg-slate-500 p-2 rounded-lg justify-right text-right align-right">
        <h3>Guide timer: </h3>
        {Math.floor(time / 60)} : {time % 60}
      </div>
    </section>
  );
}
