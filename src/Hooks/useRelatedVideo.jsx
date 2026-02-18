import { useState, useEffect } from "react";
import { getVideoSearchURL } from "../config/api";

const useRelatedVideo = (videoId, searchTerm = "") => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoId && !searchTerm) {
      setLoading(false);
      return;
    }

    const fetchRelatedVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch related videos based on video title or search term
        const url = getVideoSearchURL(searchTerm, 10);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch related videos");
        }

        const data = await response.json();
        const videos = (data.items || []).filter(
          (video) => {
            const id = video.id.videoId || video.id;
            return id !== videoId; // Exclude the current video
          }
        );

        setRelatedVideos(videos);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching related videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedVideos();
  }, [videoId, searchTerm]);

  return { relatedVideos, loading, error };
};

export default useRelatedVideo;
