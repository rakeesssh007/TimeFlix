import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../context/BasketContext';
import ShowCard from '../components/ShowCard'; // Fixed import path
import Filters from '../components/Filters'; // Fixed import path
import SearchBar from '../components/SearchBar'; // Fixed import path
import Basket from '../components/Basket'; // Fixed import path
import ShowDetailsPopup from '../components/ShowDetailsPopup'; // Fixed import path
import '../styles/HomePage.css';

function HomePage() {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);
  const [filters, setFilters] = useState({ genre: '', year: '', language: '' });
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [languages, setLanguages] = useState([]);
  
  const navigate = useNavigate();
  const { basket, setSampleData } = useBasket();
  
  useEffect(() => {
    // Fetch popular shows
    fetch('https://api.tvmaze.com/shows?page=0')
      .then(res => res.json())
      .then(data => {
        const sorted = data
          .filter(show => show.rating?.average)
          .sort((a, b) => b.rating.average - a.rating.average)
          .slice(0, 50);
        
        setShows(sorted);
        setFilteredShows(sorted);
        
        // Extract filters
        const allGenres = new Set();
        const allYears = new Set();
        const allLanguages = new Set();
        
        sorted.forEach(show => {
          if (show.genres) show.genres.forEach(genre => allGenres.add(genre));
          if (show.premiered) allYears.add(new Date(show.premiered).getFullYear());
          if (show.language) allLanguages.add(show.language);
        });
        
        setGenres([...allGenres].sort());
        setYears([...allYears].sort((a, b) => b - a));
        setLanguages([...allLanguages].sort());
      });
  }, []);
  
  useEffect(() => {
    let result = [...shows];
    
    if (filters.genre) {
      result = result.filter(show => show.genres.includes(filters.genre));
    }
    
    if (filters.year) {
      result = result.filter(show => 
        new Date(show.premiered).getFullYear() === parseInt(filters.year)
      );
    }
    
    if (filters.language) {
      result = result.filter(show => show.language === filters.language);
    }
    
    setFilteredShows(result);
  }, [filters, shows]);
  
  const handleShowClick = (show) => {
    setSelectedShow(show);
  };
  
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleSearchResults = (results) => {
    setFilteredShows(results);
  };
  
  return (
    <div className="home-page">
      {isPopupOpen && (
        <div className="welcome-popup">
          <div className="popup-content">
            <p>Hey there! You've laughed, cried, and definitely rewatched. Let's crunch the numbers. Shall we?</p>
            <button onClick={() => setIsPopupOpen(false)}>Let's Do it</button>
          </div>
        </div>
      )}
      
      <div className="controls">
        <SearchBar onSearchResults={handleSearchResults} />
        <Filters 
          genres={genres} 
          years={years} 
          languages={languages} 
          onApply={handleApplyFilters} 
        />
      </div>
      
      <div className="basket-container">
        <Basket />
        <button 
          className="sample-btn"
          onClick={setSampleData}
        >
          Try Sample Data
        </button>
        <button 
          className="binge-btn"
          onClick={() => navigate('/binge-time')}
          disabled={basket.length === 0}
        >
          Calculate Binge Time
        </button>
      </div>
      
      <div className="shows-grid">
        {filteredShows.map(show => (
          <ShowCard 
            key={show.id} 
            show={show} 
            onClick={() => handleShowClick(show)} 
          />
        ))}
      </div>
      
      {selectedShow && (
        <ShowDetailsPopup 
          show={selectedShow} 
          onClose={() => setSelectedShow(null)} 
        />
      )}
    </div>
  );
}

export default HomePage;