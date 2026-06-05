import { useState, useEffect, useRef } from "react";

const WORK_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

export const usePomodoro = (onSessionComplete) => {
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            if (!isBreak) {
              setSessionCount((s) => s + 1);
              if (onSessionComplete) onSessionComplete();
            }
            setIsBreak((b) => !b);
            return isBreak ? WORK_DURATION : BREAK_DURATION;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isBreak]);

  const toggle = () => setIsRunning((r) => !r);

  const reset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(WORK_DURATION);
  };

  const format = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progress = isBreak
    ? ((BREAK_DURATION - timeLeft) / BREAK_DURATION) * 100
    : ((WORK_DURATION - timeLeft) / WORK_DURATION) * 100;

  return { timeLeft, isRunning, isBreak, sessionCount, toggle, reset, format, progress };
};
