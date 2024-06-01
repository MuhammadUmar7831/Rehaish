import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCreative,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ImageSwiper(props) {
  const { imageUrls } = props;

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectCreative]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      lazy={true}
      effect={"creative"}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
    >
      {imageUrls &&
        imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex justify-center w-auto h-screen overflow-hidden bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/images/Rehaish.png)` }}
            >
              <img
                alt={`Slide ${index}`}
                src={url}
                effect="blur"
                className="object-cover w-full"
              />
              <a
                href={url}
                target="_blank"
                className="absolute right-2 top-2 px-4 py-2 bg-green-400 hover:bg-green-500 text-white"
              >
                Preview
              </a>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
