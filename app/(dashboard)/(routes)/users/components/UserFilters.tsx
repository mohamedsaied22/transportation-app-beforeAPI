import React from 'react';

const UserFilters = ({ onFilterChange }) => {
  const handleFilterChange = (filterKey, e) => {
    const filterValue = e.target.value;
    onFilterChange(filterKey, filterValue);
  };

  return (
    <div className="px-4 md:px-20 lg:px-32 space-y-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
      <input
        className="px-2 py-1 border shadow-md border-gray-300 rounded-xl  outline-none focus:shadow-xl focus:rounded-xl focus:scale-105 transition-all duration-300 text-muted-foreground"
        type="text"
        onChange={(e) => handleFilterChange('username', e)}
        placeholder="Username"
      />

      <input
        className="px-2 py-1 border shadow-md border-gray-300 rounded-xl  outline-none focus:shadow-xl focus:rounded-xl focus:scale-105 transition-all duration-300 text-muted-foreground"
        type="text"
        onChange={(e) => handleFilterChange('role', e)}
        placeholder="Role"
      />

      <input
        className="px-2 py-1 border shadow-md border-gray-300 rounded-xl  outline-none focus:shadow-xl focus:rounded-xl focus:scale-105 transition-all duration-300 text-muted-foreground"
        type="text"
        onChange={(e) => handleFilterChange('branch', e)}
        placeholder="Branch"
      />

      <input
        className="px-2 py-1 border shadow-md border-gray-300 rounded-xl  outline-none focus:shadow-xl focus:rounded-xl focus:scale-105 transition-all duration-300 text-muted-foreground"
        type="text"
        onChange={(e) => handleFilterChange('email', e)}
        placeholder="Email"
      />
    </div>
  );
};

export default UserFilters;