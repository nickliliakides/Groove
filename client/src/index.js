import React from 'react';
import ReactDOM from 'react-dom';
import './resources/css/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import Reducer from './store/reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk)(
  createStore
);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
);
