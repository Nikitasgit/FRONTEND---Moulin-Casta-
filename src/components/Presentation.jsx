import { Reveal } from "./Reveal";
import imgMoulinNight from "../assets/img/moulin-night.jpg";
import Slideshow from "./Slideshow";
import { useSelector } from "react-redux";

import Amenities from "./Amenities";
import Share from "./Share";
import { NavLink } from "react-router-dom";

const Presentation = () => {
  const url = "http://localhost:3000/";
  const { accommodations } = useSelector((state) => state.accommodations);
  const filterAmenities = (amenities) => {
    const selectedKeys = [
      "bedrooms",
      "swimmingPool",
      "river",
      "bathRoom",
      "singleBed",
      "doubleBed",
      "garden",
    ];

    const filteredObject = Object.fromEntries(
      Object.entries(amenities).filter(([key]) => selectedKeys.includes(key))
    );
    return filteredObject;
  };

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

      <h2 className="presentation-title">Logements</h2>

      <div className="accommodations">
        {accommodations.map((accommodation) => (
          <Reveal>
            <div className="accommodation">
              <div className="title-share">
                <h2 className="accomodation-title">{accommodation.name}</h2>

                <Share
                  title={accommodation.name}
                  message={`${accommodation.description.substring(0, 80)}...`}
                  url={url + accommodation._id}
                />
              </div>
              <Slideshow
                id={accommodation._id}
                images={accommodation.pictures.slice(0, 5)}
              />
              <div className="amenities-text">
                <div>
                  <Amenities
                    amenities={filterAmenities(accommodation.amenities)}
                    travelers={accommodation.capacity}
                  />
                </div>
                <h5 className="extra-title">
                  {accommodation.extraInfo
                    ? accommodation.extraInfo
                    : `À partir de ${accommodation.defaultRate}€ par nuit`}
                </h5>
                <div className="accomodation-text-container">
                  <p>{accommodation.description}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default Presentation;
