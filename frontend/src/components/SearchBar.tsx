import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchValue(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="search"
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
