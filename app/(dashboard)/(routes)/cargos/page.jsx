// CargoPage.js

"use client";

import { useEffect, useState } from "react";
import { Combine } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Heading } from "@/components/heading";

import Pagination from "@/components/pagination";

import Link from "next/link";

import { v4 as uuidv4 } from "uuid";
import Filters from "@/components/filteration";
import NewCargo from "./components/cargo-new";
import UpdateCargo from "./components/cargo-update";
import DeleteCargo from "./components/delete-cargo";
import SortOptions from "./components/cargo-sorting";

export default function CargoPage() {
  const [filteredCargos, setFilteredCargos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cargosPerPage = 15;
  const [originalCargos, setOriginalCargos] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const storedCargos = JSON.parse(localStorage.getItem("cargos")) || [];
    setOriginalCargos(storedCargos.map(addSubsCount));
    setFilteredCargos(storedCargos.map(addSubsCount));
  }, []);

  useEffect(() => {
    setFilteredCargos(originalCargos);
  }, [originalCargos]);

  const addSubsCount = (cargo) => {
    const cargoSubs =
      JSON.parse(localStorage.getItem(`subs_${cargo.id}`)) || [];
    cargo.subs = cargoSubs.length;
    return cargo;
  };

  const filterCargos = (filterValue) => {
    if (filterValue === "") {
      setFilteredCargos(originalCargos);
      setCurrentPage(1);
    } else {
      const lowerCaseFilterValue = filterValue.toLowerCase();
      const filtered = originalCargos.filter((cargo) => {
        return (
          cargo.name.toLowerCase().includes(lowerCaseFilterValue) ||
          cargo.code.toLowerCase().includes(lowerCaseFilterValue) ||
          (cargo.location &&
            cargo.location.toLowerCase().includes(lowerCaseFilterValue))
        );
      });

      setFilteredCargos(filtered);
      setCurrentPage(1);
    }
  };

  const indexOfLastCargo = currentPage * cargosPerPage;
  const indexOfFirstCargo = indexOfLastCargo - cargosPerPage;
  const currentCargos = filteredCargos.slice(
    indexOfFirstCargo,
    indexOfLastCargo
  );
  const totalPages = Math.ceil(filteredCargos.length / cargosPerPage);

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

  const sortCargos = (option) => {
    let sortedCargos = [...filteredCargos];

    switch (option) {
      case "name":
        sortedCargos.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "code":
        sortedCargos.sort((a, b) => a.code.localeCompare(b.code));
        break;
      case "branch":
        sortedCargos.sort((a, b) => a.branch.localeCompare(b.branch));
        break;
      case "location":
        sortedCargos.sort((a, b) => a.location.localeCompare(b.location));
        break;
      default:
        // No sorting
        break;
    }

    setFilteredCargos(sortedCargos);
  };

  const handleSortChange = (sortValue) => {
    setSortOption(sortValue);
    sortCargos(sortValue);
  };

  const handleCargoCreated = (newCargo) => {
    newCargo.id = uuidv4();
    newCargo.subs = 0;

    const updatedCargos = [...filteredCargos, newCargo];
    setFilteredCargos(updatedCargos);
    setOriginalCargos(updatedCargos);
    localStorage.setItem("cargos", JSON.stringify(updatedCargos));
  };

  const handleUpdateCargo = (updatedCargo) => {
    const cargoIndex = filteredCargos.findIndex(
      (cargo) => cargo.id === updatedCargo.id
    );

    if (cargoIndex !== -1) {
      const updatedCargos = [...filteredCargos];
      updatedCargos[cargoIndex] = updatedCargo;
      setFilteredCargos(updatedCargos);
      setOriginalCargos(updatedCargos);
      localStorage.setItem("cargos", JSON.stringify(updatedCargos));
    }
  };

  const handleDeleteCargo = (cargo) => {
    const updatedCargos = filteredCargos.filter((q) => q.id !== cargo.id);
    setFilteredCargos(updatedCargos);
    setOriginalCargos(updatedCargos);
    localStorage.setItem("cargos", JSON.stringify(updatedCargos));
  };

  return (
    <div className="">
      <Heading
        title="Cargo Logistics"
        description=" Streamlining Cargo Movement."
        icon={Combine}
        iconColor="text-sky-400"
      />
      <div className="px-1 flex flex-col md:flex-row mt-8 mb-2 justify-start items-center ">
        <div className="flex-1 mb-4 ">
          <Filters onFilterChange={filterCargos} />
        </div>
        <div className="mb-4 mr-0 ml-2">
          <SortOptions
            sortOption={sortOption}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="mb-4">
          <NewCargo
            cargos={filteredCargos}
            onCargoCreated={handleCargoCreated}
          />
        </div>
      </div>

 
            
      <div className=" px-4 md:px-12 lg:px-16 space-y-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {currentCargos.map((cargo, index) => (
          <Card
            key={index}
            className="p-4 border-black/5 flex flex-col mt-4 shadow-md hover:shadow-xl transition  "
          >
         
         <Link href={`/cargos/${cargo.id}`} key={index} legacyBehavior>

<div className="  flex items-center justify-center mb-4 cursor-pointer ">
   <div className="w-full  ">
 
   <div 
                  className="flex text-lg  mb-2 bg-gray-100 shadow-lg p-2 items-center justify-center rounded-t-2xl font-semibold">
                  {/* <div className="text-left text-sm ">Name:</div> */}
       <div className="flex  ">
         {cargo.name || "..........."}
       </div>
     </div>
     <div className="flex justify-between mb-2 shadow-md p-2">
       <div className="text-left text-sm">
         code:
       </div>
       <div className="text-right ">
         {cargo.code || "..........."}
       </div>
     </div>
     <div className="flex justify-between shadow-md p-2">
       <div className="text-left text-sm">Number of Sub:</div>
       <div className="text-right ">
         {cargo.subs || "..........."}
       </div>
     </div>

  
   </div>
 </div>
 </Link>

            <div className="flex justify-center px-1">
              <UpdateCargo cargo={cargo} onUpdateCargo={handleUpdateCargo} />
              {/* <DeleteCargo
                cargo={cargo}
                onDeleteCargo={() => handleDeleteCargo(cargo)}
              /> */}
            </div>
          </Card>
        ))}
      </div>

      <Pagination
        currentUsers={currentCargos}
        currentPage={currentPage}
        totalPages={totalPages}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
      />
    </div>
  );
}
