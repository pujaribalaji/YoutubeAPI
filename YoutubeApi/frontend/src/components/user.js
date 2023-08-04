import React, { useState } from "react";
import "./user.css";

function Use() {
  const [keyword, setKeyword] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [videoResults, setVideoResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://youtubeapi-sktz.onrender.com/api/keyword-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword, month, year }),
      });
      const data = await response.json();
      setSearchResults(data.searchResults);
      setVideoResults(data.videoResults);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <h2>YouTube keyword search volume:</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <p>
            <input
            className="inpu"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword"
            />
          </p>
          <p>
            <input
            className="inpu"
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="Enter month (e.g., 8 for August)"
            />
          </p>
          <p>
            <input
            className="inpu"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year (e.g., 2023)"
            />
          </p>
          <button type="submit">Search</button>
        </form>

        {searchResults !== null && (
          <p>
            Number of search results in {month}/{year}: {searchResults}
          </p>
        )}

        {videoResults.length > 0 && (
          <div>
            <h3>
              Video Search results for {month}/{year}:
            </h3>
            {videoResults.length > 0 &&
              videoResults.map((video) => (
                <div className="video-card" key={video.videoId}>
                  <h4 className="video-title">{video.title}</h4>
                  <p className="video-description">{video.description}</p>
                  <div className="video-player">
                    <iframe
                      title={video.title}
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Use;
