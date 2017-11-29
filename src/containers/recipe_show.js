import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchOneRecipe, fetchRecipes } from '../actions';
import {Link} from 'react-router-dom';
import Header from './header';
import _ from 'lodash';
import RecipesList from './recipes_list';
import BrowseRecipeButton from '../utils/buttons';


class RecipeShow extends Component {
  componentDidMount () {
    const {_id} = this.props.match.params;
    this.props.fetchOneRecipe(_id);
  }

  renderEditButton() {
    const {recipe} = this.props;

    if (this.props.authenticated && recipe) {
      return (
        <Link
          to={`/recipes/${recipe._id}/edit`}
          className="btn btn-primary buttons edit-button"
        >Edit</Link>
      )
    }
  }

  render() {
    const {recipe} = this.props;

    if(!recipe){
      return (
        <div className="container">
          <BrowseRecipeButton />
          <div className="row row-offcanvas row-offcanvas-left">
            <RecipesList />
            <div className="col-xs-6 col-sm-9 col-md-7 recipe-content">
              <div className="recipe-text">
                <h2>We are looking for your yummy recipes</h2>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="container">
          <BrowseRecipeButton />
          <div className="row row-offcanvas row-offcanvas-left">
            <RecipesList />
            <div className="col-xs-6 col-sm-9 col-md-9 recipe-content">
              <div className="content-container">
                <img className="img-fluid mx-auto d-block recipe-img" src={recipe.fileUpload}/>
                <div className="content-container">
                  <div className="recipe-text">
                    <h3>{recipe.title}</h3>
                    <h6>Author: {recipe.author}</h6>
                    <p>{recipe.body}</p>
                    {this.renderEditButton()}
                  </div>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}



function mapStateToProps(state, ownProps) {
  return {
    recipe: state.recipes[ownProps.match.params._id],
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, {fetchOneRecipe, fetchRecipes})(RecipeShow);