import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import format from "date-fns/format";
import { DateRange } from "react-date-range";
import * as rdrLocales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch, useSelector } from "react-redux";
import {
  addNights,
  addPrice,
  addRangeDates,
  selectAccommodationById,
  updateAvailability,
  updateDatesRate,
  updateDefaultRate,
} from "../feature/accommodationsSlice";
const Calendar = ({ id, open }) => {
  const { dates, defaultRate } = useSelector((state) => {
    return selectAccommodationById(state, id);
  });
  const calendarStart = new Date(dates[0].date);
  calendarStart.setDate(calendarStart.getDate() - 1);
  const calendarEnd = new Date(dates[dates.length - 1].date);
  const dispatch = useDispatch();
  const [price, setPrice] = useState();
  const nights = useSelector((state) => state.accommodations.nights);

  const [newRate, setNewRate] = useState(null);
  const [availability, setAvailability] = useState(false);
  const [datesRange, setDatesRange] = useState([]);
  const [newDefaultRate, setNewDefaultRate] = useState(null);
  const [login, setLogin] = useState(true);
  const [range, setRange] = useState([
    {
      startDate: new Date(dates[0].date),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const getUnavailableDates = () => {
    const unavailableDates = dates
      .filter((date) => !date.available)
      .map((date) => new Date(date.date));
    return unavailableDates;
  };

  const getPrice = () => {
    const matchingDates = dates.filter((date) => {
      return datesRange.some(
        (dateRange) => dateRange.getTime() === date.date.getTime()
      );
    });
    console.log(matchingDates);
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
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    setDatesRange(getDatesBetween(range[0].startDate, range[0].endDate));
    dispatch(
      addRangeDates([
        format(range[0].startDate, "dd/MM/yyyy"),
        format(range[0].endDate, "dd/MM/yyyy"),
      ])
    );
  }, [range]);
  useEffect(() => {
    getPrice();
  }, [datesRange]);
  useEffect(() => {
    dispatch(addPrice(price));
    dispatch(addNights(datesRange.length - 1));
  }, [price]);
  const sendEmail = (e) => {
    e.preventDefault();
    if (
      id == "65b0e7e8ecb1e4316ecf6a9a" &&
      range[0].startDate.getDay() !== 6 &&
      range[0].endDate.getDay() !== 6
    ) {
      return alert(
        "Réservations uniquement du samedi au samedi et moins de 31 jours."
      );
    }
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

    datesRef.current.style.color = " red";
    datesRef.current.style.border = "1px solid red";
    setTimeout(() => {
      datesRef.current.style.color = "";
      datesRef.current.style.border = "";
    }, 2500);
  };

  return (
    <div className="calendar-and-edit">
      {open && (
        <div className="calendar-and-total">
          <DateRange
            disabledDates={getUnavailableDates()}
            minDate={calendarStart}
            maxDate={calendarEnd}
            showMonthAndYearPickers={false}
            locale={rdrLocales.fr}
            months={1}
            direction="horizontal"
            className="calendarElement"
            ranges={range}
            onChange={(item) => {
              setRange([item.selection]);
            }}
          />
          <div className="nights-and-price">
            <h5>
              {nights} nuit{nights < 2 ? null : "s"} {`(`}{" "}
              {nights > 0 ? Math.round(price / nights) : "0"}€/ nuit {`)`}
            </h5>
            <div>
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
            </div>
          </div>
        </div>
      )}
      {login && (
        <div className="edit-panel">
          <h3>
            Sélectionnez sur le calendrier les dates que vous voulez modifiez.
          </h3>
          <div className="edit-options">
            <div className="edit-section">
              <div className="header-and-input">
                <h4>Nouveau tarif pour la période séléctionnée: </h4>
                <input
                  type="number"
                  onChange={(e) => {
                    setNewRate(Number(e.target.value));
                  }}
                />
              </div>
              <button
                className="btn-edit"
                onClick={() => {
                  dispatch(
                    updateDatesRate({
                      accommodationId: id,
                      newRate: newRate,
                      datesRange: datesRange,
                    })
                  );
                }}
              >
                Changer tarif
              </button>
            </div>
            <div className="edit-section">
              <div className="header-and-input">
                <h4>
                  Changer tarif par default (ce tarif sera apppliqué comme tarif
                  minimum):
                </h4>
                <input
                  type="number"
                  onChange={(e) => setNewDefaultRate(Number(e.target.value))}
                />
              </div>
              <button
                className="btn-edit"
                onClick={() => {
                  dispatch(
                    updateDefaultRate({
                      accommodationId: id,
                      newDefaultRate: newDefaultRate,
                    })
                  );
                }}
              >
                Changer tarif par défault
              </button>
            </div>
            <div className="edit-section">
              <h4>Bloquez les dates sélectionnées:</h4>
              <button
                className="btn-edit"
                onClick={() => {
                  dispatch(
                    updateAvailability({
                      accommodationId: id,
                      datesRange: datesRange,
                      availability: availability,
                    })
                  );
                }}
              >
                Bloquer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
