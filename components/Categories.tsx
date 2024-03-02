import Link from "next/link";
import categories from "@/components/temp/categories.json";

export default function CategoriesList() {
  return (
    <div>
      {categories.map((el, i) => (
        <div key={i}>
          <Link href={`/${el.path}`}>
            <p>{el.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
