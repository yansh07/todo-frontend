import React, { useState, useEffect } from "react";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react"; 

const GreetingComponent = () => {
  const [time, setTime] = useState(new Date());
  const [Icon, setIcon] = useState(() => Sun); // default

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setIcon(() => Sunrise); // Morning
      } else if (currentHour >= 12 && currentHour < 18) {
        setIcon(() => Sun); // Afternoon
      } else if (currentHour >= 18 && currentHour < 22) {
        setIcon(() => Sunset); // Evening
      } else {
        setIcon(() => Moon); // Night
      }
    };

    updateGreeting();

    const timerID = setInterval(() => {
      setTime(new Date());
      updateGreeting();
    }, 60000);

    return () => clearInterval(timerID);
  }, []);

  return (
    <div>
      <Icon size={28} color="#facc15" strokeWidth={2} />
    </div>
  );
};

export default GreetingComponent;
