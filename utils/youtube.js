import axios from "axios";

export const fetchPlaylistVideos = async (playlistId) => {
  const API_KEY = process.env.YOUTUBE_API_KEY;

  let allVideos = [];
  let nextPageToken = null;

  do {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          maxResults: 50,
          playlistId,
          pageToken: nextPageToken,
          key: API_KEY,
        },
      },
    );

    const videos = response.data.items.map((item) => ({
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
    }));

    allVideos = [...allVideos, ...videos];

    nextPageToken = response.data.nextPageToken;
  } while (nextPageToken);

  return allVideos;
};
