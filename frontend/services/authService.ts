import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
});

// ✅ AUTO attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// auth APIs
export const loginUser = (data: any) =>
  API.post("/auth/login", data);

export const registerUser = (data: any) =>
  API.post("/auth/register", data);

export default API;