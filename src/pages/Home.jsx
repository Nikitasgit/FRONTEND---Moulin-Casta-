import Footer from "../components/Footer";
import Infos from "../components/Infos";
import Presentation from "../components/Presentation";

const Home = () => {
  document.body.style.overflow = "unset";
  return (
    <div className="home">
      <Presentation />
      <Infos />
      <Footer />
    </div>
  );
};

export default Home;
