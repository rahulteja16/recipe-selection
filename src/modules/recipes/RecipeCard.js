import React from 'react';

import Box from '../../components/Box';
import Button from '../../components/Button';
import Flex from '../../components/Flex';
import IconMinusCircle from '../../icons/IconMinusCircle';
import IconPlusCircle from '../../icons/IconPlusCircle';
import PropTypes from 'prop-types';
import Text from '../../components/Text';
import css from '@styled-system/css';
import { parseRawPrice } from './price';
import styled from 'styled-components';

const RecipeCard = ({
  extraCharge,
  headline,
  id,
  image,
  isAddEnabled,
  name,
  selected,
  yields,
  handleAddRecipe,
  handleRemoveRecipe,
  maxRecipesSelected,
  selectedRecipes,
  isExtra,
  isMaxLimitReached
}) =>  {
  let isDisabled = false;
  if(isMaxLimitReached) {
    isDisabled = true;
  } else {
    if(isAddEnabled) {
      isDisabled = selectedRecipes <= maxRecipesSelected
    } else {
      isDisabled = true;
    }
  }

  return   <Box
  data-testid="recipe-card"
  borderWidth={selected ? 'md' : null}
  borderStyle={selected ? 'solid' : null}
  borderColor={selected ? 'primary_600' : null}
  m={selected ? '-2px' : null}
  borderRadius="md"
  boxShadow="lg">
  <Box borderRadius="2px 2px 0px 0px" paddingBottom="56.25%" overflow="hidden" height="0">
    <img src={image} alt={name} width="100%" />
  </Box>

  <Box p="xs" height="120px">
    <Text  data-testid="recipe-card-name" fontWeight="bold" fontFamily="primary" fontSize="md">
      {name}
    </Text>
    <Text data-testid="recipe-card-headline" fontWeight="regular" fontFamily="secondary" fontSize="sm">
      {headline}
    </Text>
  </Box>
  {selected ? (
    <SelectedRecipeFooter
      recipeId={id}
      yields={yields}
      selected={selected}
      isDisabled={isDisabled}
      handleAddRecipe={handleAddRecipe}
      handleRemoveRecipe={handleRemoveRecipe}
    />
  ) : (
    <UnselectedRecipeFooter
      recipeId={id}
      price={extraCharge && extraCharge}
      handleAddRecipe={handleAddRecipe}
      isExtra={isExtra}
      isDisabled={isDisabled}
    />
  )}
</Box>
};

RecipeCard.propTypes = {
  extraCharge: PropTypes.number,
  handleAddRecipe: PropTypes.func,
  handleRemoveRecipe: PropTypes.func,
  headline: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  maxRecipesSelected: PropTypes.bool,
  minRecipesSelected: PropTypes.bool,
  name: PropTypes.string,
  selected: PropTypes.number,
  selectionLimit: PropTypes.number,
  yields: PropTypes.number,
};

export const UnselectedRecipeFooter = ({
  isExtra,
  price,
  recipeId,
  handleAddRecipe,
  isDisabled
}) => (
  <Flex p="xs" data-testid="recipe-unselected">
    <Box flex="50%" alignSelf="center">
      {price ? <Text data-testid="recipe-special-price" color="primary_600">+{parseRawPrice(price)}</Text> : null}
    </Box>
    <Box flex="50%">
      <Button
        onClick={() => handleAddRecipe(recipeId, 1)}
        variant="secondary"
        width="100%"
        p="0"
        disabled={isDisabled}>
        {isExtra  ? 'Add extra meal' : 'Add'}
      </Button>
    </Box>
  </Flex>
);

UnselectedRecipeFooter.propTypes = {
  isExtra: PropTypes.bool,
  price: PropTypes.number,
  recipeId: PropTypes.string,
  isDisabled: PropTypes.bool,
  handleAddRecipe: PropTypes.func,
};

export const SelectedRecipeFooter = ({
  recipeId,
  selected,
  yields,
  handleAddRecipe,
  handleRemoveRecipe,
  isDisabled
}) => {

return (
  <Flex backgroundColor="primary_600" justifyContent="space-between" alignItems="center" data-testid="recipe-selected">
    <SelectionButton onClick={() => handleRemoveRecipe(recipeId, selected - 1)} title="Decrease quantity" aria-label='decrease-quantity'>
      <IconMinusCircle />
    </SelectionButton>
    <Box color="white">
      <Text textAlign="center" fontWeight="bold" fontFamily="secondary" fontSize="md" data-testid="recipe-selected-desc">
        {selected} in your box
      </Text>
      <Text textAlign="center" fontFamily="secondary" fontSize="sm" data-testid="recipe-selected-servings">
        ({selected * yields} servings)
      </Text>
    </Box>
    <SelectionButton onClick={() => handleAddRecipe(recipeId, selected + 1)} title="Increase quantity" disabled={isDisabled} aria-label='increase-quantity'>
      <IconPlusCircle />
    </SelectionButton>
  </Flex>
)
}

SelectedRecipeFooter.propTypes = {
  recipeId: PropTypes.string,
  selected: PropTypes.number,
  yields: PropTypes.number,
  handleAddRecipe: PropTypes.func,
  handleRemoveRecipe: PropTypes.func,
  isDisabled: PropTypes.bool
};

const SelectionButton = styled.button`
  ${css({
    outline: 'none',
    color: 'white',
    padding: 'sm',
    cursor: 'pointer',
    backgroundColor: 'primary_600',
    border: 'none',
    ':hover:enabled': {
      backgroundColor: 'primary_700',
    },
    ':active:enabled': {
      backgroundColor: 'primary_800',
    },
  })}
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export default RecipeCard;
