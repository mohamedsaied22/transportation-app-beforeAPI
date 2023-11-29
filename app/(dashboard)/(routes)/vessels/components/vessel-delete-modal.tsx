import { AlertCircle, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DeleteVessel({ vessel , onDeleteVessel }) {
  const [isDeleteVesselModalOpen, setIsDeleteVesselModalOpen] = useState(false);
  const [deleteVessel, setDeleteVessel] = useState({
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

    if (isDeleteVesselModalOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDeleteVesselModalOpen]);

  useEffect(() => {
    setDeleteVessel(vessel);
  }, [vessel]);

  const openModal = () => {
    setIsDeleteVesselModalOpen(true);
    setIsButtonClicked(true);
  };

  const closeModal = () => {
    setDeleteVessel({
        name: "",
        IMO: "",
        grossTonnage: "",
        voyages: "",

    });
    setIsDeleteVesselModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeleteVessel((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onDeleteVessel({ ...deleteVessel, id: vessel.id });
    closeModal();

    toast.success("Vessel Deleted successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  

  return (
    <div>
      {isDeleteVesselModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-70">
          <div
            id="modal"
            ref={modalRef}
            className="bg-white p-4 rounded-2xl grid transition duration-500"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-4 drop-shadow-md mr-8">
                Are you sure you want to delete this Vessel?
              </h2>
              <AlertCircle className="shadow-lg font-bold text-red-400" />
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
                  setDeleteVessel({
                    name: "",
                    IMO: "",
                    grossTonnage: "",
                    voyages: "",
             
                  });
                  setIsDeleteVesselModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className={`px-1 py-1 bg-red-400 text-white rounded-lg shadow-md ${
          isButtonClicked ? "hover:bg-red-500" : "hover:bg-red-500"
        } transition`}
        onClick={openModal}
      >
        <div>
          <Trash2 className="w-5 h-5" />
        </div>
      </button>

      <ToastContainer
      autoClose={3000}
    />

    </div>
  );
}

export default DeleteVessel;