import React, { useState, useEffect } from 'react';
import { useBasket } from '../context/BasketContext';
import '../styles/ShowDetailsPopup.css';

function ShowDetailsPopup({ show, onClose }) {
  const [seasons, setSeasons] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [watchCount, setWatchCount] = useState(1);
  const [seasonsWatched, setSeasonsWatched] = useState(1);
  const { addToBasket } = useBasket();
  
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${show.id}/seasons`)
      .then(res => res.json())
      .then(data => {
        setSeasons(data);
        if (data.length > 0) {
          setSeasonsWatched(Math.min(1, data.length));
        }
      });
  }, [show.id]);
  
  const handleAddToBasket = () => {
    addToBasket(
      show,
      isCompleted,
      isCompleted ? watchCount : null,
      isCompleted ? null : seasonsWatched
    );
    onClose();
  };
  
  return (
    <div className="popup-overlay">
      <div className="show-details-popup">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="show-header">
          {show.image?.medium && (
            <img 
              src={show.image.medium} 
              alt={show.name} 
              className="show-poster"
            />
          )}
          <div className="show-header-info">
            <h2>{show.name}</h2>
            {show.rating?.average && <p>Rating: ⭐ {show.rating.average}</p>}
            {show.genres && <p>Genres: {show.genres.join(', ')}</p>}
            {show.language && <p>Language: {show.language}</p>}
          </div>
        </div>
        
        <div className="show-summary" dangerouslySetInnerHTML={{ __html: show.summary }} />
        
        <div className="seasons-section">
          <h3>Seasons:</h3>
          <ul>
            {seasons.map(season => (
              <li key={season.id}>
                Season {season.number}: {season.episodeCount} episodes
              </li>
            ))}
          </ul>
        </div>
        
        <div className="basket-options">
          <div className="completed-toggle">
            <label>
              <input 
                type="checkbox" 
                checked={isCompleted} 
                onChange={() => setIsCompleted(!isCompleted)} 
              />
              Completed show?
            </label>
          </div>
          
          {isCompleted ? (
            <div className="watch-count">
              <label>Watch count multiplier:</label>
              <select 
                value={watchCount} 
                onChange={e => setWatchCount(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}x</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="seasons-watched">
              <label>Seasons watched:</label>
              <select 
                value={seasonsWatched} 
                onChange={e => setSeasonsWatched(parseInt(e.target.value))}
                disabled={seasons.length === 0}
              >
                {seasons.map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1} of {seasons.length}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        <button 
          className="add-to-basket-btn"
          onClick={handleAddToBasket}
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
}

export default ShowDetailsPopup;