import Cookies from "js-cookie";
import { getToken } from "@/libs/tokenManager";
import axios, { InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

export const requestClient = axios.create({
  baseURL: "https://alphacoffee.liara.run/api/",
});

// =====code ostad mohtashami =========

requestClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.url !== "/admin/token") {
    const accessToken = getToken();
    config.headers.Authorization = "Bearer " + accessToken;
    // console.log(config.headers);
  }
  return config;
});

requestClient.interceptors.response.use(
  (response) => {
    return response;
  },

  // 401 or 500

  (error) => {
    const config = error.config;
    // console.log("error", config);
    if (error.response.status === 401 && !config.sent) {
      config.sent = true;
      console.log(error.response.status);

      toast.error("نام کاربری یا کلمه عبور اشتباه است. مجددا تلاش کنید.", {
        theme: "colored",
      });
      if (config.url !== "/auth/token" && config.url !== "/auth/login") {
        // console.log(config.url);
        const refreshToken = Cookies.get("refresh_token");
        requestClient.post("/auth/token", { refreshToken }).then((res) => {
          if (res.status === 200) {
            const accessToken = res.data.token.accessToken;
            Cookies.set("access_token", accessToken);
            // cookie.set("refreshToken", res.data.refreshToken);
            config.headers.Authorization = "Bearer " + accessToken;
            return requestClient(config);
          } else {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            // Cookies.remove("user_role");
            // localStorage.removeItem("user_info");
            // location.href = routes.protected.Login;
          }
        });
      } else if (config.url === "/auth/token" && config.url !== "/auth/login") {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        // Cookies.remove("user_role");
        // localStorage.removeItem("user_info");
        // location.href = routes.protected.Login;
      }
    }
    if (error.response.status === 500 && !config.sent) {
      config.sent = true;
      toast.error("خطای سروری ۵۰۰", {
        theme: "colored",
      });
      console.log(error);
    }
    if (error.response.status === 409 && !config.sent) {
      config.sent = true;
      toast.error("محصول از قبل وجود دارد !!", {
        theme: "colored",
      });
      console.log(error);
    }
    return error.response;
  },
);
