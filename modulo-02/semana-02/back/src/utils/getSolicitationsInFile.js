import fs from "fs";

export const getSolicitationsInFile = () => {
  const solicitationsInFile = fs.readFileSync("solicitations.json").toString();
  const solicitations = JSON.parse(solicitationsInFile);
  return solicitations;
};
