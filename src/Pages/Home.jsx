import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTrendingVideosURL } from "../config/api";
import styles from "./Page.module.css";
import ShimmerCard from "../Components/ShimmerCard";
import HomeScroll from "./HomeScroll";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = getTrendingVideosURL(20);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }

        const data = await response.json();
        setVideos(data.items || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (videoId) => {
    navigate(`/watch?v=${videoId}`);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <ShimmerCard />
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

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Trending Videos</h2>
      <div className={styles.videosGrid}>
        {videos.map((video) => {
          const videoId =
            video.id.videoId || video.id;
          const thumbnail =
            video.snippet.thumbnails.medium.url;
          const title = video.snippet.title;
          const channelTitle = video.snippet.channelName || video.snippet.channelTitle;

          return (
            <div
              key={videoId}
              className={styles.videoCard}
              onClick={() => handleVideoClick(videoId)}
            >
              <div className={styles.thumbnail}>
                <img src={thumbnail} alt={title} />
                <div className={styles.duration}>12:34</div>
              </div>
              <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{title}</h3>
                <p className={styles.channelName}>{channelTitle}</p>
                <p className={styles.viewCount}>1.2M views • 2 days ago</p>
              </div>
            </div>
          );
        })}
      </div>
      <HomeScroll title="Fresh Picks" searchTerm="latest" limit={12} />
    </div>
  );
};

export default Home;
