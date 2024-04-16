import BannerComponent from "@/components/Banner";
import CarouselMenu from "@/components/Swiper";
import dataSlider from "@/components/_data/slider-data.json";
import CatagoriesList from "@/components/Categories";
import { getCategories } from "@/apis/getCategories";
import CategoryButtonGroups from "../../components/groupButtons/categoryButtonGroups";
import SearchInput from "@/components/SearchInput";
import SearchModal from "@/components/SearchModal";

async function getData() {
  const data = await getCategories();
  return data.data;
}

export default async function Landing() {
  const data = await getData();
  return (
    <div className="mx-auto mb-auto max-w-8xl bg-gray-50 dark:bg-gray-500 ">
      <BannerComponent />
      <div className="mx-5 my-2 flex items-center justify-between gap-5 sm:flex-col-reverse md:flex-row">
        <CategoryButtonGroups />
        <SearchModal />
        {/* <SearchInput /> */}
      </div>
      <CarouselMenu data={dataSlider} />
      <CatagoriesList categories={data.categories} />
    </div>
  );
}
