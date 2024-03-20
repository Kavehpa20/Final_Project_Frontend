import * as z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

export const addProductModalSchema = z.object({
  category: z.string().nonempty({ message: "دسته بندی را وارد کنید" }),
  subcategory: z.string().nonempty({ message: "زیر دسته بندی را وارد کنید" }),
  name: z
    .string()
    .nonempty({ message: "نام محصول را وارد کنید" })
    .min(2, "نام محصول باید بیش از ۲ کاراکتر باشد"),
  price: z
    .string()
    .transform((val) => Number(val))
    .pipe(
      z.coerce
        .number()
        .positive({ message: "حداقل قیمت یک محصول می تواند ۱,۰۰۰ تومان باشد" })
        .gte(1000, "قیمت نمی تواند کمتر از ۱,۰۰۰ تومان باشد"),
    ),

  quantity: z
    .string()
    .transform((val) => Number(val))
    .pipe(
      z.coerce
        .number()
        .positive({ message: "تعداد محصول باید حداقل یک عدد باشد" })
        .gte(1, "تعداد نمی تواند کمتر از یک عدد باشد"),
    ),

  brand: z
    .string()
    .nonempty({ message: "برند محصول را وارد کنید" })
    .min(2, "برند محصول باید بیش از ۲ کاراکتر باشد"),
  description: z
    .string()
    .nonempty({ message: "توضیحات محصول را وارد کنید" })
    .min(10, "توضیحات محصول باید بیش از ۱۰ کاراکتر باشد"),

  thumbnail: z
    .any()
    .refine((files) => files?.length == 1, "آیکون کالا را بارگذاری کنید")
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, "حداکثر سایز عکس 2MB می باشد")
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),

  images: z
    .any()
    .refine((files) => files?.length == 1, "تصویر کالا را بارگذاری کنید")
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, "حداکثر سایز عکس 2MB می باشد")
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});
//  z.preprocess(
//   (a) => parseInt(z.string().parse(a), 10),
//   z
//     .number()
//     .positive({ message: "قیمت نمی تواند منفی باشد" })
//     .min(1, "تعداد نمی تواند کمتر از یک عدد باشد"),
// ),
//  z.number().positive({ message: "قیمت نمی تواند منفی باشد" }),
