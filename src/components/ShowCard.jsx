import React from 'react';
import '../styles/ShowCard.css';

function ShowCard({ show, onClick }) {
  return (
    <div className="show-card" onClick={onClick}>
      {show.image?.medium ? (
        <img 
          src={show.image.medium} 
          alt={show.name} 
          className="show-image"
        />
      ) : (
        <div className="no-image">No Image Available</div>
      )}
      <div className="show-info">
        <h3 className="show-title">{show.name}</h3>
        <div className="show-rating">
          {show.rating?.average ? `⭐ ${show.rating.average}` : 'N/A'}
        </div>
        <div className="show-genres">
          {show.genres?.slice(0, 3).join(', ')}
        </div>
      </div>
    </div>
  );
}

export default ShowCard;