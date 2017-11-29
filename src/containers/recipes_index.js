import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import RecipesList from './recipes_list';
import BrowseRecipeButton from '../utils/buttons';

class RecipesIndex extends Component {

  render() {
    return (
      <div className="container">
          <BrowseRecipeButton />
          <div className="row row-offcanvas row-offcanvas-left">
            <RecipesList />
            <div className="col-md-8 recipe-content text-center">
              <div className="recipe-text">
                <div className="header-text-container">
                  <h2 className="header-text">Welcome to Cookie-verse, choose your recipe!</h2>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {recipes: state.recipes};
}

export default connect(mapStateToProps, actions)(RecipesIndex);