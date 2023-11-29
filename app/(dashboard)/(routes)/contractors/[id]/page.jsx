"use client";

import React, { useState, useEffect } from "react";
import { Heading } from "@/components/heading";
import { Truck, TruckIcon, UserCheck, UserCheck2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import TrucksData from "../components/trucks-data";
import DriversData from "../components/Drivers-data";
import Pagination from "@/components/pagination";

import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import UpdateContractor from "../components/contractor-update-modal";

const ContractorPage = ({ params }) => {
  const [contractor, setContractor] = useState(null);
  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [showTrucks, setShowTrucks] = useState(true);

  const [filterValue, setFilterValue] = useState(""); // Add this state

  const [filteredContractors, setFilteredContractors] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const contractorsPerPage = 15;

  const id = params.id;

  useEffect(() => {
    const contractors = JSON.parse(localStorage.getItem("contractors")) || [];
    const foundContractor = contractors.find((c) => c.id === id);

    if (foundContractor) {
      setContractor(foundContractor);
    }

    // Retrieve trucks associated with the current contractor from local storage
    const contractorTrucks =
      JSON.parse(localStorage.getItem(`trucks_${id}`)) || [];
    setTrucks(contractorTrucks);

    // Retrieve drivers associated with the current contractor from local storage
    const contractorDrivers =
      JSON.parse(localStorage.getItem(`drivers_${id}`)) || [];
    setDrivers(contractorDrivers);
  }, [id]);

  // Calculate the number of drivers and trucks based on the data
  const numTrucks = trucks.length;
  const numDrivers = drivers.length;

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

  const handleTruckCreated = (newTruck) => {
    newTruck.id = uuidv4();
    const updatedTrucks = [...trucks, newTruck];
    setTrucks(updatedTrucks);
    localStorage.setItem(`trucks_${id}`, JSON.stringify(updatedTrucks));

    const updatedContractor = {
      ...contractor,
      trucks: contractor.trucks + 1,
    };
    setContractor(updatedContractor);
    localStorage.setItem(`contractor${id}`, JSON.stringify(updatedContractor));
  };

  const handleUpdateTruck = (updatedTruck) => {
    const truckIndex = trucks.findIndex(
      (truck) => truck.id === updatedTruck.id
    );

    if (truckIndex !== -1) {
      const updatedTrucks = [...trucks];
      updatedTrucks[truckIndex] = updatedTruck;
      setTrucks(updatedTrucks);
      localStorage.setItem(`trucks_${id}`, JSON.stringify(updatedTrucks));
    }
  };

  const handleDeleteTruck = (truck) => {
    const updatedTrucks = trucks.filter((t) => t.id !== truck.id);
    setTrucks(updatedTrucks);
    localStorage.setItem(`trucks_${id}`, JSON.stringify(updatedTrucks));
  };

  const handleDriverCreated = (newDriver) => {
    newDriver.id = uuidv4();
    const updatedDrivers = [...drivers, newDriver];
    setDrivers(updatedDrivers);
    localStorage.setItem(`drivers_${id}`, JSON.stringify(updatedDrivers));
  };

  const handleUpdateDriver = (updatedDriver) => {
    const driverIndex = drivers.findIndex(
      (driver) => driver.id === updatedDriver.id
    );

    if (driverIndex !== -1) {
      const updatedDrivers = [...drivers];
      updatedDrivers[driverIndex] = updatedDriver;
      setDrivers(updatedDrivers);
      localStorage.setItem(`drivers_${id}`, JSON.stringify(updatedDrivers));
    }
  };

  const handleDeleteDriver = (driver) => {
    const updatedDrivers = drivers.filter((d) => d.id !== driver.id);
    setDrivers(updatedDrivers);
    localStorage.setItem(`drivers_${id}`, JSON.stringify(updatedDrivers));
  };

  const handleUpdateContractor = (updatedContractor) => {
    setContractor(updatedContractor);

    const contractorIndex = filteredContractors.findIndex(
      (contractor) => contractor.id === updatedContractor.id
    );

    if (contractorIndex !== -1) {
      const updatedContractors = [...filteredContractors];
      updatedContractors[contractorIndex] = updatedContractor;
      setFilteredContractors(updatedContractors);
      localStorage.setItem("Contractors", JSON.stringify(updatedContractors));
    }
  };

  return (
    <div>
      <Link href="/contractors">
        <Heading
          title="Contractor Management"
          description="Managing Your Contractor Network."
          icon={Truck}
          iconColor="text-sky-400"
        />
      </Link>

      <div className="px-4 md:px-12 lg:px-32 space-y-4 grid  xl:grid-cols-2 gap-4">
        <Card className="p-4 border-black/5 flex flex-col mt-4 shadow-md hover:shadow-xl transition rounded-2xl">
          <div className="  flex items-center justify-center mb-4  ">
            <div className="w-full  ">
              <div className="flex text-lg  mb-2 bg-gray-100 shadow-lg p-2 items-center justify-center rounded-t-2xl font-semibold">
                {/* <div className="text-left text-sm ">Name:</div> */}
                <div className="flex  ">{contractor && contractor.name}</div>
              </div>
              <div className="flex justify-between mb-2 shadow-md p-2">
                <div className="text-left text-lg">Code: </div>
                <div className="text-right ">
                  {contractor && contractor.code}
                </div>
              </div>
              {/* <div className="flex justify-between shadow-md p-2">
                <div className="text-left text-lg">Gross Tonnage:</div>
                <div className="text-right ">{numTrucks || "..........."}</div>
              </div>
              <div className="flex justify-between shadow-md p-2">
                <div className="text-left text-lg">numDrivers:</div>
                <div className="text-right ">{numDrivers || "..........."}</div>
              </div> */}

              <div className="flex justify-between gap-8 mt-4 mr-4 pl-4  shadow-md p-2 ">
                <div className="text-md flex justify-center items-center  ">
                  <TruckIcon className="mr-2 text-sky-500  " />
                  <span className="font-bold">{numTrucks} Trucks</span>
                </div>
                <div className="text-md flex justify-center items-center">
                  <UserCheck2 className="mr-2 text-sky-500" />
                  <span className="font-bold">{numDrivers} Drivers</span>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col items-center justify-end mb-4 p-2 shadow-md rounded-full ">
            <div className="text-center font-semibold text-xl">
              {contractor && contractor.name}
            </div>
            <div className="text-center text-md font-light">
              Code: {contractor && contractor.name}
            </div>
          </div>

          <div className="flex justify-between mb-3">
            <div className="text-md flex justify-center items-center">
              <TruckIcon className="mr-2 text-sky-500  " />
              <span className="font-bold">{numTrucks} Trucks</span>
            </div>
            <div className="text-md flex justify-center items-center">
              <UserCheck2 className="mr-2 text-sky-500" />
              <span className="font-bold">{numDrivers} Drivers</span>
            </div>
          </div> */}
          <div className="flex justify-center ">
            <UpdateContractor
              contractor={contractor}
              onUpdateContractor={handleUpdateContractor}
            />{" "}
          </div>
        </Card>
      </div>

      <div className="px-4 md:px-20 flex items-center justify-center ">
        <button
          className={`py-2 px-4 ml-4 mr-4  mb-2 rounded-md  shadow-lg flex items-center justify-center ${
            showTrucks
              ? "bg-sky-400 text-black hover:scale-110"
              : "text-white/10 bg-white hover:bg-sky-400 hover:scale-110 hover:shadow-lg"
          } transition duration-300`}
          onClick={() => {
            setShowTrucks(true);
          }}
        >
          <TruckIcon /> Trucks
        </button>
        <button
          className={`py-2 px-4  mb-2 rounded-md  shadow-lg flex items-center justify-center ${
            !showTrucks
              ? "bg-sky-400 text-black hover:scale-110"
              : "text-white/10 bg-white hover:bg-sky-400 hover:scale-110 hover:shadow-lg"
          } transition duration-300`}
          onClick={() => {
            setShowTrucks(false);
          }}
        >
          <UserCheck2 /> Drivers
        </button>
      </div>

      <div className="px-4">
        {showTrucks && (
          <TrucksData
            trucks={trucks}
            onTruckCreated={handleTruckCreated}
            onUpdateTruck={handleUpdateTruck}
            onDeleteTruck={handleDeleteTruck}
          />
        )}
        {!showTrucks && (
          <DriversData
            drivers={drivers}
            onDriverCreated={handleDriverCreated}
            onUpdateDriver={handleUpdateDriver}
            onDeleteDriver={handleDeleteDriver}
          />
        )}
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
};

export default ContractorPage;
