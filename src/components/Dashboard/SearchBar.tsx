import * as React from 'react';
import { useState } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    // Implement your search submission logic here
    console.log('Searching for:', searchTerm);
  };

  const handleKeyDown = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="container ">
      <div className="searchbox shadow-sm">
        <input type="text" placeholder={searchTerm ? "" : "Search Name, Loan#"} value={searchTerm} onChange={handleSearch} onKeyDown={handleKeyDown}
          className="textPlaceholder w-full py-2 px-4 focus:outline-none" aria-label="Search"/>
        <div onClick={handleSubmit} className="icon p-2">
          <Search size={20} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;