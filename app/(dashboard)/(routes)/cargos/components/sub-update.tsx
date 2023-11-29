import { BadgePlus, Edit } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { motion } from 'framer-motion'; // Import motion from framer-motion


const UpdateSub = ({ sub, onUpdateSub }) => {
  const [isUpdateSubModalOpen, setIsUpdateSubModalOpen] =
    useState(false);
  const [updateSub, setUpdateSub] = useState({
    name: "",
    code: "",
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

    if (isUpdateSubModalOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUpdateSubModalOpen]);

  useEffect(() => {
    setUpdateSub(sub);
  }, [sub]);

  const openModal = () => {
    setIsUpdateSubModalOpen(true);
    setIsButtonClicked(true);
  };

  const closeModal = () => {
    setIsUpdateSubModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateSub((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedSubWithId = { ...updateSub, id: sub.id };
    onUpdateSub(updatedSubWithId); // Call the onUpdateSub function with the updated Sub
    closeModal();

          // Show a success toast when a new vessel is created
          toast.success("cargo updated successfully!", {
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
      {isUpdateSubModalOpen && (
        <motion.div
        
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}        
        >
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-70">
          <motion.div
              initial={{ opacity: 0, x: '-100%' }} // Initial position from left
              animate={{ opacity: 1, x: 0 }} // Animate to the center
              exit={{ opacity: 0, y: '-100%' }} // Exit to the left
              transition={{ duration: .05, ease: 'easeInOut' }} // Custom transition
          
            id="modal"
            ref={modalRef}
            className="bg-white p-4 rounded-2xl grid transition duration-500"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-4 drop-shadow-md">
                Update Sub Cargo
              </h2>
              <BadgePlus className="shadow-xl text-sky-400" />
            </div>
            <form onSubmit={handleSubmit} className="">
              <div className="grid ">
                <span className=" text-sm drop-shadow-lg mb-1 text-sky-500 mr-2">
                  Sub Cargo Name
                </span>
                <input
                  className="px-2 py-1 border border-gray-300 rounded-lg mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="text"
                  name="name"
                  value={updateSub.name}
                  onChange={handleInputChange}
                  placeholder="Sub Cargo Name"
                  required
                />
              </div>

              <div className="grid">
                <span className="text-sm drop-shadow-lg mb-1 text-sky-500 mr-2">
                  Sub Cargo Code
                </span>
                <input

                disabled
                  className=" cursor-not-allowed bg-gray-200 px-2 py-1 border border-gray-300 rounded-lg mb-2 shadow-md focus:shadow-xl focus:scale-105 transition-all duration-500 outline-none"
                  type="type"
                  name="code"
                  value={updateSub.code}
                  onChange={handleInputChange}
                  placeholder="Sub Cargo Code"
                  required
                />
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
        </div>
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
      <ToastContainer
      autoClose={3000}
    />

    </div>

  );
};

export default UpdateSub;