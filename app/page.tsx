import BannerComponent from "@/components/Banner";
import CarouselMenu from "@/components/Swiper";
import dataSlider from "@/components/_data/slider-data.json";
import CatagoriesList from "@/components/Categories";
import { landingDataFetching } from "@/apis/landing-request";

async function getData() {
  const data = await landingDataFetching();
  return data.data;
}

export default async function Landing() {
  const data = await getData();
  return (
    <div className="mx-auto mb-auto max-w-8xl bg-gray-50 dark:bg-gray-500 ">
      <BannerComponent />
      <CarouselMenu data={dataSlider} />
      <CatagoriesList categories={data.categories} />
    </div>
  );
}
