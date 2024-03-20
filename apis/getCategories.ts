import { axiosBaseUrl } from "./axiosBaseURL";

export const getSubcategories = async () => {
  const response = await axiosBaseUrl().get("/categories");
  return response.data;
};
