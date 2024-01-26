import { useState, useEffect, useRef } from "react";
import DateRangeComp from "../components/DateRangeComp";
import ImgSlider from "../components/ImgSlider";
import { BsHouseDoor } from "react-icons/bs";
import { GiWaterfall, GiBarbecue, GiPillow } from "react-icons/gi";
import { VscPerson } from "react-icons/vsc";
import { MdOutlineBed } from "react-icons/md";
import { LuBedSingle, LuParkingSquare, LuShowerHead } from "react-icons/lu";
import videoBg from "../assets/video/beach-corsica-drone.mp4";
import Footer from "../components/Footer";

import {
  PiBaseballThin,
  PiMountainsLight,
  PiPlantLight,
  PiToiletThin,
} from "react-icons/pi";
import { TbChairDirector } from "react-icons/tb";
import Calendar from "../components/Calendar";
import { selectPicturesByAccommodation } from "../feature/picturesSlice";
import { useSelector } from "react-redux";

const Bergerie = ({ data }) => {
  //DATA
  console.log(data);
  const [dates, setDates] = useState([]);
  const bergerieDates = useSelector(
    (state) => state.accommodations.accommodations[0]
  );
  const bergerieImages = useSelector((state) =>
    selectPicturesByAccommodation(state, "bergerie")
  );
  console.log(bergerieDates);
  //
  /*   const videoRef = useRef();
  const [videoPlay, setVideoPlay] = useState(true); */
  /*   const handleVideo = () => {
    setVideoPlay(!videoPlay);
    if (videoPlay) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }; */

  return (
    <div className="accomodation">
      <div className="accomodation-main">
        <div className="header-flex">
          <div className="title">
            <h1>La Bergerie du Moulin</h1>
            <h3>San Gavino Di Tenda, Haute-Corse</h3>
          </div>
        </div>
        <ImgSlider images={bergerieImages} />
        <div className="description-booking">
          <div className="descr-video">
            <div className="description">
              <p>
                Gîte atypique pour 4 personnes, dans une ancienne bergerie, au
                rez-de-chaussée du moulin. Entrée indépendante et accès à la
                rivière. Terrasse et jardin. Idéal pour les amoureux de la
                nature et les marcheurs. Situé à 20 min des plages de
                Saint-Florent et à 15 minutes des commerces, c'est un lieu
                unique calme et propice au repos. La Bergerie comprend deux
                pièces. La première pièce possède une cuisine, un espace salon
                et 2 lits simples. La seconde pièce possède 1 lit double et un
                espace salle de bain. Les toilettes sèches se situent dans une
                autre partie du gite.
              </p>
              <div className="check-inOut">
                <h4>Check-in: 17:00</h4>
                <h4>Check-out: 10:00</h4>
              </div>
              <ul className="amenities-bergerie">
                <li>
                  <VscPerson />
                  <h5>4 voyageurs</h5>
                </li>
                <li>
                  <MdOutlineBed /> <h5>1 lit double</h5>
                </li>
                <li>
                  <LuBedSingle /> <h5>2 lits simples</h5>
                </li>
                <li>
                  <LuShowerHead /> <h5>1 salle de bain</h5>
                </li>
                <li>
                  <LuParkingSquare /> <h5>Parking</h5>
                </li>
                <li>
                  <GiWaterfall /> <h5>Rivière</h5>
                </li>

                <li>
                  <GiBarbecue /> <h5>Barbecue</h5>
                </li>
                <li>
                  <BsHouseDoor /> <h5>55m²</h5>
                </li>
                <li>
                  <PiToiletThin /> <h5>Toilettes sèches</h5>
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
              {/*  <div
                onClick={(e) => handleVideo(e)}
                className="video-accomodation-container skeleton"
              >
                <video
                  className=" video-accomodation"
                  loading="lazy"
                  ref={videoRef}
                  src={videoBg}
                  loop
                  playsInline
                  autoPlay
                  muted
                />
              </div> */}
            </div>
          </div>
          <div className="booking">
            {/*              <DateRangeComp
              accomodation={"bergerie"}
              defaultRate={defaultRate}
              accommodationRates={rates}
            /> */}
            <Calendar id={"659e7510be15e0a91382b226"} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bergerie;
