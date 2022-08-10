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
    const getTotalPrice = (acc, { preco, quantidade }) =>
      acc + preco * quantidade;

    const precoTotal = this.listaProdutos.reduce(getTotalPrice, 0);

    return precoTotal;
  }
}

const sapato = new Produto("nike", 70, true, 5);
const garrafa = new Produto("squeeze", 20, true, 3);
const caneca = new Produto("copo stanley", 300, true, 30);
const monitor = new Produto("samsung", 500, true, 10);
const mouse = new Produto("magic", 10, false, 10);

const primeiroPedido = new Pedido(20220001, "João");
const segundoPedido = new Pedido(20220002, "Maria");

primeiroPedido.adicionarProduto(sapato);
primeiroPedido.adicionarProduto(garrafa);
primeiroPedido.adicionarProduto(caneca);

segundoPedido.adicionarProduto(monitor);
segundoPedido.adicionarProduto(mouse);

function geraElementoPedido(pedido) {
  return `<li>
  <article>
    <div>
      <h2>Pedido n. <strong>${pedido.numeroPedido}</strong></h2>
      <span>Data: <time datetime="${pedido.dataPedido}">${
    pedido.dataPedido
  }</time></span>
    </div>
    <ul>
      <li><strong>Cliente:</strong>${pedido.nomeCliente}</li>
      <li><strong>Valor total:</strong>${pedido.calcularTotal()}</li>
      <li><strong>Está pago?</strong>${pedido.estaPago}</li>
      <li>Produtos: <ul>${pedido.listaProdutos.reduce(
        (acc, { nome, quantidade, preco }) =>
          acc +
          `<li>${nome} - Quantidade ${quantidade}- Valor un. R$ ${preco}</li>`,
        ""
      )}
        </ul>
      </li>
    </ul>
  </article>
  </li>`;
}

const listaDePedidos = document.querySelector('[data-js="lista-de-pedidos"]');

[primeiroPedido, segundoPedido].forEach((pedido) => {
  listaDePedidos.innerHTML += geraElementoPedido(pedido);
});
