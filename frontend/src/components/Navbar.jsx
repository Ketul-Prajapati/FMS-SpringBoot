import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-blue-200">
      <div className="w-full max-w-md">
        <div className="rounded-lg shadow-md bg-gray-600">
          <div className="p-6">
            <p className="text-lg text-white mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-white font-semibold bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 rounded mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-600 rounded"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};


const Navbar = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="shadow-md px-6 py-4 flex justify-between items-center">
      <p
        className="font-semibold text-sm lg:text-2xl flex justify-center items-center cursor-pointer"
      >
        <span className="mr-2">
          <RxDashboard />
        </span>{" "}
        {router.state && router.state.type} Dashboard
      </p>
      <button
        className="flex justify-center items-center text-red-500 px-3 py-2 font-semibold rounded-sm"
        onClick={handleLogout}
      >
        Logout
        <span className="ml-2">
          <FiLogOut />
        </span>
      </button>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          // Perform logout logic here
          navigate("/");
        }}
      />
    </div>
  );
};

export default Navbar;