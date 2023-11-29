import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import NewVoyage from "./new-voyage";
import UpdateVoyage from "./update-voyage";
import Filters from "@/components/filteration";

const VoyageData = ({
  voyages,
  onVoyageCreated,
  onUpdateVoyage,
  currentVesselId,
}) => {
  const [filterValue, setFilterValue] = useState("");
  const [filteredVessels, setFilteredVessels] = useState(voyages);

  const filterVessels = useCallback(
    (filterValue) => {
      if (filterValue === "") {
        setFilteredVessels(voyages);
      } else {
        const filtered = voyages.filter((voyage) => {
          const lowerCaseFilterValue = filterValue.toLowerCase();
          return (
            voyage.eta.toLowerCase().includes(lowerCaseFilterValue) ||
            voyage.arrival.toLowerCase().includes(lowerCaseFilterValue) ||
            voyage.etd.toLowerCase().includes(lowerCaseFilterValue) ||
            voyage.departure.toLowerCase().includes(lowerCaseFilterValue)
          );
        });

        setFilteredVessels(filtered);
      }
    },
    [voyages]
  );

  useEffect(() => {
    filterVessels(filterValue);
  }, [filterValue, voyages, filterVessels]);

  const handleVoyageCreated = (newVoyage) => {
    onVoyageCreated(newVoyage);
    setFilterValue("");
    setFilteredVessels((prevVessels) => [newVoyage, ...prevVessels]);
  };

  const handleUpdateVoyage = (updatedVoyage) => {
    onUpdateVoyage(updatedVoyage);
    setFilteredVessels((prevVessels) =>
      prevVessels.map((voyage) =>
        voyage.id === updatedVoyage.id ? updatedVoyage : voyage
      )
    );
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };


  return (
    <div className="border-black/5 transition rounded-xl">
      <div className="flex flex-col md:flex-row mt-8 mb-2 justify-center items-center">
        <div className="flex-1 mb-4 ml-2 mr-2">
          <Filters onFilterChange={handleFilterChange} />
        </div>
        <div className="mb-4 mr-8">
          <NewVoyage voyages={voyages} onVoyageCreated={handleVoyageCreated} />
        </div>
      </div>

      <div className="px-4 md:px-8 mt-4 mb-4 lg:px-12 grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {filteredVessels.map((voyage) => (
          <Card
            key={voyage.id}
            className="p-4 border-black/5 flex flex-col shadow-md hover:shadow-2xl transition rounded-2xl"
          >
            <div className="flex items-center justify-end mb-4">
              <div className="w-full">
                <div className="flex justify-between mb-2 shadow-md p-2">
                  <div className="text-left text-sm">
                    Estimated time arrival:
                  </div>
                  <div className="text-right">
                    {voyage.eta || ".................."}
                  </div>
                </div>
                <div className="flex justify-between mb-2 shadow-md p-2">
                  <div className="text-left text-sm">Arrival Time:</div>
                  <div className="text-right">
                    {voyage.arrival || ".................."}
                  </div>
                </div>
                <div className="flex justify-between mb-2 shadow-md p-2">
                  <div className="text-left text-sm">
                    Estimated time departure:
                  </div>
                  <div className="text-right">
                    {voyage.etd || ".................."}
                  </div>
                </div>
                <div className="flex justify-between shadow-md p-2">
                  <div className="text-left text-sm">Departure Time:</div>
                  <div className="text-right">
                    {voyage.departure || ".................."}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-between content-end">
              <UpdateVoyage
                voyage={voyage}
                onUpdateVoyage={handleUpdateVoyage}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VoyageData;
