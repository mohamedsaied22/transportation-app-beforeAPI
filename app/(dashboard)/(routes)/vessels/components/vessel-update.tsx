import { Edit } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { motion } from 'framer-motion';


const UpdateVessel = ({ vessel, onUpdateVessel }) => {
  const [isUpdateVesselModalOpen, setIsUpdateVesselModalOpen] =
    useState(false);
  const [updateVessel, setUpdateVessel] = useState({
    name: "",
    IMO: "",
    grossTonnage: "",
    voyages: "",
  });

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalElement = document.getElementById("modal");
      if (modalElement && !modalElement.contains(event.target)) {
        closeModal();
      }
    };

    if (isUpdateVesselModalOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUpdateVesselModalOpen]);

  useEffect(() => {
    setUpdateVessel(vessel);
  }, [vessel]);

  const openModal = () => {
    setIsUpdateVesselModalOpen(true);
    setIsButtonClicked(true);
  };

  const closeModal = () => {
    setIsUpdateVesselModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateVessel((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedVesselWithId = { ...updateVessel, id: vessel.id };
    onUpdateVessel(updatedVesselWithId);
    closeModal();

   // Show a success toast when a update vessel is created
   toast.success("Vessel updated successfully!", {
    position: toast.POSITION.TOP_RIGHT,
    style: {
      background: "#8acaff", // Background color
      color: "#ffffff", // Text color
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)", // Box shadow
      borderRadius: "12px 0  12px 0",
      width: "96%",
      fontSize: "bold",
    },
  });
    
  };
  
  

  return (
    <div>
      {isUpdateVesselModalOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed  z-50 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-70">
          <motion.div
            id="modal"
            ref={modalRef}
            className="bg-white p-4 rounded-2xl grid transition duration-500"
 
            initial={{ opacity: 0, x: '-100%' }} // Initial position from left
            animate={{ opacity: 1, x: 0 }} // Animate to the center
            exit={{ opacity: 0, x: '-100%' }} // Exit to the left
            transition={{ duration: .005, ease: 'easeInOut' }} // Custom transition
        
      >
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-4 drop-shadow-md">
                Update Vessel
              </h2>
              <Edit className="shadow-xl text-sky-400" />
            </div>
            <div>
              <div className="grid ">
                <span className=" text-sm drop-shadow-lg mb-1 text-sky-500 mr-2">
                  Vessel Name
                </span>
                <input
                  className="px-2 py-1 border border-gray-300 rounded-lg mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="text"
                  name="name"
                  value={updateVessel.name}
                  onChange={handleInputChange}
                  placeholder="name"
                  required
                />
              </div>

              <div className="grid">
                <span className="text-sm drop-shadow-lg mb-1 text-sky-500 mr-2">
                  Vessel IMO
                </span>
                <input
                    disabled
                  className=" cursor-not-allowed bg-gray-200 text-muted-foreground px-2 py-1 border border-gray-300 rounded-lg mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="number"
                  name="IMO"
                  value={updateVessel.IMO}
                  onChange={handleInputChange}
                  placeholder="IMO Number"
                  required
                />
              </div>
              <div className="grid">
                <span className="text-sm drop-shadow-lg mb-1 text-sky-500 mr-2">
                  Gross Tonnage
                </span>
                <input
                  className="px-2 py-1 border border-gray-300 rounded-lg mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="number"
                  name="grossTonnage"
                  value={updateVessel.grossTonnage}
                  onChange={handleInputChange}
                  placeholder="Gross Tonnage"
                />
              </div>

              <div className="grid">
                <span className="text-sm drop-shadow-lg mb-1 text-sky-500 mr-2">
                  Number of Voyages
                </span>
                <input
                disabled
                  className=" cursor-not-allowed bg-gray-200 px-2 py-1 border border-gray-300 rounded-lg mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="number"
                  name="voyages"
                  value={updateVessel.voyages}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
         
            </div>

            <div className="flex justify-end">
              <button
                className={`px-4 py-1 bg-sky-400 text-white rounded-lg mr-2 shadow-md ${
                  isButtonClicked
                    ? "hover:bg-sky-500 hover:scale-95"
                    : "hover:scale-95"
                }`}
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="px-2 py-1 bg-gray-300 rounded-lg shadow-md hover:scale-95"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <button
        className={`px-1 py-1 bg-sky-400 text-white rounded-lg shadow-xl mr-1 ${
          isButtonClicked
            ? "hover:bg-sky-600  "
            : "hover:scale-[95%] hover:bg-sky-500"
        } transition`}
        onClick={openModal}
      >
       <div className="flex p-1">
          update
          <Edit className="w-4 ml-1" />
        </div>
      </button>
      <ToastContainer
      autoClose={3000}
    />

    </div>
  );
};

export default UpdateVessel;