"use client";

import React, { CSSProperties } from "react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperComponent = ({ data }: { data: string[] }) => {
  return (
    <section className="">
      <div className="">
        <ul className="">
          <Swiper
            navigation
            pagination={{ type: "bullets", clickable: true }}
            autoplay={true}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
            style={
              {
                "--swiper-pagination-color": "#Fff",
                "--swiper-navigation-color": "#ccc",
                "--swiper-navigation-size": "16px",
                "--swiper-pagination-bullet-inactive-color": "#999999",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bullet-size": "8px",
                "--swiper-pagination-bullet-horizontal-gap": "3px",
              } as CSSProperties
            }
          >
            {data.map((picture) => (
              <SwiperSlide key={picture}>
                {
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="h-fit object-contain"
                    src={`http://localhost:8000/images/products/images/${picture}`}
                    alt={picture}
                  />
                }
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </div>
    </section>
  );
};

export default SwiperComponent;
