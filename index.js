const form = document.querySelector("form");

const checkIfEvenOrOdd = (number) => (number % 2 ? "É ímpar" : "É par");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const number = Number(document.querySelector("input").value);

  const resultText = document.querySelector('[data-js="result"]');

  if (!resultText) {
    const resultTextElement = document.createElement("p");
    resultTextElement.setAttribute("data-js", "result");
    resultTextElement.textContent = checkIfEvenOrOdd(number);
    document.body.appendChild(resultTextElement);
    return;
  }

  resultText.textContent = checkIfEvenOrOdd(number);
});
