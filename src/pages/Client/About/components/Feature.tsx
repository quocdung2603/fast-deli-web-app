import React from "react";
import {
  GlobalOutlined,
  ClockCircleOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import IMG_FEATURE from "../../../../assets/img/feature.jpg";

const Feature: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <GlobalOutlined className="text-red-500 text-3xl" />,
      title: t("Client.features.worldwide"),
      description: t("Client.features.description"),
    },
    {
      icon: <ClockCircleOutlined className="text-red-500 text-3xl" />,
      title: t("Client.features.onTime"),
      description: t("Client.features.description"),
    },
    {
      icon: <CustomerServiceOutlined className="text-red-500 text-3xl" />,
      title: t("Client.features.support247"),
      description: t("Client.features.description"),
    },
  ];

  return (
    <section className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto py-10 px-5">
      <div className="lg:w-1/2">
        <h3 className="text-blue-600 font-semibold text-lg">
          {t("Client.featureHeading")}
        </h3>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          {t("Client.featureSubheading")}
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
