// YouTube API Configuration
export const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// API Endpoints
export const getVideoSearchURL = (query, maxResults = 20) => {
  return `${YOUTUBE_API_BASE_URL}/search?part=snippet&q=${query}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}&type=video`;
};

export const getTrendingVideosURL = (maxResults = 20, regionCode = 'US') => {
  return `${YOUTUBE_API_BASE_URL}/videos?part=snippet,statistics&chart=mostPopular&maxResults=${maxResults}&regionCode=${regionCode}&key=${YOUTUBE_API_KEY}`;
};

export const getVideoDetailsURL = (videoId) => {
  return `${YOUTUBE_API_BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;
};

export const getChannelDetailsURL = (channelId) => {
  return `${YOUTUBE_API_BASE_URL}/channels?part=snippet,statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`;
};
