import React from 'react';
import styled from 'styled-components';

interface CenterProps {
  children: React.ReactNode;
}

export const Center = ({ children }: CenterProps) => {
  return <StyledCenter>{children}</StyledCenter>;
};

const StyledCenter = styled.div`
  box-sizing: content-box;
  max-inline-size: 60ch;
  margin-inline: auto;
  padding-inline-start: 8px;
  padding-inline-end: 8px;
`;
