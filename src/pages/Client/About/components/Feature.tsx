import React from "react";
import {
  GlobalOutlined,
  ClockCircleOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import IMG_FEATURE from "../../../../assets/img/feature.jpg";

const features = [
  {
    icon: <GlobalOutlined className="text-red-500 text-3xl" />,
    title: "Worldwide Service",
    description:
      "Diam dolor ipsum sit amet eos erat ipsum lorem sed stet lorem sit clita duo justo magna erat amet",
  },
  {
    icon: <ClockCircleOutlined className="text-red-500 text-3xl" />,
    title: "On Time Delivery",
    description:
      "Diam dolor ipsum sit amet eos erat ipsum lorem sed stet lorem sit clita duo justo magna erat amet",
  },
  {
    icon: <CustomerServiceOutlined className="text-red-500 text-3xl" />,
    title: "24/7 Telephone Support",
    description:
      "Diam dolor ipsum sit amet eos erat ipsum lorem sed stet lorem sit clita duo justo magna erat amet",
  },
];

const Feature: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto py-10 px-5">
      <div className="lg:w-1/2">
        <h3 className="text-blue-600 font-semibold text-lg">OUR FEATURES</h3>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          We Are Trusted Logistics Company Since 1990
        </h2>
        <div className="mt-6 space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="p-3 bg-gray-200 rounded-full">{feature.icon}</div>
              <div>
                <h4 className="text-lg font-bold text-gray-800">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:w-1/2 mt-8 lg:mt-0">
        <img
          src={IMG_FEATURE}
          alt="Logistics"
          className="w-full rounded-lg shadow-md"
        />
      </div>
    </section>
  );
};

export default Feature;
