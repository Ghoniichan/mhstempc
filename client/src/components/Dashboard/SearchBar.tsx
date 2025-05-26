import * as React from 'react';
import { useState } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar-box">
        <Search size={20} className="searchbar-icon" onClick={handleSubmit} />
        <input
          type="text"
          placeholder="Search Name, Loan#"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          className="searchbar-input"
          aria-label="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
