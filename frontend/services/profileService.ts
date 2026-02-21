import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

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