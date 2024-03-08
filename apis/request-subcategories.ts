import { axiosBaseUrl } from "./axios-config";

export const getSubcategories = async () => {
  const response = await axiosBaseUrl().get("/subcategories");
  return response.data;
};
