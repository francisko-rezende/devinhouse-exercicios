let counterValue = 0;
const decreaseValue = document.querySelector('[data-js="decrease-btn"]');
const increaseValue = document.querySelector('[data-js="increase-btn"]');
const resultParagraph = document.querySelector('[data-js="result-paragraph"]');

const updateCounter = (operation) => {
  if (operation === "+") resultParagraph.textContent = ++counterValue;
  if (operation === "-") resultParagraph.textContent = --counterValue;
};

decreaseValue.addEventListener("click", () => {
  updateCounter("-");
});

increaseValue.addEventListener("click", () => {
  updateCounter("+");
});
