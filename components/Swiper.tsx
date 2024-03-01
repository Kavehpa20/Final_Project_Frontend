"use client"; // <===== REQUIRED
import React, { CSSProperties } from "react";

// Our custom button component
import SliderButtons from "./SliderButtons";

// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const SwiperMenu: React.FC<DemoSliderProps> = ({ data }) => {
  return (
    <section className="mx-auto h-dvh w-full">
      <div className="h-screen">
        <ul className="h-dvh w-full">
          <Swiper
            navigation
            pagination={{ type: "bullets", clickable: true }}
            autoplay={true}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
            style={
              {
                "--swiper-pagination-color": "#Fff",
                "--swiper-navigation-color": "#FFF",
                "--swiper-pagination-bullet-inactive-color": "#999999",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bullet-size": "16px",
                "--swiper-pagination-bullet-horizontal-gap": "6px",
              } as CSSProperties
            }
          >
            {data.map(({ id, image, tagline, title, buttons }) => (
              <SwiperSlide key={id}>
                <div className="absolute left-0 top-0 h-dvh w-full">
                  <Image
                    className="h-dvh w-full object-fill"
                    src={image}
                    alt={title}
                    height={1500}
                    width={1500}
                  />
                </div>
                <div className="absolute left-0 top-0 h-dvh w-full bg-black opacity-10"></div>
                <div className="relative z-10 flex items-center justify-center">
                  <div className="flex h-dvh flex-col justify-evenly gap-8 text-center">
                    {tagline && (
                      <p className="text-md font-semibold text-white sm:text-xl lg:text-3xl">
                        {tagline}
                      </p>
                    )}
                    <p className="text-3xl font-bold text-white sm:text-6xl lg:text-8xl">
                      {title}
                    </p>
                    {buttons.length > 0 ? (
                      <p className=" mt-10 inline-block rounded-full bg-gray-500 px-9 py-2 text-white dark:bg-gray-900">
                        <SliderButtons buttons={buttons} />
                      </p>
                    ) : null}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </div>
    </section>
  );
};

export default SwiperMenu;
