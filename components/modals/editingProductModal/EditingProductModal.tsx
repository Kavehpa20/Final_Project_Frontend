"use client";

import {
  FileInput,
  Label,
  Modal,
  Textarea,
  Select,
  Spinner,
  Avatar,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { addProductModalSchema } from "@/libs/validations/addProductModalSchema";
import { classNames } from "@/libs/tools";
import { useAdminPanel } from "@/contexts/AdminPanelContext";
import { LoadingButton } from "@/components/LoadingButton";
import SubCategoriesOptions from "./SubCategoriesOptions";
import {
  editProductApi,
  getProductNameById,
  getSubcategoryByCategory,
} from "@/apis/requestsAPI";

const EditingProductModal = () => {
  const [productDetail, setProductDetail] = useState({} as IProduct);
  const [isLoading, setIsLoading] = useState(false);

  const {
    showEditingModal,
    onCloseEditingModal,
    CategoriesNameData,
    productId,
  } = useAdminPanel();

  const productDetailsFunc = async () => {
    if (productId)
      try {
        const res = await getProductNameById(productId);
        return res;
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      const res = await productDetailsFunc();
      setProductDetail(res);
    };
    if (productId) {
      fetchProductDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const { register, handleSubmit, formState, control, setValue } =
    useForm<IAddingProduct>({
      mode: "all",
      resolver: zodResolver(addProductModalSchema),
    });

  const onSubmitHandler = async (data: IAddingProduct) => {
    const category = await CategoriesNameData.data.find(
      (el: ICategory) => data.category === el.name,
    );

    let subCatId: ISubcategories;

    const subcategoryId = async () => {
      const response = await getSubcategoryByCategory(category._id);
      subCatId = response.data.subcategories.find(
        (subcat: ISubcategories) => subcat.name === data.subcategory,
      );
      return subCatId;
    };

    const body: IProduct = {
      category: category,
      subcategory: await subcategoryId().then(() => subCatId),
      name: data.name,
      price: Number(data.price),
      quantity: Number(data.quantity),
      brand: data.brand,
      description: data.description,
      thumbnail: data.thumbnail,
      images: data.images,
    };

    setIsLoading((isLoading) => true);
    try {
      const res = await editProductApi(body, productId as string);
      if (res.status === 200) {
        toast.success("محصول با موفقیت ویرایش شد.", { theme: "colored" });
        onCloseEditingModal();
      }
      setIsLoading((isLoading) => false);
    } catch (error) {
      toast.error("خطایی رخ داده است.", { theme: "colored" });
      console.log(error);
      setIsLoading((isLoading) => false);
    }
  };

  const [categoryName, setCategoryName] = useState("");
  useEffect(() => {
    if (productDetail.category) setCategoryName(productDetail.category.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail]);

  const [subcategoryName, setSubcategoryName] = useState("");
  useEffect(() => {
    if (productDetail.subcategory)
      setSubcategoryName(productDetail.subcategory.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);

  const [description, setDescription] = useState("");
  useEffect(() => {
    if (productDetail.description) setDescription(productDetail.description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail]);

  const [productName, setProductName] = useState("");
  useEffect(() => {
    if (productDetail.name) setProductName(productDetail.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail]);

  const [productPrice, setProductPrice] = useState(0);
  useEffect(() => {
    if (productDetail.price) setProductPrice(productDetail.price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail]);

  const [productQuantity, setProductQuantity] = useState(0);
  useEffect(() => {
    if (productDetail.quantity) setProductQuantity(productDetail.quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail]);

  const [productBrand, setProductBrand] = useState("");
  useEffect(() => {
    if (productDetail.brand) setProductBrand(productDetail.brand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail]);

  const [productThumbnail, setProductThumbnail] = useState({});
  useEffect(() => {
    if (productDetail.thumbnail) setProductThumbnail(productDetail.thumbnail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail]);

  const [productImages, setProductImages] = useState([]);
  useEffect(() => {
    if (productDetail.images) setProductImages(productDetail.images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail]);

  return CategoriesNameData.isPending ? (
    <div>
      <span className="text-lg text-gray-800 dark:text-white">
        {" "}
        در حال بارگذاری{" "}
      </span>
      <Spinner aria-label="Large spinner example" size="lg" />
    </div>
  ) : CategoriesNameData.isError ? (
    <div>Error: {CategoriesNameData.error.message}</div>
  ) : (
    <Modal
      show={showEditingModal}
      size="4xl"
      onClose={onCloseEditingModal}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <form
          className="relative grid grid-cols-1 gap-5 pb-14 lg:grid-cols-2"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
            >
              دسته بندی
            </label>

            <Select
              sizing="md"
              id="category"
              {...register("category")}
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                setValue("category", e.target.value);
              }}
            >
              {CategoriesNameData.data.map((category: ICategory) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label
              htmlFor="subCategory"
              className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
            >
              زیر دسته بندی
            </label>
            <Controller
              defaultValue={subcategoryName}
              render={({ field }) => (
                <Select
                  sizing="md"
                  {...field}
                  value={subcategoryName}
                  onChange={(e) => {
                    setSubcategoryName(e.target.value);
                    setValue("subcategory", e.target.value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                >
                  <SubCategoriesOptions
                    CategoriesNameData={CategoriesNameData.data}
                    categoryValue={categoryName}
                  />
                </Select>
              )}
              control={control}
              name="subcategory"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
            >
              نام کالا
            </label>
            <input
              type="text"
              id="name"
              placeholder="نام کالا"
              value={productName}
              className={classNames(
                "block w-full rounded-lg border",
                "border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600",
                "focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                "dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
                !!formState.errors.name?.message
                  ? "border-red-300 focus:border-red-600 focus:ring-red-600 dark:focus:border-red-500 dark:focus:ring-red-500"
                  : "",
              )}
              {...register("name")}
              onChange={(e) => {
                setProductName(e.target.value);
                setValue("name", e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <p className="mt-1 text-xs font-semibold text-red-600">
              {formState.errors.name?.message}
            </p>
          </div>
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
            >
              قیمت کالا
            </label>
            <input
              type="number"
              id="price"
              value={productPrice}
              placeholder="قیمت کالا"
              className={classNames(
                "block w-full rounded-lg border",
                "border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600",
                "focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                "dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
                !!formState.errors.price?.message
                  ? "border-red-300 focus:border-red-600 focus:ring-red-600 dark:focus:border-red-500 dark:focus:ring-red-500"
                  : "",
              )}
              {...register("price")}
              onChange={(e) => {
                setProductPrice(Number(e.target.value));
                setValue("price", e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <p className="mt-1 text-xs font-semibold text-red-600">
              {formState.errors.price?.message}
            </p>
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
            >
              موجودی کالا
            </label>
            <input
              type="number"
              value={productQuantity}
              id="quantity"
              placeholder="تعداد"
              className={classNames(
                "block w-full rounded-lg border",
                "border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600",
                "focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                "dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
                !!formState.errors.quantity?.message
                  ? "border-red-300 focus:border-red-600 focus:ring-red-600 dark:focus:border-red-500 dark:focus:ring-red-500"
                  : "",
              )}
              {...register("quantity")}
              onChange={(e) => {
                setProductQuantity(Number(e.target.value));
                setValue("quantity", e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <p className="mt-1 text-xs font-semibold text-red-600">
              {formState.errors.quantity?.message}
            </p>
          </div>
          <div>
            <label
              htmlFor="brand"
              className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
            >
              برند کالا
            </label>
            <input
              type="text"
              value={productBrand}
              id="brand"
              placeholder="برند"
              className={classNames(
                "block w-full rounded-lg border",
                "border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600",
                "focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                "dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
                !!formState.errors.brand?.message
                  ? "border-red-300 focus:border-red-600 focus:ring-red-600 dark:focus:border-red-500 dark:focus:ring-red-500"
                  : "",
              )}
              {...register("brand")}
              onChange={(e) => {
                setProductBrand(e.target.value);
                setValue("brand", e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <p className="mt-1 text-xs font-semibold text-red-600">
              {formState.errors.brand?.message}
            </p>
          </div>
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
            >
              توضیحات کالا
            </label>
            <Textarea
              id="description"
              value={description}
              placeholder="توضیحات محصول"
              rows={8}
              className={classNames(
                "block w-full rounded-lg border",
                "border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600",
                "focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                "dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
                !!formState.errors.description?.message
                  ? "border-red-300 focus:border-red-600 focus:ring-red-600 dark:focus:border-red-500 dark:focus:ring-red-500"
                  : "",
              )}
              {...register("description")}
              onChange={(e) => {
                setDescription(e.target.value);
                setValue("description", e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <p className="mt-1 text-xs font-semibold text-red-600">
              {formState.errors.description?.message}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label
                  className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
                  htmlFor="thumbnail"
                  value="آیکون محصول"
                />
              </div>
              <FileInput
                id="thumbnail"
                helperText="آیکون مربوط به محصول را حتما با فرمت jpg، jpeg یا png ارسال کنید"
                className={classNames(
                  "mb-2 block w-full rounded-lg border text-sm font-medium",
                  "border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-600",
                  "focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                  "dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
                  !!formState.errors.thumbnail?.message
                    ? "border-red-300 focus:border-red-600 focus:ring-red-600 dark:focus:border-red-500 dark:focus:ring-red-500"
                    : "",
                )}
                {...register("thumbnail")}
              />
              <p className="mt-1 text-xs font-semibold text-red-600">
                {formState.errors.thumbnail?.message}
              </p>
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
                  htmlFor="images"
                  value="تصویر محصول"
                />
              </div>
              <FileInput
                className={classNames(
                  "mb-2 block w-full rounded-lg border text-sm font-medium",
                  "border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-600",
                  "focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                  "dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
                  !!formState.errors.images?.message
                    ? "border-red-300 focus:border-red-600 focus:ring-red-600 dark:focus:border-red-500 dark:focus:ring-red-500"
                    : "",
                )}
                {...register("images")}
                id="images"
                helperText="تصویر مربوط به محصول را حتما با فرمت jpg، jpeg یا png ارسال کنید"
              />
              <p className="mt-1 text-xs font-semibold text-red-600">
                {formState.errors.images?.message}
              </p>
            </div>
          </div>
          <div>
            <p className="text-md my-4 block font-medium text-brown-900 dark:text-brown-200">
              آیکون قبلی محصول
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Avatar
                img={`http://localhost:8000/images/products/thumbnails/${productThumbnail}`}
                bordered
                color="pink"
                size="xl"
              />
            </div>
          </div>
          <div>
            <p className="text-md my-4 block font-medium text-brown-900 dark:text-brown-200">
              تصاویر قبلی محصول
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {productImages.map((image) => (
                <Avatar
                  key={image}
                  img={`http://localhost:8000/images/products/images/${image}`}
                  bordered
                  color="success"
                  size="xl"
                />
              ))}
            </div>
          </div>

          {!isLoading ? (
            <button
              type="submit"
              className="absolute bottom-0 w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              ویرایش کردن
            </button>
          ) : (
            <LoadingButton
              name={"در حال ویرایش کردن"}
              className={
                "absolute bottom-0 w-full rounded-lg bg-primary-600 px-5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              }
            />
          )}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditingProductModal;
