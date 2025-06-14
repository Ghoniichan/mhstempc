import * as React from 'react';
import { useState } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); 
    if (error && value.trim()) setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!searchTerm.trim()) {
        setError('Please enter a name or loan number.');
      }
    }
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar-box shadow-sm">
        <Search size={20} className="searchbar-icon" />
        <input
          type="text"
          placeholder="Search Name, Loan#"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="searchbar-input gothic-a1-normal shadow-sm"
        />
      </div>
      {error && <div className="text-danger mt-1 ms-1 small">{error}</div>}
    </div>
  );
};

export default SearchBar;
