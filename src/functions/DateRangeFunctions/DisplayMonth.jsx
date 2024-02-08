export const findPrevMonthDates = (currentYear, currentMonth) => {
  const firstDay = new Date(currentYear, currentMonth, 1);
  const firstDayCell = firstDay.getDay() !== 0 ? firstDay.getDay() : 7;
  const lastDatePrevMonth = new Date(firstDay.setDate(0));
  const year = lastDatePrevMonth.getFullYear();
  const month = lastDatePrevMonth.getMonth();
  const daysPrevMonth = lastDatePrevMonth.getDate();
  let countPrevMonthStart = daysPrevMonth - firstDayCell + 1;
  const prevMonthDates = [];
  for (let i = 1; i < firstDayCell; i++) {
    countPrevMonthStart += 1;
    prevMonthDates.push({
      date: new Date(year, month, countPrevMonthStart).toISOString(),
      rate: null,
      available: false,
      className: "disabled-day",
    });
  }

  return prevMonthDates;
};
export const getFullMonth = (givenDates, currentYear, currentMonth) => {
  const firstDay = new Date(currentYear, currentMonth, 2);
  const lastDay = new Date(currentYear, currentMonth + 1, 1);
  const allDatesArray = getDatesBetween(firstDay, lastDay);
  const existingDates = givenDates.map((item) => item.date);

  // Create an object to efficiently check for existing dates
  const existingDatesSet = new Set(existingDates);

  // Add existing dates to the result array
  const fullMonth = givenDates.slice();

  // Add missing dates to the result array
  allDatesArray.forEach((date) => {
    if (!existingDatesSet.has(date)) {
      fullMonth.push({
        date: date,
        available: false,
        rate: null,
        className: "added-day",
      });
    }
  });

  // Sort the result array by date
  fullMonth.sort((a, b) => new Date(a.date) - new Date(b.date));

  return fullMonth;
};

export const findNextMonthDates = (
  prevDates,
  fullmonth,
  currentYear,
  currentMonth
) => {
  const nextMonthDates = [];
  const nextMonthFirstDate = new Date(
    currentYear + (currentMonth === 11 ? 1 : 0),
    (currentMonth + 1) % 12,
    2
  );
  const cellsMissing = 42 - prevDates - fullmonth;

  for (let i = 0; i < cellsMissing; i++) {
    const dateWithZeroTime = new Date(nextMonthFirstDate);
    dateWithZeroTime.setUTCHours(0, 0, 0, 0);
    nextMonthDates.push({
      date: new Date(dateWithZeroTime).toISOString(),
      available: false,
      rate: null,
      className: "disabled-day",
    });
    nextMonthFirstDate.setDate(nextMonthFirstDate.getDate() + 1);
  }
  return nextMonthDates;
};
export const getDatesBetween = (startDate, endDate) => {
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

export const findUnavailableDates = (datesArray, dates, lastDayPrevMonth) => {
  const dateToUTCTime = lastDayPrevMonth.setUTCHours(0, 0, 0, 0);
  const dateToISO = new Date(dateToUTCTime).toISOString();

  // Check if the dateToISO is not found or the found date is not available
  const foundDate = dates.find((dateObj) => dateObj.date === dateToISO);
  // Filter and map directly on the array
  const newArray = datesArray
    .filter((date) => !date.available)
    .map((date) => date.date);

  // Add dateToISO only if it was not found or the found date is not available
  if (!foundDate || !foundDate.available) {
    newArray.unshift(dateToISO);
  }
  return newArray;
};

export const assignClassesToDatesOnDOM = (
  daysWrapper,
  unavailableDates,
  lastDayPrevMonth,
  editing
) => {
  const firstDayCurrentMonth = new Date(
    lastDayPrevMonth.getFullYear(),
    lastDayPrevMonth.getMonth(),
    lastDayPrevMonth.getDate() + 1
  ).setUTCHours(0, 0, 0, 0);

  const dateToUTCTime = lastDayPrevMonth.setUTCHours(0, 0, 0, 0);
  const prevMonthDateToISO = new Date(dateToUTCTime).toISOString();
  const firstDateToISO = new Date(firstDayCurrentMonth).toISOString();

  const dateElements = Array.from(daysWrapper.current.children);

  const organizeUnavailableDates = () => {
    const organizedDates = [];
    let currentGroup = [];

    for (let i = 0; i < unavailableDates.length; i++) {
      const currentDate = new Date(unavailableDates[i]);
      const nextDate = new Date(unavailableDates[i + 1]);

      currentGroup.push(currentDate.toISOString());

      if (
        i === unavailableDates.length - 1 ||
        nextDate - currentDate !== 24 * 60 * 60 * 1000
      ) {
        organizedDates.push([...currentGroup]);
        currentGroup = [];
      }
    }
    return organizedDates;
  };

  const organizedUnavailableDates = organizeUnavailableDates();

  organizedUnavailableDates.forEach((dateGroup) => {
    const firstDate = dateGroup[0];
    const lastDate = dateGroup[dateGroup.length - 1];

    dateElements.forEach((element, currentIndex) => {
      const date = element.getAttribute("data-date");
      const nextDateElement = dateElements[currentIndex + 1];
      if (firstDate === prevMonthDateToISO && dateGroup.length === 1) {
        if (date === firstDateToISO) {
          element.classList.add("morning-blocked");
        }
      }
      if (date === firstDate && date === lastDate) {
        element.classList.add("evening-blocked");
        if (nextDateElement) {
          nextDateElement.classList.add("morning-blocked");
        }
      } else if (date === firstDate) {
        element.classList.add("evening-blocked");
      } else if (date === lastDate) {
        if (nextDateElement) {
          nextDateElement.classList.add("morning-blocked");
        }
        element.classList.add(`day-blocked`);
        if (!editing && !element.classList.contains("added-day")) {
          element.classList.add("stop");
        }
      } else if (dateGroup.includes(date)) {
        element.classList.add(`day-blocked`);
        if (!editing && !element.classList.contains("added-day")) {
          element.classList.add("stop");
        }
      }
    });
  });
};
