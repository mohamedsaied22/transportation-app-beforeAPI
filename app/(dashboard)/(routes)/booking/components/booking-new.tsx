import { BadgePlus } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { motion } from "framer-motion";

const NewBooking = ({ bookings, onBookingCreated }) => {
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    workOrder: "",
    vessel: "",
    cargo: "",
    subCargo: "",
    IMEX: "",
    numberOfTrucks: "",
    openedAt: "",
  });
  const [bookingNumber, setBookingNumber] = useState("");
  const generateNextBookingNumber = () => {
    const lastBooking = bookings[bookings.length - 1];
    if (lastBooking) {
      const lastBookingNumber = parseInt(lastBooking.bookingNumber, 10);
      const nextBookingNumber = String(lastBookingNumber + 1).padStart(2, "0");
      return nextBookingNumber;
    } else {
      return "01"; // Initial booking number
    }
  };

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalRef = document.getElementById("modal");

      if (modalRef && !modalRef.contains(event.target)) {
        closeModal();
      }
    };

    if (isNewBookingModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNewBookingModalOpen]);

  const openModal = () => {
    setIsNewBookingModalOpen(true);
    setIsButtonClicked(true);
  
    // Set the initial booking number when the modal opens
    setBookingNumber(generateNextBookingNumber());
  
    // Set the current day and time as "Opened At"
    const currentDateTime = new Date();
    const formattedDateTime = `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`;
    setNewBooking((prevState) => ({
      ...prevState,
      openedAt: formattedDateTime,
    }));
  };
  
  

  const closeModal = () => {
    setNewBooking({
      workOrder: "",
      vessel: "",
      cargo: "",
      subCargo: "",
      IMEX: "",
      numberOfTrucks: "",
      openedAt: "",
    });
    setIsNewBookingModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    const existingBooking = bookings.find(
      (booking) => booking.workOrder === newBooking.workOrder
    );

    if (existingBooking) {
      // Show an error toast if the booking already exists
      // (unchanged)
      toast.error("work order already exists.", {
        position: toast.POSITION.TOP_RIGHT,
        style: {
          background: "#6acaff", // Background color
          color: "#ffffff", // Text color
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)", // Box shadow
          borderRadius: "12px 0  12px 0",
          width: "96%",
          fontSize: "bold",
        },
      });
    } else {
      closeModal();

      // Include the booking number in the new booking
      const newBookingWithNumber = { ...newBooking, bookingNumber };
      onBookingCreated(newBookingWithNumber);

      // Show a success toast when a new booking is created
      // (unchanged)
      toast.success("New Booking Created successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        style: {
          background: "#8acaff", // Background color
          color: "#ffffff", // Text color
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)", // Box shadow
          borderRadius: "12px 0  12px 0",
          width: "96%",
          fontSize: "bold",
        },
      });
    }
  };

  return (
    <div>
      {isNewBookingModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed  z-50 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-70"
        >
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
                New Booking
              </h2>
              <BadgePlus 
              className="shadow-xl text-lg text-sky-300  font-semibold" />
            </div>
            <form onSubmit={handleSubmit} className="">
              <div className="flex justify-between items-center mb-4 shadow-md px-2">
                <span 
                className="text-sm font-semibold mb-1 text-white mr-2">
                  Booking Number:
                </span>
                <input
                  className=" cursor-not-allowed px-2 py-1 border border-gray-300 rounded-2xl mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="text"
                  name="bookingNumber"
                  value={bookingNumber}
                  onChange={() => {}} // Disable editing
                  placeholder="Booking Number"
                  required
                  disabled
                />
              </div>

              <div className="flex justify-between items-center mb-4 shadow-md px-2 ">
                <span className=" text-sm  font-semibold mb-1 text-white mr-2">
                  Work Order:
                </span>
                <input
                  className="px-2 py-1 border border-gray-300 rounded-2xl mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="text"
                  name="workOrder"
                  value={newBooking.workOrder}
                  onChange={handleInputChange}
                  placeholder="Work Order"
                  required
                />
              </div>

              <div className="flex justify-between items-center mb-4 shadow-md px-2">
                <span
                 className="text-sm font-semibold mb-1 text-white mr-2">
                  Vessel:
                </span>
                <select
                  className="px-2 py-1 cursor-pointer text-gray-600 border border-gray-300 rounded-2xl mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  name="vessel"
                  value={newBooking.vessel}
                  onChange={handleInputChange}
                  required
                  style={{ width: "235px" }} // Set a fixed width (adjust as needed)
                >
                  <option value="">Select Vessel</option>
                  <option value="vessel1">Vessel 1</option>
                  <option value="vessel2">Vessel 2</option>
                  <option value="vessel3">Vessel 3</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="flex justify-between items-center mb-4 shadow-md px-2">
                <span className="text-sm font-semibold mb-1 text-white mr-2">
                  Cargo:
                </span>
                <select
                  className="px-2 py-1 cursor-pointer text-gray-600 border border-gray-300 rounded-2xl mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  name="cargo"
                  value={newBooking.cargo}
                  onChange={handleInputChange}
                  style={{ width: "235px" }} // Set a fixed width (adjust as needed)
                >
                  <option value="">Select Cargo</option>
                  <option value="cargo1">Cargo 1</option>
                  <option value="cargo2">Cargo 2</option>
                  <option value="cargo3">Cargo 3</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="flex justify-between items-center mb-4 shadow-md px-2">
                <span className="text-sm font-semibold mb-1 text-white mr-2">
                  Sub Cargo:
                </span>
                <select
                  className="px-2 py-1 cursor-pointer text-gray-600 border border-gray-300 rounded-2xl mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  name="subCargo"
                  value={newBooking.subCargo}
                  onChange={handleInputChange}
                  style={{ width: "235px" }} // Set a fixed width (adjust as needed)
                >
                  <option className="" value="">
                    Select Sub Cargo
                  </option>
                  <option value="subCargo1">Sub Cargo 1</option>
                  <option value="subCargo2">Sub Cargo 2</option>
                  <option value="subCargo3">Sub Cargo 3</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="flex justify-between items-center mb-4 shadow-md px-2 ">
                <span className=" text-sm  font-semibold mb-1 text-white mr-2">
                  IMEX:
                </span>
                <select
                  className="px-2 py-1 cursor-pointer text-gray-500 border border-gray-300 rounded-2xl mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  name="IMEX"
                  value={newBooking.IMEX}
                  onChange={handleInputChange}
                  style={{ width: "235px" }} // Set a fixed width (adjust as needed)
                >
                  <option className="" value="">
                    Select IMEX
                  </option>
                  <option value="import">Import</option>
                  <option value="export">Export</option>
                </select>
              </div>

              {/* <div className="flex justify-between items-center mb-4 shadow-md px-2 ">
                <span className=" text-sm  font-semibold mb-1 text-white mr-2">
                  Trucks:
                </span>
                <input
                  className="px-2 py-1 border border-gray-300 rounded-2xl mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="number"
                  name="numberOfTrucks"
                  value={newBooking.numberOfTrucks}
                  onChange={handleInputChange}
                  placeholder="Number of Trucks"
                />
              </div> */}



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
        New Booking
        <span className="text-xl"> +</span>
      </button>

      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default NewBooking;
