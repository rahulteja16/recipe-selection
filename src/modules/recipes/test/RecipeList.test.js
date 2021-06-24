import React from 'react';
import RecipeList from '../RecipesList';
import { render, screen } from '@testing-library/react';

describe('Recipe List Component', () => {
  test('it should render recipe list', async () => {
    render(
    <RecipeList />
    );
    await screen.findByTestId('recipe-list')
  });

});
