import React from "react";
import { Carousel as AntdCarousel } from "antd";
import IMG_CAROUSEL_1 from "../../../../assets/img/carousel-1.jpg";
import IMG_CAROUSEL_2 from "../../../../assets/img/carousel-2.jpg";

const Carousel: React.FC = () => {
  return (
    <AntdCarousel autoplay>
      <div className="relative h-96">
        <img src={IMG_CAROUSEL_1} alt="Slide 1" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-3xl font-bold">
            #1 Place For Your <span className="text-red-500">Logistics</span> Solution
          </h2>
          <p className="mt-2 max-w-2xl">
            Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et
            diam justo clita et kasd rebum sea elitr.
          </p>
          <div className="mt-4 flex space-x-4">
            <button className="bg-red-500 px-4 py-2 text-white font-semibold rounded-md">Read More</button>
            <button className="bg-blue-500 px-4 py-2 text-white font-semibold rounded-md">Free Quote</button>
          </div>
        </div>
      </div>
      <div className="relative h-96">
        <img src={IMG_CAROUSEL_2} alt="Slide 2" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-3xl font-bold">
            Reliable & Efficient <span className="text-red-500">Transport</span> Services
          </h2>
          <p className="mt-2 max-w-2xl">
            Providing the best solutions for your cargo transportation with safety and efficiency.
          </p>
          <div className="mt-4 flex space-x-4">
            <button className="bg-red-500 px-4 py-2 text-white font-semibold rounded-md">Read More</button>
            <button className="bg-blue-500 px-4 py-2 text-white font-semibold rounded-md">Free Quote</button>
          </div>
        </div>
      </div>
    </AntdCarousel>
  );
};

export default Carousel;
