import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getVideoDetailsURL } from "../config/api";
import styles from "./Page.module.css";

const Watch = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const videoId = searchParams.get("v");

  useEffect(() => {
    if (!videoId) return;

    const fetchVideoDetails = async () => {
      try {
        setLoading(true);
        const url = getVideoDetailsURL(videoId);
        const response = await fetch(url);
        const data = await response.json();
        setVideoDetails(data.items[0]);
      } catch (error) {
        console.error("Error fetching video details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  if (!videoId) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>No video selected</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Loading video...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div style={{ maxWidth: "100%", margin: "0 auto" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%",
            backgroundColor: "#000",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video Player"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {videoDetails && (
          <div>
            <h1 style={{ margin: "0 0 12px 0", fontSize: "24px" }}>
              {videoDetails.snippet.title}
            </h1>
            <p style={{ margin: "0 0 20px 0", color: "#aaa" }}>
              {videoDetails.snippet.channelTitle}
            </p>
            <div style={{ color: "#aaa", marginBottom: "20px" }}>
              <p>
                Views: {videoDetails.statistics.viewCount || "N/A"} • Likes:{" "}
                {videoDetails.statistics.likeCount || "N/A"}
              </p>
            </div>
            <div style={{ color: "#ccc", lineHeight: "1.6" }}>
              <h3>Description</h3>
              <p>{videoDetails.snippet.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watch;
