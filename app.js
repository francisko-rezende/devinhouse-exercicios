const currentYear = new Date().getFullYear();
const userYear = parseInt(prompt("Digite um ano, por favor"));

const difference = userYear - currentYear;

alert(`A diferença entre o ano digitado e o ano atual é de ${difference}`);
