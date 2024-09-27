import React, { useEffect, useRef } from 'react';
import { XCircleIcon, CogIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

function HeaderPicture({ onClose, onLogout }) {
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
<div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-black bg-opacity-50"  style={{ marginLeft: 0 }}>
<div
        ref={containerRef}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-110"
        >
          <XCircleIcon className="h-8 w-8 text-red-700" />
        </button>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Advanced Settings</h2>

        <div className="flex flex-col gap-4">
          <button
            onClick={onLogout}
            className="flex items-center justify-start gap-3 w-full py-2 px-4 text-lg font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-200 transition-all duration-300 ease-in-out border border-gray-300 rounded-lg"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
            Logout
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-start gap-3 w-full py-2 px-4 text-lg font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-200 transition-all duration-300 ease-in-out border border-gray-300 rounded-lg"
          >
            <CogIcon className="h-6 w-6" />
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderPicture;
