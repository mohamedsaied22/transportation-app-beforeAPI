import { BadgePlus, Edit } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { motion } from "framer-motion";

const UpdateTruck = ({ truck, onUpdateTruck }) => {
  const [isUpdateTruckModalOpen, setIsUpdateTruckModalOpen] =
    useState(false);
  const [updateTruck, setUpdatedTruck] = useState({
    contractor: "",
    truckType: "",
    truckCode: "",
    driverName: "",
    cleanlinessChecked: true,
    // Add other fields as needed...
  });

  useEffect(() => {
    // Set the local state independently when the truck prop changes
    setUpdatedTruck(truck);
  }, [truck]);

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const modalRef = useRef(null);

  const [checked, setChecked] = useState(false);

  const handleCheckboxChanged = () => {
    setChecked(!checked);
  };

  const [truckNumber, setTruckNumber] = useState("");
  const generateNextTruckNumber = () => {
    const lastTruck = truck[truck.length - 1];
    if (lastTruck) {
      const lastTruckNumber = parseInt(
        lastTruck.truckNumber,
        10
      );
      const nextTruckNumber = String(lastTruckNumber + 1).padStart(
        2,
        "0"
      );
      return nextTruckNumber;
    } else {
      return "01"; // Initial truck number
    }
  };

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

  // useEffect(() => {
  //   setUpdateTruck(truck);
  // }, [truck]);

  const openModal = () => {
    // Check if the truck status is "Closed"
    if (truck.status === "Closed") {
      // Display a message or perform actions for a closed truck
      toast.warning("Cannot update a closed truck!", {
        position: toast.POSITION.TOP_RIGHT,
        // Other toast configuration options
        style: {
          background: "#8acaff", // Background color
          color: "#ffffff", // Text color
          // boxShadow: "0 0 -1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)", // Box shadow
          borderRadius: "12px 0  12px 0",
          width: "96%",
          fontSize: "bold",
        },
      });
    } else {
      setIsUpdateTruckModalOpen(true);
      setIsButtonClicked(true);

      setTruckNumber(truck.truckNumber);

      // Set the current day and time as "Opened At"
      const currentDateTime = new Date();
      const formattedDateTime = `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`;
      setUpdatedTruck((prevState) => ({
        ...prevState,
        openedAt: formattedDateTime,
      }));
    }
  };

  const closeModal = () => {
    setIsUpdateTruckModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTruck((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTruckWithId = {
      ...updateTruck,
      id: truck.id,
    };
    onUpdateTruck(updatedTruckWithId);
    closeModal();

    // Show a success toast when an updated truck is created
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
          className="fixed  z-50 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-70"
        >
          {" "}
          <motion.div
            id="modal"
            ref={modalRef}
            className=" bg-gradient-to-t from-gray-900 via-sky-900 to-sky-700 p-6 rounded-t-3xl grid border border-sky-700 shadow-md transition duration-500"
            initial={{ scale: 0, x: "-0%" }} // Initial position from left
            animate={{ scale: 1, x: 0 }} // Animate to the center
            exit={{ scale: 0, y: "0%" }} // Exit to the left
            transition={{ duration: 0.05, ease: "easeInOut" }} // Custom transition
          >
            <div className="flex justify-center mb-8 shadow-xl bg-gradient-to-b from-sky-400 via-sky-700 to-sky-900 px-6 py-3 rounded-t-3xl">
              <h2 className="text-xl text-white drop-shadow-lg font-semibold mr-6 ">
                Update Truck Driver
              </h2>
              <Edit className="text-sky-400" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-4 shadow-md px-2">
                <label
                  htmlFor="contractor"
                  className="text-sm font-semibold mb-1 text-white mr-2"
                >
                  Contractor
                </label>
                <select
                  className="px-2 py-1 border rounded-lg mb-2"
                  name="contractor"
                  id="contractor"
                  value={updateTruck.contractor}
                  onChange={handleInputChange}
                  style={{ width: "235px" }} // Set a fixed width (adjust as needed)
                  required
                >
                  {/* Populate with options */}
                  <option value="">Select Contractor</option>
                  <option value="contractor1">Contractor 1</option>
                  <option value="contractor2">Contractor 2</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="flex justify-between items-center mb-4 shadow-md px-2">
                <label
                  htmlFor="truckType"
                  className="text-sm font-semibold mb-1 text-white mr-2"
                >
                  Truck Type
                </label>
                <select
                  className="px-2 py-1 border rounded-lg mb-2"
                  name="truckType"
                  id="truckType"
                  value={updateTruck.truckType}
                  onChange={handleInputChange}
                  style={{ width: "235px" }} // Set a fixed width (adjust as needed)
                >
                  {/* Populate with options */}
                  <option value="">Select Truck Type</option>
                  <option value="truckType1">truckType1</option>
                  <option value="truckType2">truckType2</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="flex justify-between items-center mb-4 shadow-md px-2">
                <label
                  htmlFor="truckCode"
                  className="text-sm font-semibold mb-1 text-white mr-2"
                >
                  Truck Code
                </label>
                <select
                  className="px-2 py-1 border rounded-lg mb-2"
                  name="truckCode"
                  id="truckCode"
                  value={updateTruck.truckCode}
                  onChange={handleInputChange}
                  style={{ width: "235px" }} // Set a fixed width (adjust as needed)
                  required
                >
                  {/* Populate with options */}
                  <option value="">Select Truck Code</option>
                  <option value="101">101</option>
                  <option value="102">102</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="flex justify-between items-center mb-4 shadow-md px-2">
                <label
                  htmlFor="driverName"
                  className="text-sm font-semibold mb-1 text-white mr-2"
                >
                  Driver Name 
                </label>
                <select
                  className="px-2 py-1 border rounded-lg mb-2"
                  name="driverName"
                  id="driverName"
                  value={updateTruck.driverName}
                  onChange={handleInputChange}
                  style={{ width: "235px" }} // Set a fixed width (adjust as needed)
                >
                  {/* Populate with options */}
                  <option value="">Select Driver Name</option>
                  <option value="driver1">Driver 1</option>
                  <option value="driver2">Driver 2</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="flex justify-center mb-4">
                <label
                  className="mb-1 text-sky-200 cursor-pointer"
                  htmlFor="cleanlinessCheckbox"
                >
                  Cleanliness Checked
                </label>
                <input
                  id="cleanlinessCheckbox"
                  className={`ml-2 cursor-pointer ${
                    checked ? "rotate checked" : ""
                  }`}
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheckboxChanged}
                />
              </div>

              <div className="flex justify-end">
                <button
                  className={`px-4 py-1 ${
                    checked
                      ? "bg-sky-400 transition-all duration-300"
                      : "bg-gray-600"
                  } text-black rounded-lg mr-2`}
                  type="submit"
                  disabled={!checked}
                  style={{
                    cursor: checked ? "pointer" : "not-allowed",
                  }}

                >
                  Save
                </button>

                <button
                  className="px-2 py-1 bg-gray-300 rounded-lg"
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
        className={` px-2 py-1 bg-sky-400 text-white rounded-lg shadow-md ${
          isButtonClicked
            ? "hover:bg-sky-400"
            : "hover:scale-[95%] hover:bg-sky-500"
        } transition`}
        onClick={openModal}
      >
        Update
        <span className="text-xl"> +</span>
      </button>{" "}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default UpdateTruck;
