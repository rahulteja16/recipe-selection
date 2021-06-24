import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import RecipeCard, { UnselectedRecipeFooter,  SelectedRecipeFooter} from '../RecipeCard';

const recipeCardProps = {
  extraCharge: 0,
  handleAddRecipe: () => {},
  handleRemoveRecipe: () => {},
  headline: 'with Tomato & Lemon',
  id: '5f4d4a7e62fb0224951e7ec4',
  image:
    'https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/hellofresh_s3/image/5f4d4a7e62fb0224951e7ec4-2fe03fc2.jpg',
  maxRecipesSelected :false,
  minRecipesSelected : true,
  name: 'Chicken Sausage & Spinach Ravioli',
  slug: 'chicken-sausage-spinach-ravioli',
  selected: 1,
  selectionLimit: 1,
  yields: 2,
};

describe('Recipe Card Component', () => {
  test('render recipe card', () => {
    render(<RecipeCard {...recipeCardProps} />);
    expect(screen.getByTestId('recipe-card')).toBeDefined();
  })
  test('render recipe name', () => {
    render(<RecipeCard {...recipeCardProps} />);
    expect(screen.getByTestId('recipe-card-name')).toBeDefined();
  })
  test('render recipe headline', () => {
    render(<RecipeCard {...recipeCardProps} />);
    expect(screen.getByTestId('recipe-card-headline')).toBeDefined();
  })
  test('render unselected recipe footer', async () => {
      const unSelectedProps = {...recipeCardProps};
      unSelectedProps.selected = 0;
      render(<RecipeCard props= {unSelectedProps} />);
      await screen.findByTestId('recipe-unselected')
  })
  test('render selected recipe footer', async () => {
    render(<RecipeCard {...recipeCardProps} />);
    await screen.findByTestId('recipe-selected')
  })
});

const unSelectedProps = {
  price : 100,
  recipeId : '5f4d4a7e62fb0224951e7ec4',
  isExtra: false,
  isDisabled : false,
  handleAddRecipe : () => {},
}

describe('Unselected Recipe Footer', () => {
  test('render button with text - Add', () => {
    render(<UnselectedRecipeFooter {...unSelectedProps} />);
    expect(screen.getByRole('button', { exact : true, name: 'Add'}))
  })
  test('render button with text - Add extra meal', () => {
    const minRecProps = {...unSelectedProps};
    minRecProps.isExtra = true
    render(<UnselectedRecipeFooter {...minRecProps} />);
    expect(screen.getByRole('button',{name: 'Add extra meal', exact: true}))
  })
  test('render Add button in disabled state', () => {
    const disabledProps = {...unSelectedProps};
    disabledProps.isDisabled = true
    render(<UnselectedRecipeFooter {...disabledProps} />);
    expect(screen.getByText(/Add/i).closest('button')).toBeDisabled();
  })
  test('render Price only if extraCharge is not 0', () => {
    const extraChargeProps = {...unSelectedProps};
    extraChargeProps.price = 0;
    render(<UnselectedRecipeFooter {...extraChargeProps} />);
    expect(screen.queryByTestId('recipe-special-price')).not.toBeInTheDocument();
  })
  test('render selected recipe footer on click of add button', () => {
    const funcProps = {...unSelectedProps};
    funcProps.handleAddRecipe = jest.fn();
    render(<UnselectedRecipeFooter {...funcProps} />);
    fireEvent.click(screen.getByRole('button',{name: /Add/i}));
    expect(funcProps.handleAddRecipe).toHaveBeenCalledWith(funcProps.recipeId, 1);
  })
  test('it should match Unselected Recipe Footer snapshot', ()=> {
    expect(render(<UnselectedRecipeFooter {...unSelectedProps} />)).toMatchSnapshot();
  });
});

const selectedProps = {
  recipeId : '5f4d4a7e62fb0224951e7ec4',
  selected : 1,
  yields : 2,
  isDisabled: false,
  handleAddRecipe : () => {},
  handleRemoveRecipe : () => {},
};
describe('Selected Recipe Footer', () => {

  test('render total selected in recipe', () => {
    render(<SelectedRecipeFooter {...selectedProps}/>);
    expect(screen.getByTestId('recipe-selected-desc')).toHaveTextContent(
      '1 in your box'
    )
  });
  test('render total servings in recipe', () => {
    render(<SelectedRecipeFooter {...selectedProps}/>);
    expect(screen.getByTestId('recipe-selected-servings')).toHaveTextContent(
      '(2 servings)'
    )
  });
  test('click on + should trigger a function', () => {
    const addProps = {...selectedProps};
    addProps.handleAddRecipe = jest.fn();
    render(<SelectedRecipeFooter {...addProps}/>);
    fireEvent.click(screen.getByRole('button', {name: 'increase-quantity', exact: true}));
    expect(addProps.handleAddRecipe).toHaveBeenCalledTimes(1);
  });
  test('click on - should trigger a function', () => {
    const removeProps = {...selectedProps};
    removeProps.handleRemoveRecipe = jest.fn();
    render(<SelectedRecipeFooter {...removeProps}/>);
    fireEvent.click(screen.getByRole('button', {name: 'decrease-quantity', exact: true}));
    expect(removeProps.handleRemoveRecipe).toHaveBeenCalledTimes(1);
  });

  test('it should match Selected Recipe Footer snapshot', ()=> {
    expect(render(<SelectedRecipeFooter {...selectedProps} />)).toMatchSnapshot();
  });
});
