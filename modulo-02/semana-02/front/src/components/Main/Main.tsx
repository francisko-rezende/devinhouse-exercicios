import { olive } from '@radix-ui/colors';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { axiosInstance } from '../../lib/axios';
import { Center } from '../Center';
import { Form } from '../Form';
import { Solicitation } from '../Form/Form';

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
  const solicitationsQuery = useQuery(['solicitations'], async () => {
    const { data } = await axiosInstance.get('solicitations');
    return data;
  });
  return (
    <StyledMain>
      <Center>
        <Form />
        <h3>Pedidos</h3>
        <ol>
          {solicitationsQuery.isLoading ? (
            <li>Carregando</li>
          ) : (
            solicitationsQuery.data.map((solicitation: Solicitation, index: number) => (
              <li key={solicitation.id}>
                {index + 1} {solicitation.client}
              </li>
            ))
          )}
        </ol>
      </Center>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  background-color: ${olive.olive3};
  height: 100%;
`;
