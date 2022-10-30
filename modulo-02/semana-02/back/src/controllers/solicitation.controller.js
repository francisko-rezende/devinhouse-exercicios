import { v4 as uuidv4 } from "uuid";

export const getSolicitationById = (req, res) => {
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
};

export const getSolicitations = (req, res) => {
  res.status(200).json(solicitations);
};

export const postSolicitation = async (req, res) => {
  try {
    const { body } = req;

    await solicitationSchema.validate(body);

    const solicitation = { id: uuidv4(), ...body };
    solicitations = [...solicitations, solicitation];
    res.status(201).json(solicitation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
