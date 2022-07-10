const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleElement = document.querySelector("h1");
  const newTitle = form["novo titulo"].value;

  titleElement.textContent = newTitle;
});
