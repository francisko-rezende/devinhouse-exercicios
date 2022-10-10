import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import * as yup from 'yup';

import { axiosInstance } from '../../lib/axios';
import { queryClient } from '../../lib/react-query';
import { Pizza } from '../Main/Main';
import { PizzaCard } from '../PizzaCard';

const pizzaSchema = yup.object({
  id: yup.string(),
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
  price: yup.number().required('Preço é obrigatório'),
  ingredients: yup
    .array()
    .of(yup.string())
    .min(1, 'Pelo menos um ingrediente é obrigatório'),
});

const solicitationSchema = yup.object({
  id: yup.string(),
  client: yup.string().required('Nome do cliente é obrigatório'),
  document: yup.string().required('Documento do cliente é obrigatório'),
  address: yup.string().required('Endereço do cliente é obrigatório'),
  phoneNumber: yup.string().required('Número de telefone é obrigatório'),
  paymentMethod: yup.string().required('Método de pagamento é obrigatório'),
  notes: yup.string(),
  order: yup.array().of(pizzaSchema).min(1, 'Escolha pelo menos uma pizza'),
});

export type Solicitation = {
  id: string;
  client: string;
  document: string;
  address: string;
  phoneNumber: string;
  paymentMethod: string;
  notes: string;
  order: Pizza[];
};

export const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(solicitationSchema) });

  const pizzasQuery = useQuery(['pizzas'], async () => {
    const { data } = await axiosInstance.get('pizzas');
    return data;
  });

  const solicitationsMutation = useMutation(
    (data: Solicitation) => axiosInstance.post('/solicitations', data),
    {
      onSuccess: () => queryClient.invalidateQueries(['solicitations']),
    },
  );

  const [selectedPizzas, setSelectedPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    setValue('order', selectedPizzas);
  }, [selectedPizzas.length]);

  useEffect(() => {
    setValue('client', 'João Cunha');
    setValue('document', '327.129.163-28');
    setValue('address', 'Rua dos bobos número 0');
    setValue('phoneNumber', '(32) 98888-8888');
    setValue('paymentMethod', 'pix');
    setValue('notes', 'sem cebola');
  }, []);

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
      <h2>Faça um pedido</h2>
      <StyledForm
        onSubmit={handleSubmit((data) => {
          solicitationsMutation.mutate(data as Solicitation);
          reset();
          console.log(data);
          setSelectedPizzas([]);
        })}
      >
        <FormFieldWrapper>
          <label htmlFor="client">Nome</label>
          <input type="text" id="client" {...register('client')} />
          {errors?.client?.message && <p>{errors.client.message}</p>}
        </FormFieldWrapper>
        <FormFieldWrapper>
          <label htmlFor="document">CPF</label>
          <input type="text" id="document" {...register('document')} />
          {errors?.document?.message && <p>{errors.document.message}</p>}
        </FormFieldWrapper>
        <FormFieldWrapper>
          <label htmlFor="address">Endereço</label>
          <input type="text" id="address" {...register('address')} />
          {errors?.address?.message && <p>{errors.address.message}</p>}
        </FormFieldWrapper>
        <FormFieldWrapper>
          <label htmlFor="phoneNumber">Telefone</label>
          <input type="text" id="phoneNumber" {...register('phoneNumber')} />
          {errors?.phoneNumber?.message && <p>{errors.phoneNumber.message}</p>}
        </FormFieldWrapper>
        <Fieldset>
          <legend>Forma de pagamento</legend>
          <div>
            <input {...register('paymentMethod')} type="radio" value="pix" id="pix" />
            <label htmlFor="pix">Pix</label>
          </div>
          <div>
            <input {...register('paymentMethod')} type="radio" value="card" id="card" />
            <label htmlFor="card">Cartão</label>
          </div>
          <div>
            <input {...register('paymentMethod')} type="radio" value="cash" id="cash" />
            <label htmlFor="cash">Dinheiro</label>
          </div>
          {errors?.paymentMethod?.message && <p>{errors.paymentMethod.message}</p>}
        </Fieldset>

        {pizzasQuery.isLoading ? (
          <p>Carregando...</p>
        ) : (
          <fieldset>
            <legend>Escolha suas pizzas</legend>
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
            {errors?.order?.message && (
              <p style={{ color: 'red' }}>{errors.order.message}</p>
            )}
          </fieldset>
        )}

        <FormFieldWrapper>
          <label htmlFor="notes">Observações</label>
          <textarea id="notes" {...register('notes')}></textarea>
        </FormFieldWrapper>

        <StyledButton>Enviar</StyledButton>
      </StyledForm>
    </>
  );
};

const StyledButton = styled.button`
  width: 200px;
  place-self: center;
  padding: 16px 20px;
`;

const StyledForm = styled.form`
  display: grid;
  gap: 1rem;
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  grid-template-rows: min-content;
  gap: 1rem;
`;

const FormFieldWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 2rem;
  gap: 8px;

  & > input {
    border-radius: 5px;
  }

  & > p {
    color: red;
    margin-top: -4px;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  justify-content: space-around;
`;
