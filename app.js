const convidado1 = {
  nome: "Gasparino",
  sobrenome: "Pereira",
  setor: "camarote",
  idade: 20,
};
const convidado2 = {
  nome: "Maria",
  sobrenome: "Aparecida",
  setor: "camarote",
  idade: 16,
};
const convidado3 = {
  nome: "Rosangela",
  sobrenome: "dos Santos",
  setor: "arquibancada",
  idade: 20,
};
const convidado4 = {
  nome: "Isaias",
  sobrenome: "Felizardo",
  setor: "arquibancada",
  idade: 16,
};
const convidado5 = {
  nome: "Anidelci",
  sobrenome: "Forti",
  setor: "pista",
  idade: 20,
};
const convidado6 = {
  nome: "Janaina",
  sobrenome: "Matias",
  setor: "pista",
  idade: 16,
};

const listaDeConvidados = [
  convidado1,
  convidado2,
  convidado3,
  convidado4,
  convidado5,
  convidado6,
];

const separarCamarote = (lista) =>
lista.filter((item) => item.setor === "camarote");
const separarPista = (lista) =>
lista.filter((item) => item.setor === "pista");
const separarArquibancada = (lista) =>
lista.filter((item) => item.setor === "arquibancada");

const liberarBebida = (listaDeConvidados) => {
  let novaListaDeConvidados = [];

  listaDeConvidados.forEach((convidado) => {
    if (convidado.idade > 17) {
      convidado.openBar = true;
    } else {
      convidado.openBar = false;
    }
    novaListaDeConvidados.push(convidado);
  });

  return novaListaDeConvidados;
};

const convidadosComBebidasProcessada = liberarBebida(listaDeConvidados);

const listaCamarote = separarCamarote(convidadosComBebidasProcessada)
const listaPista = separarPista(convidadosComBebidasProcessada)
const listaArquibancada = separarArquibancada(convidadosComBebidasProcessada)

const elementoListaCamarote = document.querySelector('[data-js="lista camarote"]')
const elementoListaArquibancada = document.querySelector('[data-js="lista arquibancada"]')
const elementoListaPista = document.querySelector('[data-js="lista pista"]')

const criaItemsDaListaCamarote = item => {
  const deveTerEmoji = item.openBar
  let newItem 
  
  if (deveTerEmoji) {
    newItem = `<li>${item.nome} ${item.sobrenome} 🍹</li>`
  } else {
    newItem = `<li>${item.nome} ${item.sobrenome}</li>`
  }
  elementoListaCamarote.innerHTML += newItem
}
const criaItemsDaListaArquibancada = item => {
  const deveTerEmoji = item.openBar
  let newItem 
  
  if (deveTerEmoji) {
    newItem = `<li>${item.nome} ${item.sobrenome} 🍹</li>`
  } else {
    newItem = `<li>${item.nome} ${item.sobrenome}</li>`
  }
  elementoListaArquibancada.innerHTML += newItem
}
const criaItemsDaListaPista = item => {
  const deveTerEmoji = item.openBar
  let newItem 
  
  if (deveTerEmoji) {
    newItem = `<li>${item.nome} ${item.sobrenome} 🍹</li>`
  } else {
    newItem = `<li>${item.nome} ${item.sobrenome}</li>`
  }
  elementoListaPista.innerHTML += newItem
}

listaCamarote.forEach(criaItemsDaListaCamarote)
listaArquibancada.forEach(criaItemsDaListaArquibancada)
listaPista.forEach(criaItemsDaListaPista)