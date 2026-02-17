import React from "react";

const ShimmerCard = () => {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 shadow-lg">
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/80">
        <div className="h-40 w-full" />
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.6s_infinite]" />
      </div>
      <div className="mt-4 space-y-3">
        <div className="relative h-4 w-3/4 overflow-hidden rounded bg-zinc-800/80">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.6s_infinite]" />
        </div>
        <div className="relative h-3 w-1/2 overflow-hidden rounded bg-zinc-800/80">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.6s_infinite]" />
        </div>
        <div className="relative h-3 w-2/3 overflow-hidden rounded bg-zinc-800/80">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.6s_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;
