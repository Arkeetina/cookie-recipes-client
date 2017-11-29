import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import FileUpload from './file_upload';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { createRecipe, postImage, editRecipe, fetchOneRecipe  } from '../../actions';


class RecipeForm extends Component {
  constructor(props) {
    super(props);
  };

  renderField(field) {
    const { meta: {touched, error}} = field;
    const className = `form-group ${touched && error ? 'has-danger': ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  };

  renderTextAreaField(field) {
    const { meta: {touched, error}} = field;
    const className = `form-group ${touched && error ? 'has-danger': ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <textarea
          className="form-control recipe-body"
          type="textarea"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  render() {
    const { handleSubmit, pristine, submitting, loadRecipe } = this.props;

    return (
      <div className="recipe-form">
        <form onSubmit={handleSubmit}>
          <Field 
            label="Title for Post"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Author"
            name="author"
            component={this.renderField}
          />
          <Field
            label="Recipe Content"
            name="body"
            component={this.renderTextAreaField}
          />
          <Field
            name="fileUpload" 
            component={FileUpload}
          />
          <div className="form-buttons-container">
            <button type="submit" className="btn btn-primary form-buttons" disabled={pristine || submitting}>Submit</button>
            <Link to="/" className="btn btn-danger form-buttons">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}


export default reduxForm({form: 'RecipeNewForm'})(RecipeForm);

