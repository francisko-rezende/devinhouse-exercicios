import { olive } from '@radix-ui/colors';
import React from 'react';
import styled from 'styled-components';

import { Center } from '../Center';
import { Form } from '../Form';

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
  return (
    <StyledMain>
      <Center>
        <Form />
      </Center>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  background-color: ${olive.olive3};
  height: 100%;
`;
