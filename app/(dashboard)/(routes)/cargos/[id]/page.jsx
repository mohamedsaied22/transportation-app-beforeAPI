"use client";

import React, { useState, useEffect } from "react";
import { Heading } from "@/components/heading";
import { Combine } from "lucide-react";
import { Card } from "@/components/ui/card";

import { v4 as uuidv4 } from "uuid";
import SubCargoData from "../components/subcargo-data";
import Link from "next/link";
import UpdateCargo from "../components/cargo-update";

const SubCargoPage = ({ params }) => {
  const [cargo, setCargo] = useState(null);
  const [filteredCargos, setFilteredCargos] = useState([]);
  const [filteredSubs, setFilteredSubs] = useState([]);

  const [subs, setSubs] = useState([]);

  const id = params.id;

  useEffect(() => {
    const cargos = JSON.parse(localStorage.getItem("cargos")) || [];
    const foundCargo = cargos.find((c) => c.id === id);

    if (foundCargo) {
      setCargo(foundCargo);

      // Initialize cargo.subs with the value from local storage
      const cargoSubs = JSON.parse(localStorage.getItem(`subs_${id}`)) || [];
      foundCargo.subs = cargoSubs.length;

      setFilteredCargos(cargos);
    }

    // Retrieve Subs associated with the current Cargo from local storage
    const cargoSubs = JSON.parse(localStorage.getItem(`subs_${id}`)) || [];
    setSubs(cargoSubs);
    setFilteredSubs(cargoSubs);

    // Retrieve drivers associated with the current Cargo from local storage
  }, [id]);

  if (!cargo) {
    return <div>loading.</div>;
  }

  const handleUpdateCargo = (updatedCargo) => {
    setCargo(updatedCargo);

    const cargoIndex = filteredCargos.findIndex(
      (cargo) => cargo.id === updatedCargo.id
    );

    if (cargoIndex !== -1) {
      const updatedCargos = [...filteredCargos];
      updatedCargos[cargoIndex] = updatedCargo;
      setFilteredCargos(updatedCargos);
      localStorage.setItem("Cargos", JSON.stringify(updatedCargos));
    }
  };
  const handleSubCreated = (newSub) => {
    newSub.id = uuidv4();
    const updatedSubs = [...subs, newSub];
    setSubs(updatedSubs);
    localStorage.setItem(`subs_${id}`, JSON.stringify(updatedSubs));

    // Update the count of Subs for the Cargo
    const updatedCargo = {
      ...cargo,
      subs: cargo.subs + 1,
    };
    setCargo(updatedCargo);
    localStorage.setItem(`cargo_${id}`, JSON.stringify(updatedCargo));
  };

  const handleUpdateSub = (updatedSub) => {
    const subIndex = subs.findIndex((sub) => sub.id === updatedSub.id);

    if (subIndex !== -1) {
      const updatedSubs = [...subs];
      updatedSubs[subIndex] = updatedSub;
      setSubs(updatedSubs);

      const filteredSubsIndex = filteredSubs.findIndex(
        (sub) => sub.id === updatedSub.id
      );
      if (filteredSubsIndex !== -1) {
        const updatedFilteredSubs = [...filteredSubs];
        updatedFilteredSubs[filteredSubsIndex] = updatedSub;
        setFilteredSubs(updatedFilteredSubs);
        localStorage.setItem(`subs_${id}`, JSON.stringify(updatedSubs));
      }
    }
  };

  const handleDeleteSub = (sub) => {
    // Filter out the sub to delete from both filteredSubs and Subs
    const updatedFilteredSubs = filteredSubs.filter((t) => t.code !== sub.code);
    const updatedSubs = subs.filter((t) => t.code !== sub.code);

    // Update the states
    setFilteredSubs(updatedFilteredSubs);
    setSubs(updatedSubs);
    localStorage.setItem(`subs_${id}`, JSON.stringify(updatedSubs));

    // Update the count of Subs for the Cargo
    const updatedCargo = {
      ...cargo,
      subs: cargo.subs - 1,
    };
    setCargo(updatedCargo);
    localStorage.setItem(`cargo_${id}`, JSON.stringify(updatedCargo));
  };

  return (
    <div>
      <Link href="/cargos">
        <Heading
          title="Cargo Logistics"
          description=" Streamlining Cargo Movement."
          icon={Combine}
          iconColor="text-sky-400"
        />
      </Link>

      <div className="px-4 md:px-12 lg:px-32 space-y-4 grid  xl:grid-cols-2 gap-4">
        <Card className="p-4 border-black/5 flex flex-col mt-4 shadow-md hover:shadow-xl transition rounded-2xl ">
          <div className="  flex items-center justify-center mb-4  ">
            <div className="w-full  ">
              <div className="flex text-2xl mb-2 shadow-md p-2 items-center justify-center rounded-2xl font-semibold">
                {/* <div className="text-left text-sm ">Name:</div> */}
                <div className="flex  ">{cargo.name || "..........."}</div>
              </div>
              <div className="flex justify-between mb-2 shadow-md p-2">
                <div className="text-left text-lg">code:</div>
                <div className="text-right ">{cargo.code || "..........."}</div>
              </div>
              <div className="flex justify-between shadow-md p-2">
                <div className="text-left text-lg">Number of Sub:</div>
                <div className="text-right ">{cargo.subs || "..........."}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-2">
            <UpdateCargo cargo={cargo} onUpdateCargo={handleUpdateCargo} />{" "}
          </div>
        </Card>
      </div>

      <div className="  ">
        <SubCargoData
          subs={subs}
          onSubCreated={handleSubCreated}
          onUpdateSub={handleUpdateSub}
          onDeleteSub={handleDeleteSub}
        />
      </div>
    </div>
  );
};

export default SubCargoPage;
