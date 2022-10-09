import { grass } from '@radix-ui/colors';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { axiosInstance } from '../../lib/axios';
import { Center } from '../Center';
import { Form } from '../Form';

interface MainProps {
  children: React.ReactNode;
}

export const Main = () => {
  const pizzasQuery = useQuery(['pizzas'], async () => {
    const { data } = await axiosInstance.get('pizzas');
    return data;
  });

  return (
    <StyledMain>
      <Center>
        <Form />
        {pizzasQuery.isLoading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <ul>
              {pizzasQuery.data.map(({ name }: { name: string }) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </>
        )}
      </Center>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  background-color: ${grass.grass3};
  height: 100%;
`;
