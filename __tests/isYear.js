const isLeapYear = (year) => {
  if (typeof year !== "number") {
    throw new Error("year must be number");
  }
  const date = new Date(year, 2, 0);
  const days = date.getDate();
  return 29 === days;
};
const degree = (a, b) => {
  return a ** b;
};

module.exports = { isLeapYear, degree };
