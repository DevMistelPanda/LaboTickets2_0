import { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    return {
      total: difference,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();

      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
        setHasEnded(true);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (hasEnded) {
    return (
      <div className="text-center text-2xl sm:text-3xl font-bold text-purple-400">
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
