import BannerComponent from "@/components/Banner";
import CarouselMenu from "@/components/Swiper";
import dataSlider from "@/components/_data/slider-data.json";
import CatagoriesList from "@/components/Categories";

export default function Landing() {
  return (
    <div className="mx-auto mb-auto max-w-8xl bg-gray-50 dark:bg-gray-500 ">
      <BannerComponent />
      <CarouselMenu data={dataSlider} />
      <CatagoriesList />
    </div>
  );
}
