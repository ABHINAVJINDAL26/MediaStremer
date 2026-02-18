import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VideoCard from "../Components/VideoCard";
import styles from "./Page.module.css";

const WatchHistory = () => {
  const [watchHistory, setWatchHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load watch history from localStorage
    const history = JSON.parse(localStorage.getItem("watchHistory") || "[]");
    setWatchHistory(history);
  }, []);

  const handleVideoClick = (videoId) => {
    navigate(`/watch?v=${videoId}`);
  };

  const handleClearHistory = () => {
    localStorage.removeItem("watchHistory");
    setWatchHistory([]);
  };

  const handleRemoveItem = (videoId) => {
    const updatedHistory = watchHistory.filter((video) => video.videoId !== videoId);
    localStorage.setItem("watchHistory", JSON.stringify(updatedHistory));
    setWatchHistory(updatedHistory);
  };

  if (watchHistory.length === 0) {
    return (
      <div className={styles.page}>
        <h2 className={styles.title}>Watch History</h2>
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-zinc-400 text-lg">No watch history</p>
          <p className="text-zinc-500 text-sm mt-2">
            Videos you watch will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={styles.title}>Watch History</h2>
        <button
          onClick={handleClearHistory}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          Clear All
        </button>
      </div>

      <div className={styles.videosGrid}>
        {watchHistory.map((video) => (
          <div key={video.videoId} className="relative group">
            <VideoCard
              thumbnail={video.thumbnail}
              title={video.title}
              channelName={video.channelName}
              meta={`Watched ${new Date(video.timestamp).toLocaleDateString()}`}
              onClick={() => handleVideoClick(video.videoId)}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveItem(video.videoId);
              }}
              className="absolute top-2 right-2 p-2 bg-black/80 text-white rounded-full hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
              title="Remove from history"
            >
              <svg
                className="w-4 h-4"
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

export default WatchHistory;
