import axios from "axios";

const API_URL = "http://localhost:5000/api/diary";

export const getDiaryEntries = async (token) => {
  return axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
};

export const createDiaryEntry = async (token, entry) => {
  return axios.post(API_URL, entry, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateDiaryEntry = async (token, id, entry) => {
  return axios.put(`${API_URL}/${id}`, entry, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteDiaryEntry = async (token, id) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
