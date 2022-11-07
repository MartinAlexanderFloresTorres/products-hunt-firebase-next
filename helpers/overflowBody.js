/**
 * Overflow body
 * @param {boolean} estado
 */
const overflowBody = (estado) => {
  if (estado) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};

export default overflowBody;
