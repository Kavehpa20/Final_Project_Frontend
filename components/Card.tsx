import { Card } from "flowbite-react";

export default async function CardComponent({
  name,
  price,
  thumbnail,
  slugname,
}: IProduct) {
  return (
    <Card
      className="mx-auto max-w-sm overflow-hidden md:h-48"
      imgSrc={`http://localhost:8000/images/products/thumbnails/${await thumbnail}`}
      horizontal
    >
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white md:text-lg xl:text-xl">
        {await name}
      </h5>
      <p className="font-IRANSans font-normal text-gray-700 dark:text-gray-400">
        {await price?.toLocaleString()} تومان
      </p>
    </Card>
  );
}
