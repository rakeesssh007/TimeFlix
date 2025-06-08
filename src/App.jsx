import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BasketProvider } from './context/BasketContext';
import HomePage from './pages/HomePage'; // Fixed import path
import BingeTimePage from './pages/BingeTimePage'; // Fixed import path
import './index.css';

function App() {
  return (
    <BasketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/binge-time" element={<BingeTimePage />} />
        </Routes>
      </Router>
    </BasketProvider>
  );
}

export default App;