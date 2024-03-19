import { requestClient } from "./requestClient";

export const loginRequest = async (data: ILoginAdmin) => {
  const response = await requestClient.post("/auth/login", data);
  return response.data;
};

export const getOrders = async (page: number) => {
  const response = await requestClient.get(`/orders?page=${page}`);
  return response.data;
};

export const ordersDeliveryFilter = async (
  deliveryStatus: boolean,
  currentPage: number = 1,
) => {
  const response = await requestClient.get(
    `/orders?deliveryStatus=${deliveryStatus}&page=${currentPage}`,
  );
  return response.data;
};

export const getNameById = async (id: string) => {
  const response = await requestClient.get(`/users/${id}`);
  return response.data.data.user;
};

export const getInventoryAndPrices = async (page: number) => {
  const response = await requestClient.get(`/products?page=${page}`);
  return response.data;
};

export const getNameSubcategoryById = async (id: string) => {
  const response = await requestClient.get(`/subcategories/${id}`);
  return response.data;
};
