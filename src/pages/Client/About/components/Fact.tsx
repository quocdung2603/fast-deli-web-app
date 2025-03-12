import React from "react";

const facts = [
  { title: "Happy Clients", value: "1234", icon: "👥", color: "bg-red-500" },
  {
    title: "Customer Reviews",
    value: "1234",
    icon: "⭐",
    color: "bg-green-600",
  },
  {
    title: "Complete Shipments",
    value: "1234",
    icon: "🚛",
    color: "bg-blue-400",
  },
];

const Fact: React.FC = () => {
  return (
    <section className="py-10 px-5 max-w-7xl mx-auto mt-10">
      <h2 className="text-lg font-semibold text-blue-600">SOME FACTS</h2>
      <h3 className="text-3xl font-bold text-gray-800">
        #1 Place To Manage All Of Your Shipments
      </h3>
      <p className="text-gray-600 mt-4">
        Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam
        amet diam et eos.
      </p>
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
