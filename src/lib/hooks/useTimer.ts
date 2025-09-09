import { useEffect, useState } from "react";

export default function useTimer({
  datetime,
  waitTime,
  onFinish,
}: {
  datetime: number;
  waitTime: number;
  onFinish?: () => void;
}) {
  const [time, setTime] = useState(datetime + waitTime - Date.now());
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const allowedTime = datetime + waitTime;

  useEffect(() => {
    const interval = setInterval(() => {
      const timeDiff = allowedTime - Date.now();
      setTime(timeDiff);
      if (timeDiff <= 0) {
        setTime(0);
        clearInterval(interval);
        if (onFinish) onFinish();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [datetime]);

  return { minutes, seconds, time };
}
