/* eslint-disable */
import { updateObject } from '../utils';

const INGRIDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.9,
  meat: 1.2,
  cheese: 0.6,
};

import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingredientName],
      }
      return updateObject(state, updatedState);
    }

    case actionTypes.REMOVE_INGREDIENT: {
      const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingredientName],
      }
    }

    case actionTypes.SET_INGREDIENTS: {
      return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: initialState.totalPrice,
        error: false,
      });
    }

    case actionTypes.FETCH_INGREDIENTS_FAILED: {
      return updateObject(state, { error: true });
    }

    default:
      return state;
  }
};

export default reducer;
