import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import NewTruck from "./truck-new";
import UpdateTruck from "./truck-update";
import DeleteTruck from "./truck-delete-modal";
import FilterTrucks from "./filter-trucks";
import Filters from "@/components/filteration";

const TrucksData = ({
  trucks,
  onTruckCreated,
  onUpdateTruck,
  onDeleteTruck,
}) => {
  // State for the general filter (search by code, name, type, or license)
  const [generalFilterValue, setGeneralFilterValue] = useState("");

  // State for the specific truck filter (available, not available, maintenance)
  const [truckStatusFilter, setTruckStatusFilter] = useState("");

  // State to store filtered trucks based on both filters
  const [filteredTrucks, setFilteredTrucks] = useState([]);

  const filterTrucks = useCallback(
    (generalFilterValue, truckStatusFilter) => {
      // Filtering based on both general and specific truck status filters
      if (generalFilterValue === "" && truckStatusFilter === "") {
        // If both filters are empty, show all trucks
        setFilteredTrucks(trucks);
      } else {
        const filtered = trucks.filter((truck) => {
          const lowerCaseGeneralFilter = generalFilterValue.toLowerCase();
          const lowerCaseStatusFilter = truckStatusFilter.toLowerCase();

          return (
            (truck.code.toLowerCase().includes(lowerCaseGeneralFilter) ||
              truck.type.toLowerCase().includes(lowerCaseGeneralFilter) ||
              truck.license.toLowerCase().includes(lowerCaseGeneralFilter)) &&
            (truckStatusFilter === "" ||
              truck.status.toLowerCase() === lowerCaseStatusFilter)
          );
        });

        setFilteredTrucks(filtered);
      }
    },
    [trucks]
  );

  useEffect(() => {
    // Trigger filterTrucks whenever the general filter or truck status filter changes
    filterTrucks(generalFilterValue, truckStatusFilter);
  }, [generalFilterValue, truckStatusFilter, trucks, filterTrucks]);

  const handleTruckCreated = useCallback((newTruck) => {
    // Callback when a new truck is created
    onTruckCreated(newTruck);
    setTruckStatusFilter(""); // Clear the truck status filter
  }, [onTruckCreated]);

  const handleUpdateTruck = useCallback((updatedTruck) => {
    // Callback when a truck is updated
    onUpdateTruck(updatedTruck);
  }, [onUpdateTruck]);

  const handleDeleteTruck = useCallback(
    (truck) => {
      // Callback when a truck is deleted
      onDeleteTruck(truck);
      console.log(truck);
    },
    [onDeleteTruck]
  );

  const handleGeneralFilterChange = useCallback(
    (value) => {
      // Callback for the general filter (code, name, type, license)
      setGeneralFilterValue(value);
    },
    []
  );

  const handleTruckStatusFilterChange = useCallback(
    (status) => {
      // Callback for the truck status filter (available, not available, maintenance)
      setTruckStatusFilter(status);
    },
    []
  );

  return (
    <div className="p-4 border-black/5  transition rounded-xl">
      <div className="px-1 flex flex-col md:flex-row   justify-center items-center ">
        <div className="flex-1 mb-4 ">
          {/* Component for the general filters (code, name, type, license) */}
          <Filters onFilterChange={handleGeneralFilterChange} />
        </div>
        <div className="mb-4 ml-2 cursor-pointer">
          {/* Component for the specific truck status filter (available, not available, maintenance) */}
          <FilterTrucks onFilterChange={handleTruckStatusFilterChange} />
        </div>
        <div className="mb-4 ml-2 ">
          {/* Component for creating a new truck */}
          <NewTruck trucks={trucks} onTruckCreated={handleTruckCreated} />
        </div>
      </div>

      <div className=" px-4 md:px-12 lg:px-16 space-y-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredTrucks.map((truck) => (
          <Card
            key={truck.id}
            className="p-4 border-black/5 flex flex-col mt-4 shadow-md hover:shadow-xl transition "
          >
            <div className="  flex items-center justify-center mb-4 cursor-pointer ">
              <div className="w-full  ">
                <div className="flex text-lg mb-2 shadow-lg p-2 items-center justify-center rounded-2xl font-semibold">
                  {/* <div className="text-left  ">code:</div> */}
                  <div className="flex  ">{truck.code || "..........."}</div>
                </div>
                <div className="flex justify-between mb-2 shadow-md p-2">
                  <div className="text-left text-sm">license:</div>
                  <div className="text-right ">
                    {truck.license || "..........."}
                  </div>
                </div>
                <div className="flex justify-between mb-2 shadow-md p-2">
                  <div className="text-left text-sm">type:</div>
                  <div className="text-right ">
                    {truck.type || "..........."}
                  </div>
                </div>
                <div className="flex justify-between mb-2 shadow-md p-2">
                  <div className="text-left text-sm">status:</div>
                  <div className="text-right ">
                    {truck.status || "..........."}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-start ">
              <UpdateTruck truck={truck} onUpdateTruck={handleUpdateTruck} />
              {/* <DeleteTruck
                truck={truck}
                onDeleteTruck={() => handleDeleteTruck(truck)}
              /> */}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrucksData;
