import { useTranslation } from "react-i18next";
import Banner from "../../../layouts/client/components/Banner";
import PostOfficeLocator from "./components/PostOfficeLocation";
import Quote from "./components/Quote";

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Banner
        title={t("Client.Navbar.contact")}
        breadcrumbs={[
          { name: `${t("Client.Navbar.home")}`, path: "" },
          { name: `${t("Client.Navbar.page")}`, path: "" },
          { name: `${t("Client.Navbar.contact")}`, path: "" },
        ]}
      />
      <Quote />
      <PostOfficeLocator />
    </div>
  );
};

export default ContactPage;
