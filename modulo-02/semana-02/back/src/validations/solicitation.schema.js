import * as yup from "yup";
import { pizzaSchema } from "./pizza.schema.js";

export const solicitationSchema = yup.object({
  client: yup.string().required("Nome do cliente é obrigatório"),
  document: yup.string().required("Documento do cliente é obrigatório"),
  address: yup.string().required("Endereço do cliente é obrigatório"),
  phoneNumber: yup.string().required("Número de telefone é obrigatório"),
  paymentMethod: yup.string().required("Método de pagamento é obrigatório"),
  notes: yup.string(),
  order: yup.array().of(pizzaSchema),
});
