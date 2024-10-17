import React, { useEffect, useState } from 'react';
import './App.css';
import WineList from './components/WineList';
import SearchBar from './components/SearchBar';

interface Wine {
  name: string;
  vintage: number;
  totalRevenue: number;
  totalBottles: number;
  totalOrders: number;
  highlight?: 'top' | 'bottom';
}

function App() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);
  const [metric, setMetric] = useState<string>('totalRevenue');
  const [sortCriteria, setSortCriteria] = useState<'revenue' | 'bottles' | 'orders'>('revenue');
  const [searchQuery, setSearchQuery] = useState<string>('');

    // Fetch data from backend API
  useEffect(() => {
    const fetchWines = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/wines/best-selling?metric=${metric}&searchQuery=${searchQuery}`);
        const data = await response.json();
        setWines(data);
        setFilteredWines(data);
      } catch (error) {
        console.error('Error fetching wine data:', error);
      }
    };

    fetchWines();
  }, [metric, searchQuery]);

    // Update filtered wines based on search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleMetricChange = (newMetric: string, criteria: string) => {
    setMetric(newMetric);
    setSortCriteria(criteria as 'revenue' | 'bottles' | 'orders');
  };

  return (
    <div className="App">
      <h1>Best selling wine</h1>
      <div className="sort-buttons">
        <button
          className={sortCriteria === 'revenue' ? 'active' : ''}
          onClick={() => handleMetricChange('totalRevenue', 'revenue')}
        >
          By revenue
        </button>
        <button
          className={sortCriteria === 'bottles' ? 'active' : ''}
          onClick={() => handleMetricChange('totalBottles', 'bottles')}
        >
          By # bottles sold
        </button>
        <button
          className={sortCriteria === 'orders' ? 'active' : ''}
          onClick={() => handleMetricChange('totalOrders', 'orders')}
        >
          By # orders
        </button>
      </div>
      <SearchBar onSearch={handleSearch} />
      <WineList wines={filteredWines} />
    </div>
  );
}

export default App;
