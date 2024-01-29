import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import format from "date-fns/format";
import { DateRange } from "react-date-range";
import * as rdrLocales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import {
  addNights,
  addPrice,
  addRangeDates,
  selectAccommodationById,
  updateAvailability,
  updateDatesRate,
  updateDefaultRate,
} from "../feature/accommodationsSlice";
import { changeViewMode } from "../feature/loginSlice";
const Calendar = ({ id, open }) => {
  const dispatch = useDispatch();

  const { dates } = useSelector((state) => {
    return selectAccommodationById(state, id);
  });
  const nights = useSelector((state) => state.accommodations.nights);
  const login = useSelector((state) => state.login.loginStatus);
  const viewClient = useSelector((state) => state.login.viewClient);
  const calendarStart = new Date(dates[0].date);
  const calendarEnd = new Date(dates[dates.length - 1].date);

  const [price, setPrice] = useState();

  const [newRate, setNewRate] = useState(null);
  const [availability, setAvailability] = useState(false);
  const [datesRange, setDatesRange] = useState([]);
  const [newDefaultRate, setNewDefaultRate] = useState(null);
  const range2 = {
    startDate: new Date(),
    endDate: new Date(new Date().getDate() + 5),
    key: "selection2",
  };
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
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      currentDate.setUTCHours(24, 0, 0, 0);
      dates.push(currentDate.toISOString());
      new Date(currentDate).setDate(currentDate.getDate() + 1);
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
  }, [datesRange, dates]);

  useEffect(() => {
    dispatch(addPrice(price));
    dispatch(addNights(datesRange.length - 1));
  }, [price]);
  return (
    <div className="calendar-and-edit">
      {open && (
        <div className="calendar-and-total">
          <DateRange
            disabledDates={getUnavailableDates()}
            rangeColors={["#4d906f"]}
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
          {login && !viewClient && (
            <div className="nights-price-switch">
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
          )}
        </div>
      )}
      {login && !viewClient && (
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
                      datesRange: datesRange.slice(0, -1),
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
                  onChange={(e) => {
                    setNewDefaultRate(Number(e.target.value));
                  }}
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
                  getPrice();
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
