const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const clearInput = () => {
    contactForm["nome"].value = "";
    contactForm["email"].value = "";
    contactForm["descricao"].value = "";
  };

  const nome = contactForm["nome"].value;
  const email = contactForm["email"].value;
  const descricao = contactForm["descricao"].value;

  console.log(`Nome: ${nome} - E-mail: ${email} - Descriçao: ${descricao}`);
  alert("Formulário enviado com sucesso");
  clearInput();
});
