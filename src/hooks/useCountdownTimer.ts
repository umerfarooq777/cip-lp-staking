import React, { useState, useEffect } from 'react';

interface CountdownTime {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  months: number;
  years: number;
}

const useCountdownTimer = (futureTimestamp: number): [number, number, number, number, number, number] => {
  const intervalRef = React.useRef<any>();
  
  const calculateTimeLeft = (): [number, number, number, number, number, number] => {
    const now = new Date().getTime();
    const difference = futureTimestamp * 1000 - now;

    if (difference <= 0) {
      clearInterval(intervalRef.current);
      return [0, 0, 0, 0, 0, 0];
    }

    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));

    return [seconds, minutes, hours, days, months, years];
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return timeLeft;
};

export default useCountdownTimer;
