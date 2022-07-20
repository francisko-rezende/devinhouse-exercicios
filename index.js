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

const selectContas = document.querySelector("#conta");
const formulario = document.querySelector("form");
const inputValor = document.querySelector("#valor");
const selectOperacao = document.querySelector("#transaction");

const insereContasNoSelect = () => {
  contasClientes.forEach((conta) => {
    selectContas.innerHTML += `<option value="${conta.id}">${conta.id}</option>`;
  });
};

const diminuiSaldo = (conta, valorASubtrair) => {
  conta.saldo -= valorASubtrair;
};

const saca = (valorSacado, idConta) => {
  const conta = contasClientes.find((conta) => conta.id === idConta);
  const saldo = conta.saldo;

  const ehValorInvalido = valorSacado <= 0;
  const ehSaldoInsuficiente = valorSacado > saldo;

  if (ehValorInvalido) {
    alert("Valor inválido.");
    return;
  }

  if (ehSaldoInsuficiente) {
    alert(`Saldo insuficiente. Seu saldo é ${conta.saldo}`);
    return;
  }

  diminuiSaldo(conta, valorSacado);
  alert(`Saque realizado com sucesso! Seu novo saldo é ${conta.saldo}`);
};