import { ActionTypes } from '../types';

export const getRecipeCart = (data) => {
  const { max, recipes, shippingPrice, baseRecipePrice} = {...data};
  const updatedRecipes = [...recipes];
  const selectedRecipes = getCount(updatedRecipes);
  let cartItems = [];

  updatedRecipes.forEach((recipe)=> {
    recipe = checkAddStatus(recipe, selectedRecipes, max);
    if(recipe.selected !== 0) {
      cartItems.push({
        id: recipe.id,
        name: recipe.name,
        amount: recipe.extraCharge + baseRecipePrice,
        qty: recipe.selected
      })
    }
  });
  return {
    recipes : updatedRecipes,
    count: selectedRecipes,
    items: cartItems,
    totalPrice: calculateTotalHelper(cartItems, shippingPrice),
  }
}

export const updateSelected = (id, count, state, type) => {
  const { recipes, selectedRecipes, cart, maxRecipes } = {...state};
  let updatedCartArr;
  let matchRecipe;

  if(type === ActionTypes.ADD) {
    recipes.forEach((recipe) => {
      if(recipe.id === id) {
        recipe.selected = count;
        recipe = checkAddStatus(recipe, selectedRecipes, maxRecipes);
        matchRecipe = recipe;
      }
    })
  }

  if(type === ActionTypes.REMOVE) {
    recipes.forEach((recipe) => {
      if(recipe.id === id) {
        recipe.selected = count;
        recipe = checkAddStatus(recipe, selectedRecipes, maxRecipes);
        if(selectedRecipes === 0) {
          cart.items = [];
          cart.totalPrice = 0;
        } else {
          matchRecipe = recipe;
        }
      }
    })
  }

  updatedCartArr = updatedCart(cart.items, cart.basePrice, matchRecipe, count, type);
  cart.items = updatedCartArr === undefined ? cart.items : updatedCartArr;
  cart.totalPrice = calculateTotalHelper(updatedCartArr, cart.shippingPrice);
  return {
    cart: cart,
    recipes: recipes,
    count: getCount(recipes),
  }
}

const checkAddStatus = (recipe, selectedRecipes, max) => {
  if(recipe.selectionLimit !== null) {
    recipe.isAddEnabled = false;
    if(recipe.selected < recipe.selectionLimit) {
      recipe.isAddEnabled = true;
    }
  }
  if(recipe.selectionLimit === null) {
    recipe.isAddEnabled = false;
    if(selectedRecipes < max) {
      recipe.isAddEnabled = true;
    }
  }
  return recipe;
}

const getCount = (recipes) => {
  let count = 0
  recipes.forEach((recipe)=> {
    count += recipe.selected;
  });
  return count;
}

const updatedCart = (cart, basePrice, item, count) => {
  let findById = cart.findIndex(summaryObj => summaryObj.id=== item.id);
  if(item.selected === 0) {
    cart = cart.filter((summary) => summary.id !== item.id);
    return cart;
  } else {
    if(findById !== -1) {
      cart = setCartValues(cart, findById, count, basePrice);
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        amount: (item.extraCharge + basePrice) * item.selected,
        qty: item.selected
      })
    }
    return cart;
  }
}

const setCartValues = (cart, findById, count, basePrice) => {
    cart[findById].qty = count;
    cart[findById].amount =  basePrice * cart[findById].qty;
    return cart;
}

const calculateTotalHelper = (summaryArr, shipping) => {
  let total = 0;
  if(summaryArr.length !== 0) {
    summaryArr.forEach((item)=> {
      total += item.amount;
    });
    total += shipping;
  }
  return total;
}
