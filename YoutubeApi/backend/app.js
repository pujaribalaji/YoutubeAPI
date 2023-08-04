// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { google } = require('googleapis');
const youtube = google.youtube('v3');
const API_KEY = 'AIzaSyBrY_thbSPofmH8sQ6xHj-AXeFBGLDlTUA';

app.use(cors());
app.use(express.json());

app.post('/api/keyword-search-volume', async (req, res) => {
  try {
    const { keyword, month, year } = req.body;

    // Format the date to RFC 3339 format for the YouTube API
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const publishedAfter = startDate.toISOString();
    const publishedBefore = endDate.toISOString();

    // Make a request to the YouTube API to get search volume data
    const searchResponse = await youtube.search.list({
      part: 'snippet',
      q: keyword,
      key: API_KEY,
      publishedAfter, // Filter results after the first day of the month
      publishedBefore, // Filter results before the last day of the month
    });

    // Get the total number of search results (member count)
    const searchResults = searchResponse.data.pageInfo.totalResults;

    res.json({ searchResults });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
