import React from 'react';
import {render} from 'react-dom';
import './style/index.css';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {reducer} from './reducers/reducer';
import {BrowserRouter} from 'react-router-dom';


const store = createStore(reducer, 
  compose(applyMiddleware(thunk)),
window.devToolsExtension ? window.devToolsExtension() : f => f)

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));


