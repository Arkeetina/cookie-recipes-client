import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

class LoginPage extends Component {
  renderField(field) {
    const className = `form-group`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          {...field.input}
        />
      </div>
    )
  }

  renderPasswordField(field) {
    const className = `form-group`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="password"
          {...field.input}
        />
      </div>
    )
  }

  renderAlert() {
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oh!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render () {
    const { handleSubmit } = this.props;

    return (
      <div className="container-fluid">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <Field
              label="Email"
              name="email"
              component={this.renderField}
              className="form-control"
            />
            <Field
              label="Password"
              name="password"
              component={this.renderPasswordField}
            />
            {this.renderAlert()}
            <button action="submit" className="btn btn-primary buttons login-button">Log In</button>
          </form>
        </div>
      </div>
    )
  }
}


export default reduxForm({form: 'login'})(LoginPage)
