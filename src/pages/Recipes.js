import React from 'react';
import RecipesList from '../modules/recipes/RecipesList';
import { Container } from '../components/Grid';
import Box from '../components/Box';

const Recipes = () => {
  return (
    <Container>
      <Box textAlign="center">
        <h1>Select Your Recipes</h1>
        <p>
          Choose from an ever-changing mix of meat, fish, Beyond Meat™ and health-conscious
          offerings.
        </p>
      </Box>

      <RecipesList />
    </Container>
  );
};

export default Recipes;
