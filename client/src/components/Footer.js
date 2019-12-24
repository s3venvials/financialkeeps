import React, { Component } from 'react';
import { connect } from 'react-redux';

class Footer extends Component {

    render() {
        if (this.props.auth['username'] !== undefined) {
            return (
                <div className="ui fluid bottom fixed three item menu">
                    <a href="/dashboard" className="item">
                        <i className="tachometer alternate icon"></i>
                        Dashboard
                    </a>
                    <a href="/managebills" className="item">
                        <i className="money bill alternate outline icon"></i>
                        Manage Bills
                    </a>
                    <a href="/edit/profile" className="item">
                        <i className="user outline icon"></i>
                        Edit Profile
                    </a>
                </div>
            );
        } else {
            return (
                <div className="ui bottom fixed menu">
                    <small className="item">All Rights Reserved 2019</small>
                </div>
            );
        }
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Footer);