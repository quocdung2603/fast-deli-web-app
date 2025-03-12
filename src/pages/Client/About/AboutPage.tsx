import Banner from "../../../layouts/client/components/Banner";
import About from "./components/About";
import Fact from "./components/Fact";
import Feature from "./components/Feature";
import OurTeam from "./components/OurTeam";

const AboutPage = () => {
  return (
    <div>
      <Banner
        title="About"
        breadcrumbs={[
          { name: "Home", path: "" },
          { name: "Pages", path: "" },
          { name: "About", path: "" },
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
