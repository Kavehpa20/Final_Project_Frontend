import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const classNames = (...classnames: string[]) => {
  return classnames.join(" ");
};

// export const errorHandler = (error: AxiosError) => {
//   if (error.response?.status === 401) {
//     toast.error("نام کاربری یا کلمه عبور اشتباه است", { theme: "colored" });
//   }
// };
