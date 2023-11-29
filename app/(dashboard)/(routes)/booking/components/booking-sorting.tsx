import React from 'react';

const SortOptions = ({ sortOption, onSortChange }) => {
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    onSortChange(sortValue);
  };

  return (
    <select
      className="px-2 py-1 border rounded-full border-gray-300 h-9 mr-2 shadow-md cursor-pointer"
      value={sortOption}
      onChange={handleSortChange}
    >
      <option value="all">All</option>
      <option value="closed">Closed</option>
      <option value="opened">Opened</option>
    </select>
  );
};

export default SortOptions;
