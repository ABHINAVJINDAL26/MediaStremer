import React from "react";

const VideoCard = ({ thumbnail, title, channelName, meta, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left"
    >
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 shadow transition hover:-translate-y-1 hover:bg-zinc-900">
        <div className="relative overflow-hidden rounded-t-xl bg-zinc-800">
          <img
            src={thumbnail}
            alt={title}
            className="h-44 w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-semibold text-white">
            {title}
          </h3>
          <p className="mt-2 text-xs text-zinc-400">{channelName}</p>
          <p className="mt-1 text-xs text-zinc-500">{meta}</p>
        </div>
      </div>
    </button>
  );
};

export default VideoCard;
