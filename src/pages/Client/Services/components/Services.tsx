import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowRightOutlined } from "@ant-design/icons";
import IMG_SV1 from "../../../../assets/img/service-1.jpg";
import IMG_SV2 from "../../../../assets/img/service-2.jpg";
import IMG_SV3 from "../../../../assets/img/service-3.jpg";
import IMG_SV4 from "../../../../assets/img/service-4.jpg";
import IMG_SV5 from "../../../../assets/img/service-5.jpg";
import IMG_SV6 from "../../../../assets/img/service-6.jpg";

const Services: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("Client.services.airFreight"),
      description: t("Client.services.description"),
      image: IMG_SV1,
    },
    {
      title: t("Client.services.oceanFreight"),
      description: t("Client.services.description"),
      image: IMG_SV2,
    },
    {
      title: t("Client.services.roadFreight"),
      description: t("Client.services.description"),
      image: IMG_SV3,
    },
    {
      title: t("Client.services.trainFreight"),
      description: t("Client.services.description"),
      image: IMG_SV4,
    },
    {
      title: t("Client.services.customsClearance"),
      description: t("Client.services.description"),
      image: IMG_SV5,
    },
    {
      title: t("Client.services.warehouseSolutions"),
      description: t("Client.services.description"),
      image: IMG_SV6,
    },
  ];

  return (
    <section className="py-10 px-5 bg-white max-w-7xl mx-auto">
      <h2 className="text-center text-3xl font-bold text-gray-800">
        {t("Client.servicesHeading")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md overflow-hidden"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <button className="mt-4 flex items-center text-red-500 font-bold">
                {t("Client.services.readMore")} <ArrowRightOutlined className="ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
