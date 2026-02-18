import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getVideoSearchURL } from "../config/api";
import VideoCard from "../Components/VideoCard";
import ShimmerCard from "../Components/ShimmerCard";
import styles from "./Page.module.css";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const searchQuery = searchParams.get("q");

        if (!searchQuery) {
          setVideos([]);
          setLoading(false);
          return;
        }

        const url = getVideoSearchURL(searchQuery, 20);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();
        setVideos(data.items || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchParams]);

  const handleVideoClick = (videoId) => {
    navigate(`/watch?v=${videoId}`);
  };

  const searchQuery = searchParams.get("q") || "";

  if (loading) {
    return (
      <div className={styles.page}>
        <h2 className={styles.title}>Search results for "{searchQuery}"</h2>
        <div className={styles.videosGrid}>
          {[...Array(6)].map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className={styles.page}>
        <h2 className={styles.title}>Search results for "{searchQuery}"</h2>
        <div className="text-center text-zinc-400">
          No videos found. Try a different search.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Search results for "{searchQuery}"</h2>
      <div className={styles.videosGrid}>
        {videos.map((video) => {
          const videoId = video.id.videoId || video.id;
          const thumbnail = video.snippet.thumbnails.medium.url;
          const title = video.snippet.title;
          const channelTitle =
            video.snippet.channelName || video.snippet.channelTitle;
          const meta = "Video • Channel";

          return (
            <VideoCard
              key={videoId}
              thumbnail={thumbnail}
              title={title}
              channelName={channelTitle}
              meta={meta}
              onClick={() => handleVideoClick(videoId)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
