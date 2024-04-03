import BannerComponent from "@/components/Banner";
import CarouselMenu from "@/components/Swiper";
import dataSlider from "@/components/_data/slider-data.json";
import CatagoriesList from "@/components/Categories";
import { getCategories } from "@/apis/getCategories";
import CategoryButtonGroups from "../../components/groupButtons/categoryButtonGroups";

async function getData() {
  const data = await getCategories();
  return data.data;
}

export default async function Landing() {
  const data = await getData();
  return (
    <div className="mx-auto mb-auto max-w-8xl bg-gray-50 dark:bg-gray-500 ">
      <BannerComponent />

      <div className="my-2 flex justify-center">
        <CategoryButtonGroups />
      </div>
      <CarouselMenu data={dataSlider} />
      <CatagoriesList categories={data.categories} />
    </div>
  );
}
