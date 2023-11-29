import { AlertCircle, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
  };

  return (
    <div>
      {isDeleteUserModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-70">
          <div
            id="modal"
            ref={modalRef}
            className="bg-white p-4 rounded-2xl grid transition duration-500"
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
    </div>
  );
}

export default DeleteUser;
