const findMatchingDates = (datesAPI, datesRange) => {
  const matchingDates = datesAPI.filter((date) => {
    datesRange.some((dateRange) => dateRange.getTime() === date.date.getTime());
  });
  return matchingDates;
};

export { findMatchingDates };
