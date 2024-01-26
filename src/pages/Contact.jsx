import React, { useRef, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import imgMoulin from "../assets/img/moulin-global-view.jpg";
import { SlEnvolopeLetter } from "react-icons/sl";
import emailjs from "@emailjs/browser";
const Contact = () => {
  const formRef = useRef();
  const submitRef = useRef();
  const [formSent, setFormSent] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fgm7jc6",
        "template_w6yd1m8",
        formRef.current,
        "b1gBNi4bN5r_kBred"
      )
      .then(
        (result) => {
          console.log(result.text);
          formRef.current.reset();
          setFormSent(true);
          submitRef.current.style.backgroundColor = "green";
          setTimeout(() => {
            submitRef.current.style.backgroundColor = "";
            setFormSent(false);
          }, 2500);
        },
        (error) => {
          console.log(error.text);
          formMess.innerHTML =
            "<p className='error'>Une erreur s'est produite, veuillez réessayer</p>";
          setTimeout(() => {
            formMess.innerHTML = "";
          }, 2500);
        }
      );
  };
  return (
    <div className="contact-page skeleton">
      <NavBar />
      {/*       <img
        className="img-contact-page"
        src={imgMoulin}
        alt="background-contact"
      /> */}
      <form ref={formRef} onSubmit={sendEmail} className="form-contact">
        <div className="title-contact">
          <h2>Contact</h2> <SlEnvolopeLetter />
        </div>
        <div className="input-contact">
          <label htmlFor="name">Nom et Prénom:</label>
          <input type="text" name="name" required />
        </div>

        <div className="input-contact">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" required />
        </div>
        <div className="input-contact">
          <label htmlFor="phone">Téléphone:</label>
          <input type="phone" name="phone" required />
        </div>
        <div className="input-contact message">
          <label htmlFor="message">Message:</label>
          <textarea
            required
            name="message"
            cols="30"
            rows="3"
            style={{ resize: "none" }}
          ></textarea>
        </div>
        <div className="submit-contact">
          <button ref={submitRef}>{formSent ? "Envoyé!" : "Envoyer"}</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Contact;
