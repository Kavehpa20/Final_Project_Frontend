import { Card } from "flowbite-react";

export default async function CardComponent({ name, price, thumbnail }) {
  return (
    <Card className="mx-auto max-w-sm" imgSrc={await thumbnail} horizontal>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {await name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {await price}
      </p>
    </Card>
  );
}
