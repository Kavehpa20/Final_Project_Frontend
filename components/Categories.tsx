import Link from "next/link";
import categories from "@/components/temp/categories.json";
import CardComponent from "./Card";
import ProductContainer from "./ProductContainer";
import ProductsHeaderLink from "./ProductsHeaderLink";

export default function CategoriesList() {
  return (
    <div className="mt-3">
      {categories.map((el, i) => (
        <div key={i}>
          <Link href={`/${el.path}`}>
            <ProductsHeaderLink text={el.name} />
            <ProductContainer />
          </Link>
        </div>
      ))}
    </div>
  );
}
