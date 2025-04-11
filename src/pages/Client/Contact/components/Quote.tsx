import React from "react";
import { Input, Select, Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const Quote: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto py-10 px-5 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Section */}
      <div>
        <h5 className="text-blue-500 font-semibold">{t("Client.quoteTitle")}</h5>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          {t("Client.quoteSubTitle")}
        </h2>
        <p className="text-gray-600 mt-4">{t("Client.quoteDescription")}</p>
        <div className="mt-6 flex items-center space-x-4">
          <div className="bg-red-500 p-4 rounded">
            <PhoneOutlined className="text-white text-2xl" />
          </div>
          <div>
            <p className="font-bold">{t("Client.quoteCallLabel")}</p>
            <p className="text-red-500 text-xl font-bold">
              {t("Client.quotePhone")}
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="bg-red-50 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder={t("Client.form.name")} className="py-2" />
          <Input placeholder={t("Client.form.email")} className="py-2" />
          <Input placeholder={t("Client.form.mobile")} className="py-2" />
          <Select placeholder={t("Client.form.freight")} className="h-10">
            <Option value="air">{t("Client.form.freightOptions.air")}</Option>
            <Option value="ocean">{t("Client.form.freightOptions.ocean")}</Option>
            <Option value="road">{t("Client.form.freightOptions.road")}</Option>
          </Select>
        </div>
        <Input.TextArea
          placeholder={t("Client.form.note")}
          rows={3}
          className="mt-4"
        />
        <Button
          type="primary"
          className="w-full bg-red-500 mt-4 py-2 text-white font-bold"
        >
          {t("Client.form.submit")}
        </Button>
      </div>
    </section>
  );
};

export default Quote;
