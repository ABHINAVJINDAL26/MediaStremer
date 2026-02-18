import React from "react";

const RelatedVideoCard = ({ thumbnail, title, channelName, meta, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex gap-2 w-full text-left transition hover:bg-zinc-800/50 rounded-lg p-2"
    >
      <div className="relative flex-shrink-0 w-40 h-24 overflow-hidden rounded-lg bg-zinc-800">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="line-clamp-2 text-sm font-semibold text-white mb-1">
          {title}
        </h3>
        <p className="text-xs text-zinc-400 truncate">{channelName}</p>
        <p className="text-xs text-zinc-500 mt-1">{meta}</p>
      </div>
    </button>
  );
};

export default RelatedVideoCard;
