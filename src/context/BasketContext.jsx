import React, { createContext, useState, useContext } from 'react';

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);
  
  const addToBasket = (show, isCompleted, watchCount, seasonsWatched) => {
    const existingIndex = basket.findIndex(item => item.show.id === show.id);
    
    if (existingIndex !== -1) {
      const updatedBasket = [...basket];
      updatedBasket[existingIndex] = { show, isCompleted, watchCount, seasonsWatched };
      setBasket(updatedBasket);
    } else {
      setBasket([...basket, { show, isCompleted, watchCount, seasonsWatched }]);
    }
  };
  
  const setSampleData = () => {
    const sampleShows = [
      { id: 269, name: 'Peaky Blinders', count: 4, completed: true },
      { id: 82, name: 'Game of Thrones', count: 2, completed: true },
      { id: 2993, name: 'Dark', count: 2, completed: true },
      { id: 169, name: 'Breaking Bad', count: 1, completed: true },
      { id: 21047, name: 'You', count: 1, completed: true }
    ];
    
    const fetchShow = (id) => 
      fetch(`https://api.tvmaze.com/shows/${id}`)
        .then(res => res.json());
    
    Promise.all(sampleShows.map(item => fetchShow(item.id)))
      .then(shows => {
        const newBasket = shows.map((show, index) => ({
          show,
          isCompleted: sampleShows[index].completed,
          watchCount: sampleShows[index].count,
          seasonsWatched: null
        }));
        setBasket(newBasket);
      })
      .catch(error => console.error('Error fetching sample shows:', error));
  };
  
  const calculateTotalBingeTime = async () => {
    let totalMinutes = 0;
    
    for (const item of basket) {
      const seasonsRes = await fetch(`https://api.tvmaze.com/shows/${item.show.id}/seasons`);
      const seasons = await seasonsRes.json();
      
      const seasonsToCount = item.isCompleted 
        ? seasons 
        : seasons.slice(0, item.seasonsWatched);
      
      for (const season of seasonsToCount) {
        const episodesRes = await fetch(`https://api.tvmaze.com/seasons/${season.id}/episodes`);
        const episodes = await episodesRes.json();
        
        const seasonRuntime = episodes.reduce((sum, episode) => 
          sum + (episode.runtime || 45), 0);
        
        totalMinutes += seasonRuntime * (item.isCompleted ? item.watchCount : 1);
      }
    }
    
    return totalMinutes / 60; // Convert to hours
  };
  
  return (
    <BasketContext.Provider value={{ basket, addToBasket, setSampleData, calculateTotalBingeTime }}>
      {children}
    </BasketContext.Provider>
  );
}

export const useBasket = () => useContext(BasketContext);