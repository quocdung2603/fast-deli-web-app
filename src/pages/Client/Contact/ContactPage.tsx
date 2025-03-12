import Banner from "../../../layouts/client/components/Banner";
import PostOfficeLocator from "./components/PostOfficeLocation";
import Quote from "./components/Quote";

const ContactPage = () => {
  return (
    <div>
      <Banner
        title="Services"
        breadcrumbs={[
          { name: "ABC", path: "" },
          { name: "Pages", path: "" },
          { name: "Contact", path: "" },
        ]}
      />
      <Quote />
      <PostOfficeLocator />
    </div>
  );
};

export default ContactPage;
