import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from './reducers';
import requireAuth from './containers/auth/require_auth'
import RecipesIndex from './containers/recipes_index';
import RecipeShow from './containers/recipe_show';
import RecipeNew from './containers/recipe_new';
import NotFound from './containers/not_found_page';
import LoginPage from './containers/auth/login_page';
import Logout from './components/auth/logout_page';
import Header from './containers/header';


import {AUTH_ADMIN} from './actions/types';
import './styles/styles.scss'


const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('x-auth');

if (token) {
  store.dispatch({type: AUTH_ADMIN});
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
          <Header />
          <Switch>
            <Route exact path="/" component={RecipesIndex}/>
            <Route exact path="/recipes/add" component={requireAuth(RecipeNew)}/>
            <Route exact path="/recipes/:_id" component={RecipeShow}/>
            <Route exact path="/recipes/:_id/edit" component={requireAuth(RecipeNew)}/>
            <Route exact path="/admin/login" component={LoginPage}/>
            <Route exact path='/logout' component={Logout}/>
            <Route path="*" component={NotFound} />
          </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.app'));