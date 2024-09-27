import React from 'react';
import { NoteCard } from '../Cards/NoteCard';

function NoteList({ notes, onEdit, onDelete, onStarNote }) {
  return (
    <div>
      {notes.length > 0 ? (
        <div>
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={() => onEdit(note)}   
              onDelete={() => onDelete(note.id)} 
              onStarNote={() => onStarNote(note)} 
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-700 mt-6 text-lg italic">
          Your notes are waiting to be written...
        </p>
      )}
    </div>
  );
}

export default NoteList;
