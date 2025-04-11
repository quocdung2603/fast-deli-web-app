import React from "react";
import { useTranslation } from "react-i18next";

const Fact: React.FC = () => {
  const { t } = useTranslation();

  const facts = [
    {
      title: t("Client.factItems.happyClients"),
      value: "1234",
      icon: "👥",
      color: "bg-red-500",
    },
    {
      title: t("Client.factItems.customerReviews"),
      value: "1234",
      icon: "⭐",
      color: "bg-green-600",
    },
    {
      title: t("Client.factItems.completeShipments"),
      value: "1234",
      icon: "🚛",
      color: "bg-blue-400",
    },
  ];

  return (
    <section className="py-10 px-5 max-w-7xl mx-auto mt-10">
      <h2 className="text-lg font-semibold text-blue-600">
        {t("Client.factHeadingSmall")}
      </h2>
      <h3 className="text-3xl font-bold text-gray-800">
        {t("Client.factHeadingMain")}
      </h3>
      <p className="text-gray-600 mt-4">{t("Client.factDescription")}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {facts.map((fact, index) => (
          <div
            key={index}
            className={`p-6 ${fact.color} text-white rounded-lg shadow-lg`}
          >
            <div className="text-4xl">{fact.icon}</div>
            <h4 className="text-3xl font-bold mt-2">{fact.value}</h4>
            <p className="text-lg">{fact.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Fact;
