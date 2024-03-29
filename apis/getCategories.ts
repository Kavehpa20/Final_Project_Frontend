import { axiosBaseUrl } from "./axiosBaseURL";

export const getCategories = async () => {
  const response = await axiosBaseUrl().get("/categories");
  return response.data;
};
