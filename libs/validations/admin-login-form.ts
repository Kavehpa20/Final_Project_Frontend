import * as z from "zod";

export const adminLoginFormSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "نام کاربری را وارد کنید" })
    .min(4, "نام کاربری باید بیش از ۴ کاراکتر باشد"),
  password: z
    .string()
    .nonempty({ message: "پسورد را وارد کنید" })
    .min(4, "پسورد باید بیش از ۴ کاراکتر باشد"),
});
