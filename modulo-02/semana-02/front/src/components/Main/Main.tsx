import { grass } from '@radix-ui/colors';
import React from 'react';
import styled from 'styled-components';
import { Center } from '../Center';
import { Form } from '../Form';

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
  background-color: ${grass.grass3};
  height: 100%;
`;
