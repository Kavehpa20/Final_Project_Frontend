"use client";

import {
  FileInput,
  Label,
  Modal,
  Textarea,
  Select,
  Spinner,
} from "flowbite-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { addProductModalSchema } from "@/libs/validations/addProductModalSchema";
import { classNames } from "@/libs/tools";
import { useAdminPanel } from "@/contexts/AdminPanelContext";
import { LoadingButton } from "@/components/LoadingButton";
import SubCategoriesOptions from "./SubCategoriesOptions";
import { addNewProductApi, getSubcategoryByCategory } from "@/apis/requestsAPI";
import { AxiosError } from "axios";

const AddingProductModal = () => {
  const { showAddingModal, onCloseAddingModal, CategoriesNameData } =
    useAdminPanel();

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState, watch, control } =
    useForm<IAddingProduct>({
      mode: "all",
      resolver: zodResolver(addProductModalSchema),
    });
  const categoryValue = watch("category", "قهوه");
  const subcategoryValue = watch("subcategory", "گانودرما");
  const router = useRouter();

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
      category: category._id,
      subcategory: await subcategoryId().then(() => subCatId._id),
      name: data.name,
      price: Number(data.price),
      quantity: Number(data.quantity),
      brand: data.brand,
      description: data.description,
      thumbnail: data.thumbnail[0],
      images: data.images[0],
    };

    console.log(body);

    setIsLoading((isLoading) => true);
    try {
      const res = await addNewProductApi(body);
      console.log(res);
      // toast.warning(res.statusText, { theme: "colored" });
      // router.push("admin/admin_panel");
      setIsLoading((isLoading) => false);
    } catch (error) {
      // console.log("error");
      console.log(error);
      // errorHandler(error as AxiosError);
      setIsLoading((isLoading) => false);
    }
  };

  return CategoriesNameData.isPending ? (
    <span></span>
  ) : CategoriesNameData.isError ? (
    <div>Error: {CategoriesNameData.error.message}</div>
  ) : (
    <Modal show={showAddingModal} size="4xl" onClose={onCloseAddingModal} popup>
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

            <Select sizing="md" id="category" {...register("category")}>
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
              defaultValue={subcategoryValue}
              render={({ field }) => (
                <Select sizing="md" {...field}>
                  <SubCategoriesOptions
                    CategoriesNameData={CategoriesNameData.data}
                    categoryValue={categoryValue}
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
                  value="آپلود عکس"
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
          {!isLoading ? (
            <button
              type="submit"
              className="absolute bottom-0 w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              اضافه کردن
            </button>
          ) : (
            <LoadingButton
              name={"اضافه کردن"}
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

export default AddingProductModal;
