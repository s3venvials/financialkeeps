import React, { Component } from 'react';

class GrossPayEdit extends Component {

    render() {
        return (
            <div>
                <div className="ui attached message">
                    <div className="header">
                        <h3>Edit Gross Pay</h3>
                        <form className="ui form">
                            <div className="field">
                                <input type="text" name="amount" />
                            </div>
                            <button className="ui basic blue button">
                                Update
                            </button>
                            <a href="/dashboard" className="ui button">Cancel</a>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default GrossPayEdit;