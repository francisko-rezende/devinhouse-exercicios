import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { axiosInstance } from '../../lib/axios';
import { Pizza } from '../Main/Main';
import { PizzaCard } from '../PizzaCard';

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

  const pizzasQuery = useQuery(['pizzas'], async () => {
    const { data } = await axiosInstance.get('pizzas');
    return data;
  });

  const [selectedPizzas, setSelectedPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    setValue('orders', selectedPizzas);
  }, [selectedPizzas.length]);

  const checkIfSelected = (pizza: Pizza, selectedPizzas: Pizza[]) =>
    selectedPizzas.some(({ id }) => id === pizza.id);

  const handleSelectPizza = (pizza: Pizza) => {
    setSelectedPizzas((pizzas) => {
      const isSelected = checkIfSelected(pizza, pizzas);

      if (isSelected) {
        return pizzas.filter(({ id }) => id !== pizza.id);
      }

      return [...pizzas, pizza];
    });
  };

  return (
    <>
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

      {pizzasQuery.isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <Grid>
            {pizzasQuery.data.map((pizza: Pizza) => (
              <PizzaCard
                pizza={pizza}
                isSelected={checkIfSelected(pizza, selectedPizzas)}
                description={pizza.description}
                imgUrl={pizza.imgUrl}
                name={pizza.name}
                ingredients={pizza.ingredients}
                key={pizza.id}
                handleSelectPizza={() => handleSelectPizza(pizza)}
              />
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  grid-template-rows: min-content;
  gap: 1rem;
`;
