import { axiosBaseUrl } from "./axios-config";

export const landingProductsReq = async (id: string) => {
  const response = await axiosBaseUrl().get(`/products?category=${id}&limit=6`);
  return response.data;
};
