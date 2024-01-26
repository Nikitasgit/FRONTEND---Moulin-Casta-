import { useState, useEffect, useRef } from "react";
import { SlEnvolopeLetter } from "react-icons/sl";
import { HiMenuAlt3 } from "react-icons/hi";
import logo from "../assets/img/logo-moulin-casta.png";
import { outsideClick } from "./OutsideClickFunction";
import { NavLink } from "react-router-dom";

const NavBar = ({ data }) => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();
  outsideClick(dropdownRef, setDropdown);
  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setDropdown(false);
        setShow(false);
      } else {
        setDropdown(false);
        setShow(true);
      }

      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <div ref={dropdownRef}>
      <nav className={show ? "nav-active" : "hidden"}>
        <NavLink to="/">
          <img className="logo" src={logo} alt="logo-moulin-casta" />
        </NavLink>
        <input
          className="hamburger-menu"
          type="checkbox"
          style={{ display: "none" }}
        />
        <ul className="menu">
          <div className="dropdown-container">
            <div
              className="accomodations-menu"
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <HiMenuAlt3 />
              <li className="accomodations-navbar">Nos logements</li>
            </div>
          </div>
          <NavLink className="contact-navbar-container" to="/contact">
            <SlEnvolopeLetter className="contact-navbar-icon" />
            <li className="contact-navbar">Nous contacter</li>
          </NavLink>
        </ul>
      </nav>
      {dropdown && (
        <div className="dropdown">
          <div className="dropdown-first-container">
            {data.map((accommodation) => (
              <NavLink to={`/${accommodation.id}`} className="dropdown-element">
                <img
                  className=" img-dropdown skeleton"
                  src={accommodation.picture}
                  alt={accommodation.name}
                />
                <div className="dropdown-element-text">
                  <h3>{accommodation.name}</h3>
                  <p>{`à partir de ${accommodation.rate}€ par nuit`}</p>
                </div>
              </NavLink>
            ))}
          </div>
          <div className="dropdown-second-container">
            <p>
              Les logements ne sont jamais loués en même temps pour vous
              garantir une tranquilité absolue lors de votre séjour.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
