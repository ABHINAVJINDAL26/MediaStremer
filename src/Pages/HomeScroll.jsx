import React from "react";
import { useNavigate } from "react-router-dom";
import useRelatedVideo from "../Hooks/useRelatedVideo";
import VideoCard from "../Components/VideoCard";
import ShimmerCard from "../Components/ShimmerCard";

const HomeScroll = ({ title = "For You", searchTerm = "trending", limit = 12 }) => {
  const navigate = useNavigate();
  const { relatedVideos, loading, error } = useRelatedVideo("", searchTerm, limit);

  const handleVideoClick = (videoId) => {
    navigate(`/watch?v=${videoId}`);
  };

  if (error) {
    return (
      <section className="mt-8">
        <div className="mb-4 text-lg font-semibold text-white">{title}</div>
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Failed to load videos.
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className="text-xs text-zinc-400">Swipe to explore</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {loading
          ? [...Array(6)].map((_, index) => (
              <div key={index} className="min-w-[240px] max-w-[240px]">
                <ShimmerCard />
              </div>
            ))
          : relatedVideos.map((video) => {
              const videoId = video.id.videoId || video.id;
              const thumbnail = video.snippet.thumbnails.medium.url;
              const title = video.snippet.title;
              const channelTitle =
                video.snippet.channelName || video.snippet.channelTitle;

              return (
                <div key={videoId} className="min-w-[240px] max-w-[240px]">
                  <VideoCard
                    thumbnail={thumbnail}
                    title={title}
                    channelName={channelTitle}
                    meta="Suggested"
                    onClick={() => handleVideoClick(videoId)}
                  />
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default HomeScroll;
