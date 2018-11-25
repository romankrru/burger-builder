import {put} from 'redux-saga/effects';

import axios from '../../axios-orders';
import {fetchIngredientsFailed, setIngredients} from '../actions'

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get('https://react-burger-builder-fff98.firebaseio.com/ingridients.json');
    yield put(setIngredients(response.data));
  } catch(error) {
    console.error(error);
    yield put(fetchIngredientsFailed());
  }
}
