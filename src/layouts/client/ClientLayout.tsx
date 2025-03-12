import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div className="font-sans bg-white min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ClientLayout;
