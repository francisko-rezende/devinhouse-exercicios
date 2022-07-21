const contasClientes = [
  {
    id: 1,
    nome: "Cliente 01",
    saldo: 500,
    senha: 123
  },
  {
    id: 2,
    nome: "Cliente 02",
    saldo: 3000,
    senha: 456
  },
  {
    id: 3,
    nome: "Cliente 03",
    saldo: 5000,
    senha: 789
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

const aumentaSaldo = (conta, valorAcrescentado) => {
  conta.saldo += valorAcrescentado;
};

const deposita = (valorDepositado, idConta) => {
  const conta = contasClientes.find((conta) => conta.id === idConta);

  const ehValorInvalido = valorDepositado <= 0;

  if (ehValorInvalido) {
    alert("Valor inválido.");
    return;
  }

  aumentaSaldo(conta, valorDepositado);
  alert(`O depósito ocorreu com sucesso. Seu saldo é de ${conta.saldo}`);
};

const executaOperacao = (e) => {
  e.preventDefault();

  const idConta = Number(selectContas.value);
  const valor = Number(inputValor.value);
  const ehSaque = selectOperacao.value === "Saque";
  const ehDeposito = selectOperacao.value === "Depósito";
  const contaFoiEncontrada = contasClientes.some((conta) => conta.id === idConta)
  const senha = document.querySelector('#senha').value
  const conta = contasClientes.find((conta) => conta.id === idConta);

  const ehASenhaCorreta = conta.senha === senha

  if (!ehASenhaCorreta) {
    alert('Senha inválida')
    return
  }

  if (!contaFoiEncontrada) {
    alert("Conta não encontrada");
    return;
  }

  if (ehSaque) {
    saca(valor, idConta);
    return;
  }

  if (ehDeposito) {
    deposita(valor, idConta);
    return;
  }
};

formulario.addEventListener("submit", executaOperacao);
