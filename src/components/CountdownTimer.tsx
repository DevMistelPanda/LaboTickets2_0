
import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set the date we're counting down to - June 15, 2025
    const countDownDate = new Date("June 15, 2025 19:00:00").getTime();
    
    // Update the countdown every 1 second
    const timer = setInterval(() => {
      // Get current date and time
      const now = new Date().getTime();
      
      // Find the distance between now and the countdown date
      const distance = countDownDate - now;
      
      // Calculate time units
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Update state
      setTimeLeft({ days, hours, minutes, seconds });
      
      // Update DOM elements directly for the embedded version
      const daysElement = document.getElementById('days');
      const hoursElement = document.getElementById('hours');
      const minutesElement = document.getElementById('minutes');
      const secondsElement = document.getElementById('seconds');
      
      if (daysElement) daysElement.textContent = days.toString();
      if (hoursElement) hoursElement.textContent = hours.toString();
      if (minutesElement) minutesElement.textContent = minutes.toString();
      if (secondsElement) secondsElement.textContent = seconds.toString();
      
      // If the countdown is finished, clear the interval
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="bg-gradient-to-r from-party-purple to-party-blue text-white py-3 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm font-medium mb-1">Countdown to the School Party:</p>
        <div className="flex justify-center items-center space-x-4 sm:space-x-8">
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold">{timeLeft.days}</span>
            <span className="text-xs uppercase tracking-wide opacity-80">Days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold">{timeLeft.hours}</span>
            <span className="text-xs uppercase tracking-wide opacity-80">Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold">{timeLeft.minutes}</span>
            <span className="text-xs uppercase tracking-wide opacity-80">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold">{timeLeft.seconds}</span>
            <span className="text-xs uppercase tracking-wide opacity-80">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
