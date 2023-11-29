"use client";

import React, { useState, useEffect } from "react";
import { Truck,  } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/heading";
import SortOptions from "./components/contractors-sorting";
import NewContractor from "./components/contractor-new-modal";
import UpdateContractor from "./components/contractor-update-modal";
import DeleteContractor from "./components/contractor-delete-modal";
import Pagination from "@/components/pagination";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Filters from "@/components/filteration";

export default function UserContractor() {
  const [filteredContractors, setFilteredContractors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const contractorsPerPage = 18;
  const [sortOption, setSortOption] = useState("");
  const [originalContractors, setOriginalContractors] = useState([]);
  // const [selectedContractor, setSelectedContractor] = useState(null);
  const [numTrucks, setNumTrucks] = useState(0); // Initialize with 0
  const [numDrivers, setNumDrivers] = useState(0); // Initialize with 0



  useEffect(() => {
    const storedContractors = JSON.parse(localStorage.getItem("contractors")) || [];
    setOriginalContractors(storedContractors.map(addSubsCount));
    setFilteredContractors(storedContractors.map(addSubsCount));
  }, []);




  // useEffect(() => {
  //   const storedContractors = JSON.parse(localStorage.getItem("Contractors")) || [];
  //   const updatedContractors = storedContractors.map((contractor) => {
  //     const contractorTrucks =
  //       JSON.parse(localStorage.getItem(`subs_${contractor.id}`)) || [];
  //     contractor.trucks = contractorTrucks.length;

  //     const numTrucks = contractorTrucks.length;
  //         const numDrivers = contractorTrucks.reduce(
  //           (total, subContract) => total + subContract.drivers,
  //           0
  //         );
    
  //         // Set the numTrucks and numDrivers for each contractor
  //         contractor.trucks = numTrucks;
  //         contractor.drivers = numDrivers;
  //     return contractor;
  //   });
  //   setFilteredContractors(updatedContractors);
  // }, []);
  
  useEffect(() => {
    const storedContractors =
      JSON.parse(localStorage.getItem("contractors")) || [];
    const updatedContractors = storedContractors.map((contractor) => {
      const contractorTrucks =
        JSON.parse(localStorage.getItem(`contractors_${contractor.id}`)) || [];
      const numTrucks = contractorTrucks.length;
      const numDrivers = contractorTrucks.reduce(
        (total, subContract) => total + subContract.drivers,
        0
      );

      // Set the numTrucks and numDrivers for each contractor
      contractor.trucks = numTrucks;
      contractor.drivers = numDrivers;

      return contractor;
    });

    setFilteredContractors(updatedContractors);

    // Calculate the total numTrucks and numDrivers
    const totalTrucks = updatedContractors.reduce(
      (total, contractor) => total + contractor.trucks,
      0
    );
    const totalDrivers = updatedContractors.reduce(
      (total, contractor) => total + contractor.drivers,
      0
    );
    setNumTrucks(totalTrucks);
    setNumDrivers(totalDrivers);
  }, []);

  const addSubsCount = (contractor) => {
    const contractorSubs =
      JSON.parse(localStorage.getItem(`subs_${contractor.id}`)) || [];
      contractor.subs = contractorSubs.length;
    return contractor;
  };
  const filterContractors = (filterValue) => {
    console.log('Filter Value:', filterValue);
    
    if (filterValue === "") {
      setFilteredContractors(originalContractors);
      setCurrentPage(1);
    } else {
      const lowerCaseFilterValue = filterValue.toLowerCase();
      const filtered = originalContractors.filter((contractor) => {
        const nameMatch = contractor.name && contractor.name.toLowerCase().includes(lowerCaseFilterValue);
        const codeMatch = contractor.code && contractor.code.toLowerCase().includes(lowerCaseFilterValue);
  
        console.log('Name Match:', nameMatch);
        console.log('Code Match:', codeMatch);
  
        return nameMatch || codeMatch;
      });
  
      console.log('Filtered Contractors:', filtered);
  
      setFilteredContractors(filtered);
      setCurrentPage(1);
    }
  };
  

  

  const sortContractors = (option) => {
    let sortedContractors = [...filteredContractors];

    switch (option) {
      case "name":
        sortedContractors.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "code":
        sortedContractors.sort((a, b) => a.code.localeCompare(b.code));
        break;

      default:
        // No sorting
        break;
    }

    setFilteredContractors(sortedContractors);
  };

  const handleSortChange = (sortValue) => {
    setSortOption(sortValue);
    sortContractors(sortValue);
  };

  const indexOfLastContractor = currentPage * contractorsPerPage;
  const indexOfFirstContractor = indexOfLastContractor - contractorsPerPage;
  const currentContractors = filteredContractors.slice(
    indexOfFirstContractor,
    indexOfLastContractor
  );
  const totalPages = Math.ceil(filteredContractors.length / contractorsPerPage);

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

  const handleContractorCreated = (newContractor) => {
    newContractor.id = uuidv4();

    // Debug: Log the sub-contracts associated with the new contractor
    const subContracts =
      JSON.parse(localStorage.getItem(`s_${newContractor.id}`)) || [];
    console.log("Sub-contracts for the new contractor:", subContracts);

    // Calculate the number of trucks and drivers based on sub-contracts
    newContractor.trucks = subContracts.length;
    newContractor.drivers = subContracts.reduce(
      (total, subContract) => total + subContract.drivers,
      0
    );

    const updatedContractors = [...filteredContractors, newContractor];
    setFilteredContractors(updatedContractors);
    localStorage.setItem("contractors", JSON.stringify(updatedContractors));
  };

  const handleUpdateContractor = (updatedContractor) => {
    const contractorIndex = filteredContractors.findIndex(
      (contractor) => contractor.id === updatedContractor.id
    );

    if (contractorIndex !== -1) {
      const updatedContractors = [...filteredContractors];
      updatedContractors[contractorIndex] = updatedContractor;
      setFilteredContractors(updatedContractors);
      localStorage.setItem("contractors", JSON.stringify(updatedContractors));
    }
  };

  const handleDeleteContractor = (contractor) => {
    const updatedContractors = filteredContractors.filter(
      (q) => q.id !== contractor.id
    );
    setFilteredContractors(updatedContractors);
    localStorage.setItem("contractors", JSON.stringify(updatedContractors));
  };

  // const handleCardClick = (contractor) => {
  //   setSelectedContractor(contractor);
  //   router.push(`/contractor/${contractor.id}`);
  // };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    console.log('Filter Value in Filters Component:', filterValue);
    onFilterChange(filterValue);
  };
  


  return (
    <div className="">
      <Heading
        title="Contractor Management"
        description="Managing Your Contractor Network."
        icon={Truck}
        iconColor="text-sky-400"
      />

      <div className="px-1 flex flex-col md:flex-row mt-8 mb-2 justify-center items-center ">
        <div className="flex-1 mb-4 ">
        <Filters onFilterChange={filterContractors} />
        </div>
        <div className="mb-4 ml-2">
          <SortOptions
            sortOption={sortOption}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="mb-4">
          <NewContractor
            contractors={filteredContractors}
            onContractorCreated={handleContractorCreated}
          />
        </div>
      </div>

      <div className=" px-4 md:px-12 lg:px-16 space-y-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {currentContractors.map((contractor, index) => (
          <Card
            key={index}
            className="p-4 border-black/5 flex flex-col mt-4 shadow-md hover:shadow-xl transition "
          >
            <Link
              href={`/contractors/${contractor.id}`}
              key={index}
              legacyBehavior
            >
              <div className="  flex items-center justify-center mb-4 cursor-pointer ">
                <div className="w-full  ">
                  <div 
                  className="flex text-lg  mb-2 bg-gray-100 shadow-lg p-2 items-center justify-center rounded-t-2xl font-semibold">
                  {/* <div className="text-left text-sm ">Name:</div> */}
                    <div className="flex  ">
                      {contractor.name || "..........."}
                    </div>
                  </div>
                  <div className="flex justify-between mb-2 shadow-md p-2">
                    <div className="text-left text-sm">Code:</div>
                    <div className="text-right ">
                      {contractor.code || "..........."}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="flex flex-col items-center justify-end mb-4 p-1 shadow-md rounded-full cursor-pointer">
                <div className="text-center font-semibold text-xl ">
                  <a>{contractor.name}</a>
              </div>
              <div className="text-center text-sm">Code:  {contractor.code}</div>
            </div> */}
            </Link>

            {/* Display numTrucks and numDrivers */}
            {/* <div className="flex justify-between mb-3">
              <div className="text-sm">
                Number of Trucks: <span className="font-bold">{contractor.trucks}</span>
              </div>
              <TruckIcon className="mr-2" />
            </div> */}

            {/* <div className="flex justify-between mb-3">
              <div className="text-sm">
                Number of Drivers: <span className="font-bold">{contractor.drivers}</span>
              </div>
              <UserCheck className="mr-2" />
            </div> */}

            <div className="flex justify-center px-1 ">
              <UpdateContractor
                contractor={contractor}
                onUpdateContractor={handleUpdateContractor}
              />
              {/* <DeleteContractor
                contractor={contractor}
                onDeleteContractor={() => handleDeleteContractor(contractor)}
              /> */}
            </div>
          </Card>
        ))}
      </div>

      <Pagination
        currentUsers={currentContractors}
        currentPage={currentPage}
        totalPages={totalPages}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
      />
    </div>
  );
}
