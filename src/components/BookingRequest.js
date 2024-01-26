import React, { useEffect, useRef, useState } from "react";
import Calendar from "./Calendar";
import format from "date-fns/format";
import { useSelector } from "react-redux";
const BookingRequest = ({ id, name, capacity }) => {
  const range = useSelector((state) => state.accommodations.range);
  const nights = useSelector((state) => state.accommodations.nights);
  const price = useSelector((state) => state.accommodations.price);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [value, setValue] = useState(4);

  const formRef = useRef(null);
  const datesRef = useRef(null);
  const calendarRef = useRef(null);
  const inputRangeRef = useRef(null);

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

  return (
    <form ref={formRef} className="form">
      <h3>Demande de réservation:</h3>
      <div className="calendar">
        <input
          type="text"
          defaultValue={name}
          name="accomodation"
          style={{ display: "none" }}
        />
        <input
          value={` ${range[0]} à ${range[1]} `}
          readOnly
          className="inputBox"
          ref={datesRef}
          onClick={() => {
            setCalendarOpen(true);
          }}
          name="dates"
          required
        />
        <div ref={calendarRef}>
          <Calendar id={id} open={calendarOpen} />
        </div>
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
            defaultValue="4"
            name="travelers"
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
          value={price}
          readOnly="readonly"
          required
          autoComplete="off"
        />
        €
      </h3>
      <p>
        Nous vous contacterons après avoir reçu votre demande de réservation.
      </p>
    </form>
  );
};

export default BookingRequest;
