import React, { useState } from 'react';
import '../styles/Filters.css';

function Filters({ genres, years, languages, onApply }) {
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [language, setLanguage] = useState('');
  
  const handleApply = () => {
    onApply({ genre, year, language });
  };
  
  const handleReset = () => {
    setGenre('');
    setYear('');
    setLanguage('');
    onApply({ genre: '', year: '', language: '' });
  };
  
  return (
    <div className="filters">
      <div className="filter-group">
        <label>Genre:</label>
        <select value={genre} onChange={e => setGenre(e.target.value)}>
          <option value="">All</option>
          {genres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Year:</label>
        <select value={year} onChange={e => setYear(e.target.value)}>
          <option value="">All</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Language:</label>
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="">All</option>
          {languages.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
      
      <button className="apply-btn" onClick={handleApply}>Apply</button>
      <button className="reset-btn" onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Filters;