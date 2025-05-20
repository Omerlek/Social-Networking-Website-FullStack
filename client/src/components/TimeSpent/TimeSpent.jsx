import React, { useEffect, useState } from 'react';
import './TimeSpent.css';

const TimeSpent = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (s) => {
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="TimeSpentCard">
      <h4>⏳Time in web</h4>
      <p>{formatTime(seconds)}</p>
    </div>
  );
};

export default TimeSpent;
