import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

//importing components...
import DeliveryCategoryCard from "./DeliveryCategoryCard";

const TopbrandCrousal = () => {
  const categories = [
    {
      image:
        "https://b.zmtcdn.com/data/brand_creatives/logos/35951926095eb5f50404c48ad0ad3646_1611300548.png",
      title: "Maheshwari Restaurant",
    },
    {
      image:
        "https://b.zmtcdn.com/data/brand_creatives/logos/3f09232e40aaf0139f93cce314e2f189_1607428805.png",
      title: "Shake It Up Cafe And Lounge",
    },
    {
      image:
        "https://b.zmtcdn.com/data/brand_creatives/logos/1c358d96f990636b67314f78f141ac42_1611300504.png",
      title: "The Grill'z Tandoori Junction",
    },
    {
      image:
        "https://b.zmtcdn.com/data/brand_creatives/logos/2c68142781ea6d97ac629e5e73eea4fe_1658487853.png",
      title: "Grill's YUM YUM",
    },
    {
      image:
        "https://b.zmtcdn.com/data/brand_creatives/logos/4ddd0a36ff7cf3623b3f1f9955ee8167_1611300526.png",
      title: "Pizzania Food Tower",
    },
    {
      image:
        "https://b.zmtcdn.com/data/brand_creatives/logos/e5d09510c26d3a49c89aa8a597a3a4f1_1581663968.png",
      title: "Pizza Mart",
    },
    {
      image:
        "https://b.zmtcdn.com/data/brand_creatives/logos/95d853ce09c94e7a994df7a6ceafe03a_1664617177.png",
      title: "Manoj Sweet",
    },
    {
      image:
        "https://b.zmtcdn.com/data/brand_creatives/logos/b8775df2b70729f22c033d5efba5aa61_1581677180.png",
      title: "KFC",
    },
    {
      image:
        "https://b.zmtcdn.com/data/brand_creatives/logos/9742d760cf95e9dbf9b869ca9c753f8f_1613212924.png",
      title: "Pizza Hut",
    },
  ];

  const slideConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
    modules: [Navigation],
    className: "mySwiper",
    navigation: true,
  };

  return (
    <>
      <h1 className="text-xl mt-4 md:mt-8 md:text-3xl font-semibold mb-5">
        Top brands for you
      </h1>
      <div className="lg:hidden grid grid-cols-3 md:grid-cols-4 gap-3 justify-center">
        {categories.map((food, index) => (
          <DeliveryCategoryCard key={index} {...food} />
        ))}
      </div>
      <div className="hidden lg:block">
        <Swiper {...slideConfig}>
          {categories.map((food, index) => (
            <SwiperSlide key={index}>
              <DeliveryCategoryCard {...food} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default TopbrandCrousal;
