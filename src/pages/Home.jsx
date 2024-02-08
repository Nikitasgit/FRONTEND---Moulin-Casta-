import Footer from "../components/Footer";
import Infos from "../components/Infos";
import Main from "../components/Main";
import NavBar from "../components/NavBar";
import Presentation from "../components/Presentation";

const Home = () => {
  document.body.style.overflow = "unset";
  return (
    <div className="home">
      <Main />
      <Presentation />
      <Infos />
      <Footer />
    </div>
  );
};

export default Home;
