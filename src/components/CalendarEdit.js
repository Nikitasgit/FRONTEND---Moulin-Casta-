import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccommodationById,
  updateAvailability,
} from "../feature/accommodationsSlice";
import * as rdrLocales from "react-date-range/dist/locale";
const CalendarEdit = ({ id }) => {
  const dispatch = useDispatch();
  const { dates } = useSelector((state) => {
    return selectAccommodationById(state, id);
  });
  const calendarStart = new Date(dates[0].date);
  calendarStart.setDate(calendarStart.getDate() - 1);
  const calendarEnd = new Date(dates[dates.length - 1].date);
  const [range, setRange] = useState([
    {
      startDate: new Date(dates[0].date),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [datesRange, setDatesRange] = useState([]);
  const [buttonClick, setButtonClick] = useState(false);

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
  }, [range]);
  return (
    <div className="calendarEdit-wrapper-and-button">
      {!buttonClick ? (
        <button
          onClick={() => setButtonClick(true)}
          className="btn-unblock-dates"
        >
          Débloquer des dates
        </button>
      ) : (
        <div className="calendarEdit-wrapper">
          <h4>
            Ici, débloquez des dates. Sélectionner une période à débloquer et
            cliquez sur " Débloquer "
          </h4>
          <DateRange
            className="calendarEdit"
            minDate={calendarStart}
            maxDate={calendarEnd}
            showMonthAndYearPickers={false}
            locale={rdrLocales.fr}
            months={1}
            direction="vertical"
            showDateDisplay={false}
            ranges={range}
            onChange={(item) => {
              setRange([item.selection]);
            }}
          />
          <button
            className="btn-edit"
            on
            onClick={() =>
              dispatch(
                updateAvailability({
                  accommodationId: id,
                  datesRange: datesRange,
                  availability: true,
                })
              )
            }
          >
            Débloquer
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarEdit;
