import { requestClient } from "./requestClient";

export const login = async (data: ILoginAdmin) => {
  const response = await requestClient.post("/auth/login", data);
  return response.data;
};
