import React from "react";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  XOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold">
            {t("Client.Footer.address")}
          </h3>
          <p className="flex items-center mt-2">
            <EnvironmentOutlined className="mr-2" /> 123 Street, New York, USA
          </p>
          <p className="flex items-center mt-2">
            <PhoneOutlined className="mr-2" /> +012 345 67890
          </p>
          <p className="flex items-center mt-2">
            <MailOutlined className="mr-2" /> info@example.com
          </p>
          <div className="flex space-x-3 mt-4">
            <FacebookOutlined className="text-xl cursor-pointer" />
            <XOutlined className="text-xl cursor-pointer" />
            <LinkedinOutlined className="text-xl cursor-pointer" />
            <YoutubeOutlined className="text-xl cursor-pointer" />
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold">
            {t("Client.Footer.services")}
          </h3>
          <ul className="mt-2 space-y-2">
            <li>{t("Client.Footer.airFreight")}</li>
            <li>{t("Client.Footer.seaFreight")}</li>
            <li>{t("Client.Footer.roadFreight")}</li>
            <li>{t("Client.Footer.logisticSolutions")}</li>
            <li>{t("Client.Footer.industrySolutions")}</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">
            {t("Client.Footer.quickLinks")}
          </h3>
          <ul className="mt-2 space-y-2">
            <li>{t("Client.Footer.aboutUs")}</li>
            <li>{t("Client.Footer.contactUs")}</li>
            <li>{t("Client.Footer.ourServices")}</li>
            <li>{t("Client.Footer.terms")}</li>
            <li>{t("Client.Footer.support")}</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold">
            {t("Client.Footer.newsletter")}
          </h3>
          <p className="mt-2 text-gray-400">
            {t("Client.Footer.newsletterDesc")}
          </p>
          <div className="flex mt-4">
            <input
              type="email"
              placeholder={t("Client.Footer.placeholderEmail")}
              className="p-2 flex-1 text-black"
            />
            <button className="bg-red-500 text-white px-4 py-2">
              {t("Client.Footer.signup")}
            </button>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-400 mt-10">
        {t("Client.Footer.copyright")}
      </p>
    </footer>
  );
};

export default Footer;
