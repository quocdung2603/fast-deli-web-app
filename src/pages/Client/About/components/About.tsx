import React from "react";
import { GlobalOutlined, CarOutlined } from "@ant-design/icons";
import IMG_ABOUT from "../../../../assets/img/about.jpg";

const About: React.FC = () => {
  return (
    <section className="py-10 px-5 bg-white flex flex-col md:flex-row items-center max-w-7xl mx-auto">
      <div className="w-full md:w-1/2">
        <img
          src={IMG_ABOUT}
          alt="About Us"
          className="w-full h-auto rounded-md shadow-lg"
        />
      </div>
      <div className="w-full md:w-1/2 md:pl-10">
        <h2 className="text-red-500 text-sm uppercase font-bold">About Us</h2>
        <h3 className="text-3xl font-bold text-gray-800 mt-2">
          Quick Transport and Logistics Solutions
        </h3>
        <p className="text-gray-600 mt-4">
          Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
          diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
          lorem sit clita duo justo magna dolore erat amet.
        </p>
        <div className="flex mt-6 space-x-6">
          <div className="flex items-center space-x-2">
            <GlobalOutlined className="text-red-500 text-2xl" />
            <div>
              <h4 className="font-bold">Global Coverage</h4>
              <p className="text-gray-600 text-sm">
                Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem
                diam justo.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CarOutlined className="text-red-500 text-2xl" />
            <div>
              <h4 className="font-bold">On Time Delivery</h4>
              <p className="text-gray-600 text-sm">
                Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem
                diam justo.
              </p>
            </div>
          </div>
        </div>
        <button className="mt-6 bg-red-500 text-white px-6 py-2 rounded-md font-bold hover:bg-red-600">
          Explore More
        </button>
      </div>
    </section>
  );
};

export default About;
