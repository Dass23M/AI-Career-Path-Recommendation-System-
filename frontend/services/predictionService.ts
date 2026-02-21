import API from "./api";

export const getPrediction = (data: any) =>
  API.post("/prediction", data);
