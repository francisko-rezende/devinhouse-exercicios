import { v4 as uuidv4 } from "uuid";
import { getSolicitationsInFile } from "../utils/getSolicitationsInFile.js";
import fs from "fs";
import { solicitationSchema } from "../validations/solicitation.schema.js";

export const getSolicitationById = (req, res) => {
  const { id } = req.params;

  if (!!id) {
    const getSolicitationWithMatchingId = (solicitation) =>
      solicitation.id === id;

    const solicitations = getSolicitationsInFile();

    const searchedSolicitation = solicitations.find(
      getSolicitationWithMatchingId
    );
    return searchedSolicitation
      ? res.status(200).json(searchedSolicitation)
      : res.status(400).json({ error: "Pedido não encontrado" });
  }

  return res.status(400).json({ error: "Pedido não encontrado" });
};

export const getSolicitations = (req, res) => {
  const solicitations = getSolicitationsInFile();

  res.status(200).json(solicitations);
};

export const postSolicitation = async (req, res) => {
  try {
    const { body } = req;

    await solicitationSchema.validate(body);

    const solicitation = { id: uuidv4(), ...body };

    const solicitations = getSolicitationsInFile();

    const updatedSolicitations = [...solicitations, solicitation];
    fs.writeFileSync(
      "solicitations.json",
      JSON.stringify(updatedSolicitations)
    );
    res.status(201).json(solicitation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateStatus = (req, res) => {
  const { id } = req.params;

  if (!!id) {
    const solicitations = getSolicitationsInFile();

    const updatedSolicitations = solicitations.map((solicitation) => {
      const isSolicitationToUpdate = solicitation.id === id;

      if (isSolicitationToUpdate) {
        solicitation.status = "A caminho";
      }
      return solicitation;
    });

    fs.writeFileSync("solicitations.js", JSON.stringify(updatedSolicitations));
  }

  return res.status(400).json({ error: "É necessário enviar um id" });
};
