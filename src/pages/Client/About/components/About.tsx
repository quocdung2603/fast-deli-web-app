import React from "react";
import { useTranslation } from "react-i18next";
import { GlobalOutlined, CarOutlined } from "@ant-design/icons";
import IMG_ABOUT from "../../../../assets/img/about.jpg";

const About: React.FC = () => {
  const { t } = useTranslation();

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
        <h2 className="text-red-500 text-sm uppercase font-bold">
          {t("Client.aboutUsSmall")}
        </h2>
        <h3 className="text-3xl font-bold text-gray-800 mt-2">
          {t("Client.aboutUsTitle")}
        </h3>
        <p className="text-gray-600 mt-4">
          {t("Client.aboutUsDesc")}
        </p>
        <div className="flex mt-6 space-x-6">
          <div className="flex items-center space-x-2">
            <GlobalOutlined className="text-red-500 text-2xl" />
            <div>
              <h4 className="font-bold">{t("Client.aboutGlobalTitle")}</h4>
              <p className="text-gray-600 text-sm">{t("Client.aboutGlobalDesc")}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CarOutlined className="text-red-500 text-2xl" />
            <div>
              <h4 className="font-bold">{t("Client.aboutDeliveryTitle")}</h4>
              <p className="text-gray-600 text-sm">{t("Client.aboutDeliveryDesc")}</p>
            </div>
          </div>
        </div>
        <button className="mt-6 bg-red-500 text-white px-6 py-2 rounded-md font-bold hover:bg-red-600">
          {t("Client.aboutExploreBtn")}
        </button>
      </div>
    </section>
  );
};

export default About;
