import React, { useState, useEffect } from 'react';

const GreetingComponent = () => {
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = time.getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good morning! ☀️');
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Good afternoon! 👋');
      } else if (currentHour >= 18 && currentHour < 22) {
        setGreeting('Good evening! ✨');
      } else {
        setGreeting('Good night! 🌙');
      }
    };
    updateGreeting();

    const timerID = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timerID);
  }, [time]);

  return (
    <div>
      <h2>{greeting}</h2>
    </div>
  );
};

export default GreetingComponent;