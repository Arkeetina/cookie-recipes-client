import React, {Component} from 'react';
import { connect } from 'react-redux';
import {loginAdmin} from '../../actions';
import {Link} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import LoginForm from '../../components/auth/login_page';

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

  onSubmit(values) {
    this.props.loginAdmin(values, this.props.history)
  }

  render () {
    return (
      <LoginForm onSubmit={this.onSubmit.bind(this)}/>
    )
  }

}

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

export default reduxForm({
  form: 'login',
})(
  connect(mapStateToProps, {loginAdmin})(LoginPage)
)