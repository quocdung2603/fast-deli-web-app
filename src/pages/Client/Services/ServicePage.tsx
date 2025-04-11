import { useTranslation } from "react-i18next";
import Banner from "../../../layouts/client/components/Banner";
import Services from "./components/Services";

const ServicePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Banner
        title={t("Client.Navbar.services")}
        breadcrumbs={[
          { name: `${t("Client.Navbar.home")}`, path: "" },
          { name: `${t("Client.Navbar.page")}`, path: "" },
          { name: `${t("Client.Navbar.services")}`, path: "" },
        ]}
      />
      <Services />
    </div>
  );
};

export default ServicePage;
