import axios from "axios";

export const axiosBaseUrl = () => {
  return axios.create({
    baseURL: "http://localhost:8000/api/",
  });
};
