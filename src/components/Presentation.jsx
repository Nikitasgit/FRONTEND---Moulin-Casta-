import { Reveal } from "./Reveal";
import imgMoulinNight from "../assets/img/moulin-night.jpg";
import { VscPerson } from "react-icons/vsc";
import { MdOutlineBed } from "react-icons/md";
import { LuBedSingle } from "react-icons/lu";
import { LuShowerHead } from "react-icons/lu";
import { PiSwimmingPool } from "react-icons/pi";
import { LuParkingSquare } from "react-icons/lu";
import { GiWaterfall } from "react-icons/gi";
import Carousel from "./Carousel";
import Slideshow from "./Slideshow";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { fetchAccommodations } from "../feature/accommodationsSlice";
import Accommodation from "../pages/Accommodation";

const Presentation = () => {
  const { accommodations } = useSelector((state) => state.accommodations);

  return (
    <div className="overview">
      <div className="intro">
        <p className="overview-text">
          Découvrez un havre de paix en Corse, niché au cœur d'une nature
          préservée. Deux logements disponibles, loués à des périodes
          différentes pour assurer une tranquillité totale à nos locataires. Un
          logement peut acceuilir jusqu'à 9 personnes et l'autre jusqu'à 4
          personnes. Nous vous garantissons calme et détente avec une rivière à
          quelques pas du Moulin dans laquelle vous pourrez vous rafraîchir...
        </p>
        <img src={imgMoulinNight} alt="" className=" circle-img skeleton" />
      </div>

      <h2 className="presentation-title">Nos logements</h2>

      <div className="accomodations">
        <Reveal>
          {accommodations.map((accommodation) => (
            <div className="accomodation">
              <div className="accomodation-text-container">
                <h2 className="accomodation-title">{accommodation.name}</h2>
                <div>
                  <h5 className="availability-title">
                    {accommodation.extraInfo}
                  </h5>
                </div>
                <p>{accommodation.description}</p>
              </div>
              <Slideshow
                id={accommodation._id}
                images={accommodation.pictures.slice(0, 5)}
              />
            </div>
          ))}
        </Reveal>

        {/*       <ul className="amenities-moulin">
                <li>
                  <VscPerson />
                  <h5>9 voyageurs</h5>
                </li>
                <li>
                  <MdOutlineBed /> <h5>3 lits doubles</h5>
                </li>
                <li>
                  <LuBedSingle /> <h5>3 lits simples</h5>
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
              </ul> */}
      </div>
    </div>
  );
};

export default Presentation;
