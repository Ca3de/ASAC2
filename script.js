// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Update the year in the footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Sermons auto-fetch logic (if used)
  const sermonVideoContainer = document.getElementById("sermon-video-container");
  if (sermonVideoContainer) {
    const API_KEY = "YOUR_API_KEY";
    const PLAYLIST_ID = "YOUR_PLAYLIST_ID"; // e.g. "PL123abc..."
    const sermonDateElement = document.getElementById("sermon-date");
    const iframe = document.getElementById("sermon-video");

    fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const latestVideo = data.items[0];
          const videoId = latestVideo.snippet.resourceId.videoId;
          const publishDate = new Date(latestVideo.snippet.publishedAt).toLocaleDateString();

          // Update iframe src to the most recent video
          iframe.src = `https://www.youtube.com/embed/${videoId}`;

          // Update date
          sermonDateElement.textContent = `Date: ${publishDate}`;
        }
      })
      .catch((error) => {
        console.error("Error fetching latest sermon video:", error);
        // fallback is the already-set iframe src
      });
  }
});
