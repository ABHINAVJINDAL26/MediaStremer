import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTrendingVideosURL } from "../config/api";
import VideoCard from "./VideoCard";
import ShimmerCard from "./ShimmerCard";

const Suggestions = ({ limit = 12, searchTerm = "" }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = getTrendingVideosURL(limit);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data = await response.json();
        setSuggestions(data.items || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching suggestions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [limit, searchTerm]);

  const handleVideoClick = (videoId) => {
    navigate(`/watch?v=${videoId}`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(limit)].map((_, i) => (
          <ShimmerCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading suggestions: {error}</p>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-zinc-400">No suggestions available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {suggestions.map((video) => {
        const videoId = video.id.videoId || video.id;
        const thumbnail = video.snippet.thumbnails.medium.url;
        const title = video.snippet.title;
        const channelTitle = video.snippet.channelName || video.snippet.channelTitle;

        return (
          <VideoCard
            key={videoId}
            thumbnail={thumbnail}
            title={title}
            channelName={channelTitle}
            meta="Suggested • Trending"
            onClick={() => handleVideoClick(videoId)}
          />
        );
      })}
    </div>
  );
};

export default Suggestions;
