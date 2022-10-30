import * as yup from "yup";

export const pizzaSchema = yup.object({
  id: yup.string(),
  name: yup.string().required("Nome é obrigatório"),
  url: yup.string().url(),
  description: yup.string().required("Descrição é obrigatória"),
  price: yup.number().required("Preço é obrigatório"),
  ingredients: yup
    .array()
    .of(yup.string())
    .min(1, "Pelo menos um ingrediente é obrigatório"),
});
