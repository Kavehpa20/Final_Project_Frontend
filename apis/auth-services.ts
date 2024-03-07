import { requestClient } from "./request-client";

export const login = async (data: ILoginAdmin) => {
  const response = await requestClient().post("/auth/login", data);
  return response.data;
};
