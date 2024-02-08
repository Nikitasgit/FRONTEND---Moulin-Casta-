export const handleCursorOut = (classMode) => {
  document.querySelectorAll(`.startDate-hover${classMode}`).forEach((el) => {
    el.classList.remove(`startDate-hover${classMode}`);
  });
  document
    .querySelectorAll(`.morning-blocked-hover${classMode}`)
    .forEach((el) => {
      el.classList.remove(`morning-blocked-hover${classMode}`);
    });
  document
    .querySelectorAll(`.evening-blocked-hover${classMode}`)
    .forEach((el) => {
      el.classList.remove(`evening-blocked-hover${classMode}`);
    });
};
