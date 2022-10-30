import { Router } from "express";

import {
  createPizza,
  deletePizza,
  findManyPizzas,
  updatePizza,
} from "../controllers/pizza.controller";

const pizzaRoutes = Router();

pizzaRoutes.get("/pizzas", findManyPizzas);

pizzaRoutes.post("/pizzas", createPizza);

pizzaRoutes.put("/pizzas/:id", updatePizza);

pizzaRoutes.delete("/pizzas/:id", deletePizza);

export { pizzaRoutes };
