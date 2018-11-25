import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import { fetchIngredientsFailed, setIngredients } from '../actions';

export default function* initIngredientsSaga() {
  try {
    const response = yield axios.get('https://react-burger-builder-fff98.firebaseio.com/ingridients.json');
    yield put(setIngredients(response.data));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    yield put(fetchIngredientsFailed());
  }
}
