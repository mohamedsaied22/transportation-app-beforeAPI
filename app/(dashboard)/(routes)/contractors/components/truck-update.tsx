import { BadgePlus, Edit } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { motion } from "framer-motion"; // Import motio

const UpdateTruck = ({ truck, onUpdateTruck }) => {
  const [isUpdateTruckModalOpen, setIsUpdateTruckModalOpen] = useState(false);
  const [updateTruck, setUpdateTruck] = useState({
    code: "",
    license: "",
    type: "",
    status: "",
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

    if (isUpdateTruckModalOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUpdateTruckModalOpen]);

  useEffect(() => {
    setUpdateTruck(truck);
  }, [truck]);

  const openModal = () => {
    setIsUpdateTruckModalOpen(true);
    setIsButtonClicked(true);
  };

  const closeModal = () => {
    setIsUpdateTruckModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateTruck((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedTruckWithId = { ...updateTruck, id: truck.id };
    onUpdateTruck(updatedTruckWithId); // Call the onUpdateTruck function with the updated truck
    closeModal();

    toast.success("Truck updated successfully!", {
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
      {isUpdateTruckModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-70"
        >
          <motion.div
            initial={{ opacity: 0, x: "-100%" }} // Initial position from left
            animate={{ opacity: 1, x: 0 }} // Animate to the center
            exit={{ opacity: 0, y: "-100%" }} // Exit to the left
            transition={{ duration: 0.05, ease: "easeInOut" }} // Custom transition
            id="modal"
            ref={modalRef}
            className="bg-white p-4 rounded-2xl grid transition duration-500"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-4 drop-shadow-md">
                New Truck
              </h2>
              <BadgePlus className="shadow-xl text-sky-400" />
            </div>
            <form onSubmit={handleSubmit} className="">
              <div className="grid ">
                <span className=" text-sm drop-shadow-lg mb-1 text-sky-500 mr-2">
                  Truck code
                </span>
                <input
                  className="px-2 py-1 border border-gray-300 rounded-lg mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="text"
                  name="code"
                  value={updateTruck.code}
                  onChange={handleInputChange}
                  placeholder="truck code"
                  required
                />
              </div>

              <div className="grid">
                <span className="text-sm drop-shadow-lg mb-1 text-sky-500 mr-2">
                  Truck license
                </span>
                <input
                  className="px-2 py-1 border border-gray-300 rounded-lg mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="type"
                  name="license"
                  value={updateTruck.license}
                  onChange={handleInputChange}
                  placeholder="Truck license"
                  required
                />
              </div>
              <div className="grid">
                <span className="text-sm drop-shadow-lg mb-1 text-sky-500">
                  Truck type
                </span>

                <select
                  className="px-2 py-1 border border-gray-300 rounded-lg mb-2 text-muted-foreground shadow-md focus:scale-105 outline-none"
                  name="type"
                  value={updateTruck.type}
                  onChange={handleInputChange}
                >
                  <option value="">type</option>
                  <option value="كباش">كباش</option>
                  <option value="قلاب">قلاب</option>
                </select>
              </div>
              <div className="grid">
                <span className="text-sm drop-shadow-lg mb-1 text-sky-500">
                  Truck Status
                </span>
                <select
                  className=" cursor-no-drop px-2 py-1 border border-gray-300 rounded-lg mb-2 text-muted-foreground shadow-md focus:scale-105 outline-none"
                  name="status"
                  value={updateTruck.status}
                  onChange={handleInputChange}
                >
                  <option value="available">available</option>
                  <option
                    disabled
                    value="not available"
                    style={{
                      backgroundColor: "lightgray",
                      cursor: "no-drop",
                    }}
                  >
                    not available
                  </option>
                  <option
                    disabled
                    value="maintenance"
                    style={{
                      backgroundColor: "lightgray",
                      cursor: "no-drop",
                    }}
                  >
                    maintenance
                  </option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  className={`px-4 py-1 bg-sky-400 text-white rounded-lg mr-2 shadow-md ${
                    isButtonClicked
                      ? "hover:bg-sky-500 hover:scale-95"
                      : "hover:scale-95"
                  }`}
                  type="submit"
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
            </form>
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
          <Edit className="w-4 ml-2" />
        </div>
      </button>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default UpdateTruck;
