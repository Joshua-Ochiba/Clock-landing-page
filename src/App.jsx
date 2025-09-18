import { useState, useEffect } from "react";
import Quote from "./components/Quote";
import TimeDisplay from "./components/TimeDisplay";
import ExpandedInfo from "./components/ExpandedInfo";
import { useLocation } from "./hooks/useLocation";

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDaytime, setIsDaytime] = useState(true);
  const { locationData, loading } = useLocation();

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDaytime(hour >= 5 && hour < 18);
  }, []);

  const handleMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  const backgroundImage = isDaytime ? "bg-day" : "bg-night";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-neutral-950 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${backgroundImage} bg-cover bg-center bg-no-repeat relative`}
    >
      <div className="absolute inset-0 bg-overlay" />
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 container mx-auto px-8 md:px-12 lg:px-16 py-12 flex flex-col justify-between">
          <div className="hidden flex-1 md:flex items-start pt-16">
            <div className="w-full max-w-2xl">
              <Quote isVisible={!isExpanded} />
            </div>
          </div>

          <div className="flex-shrink-0 w-full">
            <TimeDisplay
              locationData={locationData}
              onMoreClick={handleMoreClick}
              isExpanded={isExpanded}
            />
          </div>
        </div>

        <ExpandedInfo
          isVisible={isExpanded}
          onMoreClick={handleMoreClick}
          locationData={locationData}
        />
      </div>
    </div>
  );
}

export default App;