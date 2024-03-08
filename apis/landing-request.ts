import { axiosBaseUrl } from "./axios-config";

export const landingDataFetching = async () => {
  const response = await axiosBaseUrl().get("/categories");
  return response.data;
};
