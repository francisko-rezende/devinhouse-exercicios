const express = require("express");
const yup = require("yup");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

let pizzas = [];
let solicitations = [];

const pizzaSchema = yup.object({
  id: yup.string(),
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  price: yup.number().required("Preço é obrigatório"),
  ingredients: yup
    .array()
    .of(yup.string())
    .min(1, "Pelo menos um ingrediente é obrigatório"),
});

const solicitationSchema = yup.object({
  client: yup.string().required("Nome do cliente é obrigatório"),
  document: yup.string().required("Documento do cliente é obrigatório"),
  address: yup.string().required("Endereço do cliente é obrigatório"),
  phoneNumber: yup.string().required("Número de telefone é obrigatório"),
  paymentMethod: yup.string().required("Método de pagamento é obrigatório"),
  notes: yup.string(),
  orders: yup.array().of(pizzaSchema),
});

app.get("/solicitations/:id", (req, res) => {
  const { id } = req.params;

  if (!!id) {
    const getSolicitationWithMatchingId = (solicitation) =>
      solicitation.id === id;
    const searchedSolicitation = solicitations.find(
      getSolicitationWithMatchingId
    );
    return searchedSolicitation
      ? res.status(200).json(searchedSolicitation)
      : res.status(400).json({ error: "Pedido não encontrado" });
  }

  return res.status(400).json({ error: "Pedido não encontrado" });
});

app.get("/solicitations", (req, res) => {
  res.status(200).json(solicitations);
});

app.post("/solicitations", async (req, res) => {
  try {
    const { body } = req;

    await solicitationSchema.validate(body);

    const solicitation = { id: uuidv4(), ...body, orders: pizzas };
    solicitations = [...solicitations, solicitation];
    res.status(201).json(solicitation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.get("/pizzas", (req, res) => {
  const { name } = req.query;

  if (!!name) {
    const searchedNameMatchesPizzaName = (pizza) =>
      pizza.name.toLowerCase().includes(name.toLowerCase());

    const filteredPizzas = pizzas.filter(searchedNameMatchesPizzaName);
    return res.status(200).json(filteredPizzas);
  }

  return res.status(200).json(pizzas);
});

app.post("/pizzas", async (req, res) => {
  try {
    const { body } = req;

    await pizzaSchema.validate(body);

    const pizza = {
      id: uuidv4(),
      ...body,
    };

    pizzas = [...pizzas, pizza];
    return res.status(201).json(pizza);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.put("/pizzas/:id", async (req, res) => {
  try {
    const updatedPizza = { ...req.body };
    await pizzaSchema.validate(updatedPizza);
    pizzas = pizzas.map((pizza) => {
      const isPizzaToUpdate = pizza.id === updatedPizza.id;
      return isPizzaToUpdate ? updatedPizza : pizza;
    });
    return res.status(200).send("Pizza editada com sucesso");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.delete("/pizzas/:id", (req, res) => {
  const { id } = req.params;
  pizzas = pizzas.filter((pizza) => pizza.id !== id);
  return res.status(200).send("Pizza deletada");
});

app.listen(3333, () => {
  console.log("Server is up");
});
