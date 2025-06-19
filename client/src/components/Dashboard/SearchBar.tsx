import * as React from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onSearch }) => {
  const [error, setError] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onSearch(input); // pass the input value back to parent
    if (error && input.trim()) setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !value.trim()) {
      setError('Please enter a name or loan number.');
    }
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar-box shadow-sm">
        <Search size={20} className="searchbar-icon" />
        <input
          type="text"
          placeholder="Search Name, Loan#"
          value={value}
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
