import { axiosBaseUrl } from "./axiosBaseURL";

export const getSubcategories = async () => {
  const response = await axiosBaseUrl().get("/subcategories");
  return response.data;
};
