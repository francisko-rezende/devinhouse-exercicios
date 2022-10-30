import fs from "fs";
import { Pizza } from "../types/pizza.types";

export const getPizzasInFile = () => {
  const pizzasInFile = fs.readFileSync("pizzas.json").toString();
  const pizzas: Array<Pizza> = JSON.parse(pizzasInFile);
  return pizzas;
};
