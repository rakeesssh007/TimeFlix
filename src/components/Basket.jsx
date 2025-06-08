import React from 'react';
import { useBasket } from '../context/BasketContext';
import '../styles/Basket.css';

function Basket() {
  const { basket } = useBasket();
  
  const totalWatchCounts = basket.reduce((total, item) => {
    return total + (item.isCompleted ? item.watchCount : 1);
  }, 0);
  
  return (
    <div className="basket">
      <h3>Your Binge Basket</h3>
      <div className="basket-counts">
        <p>Shows: {basket.length}</p>
        <p>Watch Counts: {totalWatchCounts}</p>
      </div>
      
      <div className="basket-items">
        {basket.map((item, index) => (
          <div key={index} className="basket-item">
            <div className="item-name">{item.show.name}</div>
            <div className="item-details">
              {item.isCompleted 
                ? `Watched ${item.watchCount}x` 
                : `Seasons: ${item.seasonsWatched}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Basket;