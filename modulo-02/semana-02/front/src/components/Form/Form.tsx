import React from 'react';
import { useForm } from 'react-hook-form';

// const solicitationSchema = yup.object({
//   client: yup.string().required('Nome do cliente é obrigatório'),
//   document: yup.string().required('Documento do cliente é obrigatório'),
//   address: yup.string().required('Endereço do cliente é obrigatório'),
//   phoneNumber: yup.string().required('Número de telefone é obrigatório'),
//   paymentMethod: yup.string().required('Método de pagamento é obrigatório'),
//   notes: yup.string(),
//   orders: yup.array().of(pizzaSchema),
// });

export const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const pizza = [
    {
      id: '836f545f-d031-4193-8d8b-d045e509309d',
      name: 'Brigadeiro',
      description: 'Deliciosa pizza de Brigadeiro',
      price: 123,
      ingredients: ['brigadeiro'],
    },
    {
      id: '836f545f-d031-4193-8d8b-d045e509309d',
      name: 'Muçarela',
      description: 'Deliciosa pizza de Brigadeiro',
      price: 123,
      ingredients: ['brigadeiro'],
    },
    {
      id: '836f545f-d031-4193-8d8b-d045e509309d',
      name: 'Peperoni',
      description: 'Deliciosa pizza de Brigadeiro',
      price: 123,
      ingredients: ['brigadeiro'],
    },
  ];

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <label htmlFor="client">Nome</label>
      <input type="text" id="client" {...register('client')} />

      <label htmlFor="document">CPF</label>
      <input type="text" id="document" {...register('document')} />

      <label htmlFor="address">Endereço</label>
      <input type="text" id="address" {...register('address')} />

      <label htmlFor="phoneNumber">Telefone</label>
      <input type="text" id="phoneNumber" {...register('phoneNumber')} />

      <fieldset>
        <legend>Forma de pagamento</legend>
        <input {...register('paymentMethod')} type="radio" value="pix" id="pix" />
        <label htmlFor="pix">Pix</label>
        <input {...register('paymentMethod')} type="radio" value="card" id="card" />
        <label htmlFor="card">Cartão</label>
        <input {...register('paymentMethod')} type="radio" value="cash" id="cash" />
        <label htmlFor="cash">Dinheiro</label>
      </fieldset>

      <label htmlFor="phoneNumber">Telefone</label>
      <input type="text" id="phoneNumber" {...register('phoneNumber')} />

      <label htmlFor="notes">Observações</label>
      <textarea id="notes" {...register('notes')}></textarea>

      {/* <input {...register('checkbox')} type="checkbox" value={JSON.stringify(pizza[0])} />
      <input {...register('checkbox')} type="checkbox" value={JSON.stringify(pizza[1])} />
      <input {...register('checkbox')} type="checkbox" value={JSON.stringify(pizza[2])} /> */}

      <button>enviar</button>
    </form>
  );
};
