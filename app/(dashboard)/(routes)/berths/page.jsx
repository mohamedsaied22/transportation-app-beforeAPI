"use client";

import React, { useEffect, useState } from "react";
import { Combine, LandPlot } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Card } from "@/components/ui/card";
import { Heading } from "@/components/heading";
import Pagination from "@/components/pagination";
import Filters from "@/components/filteration";
import SortOptions from "./component/berth-sort";
import NewBerth from "./component/berth-new";
import UpdateBerth from "./component/berth-update";

export default function BerthPage() {
  const [filteredBerths, setFilteredBerths] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const berthsPerPage = 16;
  const [sortOption, setSortOption] = useState("");
  const [originalBerths, setOriginalBerths] = useState([]);

  useEffect(() => {
    const storedBerths = JSON.parse(localStorage.getItem("berths")) || [];
    setOriginalBerths(storedBerths.map(addSubsCount));
    setFilteredBerths(storedBerths.map(addSubsCount));
  }, []);

  useEffect(() => {
    const storedBerths = JSON.parse(localStorage.getItem("berths")) || [];
    const updatedBerths = storedBerths.map(addSubsCount);
    setFilteredBerths(updatedBerths);
  }, []);

  const addSubsCount = (berth) => {
    const berthSubs =
      JSON.parse(localStorage.getItem(`subs_${berth.id}`)) || [];
    berth.subs = berthSubs.length;
    return berth;
  };

  const filterBerths = (filterValue) => {
    if (filterValue === "") {
      setFilteredBerths(originalBerths);
      setCurrentPage(1);
    } else {
      const lowerCaseFilterValue = filterValue.toLowerCase();
      const filtered = originalBerths.filter((berth) => {
        return (
          berth.name.toLowerCase().includes(lowerCaseFilterValue) ||
          berth.code.toLowerCase().includes(lowerCaseFilterValue) |
            berth.branch.toLowerCase().includes(lowerCaseFilterValue) ||
          berth.location.toLowerCase().includes(lowerCaseFilterValue)
        );
      });

      setFilteredBerths(filtered);
      setCurrentPage(1);
    }
  };

  const sortBerths = (option) => {
    let sortedBerths = [...filteredBerths];

    switch (option) {
      case "name":
        sortedBerths.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "code":
        sortedBerths.sort((a, b) => a.code.localeCompare(b.code));
        break;
      case "branch":
        sortedBerths.sort((a, b) => a.branch.localeCompare(b.branch));
        break;
      case "location":
        sortedBerths.sort((a, b) => a.location.localeCompare(b.location));
        break;
      default:
        // No sorting
        break;
    }

    setFilteredBerths(sortedBerths);
  };

  const handleSortChange = (sortValue) => {
    setSortOption(sortValue);
    sortBerths(sortValue);
  };

  const handleBerthCreated = (newBerth) => {
    newBerth.id = uuidv4();
    newBerth.subs = 0;

    const updatedBerths = [...filteredBerths, newBerth];
    setFilteredBerths(updatedBerths);
    setOriginalBerths(updatedBerths);
    localStorage.setItem("berths", JSON.stringify(updatedBerths));
  };

  const handleUpdateBerth = (updatedBerth) => {
    const berthIndex = filteredBerths.findIndex(
      (berth) => berth.id === updatedBerth.id
    );

    if (berthIndex !== -1) {
      const updatedBerths = [...filteredBerths];
      updatedBerths[berthIndex] = updatedBerth;
      setFilteredBerths(updatedBerths);
      setOriginalBerths(updatedBerths);
      localStorage.setItem("berths", JSON.stringify(updatedBerths));
    }
  };

  // const handleDeleteBerth = (berth) => {
  //   const updatedBerths = filteredBerths.filter(
  //     (q) => q.id !== berth.id
  //   );
  //   setFilteredBerths(updatedBerths);
  //   setOriginalBerths(updatedBerths);
  //   localStorage.setItem("berths", JSON.stringify(updatedBerths));
  // };

  const indexOfLastBerth = currentPage * berthsPerPage;
  const indexOfFirstBerth = indexOfLastBerth - berthsPerPage;
  const currentBerths = filteredBerths.slice(
    indexOfFirstBerth,
    indexOfLastBerth
  );
  const totalPages = Math.ceil(filteredBerths.length / berthsPerPage);

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

  return (
    <div className="">
      <Heading
        title="Berths Managements"
        description="Streamlining Berth Movement."
        icon={LandPlot}
        iconColor="text-sky-400"
      />

      <div className="px-1 flex flex-col md:flex-row mt-8 mb-2 justify-center items-center ">
        <div className="flex-1 mb-4 ">
          <Filters onFilterChange={filterBerths} />
        </div>
        <div className="mb-4 ml-2">
          <SortOptions
            sortOption={sortOption}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="mb-4 ">
          <NewBerth
            berths={filteredBerths}
            onBerthCreated={handleBerthCreated}
          />
        </div>
      </div>

      <div className="px-4 md:px-8 mt-4 lg:px-16  grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {currentBerths.map((berth, index) => (
          <Card
            key={berth.id}
            className="w-1/2 p-4 border-black/5 flex flex-col shadow-md hover:shadow-xl transition "
          >
            <div className="  flex items-center justify-end mb-4 ">
              <div className="w-full font- ">
                <div
                  className="flex text-lg  mb-2 bg-gray-100 shadow-lg p-2 items-center justify-center rounded-t-2xl font-semibold">
                  <div className="text-right ">
                    {berth.name || ".................."}
                  </div>
                </div>
                <div className="flex justify-between mb-2 shadow-md p-2">
                  <div className="text-left text-md">Code:</div>
                  <div className="text-right ">
                    {berth.code || ".................."}
                  </div>
                </div>
                <div className="flex justify-between shadow-md p-2">
                  <div className="text-left text-md">Location:</div>
                  <div className="text-right ">
                    {berth.location || ".................."}
                  </div>
                </div>

                <div className="flex justify-between shadow-md p-2">
                  <div className="text-left text-md">Branch:</div>
                  <div className="text-right ">
                    {berth.branch || ".................."}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <UpdateBerth berth={berth} onUpdateBerth={handleUpdateBerth} />
            </div>
          </Card>
        ))}
      </div>

      <Pagination
        currentUsers={currentBerths}
        currentPage={currentPage}
        totalPages={totalPages}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
      />
    </div>
  );
}
