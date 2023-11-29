import { BadgePlus } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { motion } from "framer-motion";

const NewDriver = ({ drivers, onDriverCreated }) => {
  const [isNewDriverModalOpen, setIsNewDriverModalOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: "",
    nationalId: "",
    license: "",
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

    if (isNewDriverModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNewDriverModalOpen]);

  const openModal = () => {
    setIsNewDriverModalOpen(true);
    setIsButtonClicked(true);
  };

  const closeModal = () => {
    setNewDriver({
      name: "",
      nationalId: "",
      license: "",
      status: "",

    });
    setIsNewDriverModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDriver((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingDriver = drivers.find((driver) => driver.nationalId === newDriver.nationalId);
    if (existingDriver) {
      toast.error("The Driver already exists.", {
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
      // Driver already exists, handle it
    } else {
      closeModal();
      onDriverCreated(newDriver);
         // Show a success toast when a new cargo is created
         toast.success("New Driver created successfully!", {
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
    localStorage.setItem("drivers", JSON.stringify(drivers));
  }, [drivers]);

  return (
    <div>
      {isNewDriverModalOpen && (
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
                New Driver
              </h2>
              <BadgePlus className="shadow-xl text-sky-400" />
            </div>
            <form onSubmit={handleSubmit} className="">
              <div className="grid ">
                <span className=" text-sm drop-shadow-lg mb-1 text-sky-500 mr-2">
                  Driver Name
                </span>
                <input
                  className="px-2 py-1 border border-gray-300 rounded-lg mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="text"
                  name="name"
                  value={newDriver.name}
                  onChange={handleInputChange}
                  placeholder="Driver Name"
                  required
                />
              </div>

              <div className="grid">
                <span className="text-sm drop-shadow-lg mb-1 text-sky-500 mr-2">
                  Driver National ID
                </span>
                <input
                  className="px-2 py-1 border border-gray-300 rounded-lg mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="text"
                  name="nationalId"
                  value={newDriver.nationalId}
                  onChange={handleInputChange}
                  placeholder="Driver National ID"
                  required
                />
              </div>
              <div className="grid">
                <span className="text-sm drop-shadow-lg mb-1 text-sky-500">
                  Driver License
                </span>

                <input
                  className="px-2 py-1 border border-gray-300 rounded-lg mb-2 text-muted-foreground shadow-md focus:scale-105 outline-none"
                  type="text"
                  name="license"
                  value={newDriver.license}
                  onChange={handleInputChange}
                  placeholder="Driver License"
                  required
                />
              </div>
              {/* <div className="grid">
                <span className="text-sm drop-shadow-lg mb-1 text-sky-500">
                  Driver Status
                </span>
                <select
                  className=" cursor-no-drop px-2 py-1 border border-gray-300 rounded-lg mb-2 text-muted-foreground shadow-md focus:scale-105 outline-none"
                  name="status"
                  value={newDriver.status}
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
                    value="maintenance"
                    style={{
                      backgroundColor: "lightgray",
                      cursor: "no-drop",
                    }}
                  >
                    maintenance
                  </option>
                </select>
              </div> */}

{/* <div className="grid">
  <span className="text-sm drop-shadow-lg mb-1 text-sky-500">
    Driver Status
  </span>
  <select
    className="px-2 py-1 border border-gray-300 rounded-lg mb-2 text-muted-foreground shadow-md focus:scale-105 outline-none"
    name="status"
    value={newDriver.status}
    onChange={handleInputChange}
  >
    <option value="available">Available</option>
    <option value="not available">Not Available</option>
    <option value="maintenance">Maintenance</option>
  </select>
</div> */}

          

<div className="grid">
                <span className="text-sm drop-shadow-lg mb-1 text-sky-500">
                Driver Status
                </span>
                <select
                  className=" cursor-no-drop px-2 py-1 border border-gray-300 rounded-lg mb-2 text-muted-foreground shadow-md focus:scale-105 outline-none"
                  name="status"
                  value={newDriver.status}
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
        New Driver
        <span className="text-xl"> +</span>
      </button>
      <ToastContainer autoClose={3000} />

    </div>
  );
};

export default NewDriver;