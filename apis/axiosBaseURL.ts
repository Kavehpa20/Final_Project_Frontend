import axios from "axios";

export const axiosBaseUrl = () => {
  return axios.create({
    baseURL: "http://localhost:8000/api/",
  });
};

export const categoryProductsRequest = async (id: string) => {
  const response = await axiosBaseUrl().get(
    `/products?category=${id}&limit=10`,
  );
  return response.data;
};
