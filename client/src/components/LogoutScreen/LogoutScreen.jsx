import React, { useEffect, useRef } from 'react';
import { XCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

function LogoutScreen({ onClose, onLogout }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-black bg-opacity-50" style={{ marginLeft: 0 }}>
      <div
        ref={containerRef}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-110"
        >
          <XCircleIcon className="h-7 w-7 text-red-700" /> {/* تصغير حجم الأيقونة */}
        </button>

        <h2 className="text-2xl font-medium text-gray-800 mb-4 text-center"> {/* تصغير حجم النص */}
          Are you sure you want to log out?
        </h2>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={onLogout}
            className="flex items-center justify-start gap-3 w-full py-2 px-4 text-lg font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-200 transition-all duration-300 ease-in-out border border-gray-300 rounded-lg"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutScreen;
