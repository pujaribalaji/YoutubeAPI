const express = require('express');
const app = express();
const cors = require('cors');
const { google } = require('googleapis');
const youtube = google.youtube('v3');
const API_KEY = 'AIzaSyCuQ0EqNQneQTgley3k5GrkEuFYLOzPHzI';
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/keyword-search', async (req, res) => {
  try {
    const { keyword, month, year } = req.body;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const publishedAfter = startDate.toISOString();
    const publishedBefore = endDate.toISOString();

    // Make a request to the YouTube API to get search results
    const searchResponse = await youtube.search.list({
      part: 'snippet',
      q: keyword,
      key: API_KEY,
      publishedAfter,
      publishedBefore,
    });

    // Extract video details from the search response
    const videoResults = searchResponse.data.items.map((item) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      videoId: item.id.videoId,
      publishedAt: item.snippet.publishedAt,
    }));

    // Get the total number of search results
    const searchResults = searchResponse.data.pageInfo.totalResults;

    res.json({ searchResults, videoResults });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
