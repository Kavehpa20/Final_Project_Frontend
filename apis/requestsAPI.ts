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

export const getCategoryNameById = async (id: string) => {
  const response = await requestClient.get(`/categories/${id}`);
  return response.data.data.category;
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
  const formData = new FormData();

  if (name) formData.append("name", name);
  if (brand) formData.append("brand", brand);
  if (description) formData.append("description", description);
  if (category) formData.append("category", category._id);
  if (subcategory) formData.append("subcategory", subcategory._id);
  if (quantity) formData.append("quantity", quantity.toString());
  formData.append("thumbnail", thumbnail[0]);
  formData.append("images", images[0]);
  if (price) formData.append("price", price.toString());

  try {
    const response = await requestClient.post("products", formData);
    return response;
  } catch (error) {
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
  const formData = new FormData();

  if (name) formData.append("name", name);
  if (brand) formData.append("brand", brand);
  if (description) formData.append("description", description);
  if (category) formData.append("category", category._id);
  if (subcategory) formData.append("subcategory", subcategory._id);
  if (quantity) formData.append("quantity", quantity.toString());
  formData.append("thumbnail", thumbnail[0]);
  formData.append("images", images[0]);
  if (price) formData.append("price", price.toString());

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

export const editProductInventoryApi = async (
  { quantity, price }: IProduct,
  id: string,
) => {
  const formData = new FormData();

  if (quantity) formData.append("quantity", quantity.toString());
  if (price) formData.append("price", price.toString());

  try {
    const response = await requestClient.patch(`products/${id}`, formData);
    return response;
  } catch (error) {
    console.error("خطا در ویرایش کردن محصولات:", error);
    throw error;
  }
};

export const findProductBySlugname = async (slugname: string) => {
  const response = await requestClient.get(`/products?slugname=${slugname}`);
  return response.data.data.products;
};

export const getCategories = async () => {
  const response = await requestClient.get(`/categories`);
  return response.data.data.categories;
};

export const findSubcategoryBySlugname = async (slugname: string) => {
  const response = await requestClient.get(
    `/subcategories?slugname=${slugname}`,
  );
  return response.data.data.subcategories;
};

export const getProductsBySubcategoryAndCategory = async (
  category: string,
  subcategory: string,
) => {
  const response = await requestClient.get(
    `/products?category=${category}&subcategory=${subcategory}`,
  );
  return response;
};

export const createNewOrder = async (data: IBuyerCart) => {
  const response = await requestClient.post("/orders", data);
  return response.data;
};
