import { useInView } from "framer-motion";
import { useRef } from "react";

const Infos = () => {
  const mapRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const mapIsInView = useInView(mapRef);
  const textIsInView = useInView(textRef);
  const titleIsInView = useInView(titleRef);
  return (
    <div>
      <div className="infos">
        <div
          className="img-infos"
          ref={textRef}
          style={{
            transform: textIsInView ? "none" : "translateX(200px)",
            opacity: textIsInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          <h2>Des sites exeptionnels à quelques pas du moulin...</h2>
          <h3>
            Que ce soit pour vous détendre sur des plages paradisiaques, pour
            les amoureux de randonnée, les amateurs de produits locaux ou
            simplement pour ceux qui veulent passer la journée au bord de la
            piscine, chacun y trouvera son bonheur.
          </h3>
        </div>
      </div>

      <div className="map-contact">
        <h2
          ref={titleRef}
          style={{
            transform: titleIsInView ? "none" : "translateX(200px)",
            opacity: titleIsInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          LOCALISATION
        </h2>

        <div className="map-container">
          <iframe
            style={{
              border: "none",
              transform: mapIsInView ? "none" : "translateX(200px)",
              opacity: mapIsInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
            ref={mapRef}
            className="map skeleteton"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1309539.291155994!2d8.385633791601524!3d42.666025553991766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d73197c5051721%3A0x165ee3c8752bcaeb!2sLa%20Bergerie%20du%20Moulin!5e0!3m2!1sen!2sfr!4v1693671372265!5m2!1sen!2sfr"
            width="100%"
            height="350px"
            border="none"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Infos;
