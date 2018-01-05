import { updateObject } from '../utils';
import * as actionTypes from '../actions/actionTypes';

const INGRIDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.9,
  meat: 1.2,
  cheese: 0.6,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => updateObject(state, {
  ingredients: action.ingredients,
  totalPrice: initialState.totalPrice,
  error: false,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
