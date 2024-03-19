import { axiosBaseUrl } from "./axiosBaseURL";

export const landingDataFetching = async () => {
  const response = await axiosBaseUrl().get("/categories");
  return response.data;
};
