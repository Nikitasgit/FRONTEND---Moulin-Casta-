import NavBar from "../components/NavBar";
import { useEffect, useRef, useState } from "react";
import { BsExclamationTriangle, BsHouseDoor } from "react-icons/bs";
import {
  GiWashingMachine,
  GiChickenOven,
  GiWaterfall,
  GiBarbecue,
  GiPillow,
} from "react-icons/gi";
import { VscPerson } from "react-icons/vsc";
import { TbChairDirector } from "react-icons/tb";
import { MdOutlineBed } from "react-icons/md";
import { LuBedSingle, LuParkingSquare, LuShowerHead } from "react-icons/lu";
import {
  PiPlantLight,
  PiSwimmingPool,
  PiBaseballThin,
  PiMountainsLight,
} from "react-icons/pi";
import ImgSlider from "../components/ImgSlider";
import DateRangeComp from "../components/DateRangeComp";
import videoBg from "../assets/video/beach-corsica-drone.mp4";
import axios from "axios";
import Footer from "../components/Footer";
const Moulin = () => {
  const [defaultRate, setDefaultRate] = useState(0);
  const [rates, setRates] = useState([]);
  const videoRef = useRef();
  const [videoPlay, setVideoPlay] = useState(true);

  const handleVideo = () => {
    setVideoPlay(!videoPlay);
    if (videoPlay) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };
  useEffect(() => {
    let array = [];
    axios.get("https://moulincasta.onrender.com/defaultRate/").then((res) =>
      res.data.map((el) => {
        if (el.accomodation === "moulin") setDefaultRate(el);
      })
    );
    axios.get("https://moulincasta.onrender.com/rate/").then((res) => {
      res.data.map((el) => {
        if (el.accomodation === "moulin") array.push(el);
      });
      setRates(array);
    });
  }, []);
  /*   function importAll(r) {
    let images = {};
    r.keys().forEach((item) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }
  const images = importAll(
    require.context("../assets/img/img-moulin", false, /\.(png|jpe?g|svg)$/)
  ); */

  return (
    <div className="accomodation">
      <div className="accomodation-main">
        <div className="header-flex">
          <div className="title">
            <h1>Le Moulin Casta</h1>
            <h3>San Gavino Di Tenda, Haute-Corse</h3>
          </div>
        </div>
        {/*         <ImgSlider images={ImagesMoulin} /> */}
        <div className="description-booking">
          <div className="descr-video">
            <div className="description">
              <p>
                Cet ancien moulin de plus de 300 ans est construit en pierre et
                restauré dans les règles de l'art. Il est très confortable et
                bien équipé. Il dispose d'une vue à 360 degrés sur les
                montagnes, le maquis et la rivière. Aucun voisinage pour vous
                déranger car il est en pleine nature et pourtant à 20 minutes
                des plages, à 15 minutes du premier super marché. Le Moulin est
                autonome car il est alimenté en électricité par des panneaux
                solaires. Nous disposons d'un puits pour l'eau courante filtrée
                et d'un chauffe eau solaire. Il est largement autonome pour 9
                personnes.
              </p>
              <div className="important-message">
                <BsExclamationTriangle />
                <h4>Réservations uniquement du samedi au samedi</h4>
              </div>
              <div className="check-inOut">
                <h4>Check-in: 17:00</h4>
                <h4>Check-out: 10:00</h4>
              </div>
              <ul className="amenities-moulin">
                <li>
                  <VscPerson />
                  <h5>8 voyageurs</h5>
                </li>
                <li>
                  <MdOutlineBed /> <h5>2 lits doubles</h5>
                </li>
                <li>
                  <LuBedSingle /> <h5>4 lits simples</h5>
                </li>
                <li>
                  <LuShowerHead /> <h5>2 salles de bains</h5>
                </li>
                <li>
                  <PiSwimmingPool /> <h5>1 piscine</h5>
                </li>
                <li>
                  <LuParkingSquare /> <h5>Parking</h5>
                </li>
                <li>
                  <GiWaterfall /> <h5>Rivière</h5>
                </li>
                <li>
                  <GiWashingMachine /> <h5>Lave linge/ Lave-vaisselle</h5>
                </li>
                <li>
                  <GiChickenOven /> <h5>Four</h5>
                </li>
                <li>
                  <GiBarbecue /> <h5>Barbecue</h5>
                </li>
                <li>
                  <BsHouseDoor /> <h5>200m²</h5>
                </li>
                <li>
                  <PiPlantLight /> <h5>jardin</h5>
                </li>
                <li>
                  <GiPillow /> <h5>Draps et serviettes inclus</h5>
                </li>
                <li>
                  <PiBaseballThin /> <h5>Terrain de pétanque</h5>
                </li>
                <li>
                  <PiMountainsLight /> <h5>Vue montagne</h5>
                </li>
                <li>
                  <TbChairDirector /> <h5>Salon de jardin</h5>
                </li>
              </ul>
              <div
                onClick={(e) => handleVideo(e)}
                className="video-accomodation-container skeleton"
              >
                <video
                  className=" video-accomodation"
                  ref={videoRef}
                  src={videoBg}
                  loop
                  loading="lazy"
                  autoPlay
                  playsInline
                  muted
                />
              </div>
            </div>
          </div>
          <div className="booking">
            <DateRangeComp
              accomodation={"moulin"}
              defaultRate={defaultRate}
              accommodationRates={rates}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Moulin;
