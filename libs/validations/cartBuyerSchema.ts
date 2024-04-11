import * as z from "zod";

// Custom validation function for Iranian phone numbers
function isIranPhoneNumber(value) {
  // Regular expression for Iranian phone numbers
  const iranPhoneNumberRegex = /^(\\+98|0|98)?9\d{9}$/;
  return iranPhoneNumberRegex.test(value);
}

export const cartBuyerSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: "نام خود را وارد کنید" })
    .min(3, "نام باید بیش از ۳ کاراکتر باشد"),

  lastName: z
    .string()
    .nonempty({ message: "نام خانوادگی خود را وارد کنید" })
    .min(3, "نام خانوادگی باید بیش از ۳ کاراکتر باشد"),

  address: z
    .string()
    .nonempty({ message: "آدرس پستی خود را وارد کنید" })
    .min(10, "آدرس پستی باید بیش از ۱۰ کاراکتر باشد"),

  phoneNumber: z.string().refine((value) => isIranPhoneNumber(value), {
    message: "شماره همراه وارد شده نامعتبر است",
  }),
});
