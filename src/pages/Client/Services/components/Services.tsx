import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import IMG_SV1 from "../../../../assets/img/service-1.jpg";
import IMG_SV2 from "../../../../assets/img/service-2.jpg";
import IMG_SV3 from "../../../../assets/img/service-3.jpg";
import IMG_SV4 from "../../../../assets/img/service-4.jpg";
import IMG_SV5 from "../../../../assets/img/service-5.jpg";
import IMG_SV6 from "../../../../assets/img/service-6.jpg";


const services = [
  {
    title: "Air Freight",
    description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.",
    image: IMG_SV1,
  },
  {
    title: "Ocean Freight",
    description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.",
    image: IMG_SV2,
  },
  {
    title: "Road Freight",
    description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.",
    image: IMG_SV3,
  },
  {
    title: "Train Freight",
    description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.",
    image: IMG_SV4,
  },
  {
    title: "Customs Clearance",
    description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.",
    image: IMG_SV5,
  },
  {
    title: "Warehouse Solutions",
    description: "Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.",
    image: IMG_SV6,
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-10 px-5 bg-white max-w-7xl mx-auto">
      <h2 className="text-center text-3xl font-bold text-gray-800">Explore Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white shadow-md rounded-md overflow-hidden">
            <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <button className="mt-4 flex items-center text-red-500 font-bold">
                Read More <ArrowRightOutlined className="ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
