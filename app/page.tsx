import BannerComponent from "@/components/Banner";
import CarouselMenu from "@/components/Swiper";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import dataSlider from "@/components/_data/slider-data.json";

export default function Home() {
  return (
    <div className="mx-auto max-w-8xl bg-gray-50 dark:bg-gray-500 ">
      <BannerComponent />
      <CarouselMenu data={dataSlider} />
      <Container />
    </div>
  );
}
