import { AlertCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const CloseBooking = ({ booking, onBookingClosed, closedBookings = [] }) => {
  const [isCloseBookingModalOpen, setIsCloseBookingModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalElement = document.getElementById("modal");
      if (modalElement && !modalElement.contains(event.target)) {
        closeModal();
      }
    };

    if (isCloseBookingModalOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCloseBookingModalOpen]);

  const openModal = () => {
    setIsCloseBookingModalOpen(true);
  };

  const closeModal = () => {
    setIsCloseBookingModalOpen(false);
  };

  const handleBookingClose = () => {
    const closedDate = new Date();
    const closedBooking = {
      ...booking,
      status: "Closed",
      closedAt: closedDate.toISOString(),
    };

    onBookingClosed(closedBooking);
    closeModal();

    toast.success("Booking closed successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      style: {
        background: "#8acaff",
        color: "#ffffff",
        boxShadow:
          "0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px 0  12px 0",
        width: "96%",
        fontSize: "bold",
      },
    });
  };

  return (
    <div>
      {booking.status !== "Closed" && (
        <button
          className={`px-1 py-1 ml-2 bg-red-400 text-white text-center text-sm rounded-lg shadow-lg hover:bg-red-600 hover:scale-[95%] transition`}
          onClick={openModal}
        >
          <div className="flex p-1 text">
            Close
            <AlertCircle className="w-4 ml-1" />
          </div>
        </button>
      )}

      {isCloseBookingModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            id="modal"
            ref={modalRef}
            className="bg-white p-4 rounded-2xl grid transition duration-500"
            initial={{ scale: 0, x: "-0%" }}
            animate={{ scale: 1, x: 0 }}
            exit={{ scale: 0, y: "0%" }}
            transition={{ duration: 0.05, ease: "easeInOut" }}
          >
            {/* Modal content */}
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-4 drop-shadow-md mr-8">
                Attention! You cannot reopen again!
              </h2>
              <AlertCircle className="shadow-lg font-bold text-red-600" />
            </div>

            <div className="flex justify-end">
              <button
                className="px-4 py-1 bg-red-500 text-white rounded-lg mr-2 shadow-md hover:scale-95"
                onClick={handleBookingClose}
              >
                Close
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
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default CloseBooking;
