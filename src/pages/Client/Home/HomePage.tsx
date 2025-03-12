import About from "../About/components/About";
import Fact from "../About/components/Fact";
import Feature from "../About/components/Feature";
import OurTeam from "../About/components/OurTeam";
import Services from "../Services/components/Services";
import Carousel from "./components/Carousel";

const HomePage = () => {
  return (
    <div>
      <Carousel />
      <About />
      <Fact />
      <Services />
      <Feature />
      <OurTeam />
    </div>
  );
};

export default HomePage;
