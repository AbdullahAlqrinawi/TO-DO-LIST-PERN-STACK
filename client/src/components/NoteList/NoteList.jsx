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
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <img
        src="https://img.freepik.com/free-vector/personal-goals-checklist-concept-illustration_114360-10328.jpg?t=st=1727611471~exp=1727615071~hmac=9c73e4705be884d76a03d48fa0486bbe77d930344a3e95b59c7bcfab25084d6d&w=740"
        alt="Personal Goals Checklist"
        className="w-2/3 md:w-1/3 lg:w-1/4"
      />
      <p className="text-black mt-6 text-lg italic">
        Your notes are waiting to be written...
      </p>
    </div>
      )}
    </div>
  );
}

export default NoteList;
