const form = document.querySelector("form");
const ageInput = document.querySelector("input");

const getAgeClassification = (age) => {
  if (age >= 0 && age <= 15) {
    return "Jovem";
  }

  if (age >= 16 && age <= 64) {
    return "Adulto";
  }

  return "Idoso";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const age = Number(document.querySelector("input").value);

  const resultText = document.querySelector('[data-js="result"]');

  if (!resultText) {
    const resultTextElement = document.createElement("p");
    resultTextElement.setAttribute("data-js", "result");
    resultTextElement.textContent = getAgeClassification(age);
    document.body.appendChild(resultTextElement);
    return;
  }

  resultText.textContent = getAgeClassification(age);
});
