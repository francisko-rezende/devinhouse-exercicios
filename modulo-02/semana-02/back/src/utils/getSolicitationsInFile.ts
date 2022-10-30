import fs from "fs";
import { Solicitation } from "../types/solicitation.type";

export const getSolicitationsInFile = (): Solicitation[] => {
  const solicitationsInFile = fs.readFileSync("solicitations.json").toString();
  const solicitations = JSON.parse(solicitationsInFile);
  return solicitations;
};
