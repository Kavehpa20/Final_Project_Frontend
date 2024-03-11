import Cookies from "js-cookie";
import { getToken } from "@/libs/tokenManager";
import axios from "axios";
import { toast } from "react-toastify";

export const requestClient = axios.create({
  baseURL: "http://localhost:8000/api/",
});

// =====code ostad mohtashami =========

requestClient.interceptors.request.use((config) => {
  if (config.url !== "/admin/token") {
    const accessToken = getToken();

    config.headers.Authorization = "Bearer " + accessToken;
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
    // console.log("config", config);
    if (error.response.status === 401 && !config.sent) {
      config.sent = true;
      console.log("1 here");
      toast.error("نام کاربری یا کلمه عبور اشتباه است.", { theme: "colored" });
      if (config.url !== "/auth/token" && config.url !== "/auth/login") {
        const refreshToken = Cookies.get("refresh_token");
        requestClient.post("/auth/token", { refreshToken }).then((res) => {
          if (res.status === 200) {
            const accessToken = res.data.token.accessToken;
            Cookies.set("Alpha_coffee", accessToken);
            // cookie.set("refreshToken", res.data.refreshToken);
            config.headers.Authorization = "Bearer " + accessToken;
            return requestClient(config);
          } else {
            Cookies.remove("Alpha_coffee");
            Cookies.remove("refresh_token");
            // Cookies.remove("user_role");
            // localStorage.removeItem("user_info");
            // location.href = routes.protected.Login;
          }
        });
      } else if (config.url === "/auth/token" && config.url !== "/auth/login") {
        Cookies.remove("Alpha_coffee");
        Cookies.remove("refresh_token");
        // Cookies.remove("user_role");
        // localStorage.removeItem("user_info");
        // location.href = routes.protected.Login;
      }
    }
    return error.response;
  },
);
