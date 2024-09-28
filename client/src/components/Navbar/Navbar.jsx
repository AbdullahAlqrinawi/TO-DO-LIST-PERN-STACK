import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import {CheckCircleIcon} from '@heroicons/react/24/solid';

function Navbar({ isLoggedIn, onLogout  }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();



  const handleSearch = () => {
    // Logic for search
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className='bg-darkTeal flex items-center justify-between px-4 py-2 shadow-md space-x-4'>
    <h2 className='flex items-center text-xl font-semibold text-white transition-transform transform hover:scale-105'>
  DO IT
  <CheckCircleIcon className="h-5 w-5 ml-2" /> 
</h2>

      
      {isLoggedIn && (
        <>
          <SearchBar 
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={clearSearch}
          />
          <ProfileInfo onLogout={onLogout} />
        </>
      )}
    </div>
  );
}

export default Navbar;
