import { useEthereum } from "@/context/cipMainContext";
import { useCallback, useEffect, useRef, useState } from "react";

const BoosterTimer = () => {


  const { userData } = useEthereum()
  // const [countDownTime, setCountDownTIme] = useState({
  //   days: 0,
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });
  // const secondTimer = useRef(null);
  // const getTimeDifference = (countDownDate: number) => {
  //   const currentTime = new Date().getTime();
  //   const timeDiffrence = countDownDate - currentTime;
  //   const days = Math.floor(timeDiffrence / (24 * 60 * 60 * 1000));
  //   const hours = Math.floor(
  //     (timeDiffrence % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
  //   );
  //   const minutes = Math.floor(
  //     (timeDiffrence % (60 * 60 * 1000)) / (1000 * 60)
  //   );
  //   const seconds = Math.floor((timeDiffrence % (60 * 1000)) / 1000);
  //   if (timeDiffrence < 0) {
  //     setCountDownTIme({
  //       days: 0,
  //       hours: 0,
  //       minutes: 0,
  //       seconds: 0,
  //     });
  //   } else {
  //     setCountDownTIme({
  //       days: days,
  //       hours: hours,
  //       minutes: minutes,
  //       seconds: seconds,
  //     });
  //   }
  // };
  // const startCountDown = useCallback(() => {
  //   const customDate = new Date();
  //   const countDownDate = new Date(
  //     customDate.getFullYear(),
  //     customDate.getMonth(),
  //     customDate.getDate() + 50,
  //     customDate.getHours() + 18,
  //     customDate.getMinutes() + 25,
  //     customDate.getSeconds() + 8
  //   );
  //   setInterval(() => {
  //     getTimeDifference(countDownDate.getTime());
  //   }, 1000);
  // }, []);

  // useEffect(() => {
  //   startCountDown();
  // }, [startCountDown]);

  //!=======================================
  let timerActive = true;
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  let timeRegistration2 = (userData && userData[0]) ? (Number(userData[0]) + 1296000) : 0
  // let timeRegistration2 = 1696279056 + (24 *3600)


  function calculateTimeRemaining() {
    // if (userData && userData.length>0) {
    let timeRegistration = userData ? (Number(userData[0]) + 1296000) : 0
    // let timeRegistration = 1696279056 - (24 *3600)
    const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const difference = timeRegistration - now;

    if (difference <= 0) {
      timerActive = false;
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = difference % 60;
    const minutes = Math.floor((difference / 60) % 60);
    const hours = Math.floor((difference / 3600) % 24);
    const days = Math.floor(difference / 86400);



    return { days, hours, minutes, seconds };
    // } else {

    //   return { days:0, hours:0, minutes:0, seconds:0 };
    //   }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (timerActive) {

        setTimeRemaining(calculateTimeRemaining());
      }

    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    //  console.log("timeRemaining",timeRemaining,userData&&Number(userData[0]),timerActive);
    //  const {days,hours,minutes,seconds} = timeRemaining
    //  if (days==0&&hours==0&&minutes==0&&seconds==0) {
    //     setTimerActive(false);
    //  }

  }, [timeRemaining]);

  return (
    <article className="bg-neutral-900 flex flex-col items-start rounded-lg p-5 w-full h-full">
      <img src="/icons/timer.svg" className="mb-5" alt="" />
      <small className="text-neutral-500 font-medium text-base">
        Booster Timer {(timeRegistration2 > 0 && !timerActive) ? "(Time Over)" : (timeRegistration2 == 0 && !timerActive) ? "(Stake to start timer)" : null}
      </small>
      <div className="grid grid-cols-4 py-3 w-full flex-1 items-center gap-2 mt-3 md:gap-5 md:px-10  h-36 overflow-hidden">
        <div className="flex flex-col">
          <div className="rounded-xl text-3xl font-semibold flex justify-center items-center bg-black-600 w-full max-w-[100px] mx-auto aspect-square">
            {timeRemaining?.days}
          </div>
          <div className="flex justify-center">
            <span className="text-xs md:text-base text-[#8861FF] text-center pt-5">
              {timeRemaining?.days == 1 ? "Day" : "Days"}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="rounded-xl text-3xl font-semibold flex justify-center items-center bg-black-600 w-full max-w-[100px] mx-auto aspect-square">
            {timeRemaining?.hours}
          </div>
          <div className="flex justify-center">
            <span className="text-xs md:text-base text-center text-[#8861FF] pt-5">
              {timeRemaining?.hours == 1 ? "Hour" : "Hours"}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="rounded-xl text-3xl font-semibold flex justify-center items-center bg-black-600 w-full max-w-[100px] mx-auto aspect-square">
            {timeRemaining?.minutes}
          </div>
          <div className="flex justify-center">
            <span className="text-xs md:text-base text-center text-[#8861FF] pt-5">
              {timeRemaining?.minutes == 1 ? "Minute" : "Minutes"}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="rounded-xl text-3xl font-semibold flex justify-center items-center  bg-black-600 w-full max-w-[100px] mx-auto aspect-square">
            <div>{timeRemaining?.seconds}</div>
          </div>
          <div className="flex justify-center">
            <span className="text-xs md:text-base text-center text-[#8861FF] pt-5">
              {timeRemaining?.seconds == 1 ? "Second" : "Seconds"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BoosterTimer;
