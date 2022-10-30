import { Router } from "express";
import {
  getSolicitationById,
  getSolicitations,
  postSolicitation,
} from "../controllers/solicitation.controller.js";

const solicitationRoutes = Router();

solicitationRoutes.get("/solicitations/:id", getSolicitationById);

solicitationRoutes.get("/solicitations", getSolicitations);

solicitationRoutes.post("/solicitations", postSolicitation);

export { solicitationRoutes };
