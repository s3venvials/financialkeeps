import React, { Component } from 'react';

class Nav extends Component {

    render() {
        return (
            <div className="ui top attached menu">

                <div className="ui dropdown icon item">
                    <i className="wrench icon"></i>
                </div>

                <a href="http://localhost:3000/" class="ui item">
                    Dashboard
                </a>

                <div className="right menu">
                    <a href="http://localhost:5000/auth/google" class="ui item">
                        Login to Google
                    </a>

                    <a href="http://localhost:5000/api/logout" class="ui item">
                        Logout
                    </a>

                    <a href="http://localhost:5000/api/current_user" class="ui item">
                        Current User
                    </a>
                </div>

            </div>
        )
    }
}

export default Nav;