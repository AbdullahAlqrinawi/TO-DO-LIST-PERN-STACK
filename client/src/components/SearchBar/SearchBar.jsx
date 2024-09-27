import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

function SearchBar({ value, onChange, handleSearch, onClearSearch }) {
  return (
    <div className='w-full max-w-sm flex items-center px-2 py-1 bg-gray-100 rounded-lg border border-gray-300'>
      <input
        type="text"
        placeholder='Search'
        value={value}
        onChange={onChange}
        className='w-full text-xs bg-transparent py-1 px-2 outline-none'
      />
      {value && (
        <XMarkIcon
          onClick={onClearSearch}
          className='h-4 w-4 text-gray-500 cursor-pointer ml-1 hover:text-gray-700'
        />
      )}
      <MagnifyingGlassIcon
        onClick={handleSearch}
        className='h-4 w-4 text-gray-500 cursor-pointer ml-1 hover:text-gray-700'
      />
    </div>
  );
}

export default SearchBar;
