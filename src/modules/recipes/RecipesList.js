import { Col, Row } from '../../components/Grid';
import React, { useReducer } from 'react';
import Box from '../../components/Box';
import Flex from '../../components/Flex';
import PriceInfo from './PriceInfo';
import RecipeCard from './RecipeCard';

import { getRecipeCart , updateSelected } from '../../helpers/recipe-helper';
import { parseRawPrice } from './price';

import { RecipeTypes, ActionTypes } from '../../types';
import useFetchHelloFreshBox from '../../hooks/useFetchHelloFreshBox';


const initialState = {
  cart: {
    shippingPrice: 0,
    basePrice: 0,
    totalPrice: 0,
    items: []
  },
  selectedRecipes: 0,
  minRecipes: 0,
  maxRecipes: 0,
  recipes: []
}

const reducer = (state, action) => {
  switch(action.type) {
    case RecipeTypes.FETCH_RECIPE_BOX:
      const data = action.payload;
      const {recipes, count, items, totalPrice } = getRecipeCart(data);
      return {
        minRecipes: data.min,
        maxRecipes: data.max,
        selectedRecipes: count,
        recipes: recipes,
        cart: {
          shippingPrice: data.shippingPrice,
          basePrice: data.baseRecipePrice,
          totalPrice: totalPrice,
          items: items
        }
      };
    case RecipeTypes.ADD_RECIPE:
      const addItem = action.payload;
      const addUpdateObj  = updateSelected(addItem.id, addItem.count, state, ActionTypes.ADD);
      return { ...state, cart : addUpdateObj.cart , recipe: addUpdateObj.recipes, selectedRecipes: addUpdateObj.count};
    case RecipeTypes.REMOVE_RECIPE:
      const removeItem = action.payload;
      const deleteUpdatedObj  = updateSelected(removeItem.id,removeItem.count, state, ActionTypes.REMOVE);
      return { ...state, cart : deleteUpdatedObj.cart , recipe: deleteUpdatedObj.recipes, selectedRecipes: deleteUpdatedObj.count};
    case RecipeTypes.RESET:
        return initialState;
    default:
      return state;
  }
}

const Recipes = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading } = useFetchHelloFreshBox();

  const handleAddRecipe = (id, count) => {
    dispatch({type: RecipeTypes.ADD_RECIPE, payload: { id: id, count: count} });
  };

  const handleRemoveRecipe = (id, count) => {
    dispatch({type: RecipeTypes.REMOVE_RECIPE, payload: { id: id, count: count}});
  };

  React.useEffect(() => {
    const { recipes: fetchedRecipes } = data;
    if (fetchedRecipes) {
      dispatch({ type: RecipeTypes.FETCH_RECIPE_BOX, payload: data });
    }
  }, [data]);

  if (loading) {
    return null;
  }
  return (
    <>
      <Row>
        <Col sm={6}>
          <h3>{data.headline}</h3>
        </Col>
        <Col sm={6}>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box textAlign="right" mr="xs">
              <h3>{parseRawPrice(state.cart.totalPrice)}</h3>
            </Box>
            <PriceInfo summary={state.cart.items} totalPrice={parseRawPrice(state.cart.totalPrice)} shippingPrice={parseRawPrice(state.cart.shippingPrice)}/>
          </Flex>
        </Col>
      </Row>

      <Row data-testid="recipe-list">
        {state.recipes.map((recipe, index) => (
          <Col sm={12} md={6} xl={4} key={recipe.id} >
            <Box mb="md">
              <RecipeCard
                {...recipe}
                handleAddRecipe={handleAddRecipe}
                handleRemoveRecipe={handleRemoveRecipe}
                isMaxLimitReached = {state.selectedRecipes >= state.maxRecipes}
                isExtra = {state.selectedRecipes >= state.minRecipes}
              />
            </Box>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Recipes;
