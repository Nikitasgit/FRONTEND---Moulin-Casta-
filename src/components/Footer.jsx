import { AiFillGithub } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import contactImg from "../assets/img/nathalie.jpg";
import logo from "../assets/img/logo-moulin-casta.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="logo-container">
        <img
          loading="lazy"
          className="logo"
          src={logo}
          alt="logo-moulin-Casta"
        />
      </div>

      <div className="text-and-link">
        <p className="text-footer">
          Aucun réglement ne vous sera demandé sur ce site, vous pouvez faire
          une demande de réservation sur la page dédiée au logement qui vous
          intéresse. Nous vous contacterons au plus vite pour vous renseigner
          sur les modalités.
        </p>
        <div className="attributions">
          <p>Icons made by Freepik from www.flaticon.com</p>
          <a
            className="footer-link"
            target="_blank"
            href="https://github.com/Nikitasgit"
          >
            <p>Site by Victor Leman</p>
            <AiFillGithub className="logo-github" />
          </a>
        </div>
      </div>
      <div className="contact-footer">
        <div className="person-contact">
          <img
            loading="lazy"
            src={contactImg}
            alt="Person to contact"
            className="img-contact
               skeleton"
          />
        </div>
        <div className="contact-infos">
          <h5>Nathalie Leman</h5>
          <div className="contact-phone">
            <BsPhone />
            <a href="tel:+33650224942">+33 6 50 22 49 42</a>
          </div>
          <div className="contact-email">
            <HiOutlineMail />
            <a href="mailto:moulincasta@gmail.com">moulincasta@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
