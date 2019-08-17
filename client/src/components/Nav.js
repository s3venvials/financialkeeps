import React, { Component } from 'react';
import { connect } from 'react-redux';

class Nav extends Component {

    render() {
        if(this.props.auth['username'] !== undefined) {
            return (
                <div className="ui stackable menu">

                        <a href="/" className="item">
                            <i className="balance scale icon"></i> Financial Keeps
                        </a>

                        <a href="/dashboard" className="item">
                            <i className="tachometer alternate icon"></i> Dashboard
                        </a>

                    <div className="right menu">

                        <div className="item">
                        <i className="user circle icon"></i> {this.props.auth['username']} 
                        </div>

                        <a href="/api/logout" className="item">
                            <i className="sign out icon"></i> Logout
                        </a>

                    </div>

                </div>
            )
        } else {
            return (
                <div className="ui top menu">
                        
                        <a href="/" className="item">
                            <i className="balance scale icon"></i> Financial Keeps
                        </a>

                        <div className="right menu">

                            <a href="/auth/google" className="item">
                                <i className="sign in icon"></i> Login with Google
                            </a>

                        </div>
                        
                </div>
            )
        }
    }
}

function mapStateToProps({auth}) {
    return { auth };
}

export default connect(mapStateToProps)(Nav);