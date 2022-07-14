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
