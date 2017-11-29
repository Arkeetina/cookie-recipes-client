import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

class Header extends Component {
  renderLinks() {
    if(this.props.authenticated) {
      return [
        <li className="nav-item" key={"1"}>
          <Link className="nav-link" to="/logout" >Log out</Link>
        </li>,
        <li className="nav-item" key={"2"}>
          <Link className="nav-link" to="/recipes/add" >Add recipe</Link>
        </li>
      ]
    } else {
      return [
        <li className="nav-item" key={"3"}>
          <Link className="nav-link" to="/recipes/sumbit">Contact us</Link>
        </li>
      ];
    }

  }

  render() {
    return (
      <div>
        <nav className="nav navbar">
          <Link to="/" className="navbar-brand">Cookie Recipes</Link>
          <ul className="nav justify-content-end">
            {this.renderLinks()}
          </ul>
        </nav>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {authenticated: state.auth.authenticated};
}

export default connect(mapStateToProps)(Header);