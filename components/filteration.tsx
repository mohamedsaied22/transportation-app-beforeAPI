import React, { useRef } from 'react';
import { Search} from 'lucide-react';

const Filters = ({ onFilterChange }) => {
  const inputRef = useRef(null);


  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    if (filterValue.length >= 3 || filterValue.length === 0) {
      // Send the filterValue only if it meets the minimum character requirement or if the field is empty
      onFilterChange(filterValue);
    }
  };

  const handleButtonClick = () => {
    // Focus on the input field when the button is clicked
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full lg:w-1/2 lg:ml-16">
      <div className="flex items-center border rounded-3xl overflow-hidden bg-white shadow-md">
        <input
          ref={inputRef}
          className="px-4 py-2 w-full border-none outline-none focus:outline-none h-1/4"
          type="text"
          onChange={handleFilterChange}
          placeholder="Enter a Keyword"
        />
        <div className="absolute right-0 pr-0 py-1">
          <button
            className="px-4 py-3 bg-sky-400 text-white hover:bg-sky-500 rounded-r-3xl shadow-lg"
            onClick={handleButtonClick}
          >
            <Search size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
