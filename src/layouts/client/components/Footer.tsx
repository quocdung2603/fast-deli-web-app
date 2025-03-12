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

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold">Address</h3>
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
          <h3 className="text-lg font-semibold">Services</h3>
          <ul className="mt-2 space-y-2">
            <li>Air Freight</li>
            <li>Sea Freight</li>
            <li>Road Freight</li>
            <li>Logistic Solutions</li>
            <li>Industry Solutions</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Our Services</li>
            <li>Terms & Condition</li>
            <li>Support</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <p className="mt-2 text-gray-400">
            Dolor amet sit justo amet ipsum elitr est.
          </p>
          <div className="flex mt-4">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 flex-1 text-black"
            />
            <button className="bg-red-500 text-white px-4 py-2">SignUp</button>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-400 mt-10">
        © Your Site Name, All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
