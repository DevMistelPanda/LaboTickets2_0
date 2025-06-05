import { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [hasEnded, setHasEnded] = useState(false);

  function getTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();

    if (difference <= 0) {
      setHasEnded(true);
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (hasEnded) {
    return (
      <div className="text-center text-2xl sm:text-3xl font-bold text-green-400">
        🎉 Der Schulball 2025 ist gestartet 🎉
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center space-x-4 sm:space-x-8">
      {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
        <div key={unit} className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-bold">
            {timeLeft[unit as keyof typeof timeLeft]}
          </span>
          <span className="text-xs uppercase tracking-wide opacity-80">
            {unit.charAt(0).toUpperCase() + unit.slice(1)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
