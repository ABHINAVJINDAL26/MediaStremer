import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Page.module.css";

const SearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load search history from localStorage
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  const handleSearchClick = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleClearHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  const handleRemoveItem = (index) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
  };

  if (searchHistory.length === 0) {
    return (
      <div className={styles.page}>
        <h2 className={styles.title}>Search History</h2>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <svg
            className="w-24 h-24 mb-4 text-zinc-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-zinc-400 text-lg">No search history</p>
          <p className="text-zinc-500 text-sm mt-2">
            Your search history will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={styles.title}>Search History</h2>
        <button
          onClick={handleClearHistory}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-2 max-w-3xl">
        {searchHistory.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg hover:bg-zinc-800/90 transition group"
          >
            <svg
              className="w-5 h-5 text-zinc-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <button
              onClick={() => handleSearchClick(item.query)}
              className="flex-1 text-left text-white hover:text-blue-400 transition"
            >
              <p className="font-medium">{item.query}</p>
              <p className="text-xs text-zinc-500 mt-1">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </button>

            <button
              onClick={() => handleRemoveItem(index)}
              className="p-2 text-zinc-500 hover:text-red-500 hover:bg-zinc-800 rounded-lg transition opacity-0 group-hover:opacity-100"
              title="Remove"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
