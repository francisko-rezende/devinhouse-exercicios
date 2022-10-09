import { grass, olive } from '@radix-ui/colors';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { axiosInstance } from '../../lib/axios';
import { Center } from '../Center';
import { Form } from '../Form';
import { PizzaCard } from '../PizzaCard';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  imgUrl: string;
}

interface MainProps {
  children: React.ReactNode;
}

export const Main = () => {
  const pizzasQuery = useQuery(['pizzas'], async () => {
    const { data } = await axiosInstance.get('pizzas');
    return data;
  });

  const [selectedPizzas, setSelectedPizzas] = useState<Pizza[]>([]);

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
    <StyledMain>
      <Center>
        <Form />
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
      </Center>
    </StyledMain>
  );
};

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  grid-template-rows: min-content;
  gap: 1rem;
`;
const StyledMain = styled.main`
  background-color: ${olive.olive3};
  height: 100%;
`;
