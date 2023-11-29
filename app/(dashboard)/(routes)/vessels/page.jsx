"use client";

import React, { useEffect, useState } from "react";
import { Ship } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/heading";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Pagination from "@/components/pagination";
import NewVessel from "./components/vessels.new";
import UpdateVessel from "./components/vessel-update";
import DeleteVessel from "./components/vessel-delete-modal";
import Filters from "@/components/filteration";
import SortOptions from "./components/vessel-sort";

export default function VesselsPage() {
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vesselsPerPage = 18;
  const [sortOption, setSortOption] = useState("");
  const [originalVessels, setOriginalVessels] = useState([]);

  useEffect(() => {
    const storedVessels = JSON.parse(localStorage.getItem("Vessels")) || [];
    setOriginalVessels(storedVessels.map(addSubsCount));
    setFilteredVessels(storedVessels.map(addSubsCount));
  }, []);

  useEffect(() => {
    const storedVessels = JSON.parse(localStorage.getItem("Vessels")) || [];
    const updatedVessels = storedVessels.map((vessel) => {
      const vesselVoyages =
        JSON.parse(localStorage.getItem(`vessels_${vessel.id}`)) || [];
      vessel.voyages = vesselVoyages.length;
      return vessel;
    });
    setFilteredVessels(updatedVessels);
  }, []);

  const addSubsCount = (vessel) => {
    const vesselSubs =
      JSON.parse(localStorage.getItem(`subs_${vessel.id}`)) || [];
    vessel.subs = vesselSubs.length;
    return vessel;
  };

  const filterVessels = (filterValue) => {
    if (filterValue === "") {
      setFilteredVessels(originalVessels);
      setCurrentPage(1);
    } else {
      const lowerCaseFilterValue = filterValue.toLowerCase();
      const filtered = originalVessels.filter((vessel) => {
        return (
          (vessel.name &&
            vessel.name.toLowerCase().includes(lowerCaseFilterValue)) ||
          (vessel.tonnage &&
            vessel.tonnage.toLowerCase().includes(lowerCaseFilterValue)) ||
          (vessel.IMO &&
            vessel.IMO.toLowerCase().includes(lowerCaseFilterValue))
        );
      });

      setFilteredVessels(filtered);
      setCurrentPage(1);
    }
  };

  const sortVessels = (option) => {
    let sortedVessels = [...filteredVessels];

    switch (option) {
      case "name":
        sortedVessels.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "IMO":
        sortedVessels.sort((a, b) => a.IMO.localeCompare(b.IMO));
        break;
      case "tonnage":
        sortedVessels.sort((a, b) => {
          // Convert tonnage values to numbers for numeric comparison
          const tonnageA = parseFloat(a.grossTonnage) || 0;
          const tonnageB = parseFloat(b.grossTonnage) || 0;
          return tonnageB - tonnageA; // Sorting in descending order
        });
        break;

      default:
        // No sorting
        break;
    }

    setFilteredVessels(sortedVessels);
  };

  const handleSortChange = (sortValue) => {
    setSortOption(sortValue);
    sortVessels(sortValue);
  };

  const indexOfLastVessel = currentPage * vesselsPerPage;
  const indexOfFirstVessel = indexOfLastVessel - vesselsPerPage;
  const currentVessels = filteredVessels.slice(
    indexOfFirstVessel,
    indexOfLastVessel
  );
  const totalPages = Math.ceil(filteredVessels.length / vesselsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleVesselCreated = (newVessel) => {
    newVessel.id = uuidv4();
    newVessel.voyages = 0;

    const updatedVessels = [...filteredVessels, newVessel];
    setFilteredVessels(updatedVessels);
    localStorage.setItem("Vessels", JSON.stringify(updatedVessels));

    localStorage.setItem(`vessels_${newVessel.id}`, JSON.stringify([]));
  };

  const handleUpdateVessel = (updatedVessel) => {
    const vesselIndex = filteredVessels.findIndex(
      (vessel) => vessel.id === updatedVessel.id
    );

    if (vesselIndex !== -1) {
      const updatedVessels = [...filteredVessels];
      updatedVessels[vesselIndex] = updatedVessel;
      setFilteredVessels(updatedVessels);
      localStorage.setItem("Vessels", JSON.stringify(updatedVessels));
    }
  };

  const handleDeleteVessel = (vessel) => {
    const updatedVessels = filteredVessels.filter((q) => q.id !== vessel.id);
    setFilteredVessels(updatedVessels);
    localStorage.setItem("Vessels", JSON.stringify(updatedVessels));
  };

  return (
    <div className="">
      <Heading
        title="Vessel Operations"
        description="Navigating Your Vessel Fleet."
        icon={Ship}
        iconColor="text-sky-400"
      />

      <div className="px-1 flex flex-col md:flex-row mt-8 mb-2 justify-start items-center ">
        <div className="flex-1 mb-4 ">
          <Filters onFilterChange={filterVessels} />
        </div>
        <div className="mb-4 ml-2">
          <SortOptions
            sortOption={sortOption}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="mb-4">
          <NewVessel
            vessels={filteredVessels}
            onVesselCreated={handleVesselCreated}
          />
        </div>
      </div>

      <div className=" px-4 md:px-12 lg:px-16 space-y-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {currentVessels.map((vessel, index) => (
          <Card
            key={index}
            className="p-4 border-black/5 flex flex-col mt-4 shadow-md hover:shadow-xl transition rounded- "
          >
            <Link href={`/vessels/${vessel.id}`} key={index} legacyBehavior>
              <div className="  flex items-center justify-center mb-4 cursor-pointer ">
                <div className="w-full  ">
                  <div className="flex text-lg  mb-2 bg-gray-100 shadow-lg p-2 items-center justify-center rounded-t-2xl font-semibold">
                    {/* <div className="text-left text-sm ">Name:</div> */}
                    <div className="flex  ">{vessel.name || "..........."}</div>
                  </div>
                  <div className="flex justify-between mb-2 shadow-md p-2">
                    <div className="text-left text-sm">IMO:</div>
                    <div className="text-right ">
                      {vessel.IMO || "..........."}
                    </div>
                  </div>
                  <div className="flex justify-between shadow-md p-2">
                    <div className="text-left text-sm">Gross Tonnage:</div>
                    <div className="text-right ">
                      {vessel.grossTonnage || "..........."}
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* <div className="flex flex-col items-center justify-end mb-4 p-1 shadow-md rounded-full cursor-pointer">
                <div className="text-center font-semibold text-xl ">
                  <a>{vessel.name}</a>
                </div>
                <div className="text-center text-sm ">IMO: {vessel.IMO}</div>
              </div>

            <span className="flex flex-col font-medium ">
              Gross Tonnage:{" "}
              {vessel.grossTonnage !== "" ? vessel.grossTonnage : "......"}
            </span> */}

            <div className="flex justify-center px-1 ">
              <UpdateVessel
                vessel={vessel}
                onUpdateVessel={handleUpdateVessel}
              />
              {/* <DeleteVessel
                vessel={vessel}
                onDeleteVessel={() => handleDeleteVessel(vessel)}
              /> */}
            </div>
          </Card>
        ))}
      </div>

      <Pagination
        currentUsers={currentVessels}
        currentPage={currentPage}
        totalPages={totalPages}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
      />
    </div>
  );
}
