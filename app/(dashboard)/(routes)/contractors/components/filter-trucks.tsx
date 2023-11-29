import { useState } from "react";

const FilterTrucks = ({ onFilterChange }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    onFilterChange(status);
  };

  return (
    <select
    className="px-2 py-1 border rounded-full border-gray-300  h-9 mr-2 shadow-md cursor-pointer"
    value={selectedStatus}
      onChange={handleStatusChange}
    >
      <option value="">All</option>
      <option value="available">Available</option>
      <option value="not available">Not Available</option>
      <option value="maintenance">Maintenance</option>
    </select>
  );
};

export default FilterTrucks;