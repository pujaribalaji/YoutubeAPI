// src/App.js
import React, { useState } from 'react';

function Use() {
  const [keyword, setKeyword] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/keyword-search-volume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword, month, year }),
      });
      const data = await response.json();
      setSearchResults(data.searchResults);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword"
        />
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Enter month (e.g., 8 for August)"
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter year (e.g., 2023)"
        />
        <button type="submit">Search</button>
      </form>
      {searchResults !== null && (
        <p>Number of search results in {month}/{year}: {searchResults}</p>
      )}
    </div>
  );
}

export default Use;
