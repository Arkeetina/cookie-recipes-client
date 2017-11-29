import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchRecipes} from '../actions';
import {Link} from 'react-router-dom';
import _ from 'lodash';



class RecipesList extends Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }

  renderRecipes() {
    return _.map(this.props.recipes, recipe => {
      return (
        <li className ="recipe-title" key={recipe._id}>
          <Link className="btn recipe-title-button" 
            to={`/recipes/${recipe._id}`} 
          >
            {recipe.title}
          </Link>
        </li>
      )
    });
  };
    
  render() {
    return (
      <div className="col-6 col-md-3 sidebar-offcanvas recipe-sidebar" id="sidebar">
        <div className="list-group">
          {this.renderRecipes()}
        </div>
      </div> 
    )
  }
}

function mapStateToProps(state) {
  return {recipes: state.recipes};
}

export default connect(mapStateToProps, {fetchRecipes})(RecipesList);