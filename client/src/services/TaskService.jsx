import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/allTasks`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return null;
  }
};

export const createTask = async (newTask) => {
  const response = await axios.post(`${API_BASE_URL}/api/newTask`, newTask);
  return await response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/api/deleteTask/${id}`);
  return await response.data;
};
