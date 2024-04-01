import axios from "axios";

export const axiosBaseUrl = () => {
  return axios.create({
    baseURL: "http://localhost:8000/api/",
  });
};

export const categoryProductsRequest = async (id: string, page: number = 1) => {
  const response = await axiosBaseUrl().get(
    `/products?category=${id}&page=${page}&limit=9`,
  );
  return response.data;
};
