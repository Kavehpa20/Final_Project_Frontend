import Link from "next/link";
import ProductContainer from "./ProductContainer";
import ProductsHeaderLink from "./ProductsHeaderLink";
import axios from "axios";
import { baseUrl } from "@/apis/axiosBaseURL";
const endPoints: string[] = [];

export default async function CategoriesList({
  categories,
}: {
  categories: [ICategory];
}) {
  categories.map((el: ICategory) =>
    endPoints.push(`${baseUrl}api/products?category=${el._id}&limit=9`),
  );

  const res = await axios
    .all(endPoints.map((endPoint) => axios.get(endPoint)))
    .then((data) => data);

  return (
    <div className="mt-3">
      {categories.map((el: ICategory, i: number) => (
        <div key={el.name}>
          <Link href={`/${el.slugname}`}>
            <ProductsHeaderLink text={el.slugname} />
          </Link>
          <ProductContainer data={res[i].data.data.products} />
        </div>
      ))}
    </div>
  );
}
