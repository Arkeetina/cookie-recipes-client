import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRecipe, postImage, editRecipe, fetchOneRecipe, deleteRecipe } from '../actions';
import RecipeForm from '../components/recipe_form/form'; 
import Header from './header';

class RecipeNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    const {_id} = this.props.match.params;
    if(_id) {
      this.props.fetchOneRecipe(_id);
    }
  }

  onDeleteclick() {
    const {_id} = this.props.match.params;
    this.props.deleteRecipe(_id, this.props.history);
  };

  onSubmit(values) {
    const {_id} = this.props.match.params;
    if (!values.fileUpload) {
      return alert('Please upload an image for your post');
    }

    if(_id) {
      this.props.editRecipe(values, this.props.history);
    }

    if(!_id) {
      this.props.createRecipe(values, this.props.history);
    }
  };

  renderDeleteButton() {
    const {_id} = this.props.match.params;

    if(_id) {
      return (
        <button className="btn btn-danger" onClick={this.onDeleteclick}>Delete</button>
      )
    }
  }

  render() {
      return (
        <div className="container">
          {this.renderDeleteButton()}
          <RecipeForm onSubmit={this.onSubmit}/> 
        </div>
      )
  }
}

function validate(values) {
  const errors = {};

  if(!values.title || values.title.length < 3) {
    errors.title = "Enter a title that is at least 3 characters!";
  } else if (values.title.length > 35) {
    errors.title = "Title must be less than 35 characters!";
  }

  if(!values.author) {
    errors.author = "Enter the name of author";
  }

  if(!values.body) {
    errors.body = "Enter some recipe conent please";
  }

  return errors;
}

function mapStateToProps({recipes}, ownProps) {
  return {
    recipe: recipes[ownProps.match.params._id],
    initialValues: recipes[ownProps.match.params._id]
  };
}


export default connect(mapStateToProps, {fetchOneRecipe, createRecipe, editRecipe, deleteRecipe}
)(
  reduxForm({ validate, form: 'RecipeNewForm'})(RecipeNew)
)

