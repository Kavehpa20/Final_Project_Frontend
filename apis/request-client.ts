import { getSessionToken } from "@/libs/session-manager";
import axios from "axios";

export const requestClient = () => {
  const session = getSessionToken();
  return axios.create({
    baseURL: "http://localhost:8000/api/",
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
};
