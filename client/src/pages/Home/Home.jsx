import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { PlusIcon } from '@heroicons/react/24/outline';
import AddEditNotes from './AddEditNotes';
import NoteList from '../../components/NoteList/NoteList';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

function Home() {
  const [addEditSetting, setAddEditSetting] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You need to log in to access your notes.');
        navigate('/login');
        return;
      }

      let id;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        id = payload.userId; 
        console.log('User ID from token:', id);
      } catch (error) {
        console.error('Error decoding token:', error);
        setMessage('Invalid token. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      try {
        const { data } = await Axios.get(`${API_BASE_URL}/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(data);
        setMessage('');
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setMessage('Error fetching notes: ' + error.response?.data?.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [navigate]);

  const createNote = async (note) => {
    try {
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.userId;
  
      console.log('Creating note with:', { ...note, user_id: userId });
  
      const { data } = await Axios.post(`${API_BASE_URL}/notes/${userId}`, {
        ...note,
        user_id: userId, // إضافة user_id هنا
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prevNotes) => [...prevNotes, data]);
      setMessage('');
    } catch (error) {
      const errorMessage = error.response?.data?.error || JSON.stringify(error.response?.data) || 'An unknown error occurred';
      setMessage('Error creating note: ' + errorMessage);
      console.error('Error creating note:', error);
    }
  };
  

  const updateNote = async (updatedNote) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await Axios.put(`${API_BASE_URL}/notes/${updatedNote.id}`, updatedNote, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === data.id ? data : note))
      );
      setAddEditSetting(false);
      setSelectedNotes(null);
      setMessage('');
    } catch (error) {
      setMessage('Error updating note: ' + error.response?.data?.error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await Axios.delete(`${API_BASE_URL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      setMessage('');
    } catch (error) {
      setMessage('Error deleting note: ' + error.response?.data?.error);
    }
  };

  const openEditModal = (note) => {
    setSelectedNotes(note);
    setAddEditSetting(true);
  };

  const handleOpen = () => {
    setSelectedNotes(null); 
    setAddEditSetting(true);
  };
  

  const handleSave = (note) => {
    if (selectedNotes) {
      // تعديل ملاحظة موجودة
      updateNote({ ...selectedNotes, ...note });
    } else {
      // إنشاء ملاحظة جديدة
      createNote(note);
    }
  };
  

  const handleClose = () => {
    setAddEditSetting(false);
    setSelectedNotes(null);
  };

  return (
    <>
      <Navbar isLoggedIn={true} />
      <div className="container mx-auto mt-8">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            {message && (
              <p className="text-red-600 text-center mb-4">{message}</p>
            )}
            <NoteList
              notes={notes}
              onEdit={openEditModal}
              onDelete={deleteNote}
            />
          </>
        )}
      </div>
      <button
        onClick={handleOpen}
        className="fixed w-16 h-16 flex items-center justify-center rounded-full bg-darkTeal hover:bg-hoverTeal shadow-lg transition-transform transform hover:scale-105 right-10 bottom-10"
      >
        <PlusIcon className="h-8 w-8 text-white" />
      </button>
      {
        addEditSetting && (
          <AddEditNotes
            onClose={handleClose}
            noteData={selectedNotes || {}} // تأكد من أن noteData ليست null
            onSave={handleSave}
          />
        )}
    </>
  );
}

export default Home;
