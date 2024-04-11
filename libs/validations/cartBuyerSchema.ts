import * as z from "zod";

// Custom validation function for Iranian phone numbers
function isIranPhoneNumber(value: string) {
  // Regular expression for Iranian phone numbers
  const iranPhoneNumberRegex = /^(\\+98|0|98)?9\d{9}$/;
  return iranPhoneNumberRegex.test(value);
}

export const cartBuyerSchema = z.object({
  address: z
    .string()
    .nonempty({ message: "آدرس پستی خود را وارد کنید" })
    .min(10, "آدرس پستی باید بیش از ۱۰ کاراکتر باشد"),

  phoneNumber: z.string().refine((value) => isIranPhoneNumber(value), {
    message: "شماره همراه وارد شده نامعتبر است",
  }),
});
