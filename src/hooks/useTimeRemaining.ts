import { useState, useEffect } from 'react';

interface TimeRemaining {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
}

const useTimeRemaining = (futureTimestamp: number): TimeRemaining => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const currentTime = new Date().getTime();
      const timeDifference = futureTimestamp * 1000 - currentTime;

      if (timeDifference > 0) {
        const oneMinute = 60 * 1000;
        const oneHour = 60 * oneMinute;
        const oneDay = 24 * oneHour;
        const oneMonth = 30 * oneDay;
        const oneYear = 365 * oneDay;

        const years = Math.floor(timeDifference / oneYear);
        const months = Math.floor((timeDifference % oneYear) / oneMonth);
        const days = Math.floor((timeDifference % oneMonth) / oneDay);
        const hours = Math.floor((timeDifference % oneDay) / oneHour);
        const minutes = Math.floor((timeDifference % oneHour) / oneMinute);

        setTimeRemaining({
          years,
          months,
          days,
          hours,
          minutes,
        });
      } else {
        setTimeRemaining({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
        });
      }
    };

    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [futureTimestamp]);

  console.log("timeRemaining",timeRemaining)

  return timeRemaining;
};

export default useTimeRemaining;
