import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for sessions to work
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTasks = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/api/allTasks`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return null;
  }
};

export const createTask = async (newTask) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/api/newTask`,
    newTask,
  );
  return await response.data;
};

export const deleteTask = async (id) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/api/deleteTask/${id}`,
  );
  return await response.data;
};

export const updateTask = async (id, task) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/api/updateTask/${id}`,
    task,
  );
  return response.data;
};
