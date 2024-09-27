import React from 'react';
import { PencilIcon, CheckCircleIcon, StarIcon } from '@heroicons/react/24/outline';

export const NoteCard = ({ note, onEdit, onDelete, onStarNote }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white shadow-md rounded-lg border border-gray-200 mb-4 hover:bg-gray-50 hover:shadow-lg transition duration-300">
      <div className="flex-1 mb-4 sm:mb-0">
        <h3 className="text-lg font-medium text-gray-800">{note.title}</h3>
        <p className="text-sm text-gray-500">
        {note.created_at.slice(0, 10)}  <br></br>
        {note.content?.slice(0, 60)}...
        </p>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Delete button */}
        <button
          onClick={onDelete}
          className="text-slate-500 hover:text-green-600"
        >
          <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Edit button */}
        <button
          onClick={onEdit} 
          className="text-slate-500 hover:text-blue-600"
        >
          <PencilIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Star/Unstar button */}
        <button
          onClick={onStarNote}
          className={`h-6 w-6 ${note.isStar ? 'text-yellow-600 fill-yellow-600' : 'text-slate-500 hover:text-yellow-600'}`}
        >
          <StarIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${note.isStar ? 'fill-yellow-600' : ''}`} />
        </button>
      </div>
    </div>
  );
};
