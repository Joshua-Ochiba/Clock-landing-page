import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function Quote({ isVisible }) {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuote = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();

      setQuote({
        text: data.quote,
        author: data.author,
      });
    } catch (error) {
      console.error("Error fetching quote", error);
      // Fallback
      setQuote({
        text: "The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.",
        author: "Ada Lovelace",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="animate-fade-in">
      <div className="flex items-start gap-4 max-w-xl">
        <div className="flex-1">
          <p className="text-white text-lg font-light leading-relaxed mb-4 text-shadow">
            "{quote.text}"
          </p>
          <p className="text-white font-black text-lg text-shadow">
            {quote.author}
          </p>
        </div>
        <button
          onClick={fetchQuote}
          disabled={isLoading}
          className="flex-shrink-0 p-3 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50"
          aria-label="Get new quote"
        >
          <RotateCcw
            className={`w-6 h-6 text-white ${isLoading ? "animate-spin" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}