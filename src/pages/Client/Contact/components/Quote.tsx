import React from "react";
import { Input, Select, Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";

const { Option } = Select;

const Quote: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto py-10 px-5 grid grid-cols-1 md:grid-cols-2 gap-8 ">
      {/* Left Section */}
      <div>
        <h5 className="text-blue-500 font-semibold">GET A QUOTE</h5>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">Request A Free Quote!</h2>
        <p className="text-gray-600 mt-4">
          Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
          diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
          lorem sit clita duo justo erat amet.
        </p>
        <div className="mt-6 flex items-center space-x-4">
          <div className="bg-red-500 p-4 rounded">
            <PhoneOutlined className="text-white text-2xl" />
          </div>
          <div>
            <p className="font-bold">Call for any query!</p>
            <p className="text-red-500 text-xl font-bold">+012 345 6789</p>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="bg-red-50 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Your Name" className="py-2" />
          <Input placeholder="Your Email" className="py-2" />
          <Input placeholder="Your Mobile" className="py-2" />
          <Select placeholder="Select A Freight" className="h-10">
            <Option value="air">Air Freight</Option>
            <Option value="ocean">Ocean Freight</Option>
            <Option value="road">Road Freight</Option>
          </Select>
        </div>
        <Input.TextArea placeholder="Special Note" rows={3} className="mt-4" />
        <Button type="primary" className="w-full bg-red-500 mt-4 py-2 text-white font-bold">
          Submit
        </Button>
      </div>
    </section>
  );
};

export default Quote;
