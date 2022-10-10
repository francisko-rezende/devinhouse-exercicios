import { grass } from '@radix-ui/colors';
import React from 'react';
import styled, { css } from 'styled-components';

import { Pizza } from '../Main/Main';

interface PizzaCardProps {
  pizza: Pizza;
  imgUrl: string;
  name: string;
  description: string;
  ingredients: string[];
  handleSelectPizza: (pizza: Pizza) => void;
  isSelected: boolean;
}

export const PizzaCard = ({
  imgUrl,
  name,
  description,
  ingredients,
  handleSelectPizza,
  pizza,
  isSelected,
}: PizzaCardProps) => {
  return (
    <Wrapper onClick={() => handleSelectPizza(pizza)} isSelected={isSelected}>
      <PizzaPic alt={`Pizza de ${name}`} src={imgUrl} />
      <ContentWrapper>
        <h3>{name}</h3>
        <p>{description}</p>
        <ul>
          {ingredients.map((ingredient) => (
            <Ingredient key={ingredient}>{ingredient}</Ingredient>
          ))}
        </ul>
      </ContentWrapper>
    </Wrapper>
  );
};

const Ingredient = styled.li`
  display: inline-block;
  text-transform: capitalize;

  & + & {
    padding-inline-start: 1rem;
  }
`;

const ContentWrapper = styled.div`
  padding: 8px;
`;

type WrapperProps = Pick<PizzaCardProps, 'isSelected'>;

const Wrapper = styled.li<WrapperProps>`
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  display: grid;
  grid-template-rows: minmax(auto, 350px) auto;
  background-color: ${grass.grass3};
  border: 2px solid transparent;

  &:hover {
    background-color: ${grass.grass4};
  }

  ${({ isSelected }) => css`
    ${isSelected &&
    css`
      background-color: ${grass.grass5};
      border-color: ${grass.grass12};
    `}
  `}
`;

const PizzaPic = styled.img`
  width: 100%;
  display: block;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;
