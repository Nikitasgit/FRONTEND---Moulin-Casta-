import React, { useEffect, useRef, useState } from "react";
import Calendar from "./Calendar";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";
import { selectAccommodationById } from "../feature/accommodationsSlice";
import { format } from "date-fns";
const BookingRequest = ({ id, name, capacity }) => {
  const { dates } = useSelector((state) => {
    return selectAccommodationById(state, id) || {};
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [value, setValue] = useState(capacity);
  const [formSent, setFormSent] = useState(false);
  const [range, setRange] = useState({});
  const [price, setPrice] = useState();
  const [nights, setNights] = useState(0);

  const [datesRange, setDatesRange] = useState([]);
  const formRef = useRef(null);
  const datesRef = useRef(null);
  const calendarRef = useRef(null);
  const inputRangeRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setCalendarOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setCalendarOpen(false);
    }
  };
  const getPrice = () => {
    const matchingDates = dates.filter((date) => {
      return datesRange.some(
        (dateRange) =>
          new Date(new Date(dateRange).setHours(0, 0, 0, 0)).getTime() ===
          new Date(new Date(date.date).setHours(0, 0, 0, 0)).getTime()
      );
    });
    const lastDateIndex = matchingDates.length - 1;
    const sum = matchingDates.reduce((accumulator, date, index) => {
      if (index !== lastDateIndex) {
        return accumulator + date.rate;
      }
      return accumulator;
    }, 0);
    setPrice(sum);
  };
  const getDatesBetween = (startDate, endDate) => {
    let dates = [];
    const currentStartDate = new Date(startDate);
    const currentEndDate = new Date(endDate);

    currentStartDate.setUTCHours(0, 0, 0, 0);
    currentEndDate.setUTCHours(0, 0, 0, 0);

    let currentDate = new Date(currentStartDate);

    while (currentDate <= currentEndDate) {
      dates.push(currentDate.toISOString());
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return dates;
  };
  useEffect(() => {
    setDatesRange(getDatesBetween(range.startDate, range.endDate));
  }, [range]);
  useEffect(() => {
    setNights(datesRange.length > 0 ? datesRange.length - 1 : 0);
    getPrice();
  }, [datesRange]);
  const sendEmail = (e) => {
    e.preventDefault();
    if (
      id == "65b0ebe1f5aa3f05de0cc9b9" &&
      new Date(range[0]).getDay() !== 6 &&
      new Date(range[1]).getDay() !== 6
    ) {
      alert("Réservation uniquement du samedi au samedi pour Le moulin Casta.");
      datesRef.current.style.color = " red";
      datesRef.current.style.border = "1px solid red";
      setTimeout(() => {
        datesRef.current.style.color = "";
        datesRef.current.style.border = "";
      }, 2500);
    }
    if (nights < 1) {
      alert("Veuillez sélectionner des dates");
    } else {
      return emailjs
        .sendForm(
          "service_fgm7jc6",
          "template_l6sypol",
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
    }
  };
  return (
    <form ref={formRef} onSubmit={(e) => sendEmail(e)} className="form">
      <h3>Demande de réservation:</h3>
      <div className="calendar">
        <input
          type="text"
          defaultValue={name}
          name="accomodation"
          style={{ display: "none" }}
        />
        <input
          value={
            !range.endDate
              ? "Cliquez ici pour afficher le calendrier"
              : `${format(range.startDate, "dd-MM-yyyy")} à ${format(
                  range.endDate,
                  "dd-MM-yyyy"
                )}`
          }
          readOnly
          className="input-dates"
          ref={datesRef}
          onClick={() => {
            setCalendarOpen(true);
          }}
          name="dates"
          required
        />
        {calendarOpen && (
          <div ref={calendarRef} className="calendar-client">
            <Calendar
              editing={false}
              defaultStart={new Date()}
              dates={dates}
              range={range}
              onChange={(newRange) => {
                setRange(newRange);
              }}
            />
          </div>
        )}
      </div>
      <div className="travelers">
        <h4>Voyageurs:</h4>
        <div className="travelers-input">
          <input
            ref={inputRangeRef}
            type="range"
            min="1"
            onChange={(e) => setValue(e.target.value)}
            max={capacity}
            name="travelers"
            value={value}
            required
            autoComplete="off"
          />
          <p>{value}</p>
        </div>
      </div>
      <h4>Nom et prénom:</h4>
      <input
        className="input-name"
        type="text"
        placeholder={"ex: Nathalie Leman"}
        name="name"
        autoComplete="off"
      />
      <h4>Téléphone:</h4>
      <input
        type="tel"
        placeholder={"ex: 0650204942"}
        name="phone"
        required
        className="input-phone"
      />
      <h4>Email: </h4>
      <input
        className="input-email"
        type="text"
        placeholder={"ex: email@example.com"}
        name="email"
        required
        autoComplete="off"
      />
      <h4>Message:</h4>
      <textarea
        placeholder="facultatif"
        name="message"
        cols="5"
        rows="2"
        autoComplete="off"
      ></textarea>
      <h5>
        {nights} nuit{nights < 2 ? null : "s"} {`(`}{" "}
        {nights > 0 ? Math.round(price / nights) : "0"}€/ nuit {`)`}
      </h5>
      <h3>
        Total:{" "}
        <input
          name="price"
          className="total"
          type="text"
          defaultValue={price}
          readOnly="readonly"
          required
          autoComplete="off"
        />
        €
      </h3>
      <p>
        Nous vous contacterons après avoir reçu votre demande de réservation.
      </p>
      <button type="submit" className="button" ref={submitRef}>
        {formSent ? "Demande envoyée!" : "Réservation"}
      </button>
    </form>
  );
};

export default BookingRequest;
