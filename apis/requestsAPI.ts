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

export const getOrderById = async (id: string) => {
  const response = await requestClient.get(`/orders/${id}`);
  return response.data.data.order;
};

export const getInventoryAndPrices = async (page: number) => {
  const response = await requestClient.get(`/products?page=${page}`);
  return response.data;
};

export const getNameSubcategoryById = async (id: string) => {
  const response = await requestClient.get(`/subcategories/${id}`);
  return response.data;
};

export const getSubcategoryByCategory = async (id: string) => {
  const response = await requestClient.get(`subcategories?category=${id}`);
  return response.data;
};

export const addNewProductApi = async ({
  brand,
  description,
  quantity,
  thumbnail,
  images,
  name,
  subcategory,
  category,
  price,
}: IProduct) => {
  // Create FormData object
  const formData = new FormData();

  // Append data fields to FormData object
  formData.append("brand", brand);
  formData.append("description", description);
  formData.append("category", category._id);
  formData.append("name", name);
  formData.append("subcategory", subcategory._id);
  formData.append("quantity", quantity.toString()); // Ensure quantity is converted to string
  formData.append("thumbnail", thumbnail[0]); // Assuming thumbnail is a File object
  formData.append("images", images[0]); // Assuming thumbnail is a File object
  formData.append("price", price.toString()); // Ensure price is converted to string

  try {
    const response = await requestClient.post("products", formData);
    return response;
  } catch (error) {
    // Handle error
    console.error("Error adding new product:", error);
    throw error;
  }
};

export const deleteProductById = async (id: string) => {
  const response = await requestClient.delete(`products/${id}`);
  return response.data;
};

export const getProductNameById = async (id: string) => {
  const response = await requestClient.get(`/products/${id}`);
  return response.data.data.product;
};

export const editProductApi = async (
  {
    brand,
    description,
    quantity,
    thumbnail,
    images,
    name,
    subcategory,
    category,
    price,
  }: IProduct,
  id: string,
) => {
  // Create FormData object
  const formData = new FormData();

  // Append data fields to FormData object
  formData.append("brand", brand);
  formData.append("description", description);
  formData.append("category", category._id);
  formData.append("name", name);
  formData.append("subcategory", subcategory._id);
  formData.append("quantity", quantity.toString()); // Ensure quantity is converted to string
  formData.append("thumbnail", thumbnail[0]); // Assuming thumbnail is a File object
  formData.append("images", images[0]); // Assuming thumbnail is a File object
  formData.append("price", price.toString()); // Ensure price is converted to string

  try {
    const response = await requestClient.patch(`products/${id}`, formData);
    return response;
  } catch (error) {
    // Handle error
    console.error("Error adding new product:", error);
    throw error;
  }
};

export const deliveredOrder = async (id: string) => {
  const response = await requestClient.patch(`/orders/${id}`, {
    deliveryStatus: true,
  });
  return response.data;
};
