class Produto {
  constructor(nome, preco, emEstoque, quantidade) {
    this.nome = nome;
    this.preco = preco;
    this.emEstoque = emEstoque;
    this.quantidade = quantidade;
  }
}

class Pedido {
  constructor(numeroPedido, nomeCliente) {
    this.numeroPedido = numeroPedido;
    this.dataPedido = new Date().toLocaleDateString();
    this.estaPago = false;
    this.listaProdutos = [];
    this.nomeCliente = nomeCliente;
  }

  adicionarProduto(produto) {
    const isProduct = produto instanceof Produto;

    if (isProduct) {
      this.listaProdutos.push(produto);
    }
  }

  calcularTotal() {
    const getTotalPrice = (acc, { preco, quantidade }) => preco * quantidade;

    return this.listaProdutos.reduce(getTotalPrice, 0);
  }
}

const sapato = new Produto("nike", 70, true, 5);
const garrafa = new Produto("squeeze", 20, true, 3);
const caneca = new Produto("richard", 12, true, 30);
const monitor = new Produto("samsung", 500, true, 10);
const mouse = new Produto("magic", 10, false, 10);

const primeiroPedido = new Pedido(20220001, "João");
const segundoPedido = new Pedido(20220002, "Maria");

primeiroPedido.adicionarProduto(sapato);
primeiroPedido.adicionarProduto(garrafa);
primeiroPedido.adicionarProduto(caneca);

segundoPedido.adicionarProduto(monitor);
segundoPedido.adicionarProduto(mouse);
