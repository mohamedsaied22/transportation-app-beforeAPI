"use client";

import React, { useEffect, useState } from "react";
import { Combine, LandPlot, Upload } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Card } from "@/components/ui/card";
import { Heading } from "@/components/heading";
import Pagination from "@/components/pagination";
// import Filters from "@/components/filteration";
// import SortOptions from "./component/pattern-sort";
// import NewPattern from "./component/pattern-new";
// import UpdatePattern from "./component/pattern-update";

export default function PatternPage() {
  const [filteredPatterns, setFilteredPatterns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const patternsPerPage = 16;
  const [sortOption, setSortOption] = useState("");
  const [originalPatterns, setOriginalPatterns] = useState([]);

  useEffect(() => {
    const storedPatterns = JSON.parse(localStorage.getItem("patterns")) || [];
    setOriginalPatterns(storedPatterns.map(addSubsCount));
    setFilteredPatterns(storedPatterns.map(addSubsCount));
  }, []);

  useEffect(() => {
    const storedPatterns = JSON.parse(localStorage.getItem("patterns")) || [];
    const updatedPatterns = storedPatterns.map(addSubsCount);
    setFilteredPatterns(updatedPatterns);
  }, []);

  const addSubsCount = (pattern) => {
    const patternSubs =
      JSON.parse(localStorage.getItem(`subs_${pattern.id}`)) || [];
    pattern.subs = patternSubs.length;
    return pattern;
  };

  const filterPatterns = (filterValue) => {
    if (filterValue === "") {
      setFilteredPatterns(originalPatterns);
      setCurrentPage(1);
    } else {
      const lowerCaseFilterValue = filterValue.toLowerCase();
      const filtered = originalPatterns.filter((pattern) => {
        return (
          pattern.name.toLowerCase().includes(lowerCaseFilterValue) ||
          pattern.code.toLowerCase().includes(lowerCaseFilterValue) |
            pattern.branch.toLowerCase().includes(lowerCaseFilterValue) ||
          pattern.location.toLowerCase().includes(lowerCaseFilterValue)
        );
      });

      setFilteredPatterns(filtered);
      setCurrentPage(1);
    }
  };

  const sortPatterns = (option) => {
    let sortedPatterns = [...filteredPatterns];

    switch (option) {
      case "name":
        sortedPatterns.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "code":
        sortedPatterns.sort((a, b) => a.code.localeCompare(b.code));
        break;
      case "branch":
        sortedPatterns.sort((a, b) => a.branch.localeCompare(b.branch));
        break;
      case "location":
        sortedPatterns.sort((a, b) => a.location.localeCompare(b.location));
        break;
      default:
        // No sorting
        break;
    }

    setFilteredPatterns(sortedPatterns);
  };

  const handleSortChange = (sortValue) => {
    setSortOption(sortValue);
    sortPatterns(sortValue);
  };

  const handlePatternCreated = (newPattern) => {
    newPattern.id = uuidv4();
    newPattern.subs = 0;

    const updatedPatterns = [...filteredPatterns, newPattern];
    setFilteredPatterns(updatedPatterns);
    setOriginalPatterns(updatedPatterns);
    localStorage.setItem("patterns", JSON.stringify(updatedPatterns));
  };

  const handleUpdatePattern = (updatedPattern) => {
    const patternIndex = filteredPatterns.findIndex(
      (pattern) => pattern.id === updatedPattern.id
    );

    if (patternIndex !== -1) {
      const updatedPatterns = [...filteredPatterns];
      updatedPatterns[patternIndex] = updatedPattern;
      setFilteredPatterns(updatedPatterns);
      setOriginalPatterns(updatedPatterns);
      localStorage.setItem("patterns", JSON.stringify(updatedPatterns));
    }
  };

  // const handleDeletePattern = (pattern) => {
  //   const updatedPatterns = filteredPatterns.filter(
  //     (q) => q.id !== pattern.id
  //   );
  //   setFilteredPatterns(updatedPatterns);
  //   setOriginalPatterns(updatedPatterns);
  //   localStorage.setItem("patterns", JSON.stringify(updatedPatterns));
  // };

  const indexOfLastPattern = currentPage * patternsPerPage;
  const indexOfFirstPattern = indexOfLastPattern - patternsPerPage;
  const currentPatterns = filteredPatterns.slice(
    indexOfFirstPattern,
    indexOfLastPattern
  );
  const totalPages = Math.ceil(filteredPatterns.length / patternsPerPage);

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
        title="Patterns Managements"
        description="Streamlining Pattern Movement."
        icon={Upload}
        iconColor="text-sky-400"
      />

      {/* <div className="px-1 flex flex-col md:flex-row mt-8 mb-2 justify-center items-center ">
        <div className="flex-1 mb-4 ">
          <Filters onFilterChange={filterPatterns} />
        </div>
        <div className="mb-4 ml-2">
          <SortOptions
            sortOption={sortOption}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="mb-4 ">
          <NewPattern
            patterns={filteredPatterns}
            onPatternCreated={handlePatternCreated}
          />
        </div>
      </div> */}

      {/* <div className="px-4 md:px-8 mt-4 lg:px-16  grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {currentPatterns.map((pattern, index) => (
          <Card
            key={pattern.id}
            className="w-1/2 p-4 border-black/5 flex flex-col shadow-md hover:shadow-xl transition "
          >
            <div className="  flex items-center justify-end mb-4 ">
              <div className="w-full font- ">
                <div
                  className="flex text-lg  mb-2 bg-gray-100 shadow-lg p-2 items-center justify-center rounded-t-2xl font-semibold">
                  <div className="text-right ">
                    {pattern.name || ".................."}
                  </div>
                </div>
                <div className="flex justify-between mb-2 shadow-md p-2">
                  <div className="text-left text-md">Code:</div>
                  <div className="text-right ">
                    {pattern.code || ".................."}
                  </div>
                </div>
                <div className="flex justify-between shadow-md p-2">
                  <div className="text-left text-md">Location:</div>
                  <div className="text-right ">
                    {pattern.location || ".................."}
                  </div>
                </div>

                <div className="flex justify-between shadow-md p-2">
                  <div className="text-left text-md">Branch:</div>
                  <div className="text-right ">
                    {pattern.branch || ".................."}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <UpdatePattern pattern={pattern} onUpdatePattern={handleUpdatePattern} />
            </div>
          </Card>
        ))}
      </div> */}

      <Pagination
        currentUsers={currentPatterns}
        currentPage={currentPage}
        totalPages={totalPages}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
      />
    </div>
  );
}
