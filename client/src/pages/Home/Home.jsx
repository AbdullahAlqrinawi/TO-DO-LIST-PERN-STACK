// Home.js
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { PlusIcon } from '@heroicons/react/24/outline';
import AddEditNotes from './AddEditNotes';
import NoteList from '../../components/NoteList/NoteList';
import { fetchNotes, createNote, updateNote, deleteNote, toggleStarNote } from '../../api/api.js';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [addEditSetting, setAddEditSetting] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotesData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You need to log in to access your notes.');
        navigate('/login');
        return;
      }

      let userId;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        userId = payload.userId;
      } catch (error) {
        setMessage('Invalid token. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      try {
        const notesData = await fetchNotes(token, userId);
        const sortedNotes = notesData.sort((a, b) => b.is_star - a.is_star);
        setNotes(sortedNotes);
        setMessage('');
      } catch (error) {
        setMessage('Error fetching notes: ' + error.response?.data?.error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotesData();
  }, [navigate]);

  const handleSave = async (note) => {
    const token = localStorage.getItem('token');
    const userId = JSON.parse(atob(token.split('.')[1])).userId;

    if (selectedNotes) {
      const updatedNote = { ...selectedNotes, ...note };
      const data = await updateNote(updatedNote, token);
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === data.id ? data : n))
      );
    } else {
      const newNote = { ...note, user_id: userId };
      const data = await createNote(newNote, token);
      setNotes((prevNotes) => [...prevNotes, data]);
    }
    setAddEditSetting(false);
    setSelectedNotes(null);
    setMessage('');
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await deleteNote(id, token);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleToggleStar = async (note) => {
    const token = localStorage.getItem('token');
    const updatedNote = await toggleStarNote(note, token);
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === updatedNote.id ? updatedNote : n)).sort((a, b) => (b.is_star - a.is_star))
    );
  };

  return (
    <>
      <Navbar isLoggedIn={true} onLogout={() => navigate('/')} />
      <div className="container mx-auto mt-8">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            {message && <p className="text-red-600 text-center mb-4">{message}</p>}
            <NoteList
              notes={notes}
              onEdit={(note) => { setSelectedNotes(note); setAddEditSetting(true); }}
              onDelete={handleDelete}
              onStarNote={handleToggleStar}
            />
          </>
        )}
      </div>
      <button
        onClick={() => { setSelectedNotes(null); setAddEditSetting(true); }}
        className="fixed w-16 h-16 flex items-center justify-center rounded-full bg-darkTeal hover:bg-hoverTeal shadow-lg transition-transform transform hover:scale-105 right-10 bottom-10"
      >
        <PlusIcon className="h-8 w-8 text-white" />
      </button>
      {addEditSetting && (
        <AddEditNotes
          onClose={() => { setAddEditSetting(false); setSelectedNotes(null); }}
          noteData={selectedNotes || {}}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default Home;
