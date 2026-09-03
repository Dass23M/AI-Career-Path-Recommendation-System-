import API from "./api";

// GET my profile
export const getMyProfile = () => {
  return API.get("/profile/me");
};

// CREATE or UPDATE
export const saveProfile = (data: any) => {
  return API.post("/profile", data);
};

// DELETE profile
export const deleteProfile = () => {
  return API.delete("/profile");
};

// GET history
export const getPredictionHistory = () => {
  return API.get("/profile/history");
};