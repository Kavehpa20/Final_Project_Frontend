"use client";
import { Flowbite } from "flowbite-react";

import CarouselMenu from "@/components/Carousel";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <Flowbite>
      <div className="dark:bg-gray-500">
        <Navbar />
        <CarouselMenu />
      </div>
    </Flowbite>
  );
}
