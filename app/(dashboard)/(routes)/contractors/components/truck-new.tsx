import { BadgePlus } from "lucide-react";

import { useState, useEffect, useRef } from "react";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { motion } from "framer-motion";

const NewTruck = ({ trucks, onTruckCreated }) => {
  const [isNewTruckModalOpen, setIsNewTruckModalOpen] = useState(false);
  const [newTruck, setNewTruck] = useState({
    code: "",
    license: "",
    type: "",
    status: "",
  });
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalRef = document.getElementById("modal");

      if (modalRef && !modalRef.contains(event.target)) {
        closeModal();
      }
    };

    if (isNewTruckModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNewTruckModalOpen]);

  const openModal = () => {
    setIsNewTruckModalOpen(true);
    setIsButtonClicked(true);
  };

  const closeModal = () => {
    setNewTruck({
      code: "",
      license: "",
      type: "",
      status: "",
    });
    setIsNewTruckModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTruck((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevent form submission

    const existingTruck = trucks.find((truck) => truck.code === newTruck.code);
    if (existingTruck) {
      toast.error("The Truck already exists.", {
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

      // Truck already exists, handle it
    } else {
      closeModal();
      onTruckCreated(newTruck);


         // Show a success toast when a new cargo is created
         toast.success("New Truck created successfully!", {
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

    }
  };

  useEffect(() => {
    // Save data to local storage whenever trucks is updated
    localStorage.setItem("trucks", JSON.stringify(trucks));
  }, [trucks]);

  return (
    <div>

      {isNewTruckModalOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-70">
          <motion.div

initial={{ scale: 0, x: 0 }} // Initial position from left
animate={{ scale: 1, x: 0 }} // Animate to the center
exit={{ scale: 0, x: 0 }} // Exit to the left
transition={{ duration: .05, ease: 'easeInOut' }} // Custom transition

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
                  value={newTruck.code}
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
                  value={newTruck.license}
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
                  value={newTruck.type}
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
                  value={newTruck.status}
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
        className={`lg:mr-16 px-2 py-1 bg-sky-400 text-white rounded-lg shadow-md ${
          isButtonClicked
            ? "hover:bg-sky-400"
            : "hover:scale-[95%] hover:bg-sky-500"
        } transition`}
        onClick={openModal}
      >
        New Truck
        <span className="text-xl"> +</span>

      </button>
      <ToastContainer autoClose={3000} />

    </div>
  );
};

export default NewTruck;
