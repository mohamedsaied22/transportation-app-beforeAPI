import { Edit } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { motion } from 'framer-motion'; // Import motion from framer-motion


const UpdateWarehouse = ({ warehouse, onUpdateWarehouse }) => {
  const [isUpdateWarehouseModalOpen, setIsUpdateWarehouseModalOpen] =
    useState(false);
  const [updateWarehouse, setUpdateWarehouse] = useState({
    name: "",
    code: "",
    location: "",
    branch: "",
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

    if (isUpdateWarehouseModalOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUpdateWarehouseModalOpen]);

  useEffect(() => {
    setUpdateWarehouse(warehouse);
  }, [warehouse]);

  const openModal = () => {
    setIsUpdateWarehouseModalOpen(true);
    setIsButtonClicked(true);
  };

  const closeModal = () => {
    setIsUpdateWarehouseModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateWarehouse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedWarehouseWithId = { ...updateWarehouse, id: warehouse.id };
    onUpdateWarehouse(updatedWarehouseWithId);
    closeModal();

    toast.success("Warehouse updated successfully!", {
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
      {isUpdateWarehouseModalOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-70">
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
                Update Warehouse
              </h2>
              <Edit className="shadow-xl text-sky-400" />
            </div>
            <div>
              <div className="grid ">
                <span className=" text-sm drop-shadow-lg mb-1 text-sky-500 mr-2">
                  Warehouse Name
                </span>
                <input
                  className="px-2 py-1 border border-gray-300 rounded-lg mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="text"
                  name="name"
                  value={updateWarehouse.name}
                  onChange={handleInputChange}
                  placeholder="name"
                  required
                />
              </div>

              <div className="grid">
                <span className="text-sm drop-shadow-lg mb-1 text-sky-500 mr-2">
                  Warehouse Code
                </span>
                <input
                    disabled
                  className=" cursor-not-allowed bg-gray-200 text-muted-foreground px-2 py-1 border border-gray-300 rounded-lg mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="number"
                  name="code"
                  value={updateWarehouse.code}
                  onChange={handleInputChange}
                  placeholder="Code"
                  required
                />
              </div>
              <div className="grid">
              <span className="text-sm drop-shadow-lg mb-1 text-sky-500 mr-2">
                Location (Latitude, Longitude)
              </span>
              <input
                className="px-2 py-1 border border-gray-300 rounded-lg mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                type="text"
                name="location"
                value={updateWarehouse.location}
                onChange={handleInputChange}
                placeholder="Latitude, Longitude"
                required
              />
            </div>
              <div className="grid">

              <span className="text-sm drop-shadow-lg mb-1 text-sky-500">
              Branch
            </span>

            <select
              className="px-2 py-1 border border-gray-300 rounded-lg mb-2 text-muted-foreground shadow-md focus:scale-105 outline-none"
              name="branch"
              value={updateWarehouse.branch}
              onChange={handleInputChange}
            >
              <option value="">Branch</option>
              <option value="Damietta">Damietta</option>
              <option value="El-Dekheila">El-Dekheila</option>
              <option value="Abu Qir">Abu Qir</option>
              <option value="El-Adabia">El-Adabia</option>
              <option value="PortSaid">PortSaid</option>
            </select>

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

export default UpdateWarehouse;