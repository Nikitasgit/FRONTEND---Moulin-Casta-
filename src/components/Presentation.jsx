import { useRef } from "react";
import { useSelector } from "react-redux";
import { motion, useInView } from "framer-motion";
import videoBg from "../assets/video/moulin-casta-video.mp4";
import chevronDown from "../assets/icons/chevron.png";
import imgMoulinNight from "../assets/img/moulin-night.jpg";
import Slideshow from "./Slideshow";
import Share from "./Share";

const Presentation = () => {
  const titleRef = useRef(null);
  const targetRef = useRef(null);
  const scrollToTarget = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const titleIsInView = useInView(titleRef, { once: true });
  const url = "http://localhost:3000/";
  const { accommodations } = useSelector((state) => state.accommodations);
  return (
    <div className="main-container">
      <div className="main skeleton">
        <video loading="lazy" src={videoBg} loop autoPlay muted playsInline />
        <div className="header-main-container">
          <h1>Venez vivre une expérience unique en Haute-Corse</h1>
          <p>En pleine nature et à seulement 20 minutes de Saint-Florent</p>

          <img
            src={chevronDown}
            className="chevron-down"
            onClick={() => scrollToTarget(targetRef)}
          />
        </div>
      </div>
      <div className="overview" id="presentation">
        <div className="intro">
          <p className="overview-text">
            Découvrez un havre de paix en Corse, niché au cœur d'une nature
            préservée. Deux logements disponibles, loués à des périodes
            différentes pour assurer une tranquillité totale à nos locataires.
            Un logement peut acceuilir jusqu'à 9 personnes et l'autre jusqu'à 4
            personnes. Nous vous garantissons calme et détente avec une rivière
            à quelques pas du Moulin dans laquelle vous pourrez vous
            rafraîchir...
          </p>
          <img src={imgMoulinNight} alt="" className=" circle-img skeleton" />
        </div>
        <span style={{ opacity: 0 }} ref={targetRef}></span>
        <h2
          ref={titleRef}
          style={{
            transform: titleIsInView ? "none" : "translateX(200px)",
            opacity: titleIsInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
          className="presentation-title"
        >
          Logements
        </h2>

        <div className="accommodations">
          {accommodations.map((accommodation) => (
            <div key={accommodation._id} className="accommodation">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Presentation;
