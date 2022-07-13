const numero1 = prompt('Digite um número')
const operacao = prompt('Digite uma operação (+, -, * ou /')
const numero2 = prompt('Digite outro número')

switch (operacao) {
  case '+':
    console.log(`${Number(numero1) + Number(numero2)}`)
    break;
  
  case '-':
    console.log(`${Number(numero1) - Number(numero2)}`)
    break

  case '*':
    console.log(`${Number(numero1) * Number(numero2)}`)
    break

  case '/':
    console.log(`${Number(numero1) / Number(numero2)}`)
    break

  default:
    console.log('Operação inválida')
    break;
}