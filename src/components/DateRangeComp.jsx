import { useEffect, useRef, useState } from "react";
//npm react-date-range
import { DateRange } from "react-date-range";
//npm date-fns
import format from "date-fns/format";
import * as rdrLocales from "react-date-range/dist/locale";
import axios from "axios";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import emailjs from "@emailjs/browser";

const DateRangeComp = ({ accomodation, defaultRate, accommodationRates }) => {
  const rates = accommodationRates;

  const [dates, setDates] = useState([]);
  const [price, setPrice] = useState(0);
  const [newDefaultRate, setNewDefaultRate] = useState(0);
  const [periodRate, setPeriodRate] = useState(0);
  const [blockedDates, setBlockedDates] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  //value from inputs type "date"
  const [availablePeriodStart, setAvailablePeriodStart] = useState();
  const [availablePeriodEnd, setAvailablePeriodEnd] = useState();
  const thisYear = new Date().getYear() - 100 + 2000;
  const nextYear = thisYear + 1;
  const calendarStart = new Date();
  calendarStart.setHours(0, 0, 0, 0);
  const calendarEnd = new Date(nextYear, 8, 17);
  const datesRef = useRef();
  const formRef = useRef();
  const [formSent, setFormSent] = useState(false);
  const submitRef = useRef();
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const handlePassword = (password) => {
    if (password == process.env.REACT_APP_PASSWORD) {
      setAdmin(true);
    }
  };
  //CRUD
  //When admin select a range of dates on calendar and click "disable selected dates". It blocks dates from calendar.
  const editDisabledDates = () => {
    setLoading(true); // Start loading

    let selectedDates = rates.filter((o) => dates.find((x) => x === o.date));
    const updatePromises = selectedDates.map((el) => {
      return axios.put("https://moulincasta.onrender.com/rate/" + el._id, {
        available: false,
      });
    });

    Promise.all(updatePromises)
      .then(() => {
        console.log("All updates are completed");
        setLoading(false); // Stop loading after all requests are done
      })
      .catch((error) => {
        console.error("Error updating rates:", error);
        setLoading(false); // Stop loading in case of an error
      });
  };
  //Set input value to all rates and to default rate.
  const resetAllRates = () => {
    if (newDefaultRate > 30 || newDefaultRate === Number) {
      setLoading(true);
      const defaultRateUpdate = axios.put(
        "https://moulincasta.onrender.com/defaultRate/" + defaultRate._id,
        { defaultRate: newDefaultRate }
      );
      const rateUpdates = rates.map((r) => {
        return axios.put("https://moulincasta.onrender.com/rate/" + r._id, {
          rate: newDefaultRate,
        });
      });

      Promise.all([defaultRateUpdate, ...rateUpdates])
        .then(() => {
          console.log("Updates are completed");
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error updating rates:", error);
          setLoading(false); // Stop loading in case of an error
        });
    } else {
      alert("Veuillez définir un tarif supérieur à 30 euros.");
    }
  };
  //Add input value to the period selected from calendar by admin.
  const addPeriodRate = () => {
    if (periodRate > 30) {
      setLoading(true); // Start loading

      let selectedDates = rates.filter((o) => dates.find((x) => x === o.date));
      const updatePromises = selectedDates.map((el) => {
        return axios.put("https://moulincasta.onrender.com/rate/" + el._id, {
          rate: periodRate,
        });
      });

      Promise.all(updatePromises)
        .then(() => {
          console.log("All updates are completed");
          setLoading(false); // Stop loading after all requests are done
        })
        .catch((error) => {
          console.error("Error updating rates:", error);
          setLoading(false); // Stop loading in case of an error
        });
    } else {
      alert("Veuillez choisir un tarif supérieur à 30€");
    }
  };
  //Unblock period on the calendar, need to enter dates in date inputs and press "enter".
  const editAvailableDates = () => {
    setLoading(true); // Start loading

    let dates = [];
    const start = availablePeriodStart;
    const end = availablePeriodEnd;
    const currentDate = new Date(start.getTime());
    while (currentDate <= end) {
      dates.push(currentDate.toString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    let selectedDates = blockedDates.filter((o) => dates.includes(o.date));
    const updatePromises = selectedDates.map((d) => {
      return axios.put("https://moulincasta.onrender.com/rate/" + d._id, {
        available: true,
      });
    });

    Promise.all(updatePromises)
      .then(() => {
        console.log("All updates are completed");
        setLoading(false); // Stop loading after all requests are done
      })
      .catch((error) => {
        console.error("Error updating rates:", error);
        setLoading(false); // Stop loading in case of an error
      });
  };

  useEffect(() => {
    deletePastDates();
  }, []);
  useEffect(() => {
    dailyUpdateDates();
    mountDisabledDates();
  }, [rates]);
  //Transform dates from date inputs to be used.
  const availableStart = (e) => {
    const date = new Date(e.target.value);
    date.setHours(0, 0, 0, 0);
    setAvailablePeriodStart(date);
  };
  const availableEnd = (e) => {
    const date = new Date(e.target.value);
    date.setHours(0, 0, 0, 0);
    setAvailablePeriodEnd(date);
  };

  // Check if a date is available or not. (available: true/false)
  const mountDisabledDates = () => {
    const array = [];
    rates.map((el) => {
      if (el.available == false) {
        array.push(el);
      }
    });
    return setBlockedDates(array);
  };
  useEffect(() => {
    addDisabledDates();
  }, [blockedDates]);
  const addDisabledDates = () => {
    let dates = [];
    blockedDates.map((d) => {
      dates.push(new Date(d.date));
    });
    return setDisabledDates(dates);
  };
  //Check if current month is before June. If so it sets default range on clendar to the 1# of Aug. of the current year. Else if  summer of current year is past, it sets default range to the 1# of July of the season. Else, if current date is during summer, it returns today's date.
  const minDate = () => {
    if (new Date().getMonth() < 5) {
      return new Date(thisYear, 7, 1);
    } else if (new Date().getMonth() > 8) {
      return new Date(nextYear, 7, 1);
    } else {
      return new Date();
    }
  };
  //Calendar's range
  const start = minDate();
  const [range, setRange] = useState([
    {
      startDate: start,
      endDate: start,
      key: "selection",
    },
  ]);

  // returns an array with all the dates(String) between the 2 given dates(Object) .
  const getDatesBetween = (startDate, endDate) => {
    let dates = [];
    const currentDate = new Date(startDate.getTime());
    while (currentDate <= endDate) {
      dates.push(currentDate.toString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };
  // returns all dates from calendar range when it changes.
  useEffect(() => {
    setDates(getDatesBetween(range[0].startDate, range[0].endDate));
  }, [range]);

  //Calculates total depending on calendar range.
  const getPrice = () => {
    console.log(dates[0].date);
  };
  useEffect(() => {
    getPrice();
  }, [dates]);

  //Close the calendar when click outside or when "Escape" key is pressed.
  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);
  const [open, setOpen] = useState(false);
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };
  const refOne = useRef(null);
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  //Only Saturdays are available. (problem: can't block Saturdays or reservation is not possible anymore. It requires dates to be half blocked.)
  /*   const isItSaturday = (date) => {
    const day = getDay(date);
    return day !== 6;
  }; */
  const sendEmail = (e) => {
    e.preventDefault();
    if (
      (accomodation == "moulin" &&
        range[0].startDate.getDay() == 6 &&
        range[0].endDate.getDay() == 6 &&
        dates.length > 6 &&
        dates.length < 31) ||
      (accomodation == "bergerie" && dates.length < 31)
    ) {
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
    } else {
      if (accomodation == "moulin") {
        alert(
          "Réservations uniquement du samedi au samedi et moins de 31 jours."
        );
      }
      if (accomodation == "bergerie") {
        alert("Veuillez sélectionner une période inférieure à 31 jours.");
      }
    }
    datesRef.current.style.color = " red";
    datesRef.current.style.border = "1px solid red";
    setTimeout(() => {
      datesRef.current.style.color = "";
      datesRef.current.style.border = "";
    }, 2500);
  };
  ////////////////////////////////////////////
  return (
    <div>
      {loading && (
        <div className="loading">
          <div className="loading-spinner-container">
            <span className="loading-spinner"></span>
          </div>
        </div>
      )}

      <form ref={formRef} className="calendarWrap" onSubmit={sendEmail}>
        <h3>Demande de réservation:</h3>
        <div className="calendar">
          <div className="accomodation-input">
            <input
              type="text"
              defaultValue={accomodation}
              name="accomodation"
              style={{ display: "none" }}
            />
          </div>
          <input
            value={` ${format(range[0].startDate, "dd/MM/yyyy")} à ${format(
              range[0].endDate,
              "dd/MM/yyyy"
            )} `}
            readOnly
            className="inputBox"
            ref={datesRef}
            onClick={() => {
              setOpen(true);
            }}
            name="dates"
            required
          />
          <div ref={refOne}>
            {open && (
              <DateRange
                onChange={(item) => {
                  setRange([item.selection]);
                }}
                edittableDateInputs={true}
                ranges={range}
                showMonthArrow={true}
                showMonthAndYearPickers={false}
                locale={rdrLocales.fr}
                /*disabledDay={isItSaturday} */
                disabledDates={disabledDates}
                minDate={calendarStart}
                maxDate={calendarEnd}
                months={1}
                direction="horizontal"
                className="calendarElement"
              />
            )}
          </div>
        </div>
        <div className="travelers">
          <h4>Voyageurs:</h4>
          <div className="travelers-input">
            <input
              type="number"
              min={accomodation == "bergerie" ? "1" : "2"}
              max={accomodation == "bergerie" ? "4" : "8"}
              defaultValue="4"
              name="travelers"
              required
              autoComplete="off"
            />
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
          id=""
          cols="5"
          rows="2"
          autoComplete="off"
          onChange={(e) => handlePassword(e.target.value)}
        ></textarea>
        {dates.length > 1 ? (
          <h5>
            {dates.length - 1} nuit{dates.length == 2 ? null : "s"} {`(`}{" "}
            {Math.round(price / (dates.length - 1))}€/ nuit {`)`}
          </h5>
        ) : (
          <div style={{ minHeight: "18.4px" }}></div>
        )}
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
        {admin ? (
          <div className="calendar-editor">
            <div>
              <button onClick={() => editDisabledDates()}>
                Bloquer les dates selectionnées
              </button>
            </div>
            <div>
              <button onClick={() => addPeriodRate()}>
                Ajouter un tarif pour la période selectionnée
              </button>
              <input
                type="number"
                min="30"
                onChange={(e) => {
                  setPeriodRate(e.target.value);
                }}
              />
            </div>
            <div className="available-dates">
              <button
                onClick={() => {
                  resetAllRates();
                }}
              >
                Réinitialiser tarif par défault
              </button>

              <input
                type="number"
                onChange={(e) => setNewDefaultRate(e.target.value)}
                placeholder={defaultRate.defaultRate}
                min="30"
              />
            </div>
            <div className="available-dates">
              <button onClick={() => editAvailableDates()}>
                Débloquer des dates
              </button>
              <div className="date-inputs">
                <input type="date" onChange={(e) => availableStart(e)} />
                <input type="date" onChange={(e) => availableEnd(e)} />
              </div>
            </div>
          </div>
        ) : (
          <button type="submit" className="button" ref={submitRef}>
            {formSent ? "Demande envoyée!" : "Réservation"}
          </button>
        )}
      </form>
    </div>
  );
};

export default DateRangeComp;
