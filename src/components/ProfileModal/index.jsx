import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const ProfileModal = ({ isOpen, onClose, userData }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="relative w-full max-w-md p-6 bg-white shadow-2xl rounded-xl animate-fade-in">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">Profile</h2>
        <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
          <p className="text-lg font-semibold text-gray-700">
            <strong>Nama:</strong> {userData?.name || "Nama Pengguna"}
          </p>
          <p className="text-lg font-semibold text-gray-700">
            <strong>Email:</strong> {userData?.email || "Email"}
          </p>
          <p className="text-lg font-semibold text-gray-700">
            <strong>Role:</strong> {userData?.role || "Role"}
          </p>
          <p className="text-lg font-semibold text-gray-700">
            <strong>Phone:</strong> {userData?.phone_number || "Phone Number"}
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="px-6 py-2 font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProfileModal;
