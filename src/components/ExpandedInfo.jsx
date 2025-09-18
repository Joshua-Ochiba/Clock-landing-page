
import { ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function ExpandedInfo({ isVisible, onMoreClick, locationData }) {
  const [timeInfo, setTimeInfo] = useState({
    timezone: "",
    dayOfYear: 0,
    dayOfWeek: 0,
    weekNumber: 0,
  });

  useEffect(() => {
    const updateTimeInfo = () => {
      const now = new Date();

      // Calculate day of year
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now - start;
      const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

      // Get day of week (1 = Monday, 7 = Sunday)
      const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay();

      // Calculate week number
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const pastDaysOfYear = (now - startOfYear) / 86400000;
      const weekNumber = Math.ceil(
        (pastDaysOfYear + startOfYear.getDay() + 1) / 7
      );

      setTimeInfo({
        timezone: locationData?.timezone || "Europe/London",
        dayOfYear,
        dayOfWeek,
        weekNumber,
      });
    };

    updateTimeInfo();
    const interval = setInterval(updateTimeInfo, 1000);

    return () => clearInterval(interval);
  }, [locationData]);

  if (!isVisible) return null;

  const formatTimezone = (timezone) => {
    if (!timezone) return "UTC+00:00";

    const offset = new Date().getTimezoneOffset();
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset <= 0 ? "+" : "-";

    return `UTC${sign}${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 animate-slide-up">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <span className="text-gray-600 text-sm font-bold tracking-widest uppercase">
                Current Timezone
              </span>
              <span className="text-gray-900 text-3xl font-bold">
                {formatTimezone(timeInfo.timezone)}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 justify-between items-center">
              <span className="text-gray-600 text-sm font-bold tracking-widest uppercase">
                Day of the year
              </span>
              <span className="text-gray-900 text-3xl font-bold">
                {timeInfo.dayOfYear}
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <span className="text-gray-600 text-sm font-bold tracking-widest uppercase">
                Day of the week
              </span>
              <span className="text-gray-900 text-3xl font-bold">
                {timeInfo.dayOfWeek}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 justify-between items-center">
              <span className="text-gray-600 text-sm font-bold tracking-widest uppercase">
                Week number
              </span>
              <span className="text-gray-900 text-3xl font-bold">
                {timeInfo.weekNumber}
              </span>
            </div>
          </div>

          <div>
            <button
              onClick={onMoreClick}
              className="flex items-center gap-3 bg-gray-900 hover:bg-gray-950 text-white px-6 py-4 rounded-full transition-all hover:scale-105"
            >
              <span className="font-bold tracking-wider">LESS</span>
              <ChevronUp
                className={`w-5 h-5 transition-transform duration-300 ${
                  isVisible ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
