import React, { useState, useEffect } from "react";
import "./Quiz.css";

function QuizTimer({ totalTime, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(totalTime); // totalTime in seconds

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  // Convert seconds → MM:SS or HH:MM:SS format
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="clock">
      Time Remaining: {formatTime(timeLeft)}
    </div>
  );
}

export default QuizTimer;
