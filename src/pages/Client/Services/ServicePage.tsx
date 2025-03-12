import Banner from "../../../layouts/client/components/Banner";
import Services from "./components/Services";

const ServicePage = () => {
  return (
    <div>
      <Banner
        title="Services"
        breadcrumbs={[
          { name: "Home", path: "" },
          { name: "Pages", path: "" },
          { name: "Services", path: "" },
        ]}
      />
      <Services />
    </div>
  );
};

export default ServicePage;
