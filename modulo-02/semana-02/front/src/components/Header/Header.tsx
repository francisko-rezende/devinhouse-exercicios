import { tomato } from '@radix-ui/colors';
import React from 'react';
import styled from 'styled-components';

import { Center } from '../Center';

interface HeaderProps {
  children: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <StyledHeader>
      <Center>{children}</Center>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background-color: ${tomato.tomato3};
  color: ${tomato.tomato12};
  text-align: center;
`;

// const Cluster = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: var(--space, 1rem);
//   justify-content: space-between;
//   align-items: center;
// `;
