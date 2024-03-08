import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 dark:bg-gray-900 xl:px-0">
      <div className="block py-4 md:max-w-lg">
        <Image
          width={1000}
          height={1000}
          src="/Assets/pictures/404.svg"
          alt="astronaut image"
        />
      </div>
      <div className="flex flex-col items-center text-center xl:max-w-4xl">
        <h1 className="mb-3 text-2xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          صفحه ای که دنبالشی وجود نداره
        </h1>
        <p className="mb-5 max-w-md text-base font-normal text-gray-500 dark:text-gray-400 md:text-lg">
          اوه! به نظر می رسد مسیر را اشتباه اومدی. اگه فکر میکنی مسیرت درسته و
          مشکل از ماست، لطفاً بهمون بگو.
        </p>
        <Link
          className="mb-3 text-2xl font-bold leading-tight text-gray-900 underline dark:text-white sm:text-2xl lg:text-2xl"
          href="/"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
