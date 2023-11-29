import { AlertCircle, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { motion } from 'framer-motion';


function DeleteUser({ onDeleteUser }) {
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState({
    username: "",
    role: "",
    branch: "",
    email: "",
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

    if (isDeleteUserModalOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDeleteUserModalOpen]);

  const openModal = () => {
    setIsDeleteUserModalOpen(true);
    setIsButtonClicked(true);
  };

  const closeModal = () => {
    setDeleteUser({
      username: "",
      role: "",
      branch: "",
      email: "",
    });
    setIsDeleteUserModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeleteUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onDeleteUser(deleteUser);
    closeModal();

    toast.success("User deleted successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div>
      {isDeleteUserModalOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-70">
        
          <motion.div
            id="modal"
            ref={modalRef}
            className="bg-white p-4 rounded-2xl grid transition duration-500"
            initial={{ scale: 0, x: '-0%' }} // Initial position from left
            animate={{ scale: 1, x: 0 }} // Animate to the center
            exit={{ scale: 0, y: '0%' }} // Exit to the left
            transition={{ duration: .05, ease: 'easeInOut' }} // Custom transition

          
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-4 drop-shadow-md mr-8">
                Are you sure you want to delete this user?
              </h2>
              <AlertCircle className="shadow-lg font-bold text-red-600" />
            </div>

            <div className="flex justify-end">
              <button
                className="px-4 py-1 bg-red-500 text-white rounded-lg mr-2 shadow-md hover:scale-95"
                onClick={handleSubmit}
              >
                Delete
              </button>
              <button
                className="px-2 py-1 bg-gray-300 rounded-lg shadow-md hover:scale-95"
                onClick={() => {
                  setDeleteUser({
                    username: "",
                    role: "",
                    branch: "",
                    email: "",
                  });
                  setIsDeleteUserModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <button
        className={`px-1 py-1 bg-red-400 text-white rounded-lg shadow-md ml-1 ${
          isButtonClicked ? "hover:bg-red-500" : "hover:bg-red-500"
        } transition`}
        onClick={openModal}
      >
        <div className="flex p-1 text">
          delete
          <Trash2 className="w-4 ml-1" />
        </div>

      
      </button>
      <ToastContainer autoClose={3000} />

    </div>
  );
}

export default DeleteUser;
