import React, { useEffect, useRef, useState } from 'react';

function AddEditNotes({ onClose, noteData = {}, onSave }) {
  const containerRef = useRef(null);
  const [title, setTitle] = useState(noteData.title || '');
  const [content, setContent] = useState(noteData.content || '');
  const [dueDate, setDueDate] = useState(() => {
    return noteData.due_date ? new Date(noteData.due_date).toISOString().split('T')[0] : '';
  });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    setTitle(noteData.title || '');
    setContent(noteData.content || '');
    setDueDate(noteData.due_date ? new Date(noteData.due_date).toISOString().split('T')[0] : '');
  }, [noteData]);

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

  const handleSave = () => {
    onSave({ 
      title, 
      content, 
      due_date: dueDate || today 
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={containerRef} className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full relative">
        <h2 className="text-lg font-semibold mb-4">{noteData.id ? 'Edit Note' : 'Add Note'}</h2> 
        <label className="block mb-2 text-sm font-medium">Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-hoverTeal"
        />
        <label className="block mb-2 text-sm font-medium">Content</label>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-hoverTeal"
        ></textarea>
        <label className="block mb-2 text-sm font-medium">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={today}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-hoverTeal"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
            Close
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-darkTeal text-white rounded-lg hover:bg-hoverTeal">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditNotes;
