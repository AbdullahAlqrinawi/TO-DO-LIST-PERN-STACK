import Axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchNotes = async (token, userId) => {
  const { data } = await Axios.get(`${API_BASE_URL}/notes/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createNote = async (note, token) => {
  const payload = await Axios.post(`${API_BASE_URL}/notes/${note.user_id}`, note, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return payload.data;
};

export const updateNote = async (updatedNote, token) => {
  const { data } = await Axios.put(`${API_BASE_URL}/notes/${updatedNote.id}`, updatedNote, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteNote = async (id, token) => {
  await Axios.delete(`${API_BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const toggleStarNote = async (note, token) => {
  const updatedNote = { is_star: !note.is_star };
  const { data } = await Axios.patch(`${API_BASE_URL}/notes/${note.id}/is_star`, updatedNote, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
