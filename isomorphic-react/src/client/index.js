import '../scss/main.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers/index';
import Search from '../container/Search';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <div className='container wrapper'>
      <Search />
    </div>
  </Provider>
  , document.getElementById('root'));
