import { useState, useEffect, useRef } from "react";
import { SlEnvolopeLetter } from "react-icons/sl";
import { HiMenuAlt3 } from "react-icons/hi";
import logo from "../assets/img/logo-moulin-casta.png";
import { outsideClick } from "./OutsideClickFunction";
import { NavLink } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLoginModalState,
  changeLoginStatus,
  changeViewMode,
} from "../feature/loginSlice";
import Share from "./Share";
import Login from "./Login";
const NavBar = ({ data }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const login = useSelector((state) => state.login.loginStatus);
  const dispatch = useDispatch();
  const setAlertLogOut = () => {
    if (confirm("Vous allez vous déconnecter, souhaitez-vous continuer?")) {
      localStorage.removeItem("SavedToken");
      dispatch(changeLoginStatus());
    }
  };
  const modalState = useSelector((state) => state.login.loginModalState);
  const dropdownRef = useRef();

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setDropdown(false);
      } else {
        setDropdown(false);
      }

      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (modalState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalState]);
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
      <nav className={"nav-active"}>
        <NavLink to="/">
          <img className="logo" src={logo} alt="logo-moulin-casta" />
        </NavLink>
        <input
          className="hamburger-menu"
          type="checkbox"
          style={{ display: "none" }}
        />
        <div className="menu">
          {!loginClicked && (
            <div className="menu-without-login">
              <div className="dropdown-container">
                <div
                  className="accomodations-menu"
                  onClick={() => {
                    setDropdown(!dropdown);
                  }}
                >
                  <HiMenuAlt3 />
                  <h4 className="accomodations-navbar">Nos logements</h4>
                </div>
              </div>
              <NavLink className="contact-navbar-container" to="/contact">
                <SlEnvolopeLetter className="contact-navbar-icon" />
                <h4 className="contact-navbar">Nous contacter</h4>
              </NavLink>

              <Share
                title={document.querySelector("title").textContent}
                url={encodeURI(window.location.href)}
                message={"Venez découvrir Le Moulin Casta!"}
              />
            </div>
          )}
          <div className="login-navbar">
            {login ? (
              <CiLogout
                className="logout-icon"
                onClick={() => setAlertLogOut()}
              />
            ) : (
              <CiLogin
                className="login-icon"
                onClick={() => {
                  dispatch(changeLoginModalState(true));
                }}
              />
            )}
          </div>
        </div>
      </nav>
      {dropdown && (
        <div className="dropdown">
          <div className="dropdown-first-container">
            {data.map((accommodation) => (
              <NavLink
                to={`/${accommodation.id}`}
                className="dropdown-element"
                key={accommodation.id}
              >
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
      {modalState && <Login />}
    </div>
  );
};

export default NavBar;
