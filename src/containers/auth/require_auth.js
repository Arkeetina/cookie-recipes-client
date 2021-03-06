import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {

  class Authentication extends Component {
    PropTypes = {
      router: PropTypes.object
    }

    componentWillMount(){
      if(!this.props.authenticated) {
        this.props.history.push('/admin/login');
      }
    }
  
    componentWillUpdate(nextProps){
      if(!nextProps.authenticated) {
        this.props.history.push('/admin/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props}/>
    }
  }

  function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated};
  }

  return connect(mapStateToProps)(Authentication);
}