import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

// ✅ safer token getter
const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

const authHeader = () => {
  const token = getToken();

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// GET my profile
export const getMyProfile = () => {
  return axios.get(`${API}/api/profile/me`, authHeader());
};

// CREATE or UPDATE
export const saveProfile = (data: any) => {
  return axios.post(`${API}/api/profile`, data, authHeader());
};

// DELETE profile
export const deleteProfile = () => {
  return axios.delete(`${API}/api/profile`, authHeader());
};