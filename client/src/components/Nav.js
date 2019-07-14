import React, { Component } from 'react';

class Nav extends Component {

    render() {
        return (
            <div className="ui top attached menu">
                <div className="ui dropdown icon item">
                    <i className="wrench icon"></i>
                </div>
            </div>
        )
    }
}

export default Nav;