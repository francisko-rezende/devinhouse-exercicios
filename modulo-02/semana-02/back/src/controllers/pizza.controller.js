import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { response } from "express";
import { pizzaSchema } from "../validations/pizza.schema.js";
import { getPizzasInFile } from "../utils/getPizzasInFile.js";

export const findManyPizzas = (req, res) => {
  const { name } = req.query;

  const pizzas = getPizzasInFile();

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

    const pizzas = getPizzasInFile();

    const newPizza = {
      id: uuidv4(),
      ...body,
    };

    const pizzaExists = pizzas.find((pizza) => pizza.name === newPizza.name);

    if (pizzaExists) {
      return res
        .status(401)
        .json({ error: "Pizza already exists in the database" });
    }

    fs.writeFileSync("pizzas.json", JSON.stringify([...pizzas, newPizza]));
    return res.status(201).json(newPizza);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updatePizza = async (req, res) => {
  try {
    const updatedPizza = { ...req.body };
    await pizzaSchema.validate(updatedPizza);

    const pizzas = getPizzasInFile();

    const updatedPizzas = pizzas.map((pizza) => {
      const isPizzaToUpdate = pizza.id === updatedPizza.id;
      return isPizzaToUpdate ? updatedPizza : pizza;
    });
    fs.writeFileSync("pizzas.json", JSON.stringify(updatedPizzas));
    return res.status(200).send("Pizza editada com sucesso");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deletePizza = (req, res) => {
  const { id } = req.params;
  const pizzas = getPizzasInFile();

  const updatedPizzas = pizzas.filter((pizza) => pizza.id !== id);
  fs.writeFileSync("pizzas.json", JSON.stringify(updatedPizzas));
  return res.status(200).send("Pizza deletada");
};
