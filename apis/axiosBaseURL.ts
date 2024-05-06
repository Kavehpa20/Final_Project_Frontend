import axios from "axios";

export const axiosBaseUrl = () => {
  return axios.create({
    baseURL: "https://alphacoffee.liara.run/api/",
  });
};

export const baseUrl = "https://alphacoffee.liara.run/";
