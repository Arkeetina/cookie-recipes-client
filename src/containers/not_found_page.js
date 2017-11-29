import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import RecipesList from './recipes_list';
import * as actions from '../actions';
import BrowseRecipeButton from '../utils/buttons'


class NotFound extends Component {

  render() {
    return (
      <div className="container">
        <BrowseRecipeButton />
        <div className="row">
          <RecipesList />
          <div className="col-md-8 recipe-content">
            <div className="recipe-text">
              <h1>404</h1>
              <h1>Oh, no such page. Are you lost?</h1>
            </div>
          </div>
        </div>
    </div>
    )
  }
}

export default connect(null, actions)(NotFound);