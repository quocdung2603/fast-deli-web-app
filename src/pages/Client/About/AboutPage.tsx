import { useTranslation } from "react-i18next";
import Banner from "../../../layouts/client/components/Banner";
import About from "./components/About";
import Fact from "./components/Fact";
import Feature from "./components/Feature";
import OurTeam from "./components/OurTeam";

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Banner
        title={t("Client.Navbar.about")}
        breadcrumbs={[
          { name: `${t("Client.Navbar.home")}`, path: "" },
          { name: `${t("Client.Navbar.page")}`, path: "" },
          { name: `${t("Client.Navbar.about")}`, path: "" },
        ]}
      />
      <About />
      <Fact />
      <Feature />
      <OurTeam />
    </div>
  );
};

export default AboutPage;
