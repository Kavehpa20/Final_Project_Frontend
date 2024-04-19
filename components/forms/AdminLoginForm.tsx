"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { classNames } from "@/libs/tools";
import { adminLoginFormSchema } from "@/libs/validations/admin-login-form";
import { loginRequest } from "@/apis/requestsAPI";
import { setToken } from "@/libs/tokenManager";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LoadingButton } from "../LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { userFuncAction } from "@/redux/slices/user/userSlice";

const AdminLoginForm = () => {
  const user = useSelector((state: IRootState) => state.user.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState } = useForm<ILoginAdmin>({
    mode: "all",
    resolver: zodResolver(adminLoginFormSchema),
  });
  const router = useRouter();

  const onSubmitHandler = async (data: ILoginAdmin) => {
    const body = { username: data.username, password: data.password };
    setIsLoading(true);
    try {
      const res = await loginRequest(body);
      setToken("access_token", res.token.accessToken);
      setToken("refresh_token", res.token.refreshToken);

      toast.success(" با موفقیت وارد شدید. خوش آمدید.", { theme: "colored" });
      router.push("admin/admin_panel");
      dispatch(userFuncAction(res.data.user));
      setIsLoading(false);
    } catch (error) {
      // errorHandler(error as AxiosError);
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Link
          href="/"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            width={500}
            height={500}
            src="/Assets/pictures/alpha-coffee-logo-dark.png"
            alt="alpha-coffee-logo"
            className="mr-2 hidden h-20 w-32 dark:block"
          />
          <Image
            width={500}
            height={500}
            src="/Assets/pictures/alpha-coffee-logo.png"
            alt="alpha-coffee-logo"
            className="mr-2 block h-20 w-32 dark:hidden"
          />
        </Link>
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-brown-900 dark:text-brown-200 md:text-2xl">
              ورود به پنل مدیریت قهوه آلفا
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
                >
                  نام کاربری
                </label>
                <input
                  type="text"
                  id="username"
                  className={classNames(
                    "block w-full rounded-lg border",
                    "border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600",
                    "focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                    "dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
                    !!formState.errors.username?.message
                      ? "border-red-300 focus:border-red-600 focus:ring-red-600 dark:border-red-300 dark:focus:border-red-500 dark:focus:ring-red-500"
                      : "",
                  )}
                  placeholder="نام کاربری"
                  {...register("username")}
                />
                <p className="mt-1 text-xs font-semibold text-red-600">
                  {formState.errors.username?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-brown-900 dark:text-brown-200"
                >
                  پسورد
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="پسورد"
                  className={classNames(
                    "block w-full rounded-lg border",
                    "border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600",
                    "focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                    "dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
                    !!formState.errors.password?.message
                      ? "border-red-300 focus:border-red-600 focus:ring-red-600 dark:border-red-300 dark:focus:border-red-500 dark:focus:ring-red-500"
                      : "",
                  )}
                  {...register("password")}
                />
                <p className="mt-1 text-xs font-semibold text-red-600">
                  {formState.errors.password?.message}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 ml-2 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-brown-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-brown-600"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-brown-900 dark:text-brown-200"
                    >
                      من را به خاطر داشته باش
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-900 hover:border-primary-200 hover:text-primary-500 hover:underline dark:text-primary-200 dark:hover:border-primary-50 dark:hover:text-primary-100"
                >
                  رمز عبور خود را فراموش کرده اید؟
                </a>
              </div>
              {!isLoading ? (
                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  ورود
                </button>
              ) : (
                <LoadingButton
                  name={"ورود"}
                  className={
                    "w-full rounded-lg bg-primary-600 px-5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  }
                />
              )}

              <div className="flex justify-between">
                <p className="text-sm font-light text-brown-900 dark:text-brown-200">
                  اگر اکانت ندارید با مدیر در ارتباط باشید{" "}
                </p>
                <Link
                  href="/"
                  className="mr-4 font-medium text-primary-900 hover:border-primary-200 hover:text-primary-500 hover:underline dark:text-primary-200 dark:hover:border-primary-50 dark:hover:text-primary-100"
                >
                  بازگشت به سایت
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLoginForm;
