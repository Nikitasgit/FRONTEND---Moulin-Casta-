import React, { useState } from "react";
import Footer from "../components/Footer";
import ImgSlider from "../components/ImgSlider";
import { BsExclamationTriangle } from "react-icons/bs";
import Calendar from "../components/Calendar";
import { DateRange } from "react-date-range";
import CalendarEdit from "../components/CalendarEdit";
import BookingRequest from "../components/BookingRequest";

const Accommodation = ({ data }) => {
  const [login, setLogin] = useState(true);
  return (
    <div className="accomodation">
      <div className="accomodation-main">
        <div className="header-flex">
          <div className="title">
            <h1>{data.name}</h1>
            <h3>{data.location}</h3>
          </div>
        </div>
        <ImgSlider images={data.pictures} />
        <div className="description-booking">
          <div className="description">
            <p>{data.description}</p>
            {data.extraInfo && (
              <div className="important-message">
                <BsExclamationTriangle />
                <h4>{data.extraInfo}</h4>
              </div>
            )}
            <div className="check-inOut">
              <h4>Check-in: {data.hours.checkIn}</h4>
              <h4>Check-out: {data.hours.checkOut}</h4>
            </div>
            <ul className="amenities-bergerie"></ul>
          </div>
        </div>
        {login ? (
          <div className="edit-calendar-wrapper">
            <CalendarEdit id={data._id} className="calendarEdit-wrapper" />
            <Calendar id={data._id} open={true} />
          </div>
        ) : (
          <BookingRequest
            id={data._id}
            name={data.name}
            capacity={data.capacity}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Accommodation;
