import React, { useState, useEffect } from 'react';
import ShowCard from './ShowCard';
import '../styles/SearchBar.css';

function SearchBar({ onSearchResults }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsLoading(true);
      fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then(res => res.json())
        .then(data => {
          const shows = data.map(item => item.show);
          setResults(shows);
          onSearchResults(shows);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, onSearchResults]);
  
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search TV shows..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;