import { useState, useEffect } from "react";
import { Sun, Moon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { Clock } from "lucide-react";

export default function TimeDisplay({ locationData, onMoreClick, isExpanded }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [isDaytime, setIsDaytime] = useState(true);
  const [is24Hour, setIs24Hour] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("GOOD MORNING");
      setIsDaytime(true);
    } else if (hour >= 12 && hour < 18) {
      setGreeting("GOOD AFTERNOON");
      setIsDaytime(true);
    } else {
      setGreeting("GOOD EVENING");
      setIsDaytime(false);
    }
  }, [currentTime]);

  const formatTime = (date) => {
    if (is24Hour) {
      return format(date, "HH:mm");
    } else {
      return format(date, "h:mm");
    }
  };

  const getTimeFormat = (date) => {
    if (!is24Hour) {
      return format(date, "a");
    }
    return "";
  };

  const toggleTimeFormat = () => {
    setIs24Hour(!is24Hour);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-center md:justify-start text-center lg:text-left items-center gap-4 mb-4">
        {isDaytime ? (
          <Sun className="w-8 h-8 text-white" />
        ) : (
          <Moon className="w-8 h-8 text-white" />
        )}
        <span className="text-white text-base lg:text-xl font-light tracking-widest text-shadow">
          {greeting}, IT'S CURRENTLY
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-white text-8xl md:text-9xl font-black text-shadow">
            {formatTime(currentTime)}
          </span>
          {!is24Hour && (
            <span className="text-white text-3xl font-black text-shadow">
              {getTimeFormat(currentTime)}
            </span>
          )}
        </div>

        <button
          onClick={toggleTimeFormat}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 backdrop-blur-sm"
          title={`Switch to ${is24Hour ? "12" : "24"} hour format`}
        >
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">
            {is24Hour ? "Switch to 12H" : "Switch to 24H"}
          </span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <span className="text-white text-base lg:text-xl font-light tracking-wider text-shadow">
          IN {locationData?.city?.toUpperCase() || "LONDON"},{" "}
          {locationData?.country?.toUpperCase() || "UK"}
        </span>

        <button
          onClick={onMoreClick}
          className="flex items-center gap-3 bg-white hover:bg-white text-black px-6 py-4 rounded-full transition-all hover:scale-105"
        >
          <span className="font-bold tracking-wider">
            {isExpanded ? "LESS" : "MORE"}
          </span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}