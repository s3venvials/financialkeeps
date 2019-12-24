import React, { Component } from 'react';
import { connect } from 'react-redux';

class Nav extends Component {

  render() {
    if (this.props.auth['username'] !== undefined) {
      return (
        <div className="ui fluid three item menu">

          <a href="/" className="item">
            <i className="balance scale icon"></i> Financial Keeps
          </a>

          <div className="item">
            <i className="user circle icon"></i> {this.props.auth['username']}
          </div>

          <a href="/api/logout" className="item">
            <i className="sign out icon"></i> Logout
          </a>
          
        </div>
      )
    } else {
      return (
        <div className="ui top menu">

          <a href="/" className="item">
            <i className="balance scale icon"></i> Financial Keeps
                        </a>

        </div>
      )
    }
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Nav);