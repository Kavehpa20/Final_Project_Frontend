import Link from "next/link";
import ProductContainer from "./ProductContainer";
import ProductsHeaderLink from "./ProductsHeaderLink";
import axios from "axios";
const endPoints: string[] = [];

export default async function CategoriesList({ categories }) {
  categories.map((el: ICategory) =>
    endPoints.push(
      `http://localhost:8000/api/products?category=${el._id}&limit=6`,
    ),
  );

  const res = await axios
    .all(endPoints.map((endPoint) => axios.get(endPoint)))
    .then((data) => data);
  // console.log(res[0].data.data.products);

  return (
    <div className="mt-3">
      {categories.map((el: ICategory, i) => (
        <div key={el.name}>
          <Link href={`/${el.slugname}`}>
            <ProductsHeaderLink text={el.name} />
          </Link>
          <ProductContainer data={res[i].data.data.products} />
        </div>
      ))}
    </div>
  );
}
