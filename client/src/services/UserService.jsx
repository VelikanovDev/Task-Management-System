import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for sessions to work
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (username, password) => {
  console.log("UserService login: " + username + " " + password);
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });

    return {
      success: true,
      message: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Login failed. Please try again later.",
    };
  }
};

export const register = async (username, password, confirmPassword) => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}/register`, {
      username,
      password,
      confirmPassword,
    });
    if (response.status === 201) {
      return response.data;
    } else {
      console.log("Registration failed");
    }
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Registration failed. Please try again later.",
    };
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/logout`);
    return response.data.message;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Logout failed. Please try again later.",
    };
  }
};

export const checkSession = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/check-session`, {
      withCredentials: true,
    });
    return response.data.isLoggedIn;
  } catch (error) {
    console.error("Session check failed:", error);
    return false;
  }
};
