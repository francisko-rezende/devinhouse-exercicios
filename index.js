const contasClientes = [
  {
    id: 1,
    nome: "Cliente 01",
    saldo: 500,
  },
  {
    id: 2,
    nome: "Cliente 02",
    saldo: 3000,
  },
  {
    id: 3,
    nome: "Cliente 03",
    saldo: 5000,
  },
];

const accountSelect = document.querySelector("#account");

const addAccountsToSelect = () => {
  contasClientes.forEach((conta) => {
    accountSelect.innerHTML += `<option value="${conta.nome}">${conta.id}</option>`;
  });
};