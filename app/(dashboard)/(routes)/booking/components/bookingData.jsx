import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import NewTruck from "./new-truckDriver";
import UpdateTruck from "./update-truckDriver";
import Filters from "@/components/filteration";
import ReleaseTruck from "../components/release-truck";
import SortOptions from "../components/trucks-sorting";


const TruckData = ({
  trucks,
  onTruckCreated,
  onUpdateTruck,
  currentBookingId,
}) => {
  const [filterValue, setFilterValue] = useState("");
  const [filteredBookings, setFilteredBookings] = useState(trucks);
  const [releasedTrucks, setReleasedTrucks] = useState([]);
  const [sortOption, setSortOption] = useState("");

  

  const filterBookings = useCallback(
    (filterValue) => {
      if (filterValue === "") {
        setFilteredBookings(trucks);
      } else {
        const filtered = trucks.filter((truck) => {
          const lowerCaseFilterValue = filterValue.toLowerCase();
          return (
            truck.contractor.toLowerCase().includes(lowerCaseFilterValue) ||
            truck.truckType.toLowerCase().includes(lowerCaseFilterValue) ||
            truck.truckCode.toLowerCase().includes(lowerCaseFilterValue) ||
            truck.driverName.toLowerCase().includes(lowerCaseFilterValue)
          );
        });

        setFilteredBookings(filtered);
      }
    },
    [trucks]
  );

  useEffect(() => {
    filterBookings(filterValue);
  }, [filterValue, trucks, filterBookings]);

  const handleTruckCreated = (newTruck) => {
    onTruckCreated(newTruck);
    setFilterValue("");
    setFilteredBookings((prevBookings) => [newTruck, ...prevBookings]);
  };


  const handleUpdateTruck = (updatedTruck) => {
    onUpdateTruck(updatedTruck);
    setFilteredBookings((prevBookings) =>
      prevBookings.map((truck) =>
        truck.id === updatedTruck.id ? updatedTruck : truck
      )
    );
  };


// const handleUpdateTruck = (updatedTruck) => {
//   // Check if the updated truck driver exists in the filteredBookings state
//   const isDriverExisting = filteredBookings.some(
//     (driver) => driver.id === updatedTruck.id
//   );

//   if (isDriverExisting) {
//     // Update the state to reflect the changes in the specific truck driver
//     setFilteredBookings((prevBookings) =>
//       prevBookings.map((driver) =>
//         driver.id === updatedTruck.id ? updatedTruck : driver
//       )
//     );

//     // Handle local storage update for the specific truck driver
//     const trucks = JSON.parse(localStorage.getItem("Trucks")) || [];
//     const updatedDrivers = trucks.map((driver) =>
//       driver.id === updatedTruck.id ? updatedTruck : driver
//     );
//     localStorage.setItem("Trucks", JSON.stringify(updatedDrivers));
//   }
// };

const handleSortChanges = (sortValue) => {
  setSortOption(sortValue);

  switch (sortValue) {
    case "all":
      setFilteredBookings(trucks);
      break;
    case "released":
      setFilteredBookings(trucks.filter((truck) => truck.status === "Released"));
      break;
    default:
      break;
  }
};




    // Function to handle sort change
    const handleSortChange = (sortValue) => {
      setSortOption(sortValue);
      sortBookings(sortValue);
    };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleTruckRelease = (releasedTruck) => {
    setReleasedTrucks((prevReleasedTrucks) => [
      ...prevReleasedTrucks,
      releasedTruck,
    ]);

    const updatedTruck = { ...releasedTruck, status: "Released" };
    handleUpdateTruck(updatedTruck);
  };

  return (
    <div className="border-black/5 transition rounded-xl">
      <div className="flex flex-col md:flex-row mt-8 mb-2 justify-center items-center">
        <div className="flex-1 mb-4 ml-2 mr-2">
          <Filters onFilterChange={handleFilterChange} />
        </div>
        <div className="mb-4 ml-2">
          <SortOptions
            sortOption={sortOption}
            onSortChange={handleSortChanges}
          />
        </div>
        <div className="mb-4 mr-8">
          <NewTruck
            trucks={trucks}
            onTruckCreated={handleTruckCreated}
          />
        </div>
      </div>

      <div className="px-4 md:px-8 mt-4 mb-4 lg:px-12 grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 gap-4">
        {filteredBookings.map((truck) => (
          <Card
            key={truck.id}
            className="p-4 border-black/5 flex flex-col shadow-md hover:shadow-2xl transition rounded-2xl"
          >
            <div className="flex items-center justify-end mb-4">
              <div className="w-full">
                {/* Display new truck driver details */}
                <div className="flex justify-between mb-2 shadow-md p-2">
                  <div className="text-left text-sm">Contractor:</div>
                  <div className="text-right">
                    {truck.contractor || ".................."}
                  </div>
                </div>
                <div className="flex justify-between mb-2 shadow-md p-2">
                  <div className="text-left text-sm">Truck Type:</div>
                  <div className="text-right">
                    {truck.truckType || ".................."}
                  </div>
                </div>
                <div className="flex justify-between mb-2 shadow-md p-2">
                  <div className="text-left text-sm">Truck Code:</div>
                  <div className="text-right">
                    {truck.truckCode || ".................."}
                  </div>
                </div>
                <div className="flex justify-between mb-2 shadow-md p-2">
                  <div className="text-left text-sm">Driver Name:</div>
                  <div className="text-right">
                    {truck.driverName || ".................."}
                  </div>
                </div>
                <div className="flex justify-center mb-2 shadow-md p-2">
                  {truck.status === "Released" && (
                    <div className="flex justify-center mb-2 text-sm font-semibold">
                      {truck.releaseType && (
                        <span className="block">
                          Released: {truck.releaseType}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center ">
              {/* Conditionally render the UpdateTruck component */}
              {truck.status !== "Released" && (
                // Check if the status is not "Released"
                <UpdateTruck
                  truck={truck}
                  onUpdateTruck={handleUpdateTruck}
                />
              )}

              <ReleaseTruck
                truck={truck}
                onTruckReleased={handleTruckRelease}
                onUpdateTruck={handleUpdateTruck} // Pass handleUpdateTruck as a prop
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TruckData;
