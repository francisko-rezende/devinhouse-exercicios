import { v4 as uuidv4 } from "uuid";

export const findManyPizzas = (req, res) => {
  const { name } = req.query;

  if (!!name) {
    const searchedNameMatchesPizzaName = (pizza) =>
      pizza.name.toLowerCase().includes(name.toLowerCase());

    const filteredPizzas = pizzas.filter(searchedNameMatchesPizzaName);
    return res.status(200).json(filteredPizzas);
  }

  return res.status(200).json(pizzas);
};

export const createPizza = async (req, res) => {
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
};

export const updatePizza = async (req, res) => {
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
};

export const deletePizza = (req, res) => {
  const { id } = req.params;
  pizzas = pizzas.filter((pizza) => pizza.id !== id);
  return res.status(200).send("Pizza deletada");
};
