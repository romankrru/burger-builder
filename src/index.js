/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleWare from 'redux-saga';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import {watchAuth, watchBurgerBuilder, watchOrders} from './store/sagas';

let composeEnhancers;

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancers = compose;
}

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});

const sagaMiddleWare = createSagaMiddleWare();

const store = createStore(
  rootReducer,

  composeEnhancers(
    applyMiddleware(thunk, sagaMiddleWare),
  ),
);

sagaMiddleWare.run(watchAuth);
sagaMiddleWare.run(watchBurgerBuilder);
sagaMiddleWare.run(watchOrders);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root'),
);

registerServiceWorker();
