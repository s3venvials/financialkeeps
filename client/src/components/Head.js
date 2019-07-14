import React, { Component } from 'react';

class Header extends Component {

    render() {
        return (
            <div className="ui two column grid" style={{ marginTop: "3em" }}>
                <div className="row" style={{ borderBottom: "1px solid #EEE", paddingBottom: "0" }}>
                    <div className="column">
                        <h3>Financial Keeps</h3>
                    </div>
                    <div className="column">
                    <small style={{ float: "right" }}>Vr 1.0.0</small>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;