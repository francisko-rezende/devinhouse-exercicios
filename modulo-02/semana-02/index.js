const express = require("express");
const yup = require("yup");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

let pizzas = [];

const pizzaSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  price: yup.number().required("Preço é obrigatório"),
  ingredients: yup
    .array()
    .of(yup.string())
    .min(1, "Pelo menos um ingrediente é obrigatório"),
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

app.listen(3333, () => {
  console.log("Server is up");
});
