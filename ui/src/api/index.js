import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://master-o-task.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => api.post("/api/auth/register", data);
export const loginUser = (data) => api.post("/api/auth/login", data);
export const playGame = (data) => api.post("/api/play", data);
export const getHistory = () => api.get("/api/history");

export default api;
