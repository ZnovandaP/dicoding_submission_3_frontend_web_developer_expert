const generateCurrentYear = (element) => {
  const date = new Date();
  const getCurrentYear = date.getFullYear();
  element.textContent = getCurrentYear;
};

export default generateCurrentYear;
